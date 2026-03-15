"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_dothanLpapiBle_js_sdk_index = require("../../uni_modules/dothan-lpapi-ble/js_sdk/index.js");
const PACKING_CACHE_KEY = "packing_cache";
const PACKING_PRINTER_CACHE_KEY = "packing_loc_printer_cache";
const PRINTER_IDLE_CLOSE_MS = 30 * 1e3;
const _sfc_main = {
  onLoad() {
    this.loadCache();
    this.isWeiXin = true;
    this.initPrinter();
  },
  onUnload() {
    if (this.highlightTimer) {
      clearTimeout(this.highlightTimer);
      this.highlightTimer = null;
    }
    this.teardownPrinter();
  },
  data() {
    return {
      drawerVisible: false,
      connectedDevice: "",
      connectedDeviceId: "",
      weight: "",
      qtyPopupVisible: false,
      qtyInputFocus: false,
      editingFnsku: "",
      editingQty: "",
      editingOldQty: "",
      editingTitle: "",
      qtyPopupMode: "edit",
      pendingScanCode: "",
      pendingScanIndex: -1,
      highlightedIndex: -1,
      highlightTimer: null,
      sortAsc: true,
      scrollIntoViewId: "",
      deleteOptions: [
        {
          text: "删除",
          style: {
            backgroundColor: "#e85252"
          }
        }
      ],
      btDevices: [],
      isScanning: false,
      isConnectingPrinter: false,
      isWeiXin: false,
      lpapi: null,
      printContext: null,
      printIdleTimer: null,
      printBusy: false,
      printBusyText: "",
      skuList: []
    };
  },
  watch: {
    skuList: {
      deep: true,
      handler() {
        this.saveCache();
      }
    },
    weight() {
      this.saveCache();
    },
    drawerVisible(visible) {
      if (visible) {
        this.refreshPrinters();
        return;
      }
      this.stopPrinterDiscovery();
    }
  },
  computed: {
    skuCount() {
      return this.skuList.length;
    },
    totalQty() {
      return this.skuList.reduce((sum, item) => sum + Number(item.number || 0), 0);
    },
    skuSortLabel() {
      return this.sortAsc ? "SKU排序：A-Z" : "SKU排序：Z-A";
    }
  },
  methods: {
    loadCache() {
      const cache = common_vendor.index.getStorageSync(PACKING_CACHE_KEY);
      if (!cache || typeof cache !== "object")
        return;
      if (Array.isArray(cache.skuList))
        this.skuList = cache.skuList;
      if (typeof cache.weight === "string")
        this.weight = cache.weight;
    },
    saveCache() {
      const prevCache = common_vendor.index.getStorageSync(PACKING_CACHE_KEY);
      const safePrevCache = prevCache && typeof prevCache === "object" ? prevCache : {};
      common_vendor.index.setStorageSync(PACKING_CACHE_KEY, {
        ...safePrevCache,
        skuList: this.skuList,
        weight: this.weight
      });
    },
    initPrinter() {
      try {
        this.lpapi = uni_modules_dothanLpapiBle_js_sdk_index.LPAPIFactory.getInstance({
          showLog: 3
        });
        this.printContext = this.lpapi.createDrawContext();
        this.lpapi.setDrawContext(this.printContext);
      } catch (error) {
        this.lpapi = null;
        this.printContext = null;
        common_vendor.index.showToast({ title: "打印模块初始化失败", icon: "none" });
      }
    },
    teardownPrinter() {
      this.clearPrintIdleTimer();
      this.stopPrinterDiscovery();
      if (this.lpapi) {
        this.lpapi.closePrinter().catch(() => {
        });
      }
      this.connectedDevice = "";
      this.connectedDeviceId = "";
    },
    getCachedPrinter() {
      const cache = common_vendor.index.getStorageSync(PACKING_PRINTER_CACHE_KEY);
      if (!cache || typeof cache !== "object")
        return null;
      const deviceId = String(cache.deviceId || "").trim();
      const name = String(cache.name || "").trim();
      if (!deviceId || !name)
        return null;
      return { deviceId, name };
    },
    saveCachedPrinter(device = {}) {
      const deviceId = String(device.deviceId || "").trim();
      const name = String(device.name || "").trim();
      if (!deviceId || !name)
        return;
      common_vendor.index.setStorageSync(PACKING_PRINTER_CACHE_KEY, {
        deviceId,
        name
      });
    },
    setPrintBusy(visible, text = "") {
      this.printBusy = visible;
      this.printBusyText = visible ? text : "";
    },
    clearPrintIdleTimer() {
      if (!this.printIdleTimer)
        return;
      clearTimeout(this.printIdleTimer);
      this.printIdleTimer = null;
    },
    scheduleAutoClosePrinter() {
      this.clearPrintIdleTimer();
      this.printIdleTimer = setTimeout(() => {
        this.printIdleTimer = null;
        this.closeConnectedPrinter();
      }, PRINTER_IDLE_CLOSE_MS);
    },
    closeConnectedPrinter() {
      this.clearPrintIdleTimer();
      if (!this.lpapi)
        return;
      this.lpapi.closePrinter().catch(() => {
      });
      this.connectedDevice = "";
      this.connectedDeviceId = "";
    },
    openPrinterDrawer() {
      if (!this.isWeiXin) {
        common_vendor.index.showToast({ title: "仅支持微信小程序", icon: "none" });
        return;
      }
      if (!this.lpapi) {
        this.initPrinter();
      }
      if (!this.lpapi || !this.printContext) {
        common_vendor.index.showToast({ title: "打印模块未就绪", icon: "none" });
        return;
      }
      this.drawerVisible = true;
    },
    normalizePrinterDevice(raw = {}) {
      const deviceId = String(raw.deviceId || raw.id || "").trim();
      const name = String(raw.name || raw.localName || "").trim() || "未命名打印机";
      const rssi = Number(raw.RSSI || raw.rssi);
      const rssiText = Number.isFinite(rssi) ? `${rssi}dBm` : "--";
      return {
        deviceId,
        name,
        rssiText
      };
    },
    onPrinterFound(devices = []) {
      if (!Array.isArray(devices) || !devices.length)
        return;
      const mergedMap = new Map(this.btDevices.map((item) => [item.deviceId, item]));
      devices.map(this.normalizePrinterDevice).filter((item) => item.deviceId).forEach((item) => {
        mergedMap.set(item.deviceId, item);
      });
      this.btDevices = Array.from(mergedMap.values());
    },
    async refreshPrinters() {
      if (!this.lpapi || this.isScanning)
        return;
      this.btDevices = [];
      this.isScanning = true;
      try {
        await this.lpapi.startBleDiscovery({
          timeout: 5e3,
          deviceFound: (devices) => {
            this.onPrinterFound(devices);
          },
          adapterStateChange: (result) => {
            if (!result.discovering)
              this.isScanning = false;
          }
        });
      } catch (error) {
        this.isScanning = false;
        common_vendor.index.showToast({ title: "搜索打印机失败", icon: "none" });
      }
    },
    stopPrinterDiscovery() {
      if (!this.lpapi)
        return;
      this.isScanning = false;
      this.lpapi.stopBleDiscovery().catch(() => {
      });
    },
    async connectDevice(device) {
      if (!device || !device.deviceId || !this.lpapi || this.isConnectingPrinter)
        return;
      this.isConnectingPrinter = true;
      this.clearPrintIdleTimer();
      common_vendor.index.showLoading({ title: "正在连接打印机..." });
      try {
        const res = await this.lpapi.openPrinter({
          name: device.name,
          deviceId: device.deviceId,
          tryTimes: 5,
          connectionStateChange: (state) => {
            if (state && state.connected === false) {
              this.connectedDevice = "";
              this.connectedDeviceId = "";
            }
          }
        });
        if (res && res.statusCode === 0) {
          this.connectedDevice = device.name;
          this.connectedDeviceId = device.deviceId;
          this.saveCachedPrinter(device);
          this.drawerVisible = false;
          common_vendor.index.showToast({ title: "连接成功", icon: "success" });
          return;
        }
        common_vendor.index.showToast({ title: "连接失败", icon: "none" });
      } catch (error) {
        common_vendor.index.showToast({ title: "连接失败", icon: "none" });
      } finally {
        this.isConnectingPrinter = false;
        common_vendor.index.hideLoading();
      }
    },
    toggleSkuSort() {
      this.sortAsc = !this.sortAsc;
      const sorted = [...this.skuList].sort((a, b) => {
        return this.sortAsc ? a.sku.localeCompare(b.sku) : b.sku.localeCompare(a.sku);
      });
      this.skuList = sorted;
    },
    onSwipeClick(e, fnsku) {
      if (e.position === "right")
        this.removeSku(fnsku);
    },
    removeSku(fnsku) {
      this.skuList = this.skuList.filter((item) => item.fnsku !== fnsku);
    },
    openQtyPopup(item) {
      this.editingFnsku = item.fnsku;
      this.editingQty = "";
      this.editingOldQty = String(item.number || "");
      this.editingTitle = item.sku || item.fnsku || "商品";
      this.qtyPopupMode = "edit";
      this.qtyPopupVisible = true;
      this.qtyInputFocus = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.qtyInputFocus = true;
        }, 50);
      });
    },
    closeQtyPopup() {
      this.qtyInputFocus = false;
      this.qtyPopupVisible = false;
      this.editingFnsku = "";
      this.editingQty = "";
      this.editingOldQty = "";
      this.editingTitle = "";
      this.pendingScanCode = "";
      this.pendingScanIndex = -1;
    },
    openScanQtyPopup(code, targetIndex) {
      this.editingFnsku = code;
      this.editingQty = "";
      this.editingOldQty = "1";
      this.editingTitle = code;
      this.qtyPopupMode = "scanAdd";
      this.pendingScanCode = code;
      this.pendingScanIndex = targetIndex;
      this.qtyPopupVisible = true;
      this.qtyInputFocus = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.qtyInputFocus = true;
        }, 50);
      });
    },
    getCloudAPI() {
      if (!this.cloudApi) {
        this.cloudApi = common_vendor.tr.importObject("CloudAPI");
      }
      return this.cloudApi;
    },
    normalizeSkuItem(raw = {}) {
      return {
        sku: String(raw.sku || raw.fnsku || ""),
        fnsku: String(raw.fnsku || ""),
        number: Number(raw.number || 0)
      };
    },
    scrollToIndex(index) {
      if (index < 0 || index >= this.skuList.length)
        return;
      this.scrollIntoViewId = `sku-row-${index}`;
      this.highlightedIndex = index;
      if (this.highlightTimer)
        clearTimeout(this.highlightTimer);
      this.highlightTimer = setTimeout(() => {
        this.highlightedIndex = -1;
        this.highlightTimer = null;
      }, 2e3);
      setTimeout(() => {
        this.scrollIntoViewId = "";
      }, 400);
    },
    isBatchSkuQRCode(content) {
      return /^[^,;|]+,\d+(?:;[^,;|]+,\d+)*\|-?\d+(?:\.\d+)?$/.test(content);
    },
    async handleBarcodeScan(code, qty, targetIndex = this.pendingScanIndex) {
      if (targetIndex >= 0) {
        const target = this.skuList[targetIndex];
        if (target) {
          target.number = Number(target.number || 0) + qty;
          this.scrollToIndex(targetIndex);
        }
        return;
      }
      try {
        const cloudApi = this.getCloudAPI();
        const sku = await cloudApi.querySku(code);
        this.skuList.push({
          sku: String(sku || code),
          fnsku: code,
          number: qty
        });
        this.scrollToIndex(this.skuList.length - 1);
      } catch (error) {
        common_vendor.index.showToast({ title: "查询SKU失败", icon: "none" });
      }
    },
    async handleBatchQrScan(content) {
      try {
        const cloudApi = this.getCloudAPI();
        const list = await cloudApi.querySkuList(content);
        if (!Array.isArray(list) || !list.length) {
          common_vendor.index.showToast({ title: "未查询到产品", icon: "none" });
          return;
        }
        const normalized = list.map(this.normalizeSkuItem).filter((item) => item.fnsku);
        let lastAffectedIndex = -1;
        normalized.forEach((incoming) => {
          const idx = this.skuList.findIndex(
            (item) => String(item.fnsku || "").trim() === String(incoming.fnsku || "").trim()
          );
          if (idx >= 0) {
            this.skuList[idx].number = Number(this.skuList[idx].number || 0) + Number(incoming.number || 0);
            lastAffectedIndex = idx;
            return;
          }
          this.skuList.push({
            sku: incoming.sku,
            fnsku: incoming.fnsku,
            number: Number(incoming.number || 0)
          });
          lastAffectedIndex = this.skuList.length - 1;
        });
        this.$nextTick(() => {
          this.scrollToIndex(lastAffectedIndex >= 0 ? lastAffectedIndex : this.skuList.length - 1);
        });
      } catch (error) {
        common_vendor.index.showToast({ title: "批量查询失败", icon: "none" });
      }
    },
    async confirmQty() {
      const qty = Number(this.editingQty);
      if (!qty || qty <= 0) {
        common_vendor.index.showToast({ title: "数量无效", icon: "none" });
        return;
      }
      if (this.qtyPopupMode === "scanAdd") {
        const code = this.pendingScanCode;
        const targetIndex = this.pendingScanIndex;
        this.closeQtyPopup();
        await this.handleBarcodeScan(code, qty, targetIndex);
        return;
      }
      const target = this.skuList.find((item) => item.fnsku === this.editingFnsku);
      if (target)
        target.number = qty;
      this.closeQtyPopup();
    },
    scanGoods() {
      common_vendor.index.scanCode({
        scanType: ["barCode", "qrCode"],
        success: async (res) => {
          const content = String(res.result || "").trim();
          if (!content) {
            common_vendor.index.showToast({ title: "扫码内容为空", icon: "none" });
            return;
          }
          const scanType = String(res.scanType || "").toUpperCase();
          const isQr = scanType.includes("QR") || this.isBatchSkuQRCode(content);
          if (isQr) {
            if (this.isBatchSkuQRCode(content)) {
              await this.handleBatchQrScan(content);
              return;
            }
            common_vendor.index.showToast({ title: "二维码格式不支持", icon: "none" });
            return;
          }
          const existingIndex = this.skuList.findIndex((item) => String(item.fnsku || "").trim() === content);
          this.openScanQtyPopup(content, existingIndex);
        },
        fail: () => {
          common_vendor.index.showToast({ title: "扫码失败", icon: "none" });
        }
      });
    },
    clearAll() {
      this.skuList = [];
      this.weight = "";
    },
    buildPrintQrData() {
      const items = this.skuList.map((item) => {
        const fnsku = String(item.fnsku || item.sku || "").trim();
        const number = Number(item.number || 0);
        if (!fnsku || !number)
          return "";
        return `${fnsku},${number}`;
      }).filter(Boolean);
      return `${items.join(";")}|${String(this.weight || "").trim()}`;
    },
    async ensurePrinterConnected() {
      if (!this.lpapi || !this.printContext)
        return false;
      if (this.lpapi.isPrinterOpened())
        return true;
      if (!this.connectedDeviceId) {
        const cached = this.getCachedPrinter();
        if (!cached)
          return false;
        this.connectedDeviceId = cached.deviceId;
        this.connectedDevice = cached.name;
      }
      try {
        const res = await this.lpapi.openPrinter({
          name: this.connectedDevice,
          deviceId: this.connectedDeviceId,
          tryTimes: 5,
          connectionStateChange: (state) => {
            if (state && state.connected === false) {
              this.connectedDevice = "";
              this.connectedDeviceId = "";
            }
          }
        });
        if (res && res.statusCode === 0) {
          this.saveCachedPrinter({
            deviceId: this.connectedDeviceId,
            name: this.connectedDevice
          });
        }
        return !!(res && res.statusCode === 0);
      } catch (error) {
        return false;
      }
    },
    async waitCanvasReady(jobInfo) {
      if (!jobInfo || !jobInfo.canvas)
        return;
      await new Promise((resolve) => setTimeout(resolve, 100));
    },
    async drawPackingLabel(weight) {
      const api = this.lpapi;
      const dataLength = this.skuList.length;
      const QRdata = this.buildPrintQrData();
      const jobInfo = await api.startJob({
        context: this.printContext,
        width: 50,
        height: 80,
        orientation: 0,
        isPreview: false
      });
      await this.waitCanvasReady(jobInfo);
      await api.draw2DQRCode({
        text: QRdata,
        x: 5,
        y: 3,
        width: 30,
        eccLevel: 1
      });
      await api.drawText({
        text: String(weight || ""),
        x: 38,
        y: 15,
        width: 10,
        height: 10,
        autoReturn: false
      });
      switch (true) {
        case dataLength === 1:
          await api.drawText({
            text: String(this.skuList[0].sku || ""),
            x: 3,
            y: 35,
            width: 47,
            height: 12,
            autoReturn: false
          });
          await api.drawText({
            text: String(this.skuList[0].number || ""),
            x: 25,
            y: 50,
            width: 20,
            height: 10,
            autoReturn: false
          });
          break;
        case dataLength === 2:
          await api.drawText({
            text: String(this.skuList[0].sku || ""),
            x: 3,
            y: 33,
            width: 47,
            height: 10,
            autoReturn: false
          });
          await api.drawText({
            text: String(this.skuList[0].number || ""),
            x: 25,
            y: 43,
            width: 20,
            height: 8
          });
          await api.drawText({
            text: String(this.skuList[1].sku || ""),
            x: 3,
            y: 51,
            width: 47,
            height: 10,
            autoReturn: false
          });
          await api.drawText({
            text: String(this.skuList[1].number || ""),
            x: 25,
            y: 60,
            width: 20,
            height: 8
          });
          break;
        case dataLength >= 3: {
          let poy = 33;
          const fontHeight = parseInt(46 / dataLength, 10);
          for (let i = 0; i < dataLength; i += 1) {
            await api.drawText({
              text: String(this.skuList[i].sku || ""),
              x: 2,
              y: poy,
              width: 41,
              height: fontHeight,
              autoReturn: false,
              fontStyle: 1
            });
            await api.drawText({
              text: String(this.skuList[i].number || ""),
              x: 44,
              y: poy,
              width: 5,
              height: fontHeight,
              autoReturn: false,
              fontStyle: 1
            });
            poy += fontHeight;
          }
          break;
        }
      }
      return api.commitJob({
        gapType: 2,
        printDarkness: 8,
        printSpeed: 3
      });
    },
    printOptions() {
      if (this.printBusy)
        return;
      const weight = String(this.weight || "").trim();
      if (!weight) {
        common_vendor.index.showToast({ title: "请先输入重量", icon: "none" });
        return;
      }
      if (!this.skuList.length) {
        common_vendor.index.showToast({ title: "产品列表为空", icon: "none" });
        return;
      }
      if (!this.lpapi || !this.printContext) {
        common_vendor.index.showToast({ title: "打印模块未就绪", icon: "none" });
        return;
      }
      this.handlePrint(weight);
    },
    async handlePrint(weight) {
      if (this.printBusy)
        return;
      this.clearPrintIdleTimer();
      const needsReconnect = !this.lpapi.isPrinterOpened();
      this.setPrintBusy(true, needsReconnect ? "正在连接打印机..." : "正在准备打印...");
      try {
        const connected = await this.ensurePrinterConnected();
        if (!connected) {
          common_vendor.index.showToast({ title: "未找到可用打印机，请先手动连接一次", icon: "none" });
          return;
        }
        this.setPrintBusy(true, "正在打印...");
        const res = await this.drawPackingLabel(weight);
        if (res && res.statusCode === 0) {
          this.scheduleAutoClosePrinter();
          common_vendor.index.showToast({ title: "打印成功", icon: "success" });
          return;
        }
        common_vendor.index.showToast({ title: res && res.errMsg || "打印失败", icon: "none" });
      } catch (error) {
        common_vendor.index.showToast({ title: "打印失败", icon: "none" });
      } finally {
        this.setPrintBusy(false);
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  (_easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2)();
}
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
if (!Math) {
  (_easycom_uni_swipe_action_item + _easycom_uni_swipe_action)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.connectedDevice ? `已连接：${$data.connectedDevice}` : "蓝牙未连接"),
    b: $data.connectedDevice ? 1 : "",
    c: common_vendor.o((...args) => $options.openPrinterDrawer && $options.openPrinterDrawer(...args)),
    d: common_vendor.t($options.skuCount),
    e: common_vendor.t($options.skuSortLabel),
    f: common_vendor.o((...args) => $options.toggleSkuSort && $options.toggleSkuSort(...args)),
    g: common_vendor.t($options.totalQty),
    h: common_vendor.f($data.skuList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.sku),
        b: common_vendor.t(item.fnsku),
        c: common_vendor.t(item.number),
        d: `sku-row-${index}`,
        e: $data.highlightedIndex === index ? 1 : "",
        f: common_vendor.o(($event) => $options.openQtyPopup(item), `${item.fnsku}-${index}`),
        g: `${item.fnsku}-${index}`,
        h: common_vendor.o(($event) => $options.onSwipeClick($event, item.fnsku), `${item.fnsku}-${index}`),
        i: "c1e98a70-1-" + i0 + ",c1e98a70-0"
      };
    }),
    i: common_vendor.p({
      ["right-options"]: $data.deleteOptions
    }),
    j: $data.scrollIntoViewId,
    k: $data.weight,
    l: common_vendor.o(($event) => $data.weight = $event.detail.value),
    m: common_vendor.o((...args) => $options.scanGoods && $options.scanGoods(...args)),
    n: common_vendor.o((...args) => $options.clearAll && $options.clearAll(...args)),
    o: common_vendor.o((...args) => $options.printOptions && $options.printOptions(...args)),
    p: $data.drawerVisible
  }, $data.drawerVisible ? {
    q: common_vendor.o(($event) => $data.drawerVisible = false)
  } : {}, {
    r: common_vendor.t($data.isScanning ? "扫描中" : "刷新"),
    s: common_vendor.o((...args) => $options.refreshPrinters && $options.refreshPrinters(...args)),
    t: !$data.btDevices.length
  }, !$data.btDevices.length ? {
    v: common_vendor.t($data.isScanning ? "正在搜索打印机..." : "未发现可用打印机")
  } : {}, {
    w: common_vendor.f($data.btDevices, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.rssiText),
        c: common_vendor.t($data.connectedDeviceId === item.deviceId ? "已连接" : "连接"),
        d: item.deviceId,
        e: common_vendor.o(($event) => $options.connectDevice(item), item.deviceId)
      };
    }),
    x: $data.drawerVisible ? 1 : "",
    y: $data.qtyPopupVisible
  }, $data.qtyPopupVisible ? {
    z: common_vendor.o((...args) => $options.closeQtyPopup && $options.closeQtyPopup(...args))
  } : {}, {
    A: $data.qtyPopupVisible
  }, $data.qtyPopupVisible ? {
    B: common_vendor.t($data.qtyPopupMode === "scanAdd" ? `输入数量：${$data.editingTitle}` : `修改 ${$data.editingTitle}`),
    C: `${$data.editingOldQty}`,
    D: $data.qtyInputFocus,
    E: common_vendor.o(($event) => $data.qtyInputFocus = false),
    F: $data.editingQty,
    G: common_vendor.o(($event) => $data.editingQty = $event.detail.value),
    H: common_vendor.o((...args) => $options.closeQtyPopup && $options.closeQtyPopup(...args)),
    I: common_vendor.o((...args) => $options.confirmQty && $options.confirmQty(...args))
  } : {}, {
    J: $data.printBusy
  }, $data.printBusy ? {
    K: common_vendor.t($data.printBusyText || "处理中...")
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/packingLoc/index.js.map
