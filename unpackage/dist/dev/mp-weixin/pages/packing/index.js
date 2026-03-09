"use strict";
const common_vendor = require("../../common/vendor.js");
const PACKING_CACHE_KEY = "packing_cache";
const _sfc_main = {
  onLoad() {
    this.loadCache();
  },
  onUnload() {
    if (this.highlightTimer) {
      clearTimeout(this.highlightTimer);
      this.highlightTimer = null;
    }
  },
  data() {
    return {
      drawerVisible: false,
      connectedDevice: "",
      weight: "",
      boxId: "",
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
      btDevices: [
        { id: 1, name: "Printer-BT-01", rssi: "-58dBm" },
        { id: 2, name: "Scale-BT-07", rssi: "-65dBm" },
        { id: 3, name: "Scanner-BT-19", rssi: "-72dBm" }
      ],
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
    boxId() {
      this.saveCache();
    },
    weight() {
      this.saveCache();
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
      if (typeof cache.boxId === "string")
        this.boxId = cache.boxId;
      if (typeof cache.weight === "string")
        this.weight = cache.weight;
    },
    saveCache() {
      common_vendor.index.setStorageSync(PACKING_CACHE_KEY, {
        skuList: this.skuList,
        boxId: this.boxId,
        weight: this.weight
      });
    },
    goBack() {
      if (getCurrentPages().length > 1) {
        common_vendor.index.navigateBack({ delta: 1 });
        return;
      }
      common_vendor.index.redirectTo({ url: "/pages/index/index" });
    },
    connectDevice(name) {
      this.connectedDevice = name;
      this.drawerVisible = false;
      common_vendor.index.showToast({ title: "连接成功", icon: "success" });
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
    isBoxQRCode(content) {
      return /^[A-Z]+_\d+$/.test(content);
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
    async handleBoxQrScan(content) {
      this.skuList = [];
      this.boxId = content;
      try {
        const cloudApi = this.getCloudAPI();
        const boxRes = await cloudApi.queryBox(content);
        if (!boxRes || !boxRes.skuList) {
          return;
        }
        const loadedList = Array.isArray(boxRes.skuList) ? boxRes.skuList.map(this.normalizeSkuItem).filter((item) => item.fnsku) : [];
        this.skuList = loadedList;
        this.weight = boxRes.weight ? String(boxRes.weight) : "";
        this.$nextTick(() => {
          this.scrollToIndex(this.skuList.length - 1);
        });
      } catch (error) {
        common_vendor.index.showToast({ title: "箱号查询失败", icon: "none" });
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
          const isQr = scanType.includes("QR") || this.isBatchSkuQRCode(content) || this.isBoxQRCode(content);
          if (isQr) {
            if (this.isBatchSkuQRCode(content)) {
              await this.handleBatchQrScan(content);
              return;
            }
            if (this.isBoxQRCode(content)) {
              await this.handleBoxQrScan(content);
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
    async updateData() {
      const boxid = String(this.boxId || "").trim();
      const weight = String(this.weight || "").trim();
      if (!boxid) {
        common_vendor.index.showToast({ title: "没有箱号", icon: "none" });
        return;
      }
      if (!weight) {
        common_vendor.index.showToast({ title: "请先输入重量", icon: "none" });
        return;
      }
      if (!this.skuList.length) {
        common_vendor.index.showToast({ title: "产品列表为空", icon: "none" });
        return;
      }
      const skuList = this.skuList.map((item) => ({
        fnsku: String(item.fnsku || "").trim(),
        number: Number(item.number || 0)
      }));
      const hasInvalid = skuList.some((item) => !item.fnsku || !item.number || item.number <= 0);
      if (hasInvalid) {
        common_vendor.index.showToast({ title: "存在无效SKU数量", icon: "none" });
        return;
      }
      try {
        const cloudApi = this.getCloudAPI();
        const res = await cloudApi.updateBox(boxid, skuList, weight);
        if (res === 1) {
          common_vendor.index.showToast({ title: "更新成功", icon: "success" });
          return;
        }
        if (res === 0) {
          common_vendor.index.showToast({ title: "新增成功", icon: "success" });
          return;
        }
        common_vendor.index.showToast({ title: "提交完成", icon: "success" });
      } catch (error) {
        common_vendor.index.showToast({ title: "更新失败", icon: "none" });
      }
    },
    printOptions() {
      common_vendor.index.showToast({ title: "打印", icon: "none" });
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
    a: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    b: common_vendor.t($data.connectedDevice ? `已连接：${$data.connectedDevice}` : "蓝牙未连接"),
    c: $data.connectedDevice ? 1 : "",
    d: common_vendor.o(($event) => $data.drawerVisible = true),
    e: common_vendor.t($options.skuCount),
    f: common_vendor.t($options.skuSortLabel),
    g: common_vendor.o((...args) => $options.toggleSkuSort && $options.toggleSkuSort(...args)),
    h: common_vendor.t($options.totalQty),
    i: common_vendor.f($data.skuList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.sku),
        b: common_vendor.t(item.fnsku),
        c: common_vendor.t(item.number),
        d: `sku-row-${index}`,
        e: $data.highlightedIndex === index ? 1 : "",
        f: common_vendor.o(($event) => $options.openQtyPopup(item), `${item.fnsku}-${index}`),
        g: `${item.fnsku}-${index}`,
        h: common_vendor.o(($event) => $options.onSwipeClick($event, item.fnsku), `${item.fnsku}-${index}`),
        i: "3ea02ca4-1-" + i0 + ",3ea02ca4-0"
      };
    }),
    j: common_vendor.p({
      ["right-options"]: $data.deleteOptions
    }),
    k: $data.scrollIntoViewId,
    l: $data.weight,
    m: common_vendor.o(($event) => $data.weight = $event.detail.value),
    n: $data.boxId,
    o: common_vendor.o(($event) => $data.boxId = $event.detail.value),
    p: common_vendor.o((...args) => $options.scanGoods && $options.scanGoods(...args)),
    q: common_vendor.o((...args) => $options.clearAll && $options.clearAll(...args)),
    r: common_vendor.o((...args) => $options.updateData && $options.updateData(...args)),
    s: common_vendor.o((...args) => $options.printOptions && $options.printOptions(...args)),
    t: $data.drawerVisible
  }, $data.drawerVisible ? {
    v: common_vendor.o(($event) => $data.drawerVisible = false)
  } : {}, {
    w: common_vendor.f($data.btDevices, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.rssi),
        c: item.id,
        d: common_vendor.o(($event) => $options.connectDevice(item.name), item.id)
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
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/packing/index.js.map
