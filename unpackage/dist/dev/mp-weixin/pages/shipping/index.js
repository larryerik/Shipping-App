"use strict";
const common_vendor = require("../../common/vendor.js");
const SHIPPING_CACHE_KEY = "shipping_cache";
const _sfc_main = {
  onLoad() {
    this.loadCache();
  },
  onHide() {
    this.saveCache();
  },
  onUnload() {
    this.saveCache();
  },
  data() {
    return {
      detailVisible: false,
      currentBox: { boxNo: "", details: [] },
      boxes: [],
      operationVisible: false,
      exportVisible: false,
      exportAction: "",
      exportFileName: ""
    };
  },
  watch: {
    boxes: {
      deep: true,
      handler() {
        this.saveCache();
      }
    }
  },
  computed: {
    totalBox() {
      return this.boxes.length;
    },
    totalQty() {
      return this.boxes.reduce((sum, item) => sum + Number(item.qty || 0), 0);
    },
    totalWeight() {
      const n = this.boxes.reduce((sum, item) => sum + Number(item.weight || 0), 0);
      return n.toFixed(1);
    }
  },
  methods: {
    loadCache() {
      const cache = common_vendor.index.getStorageSync(SHIPPING_CACHE_KEY);
      if (!cache || typeof cache !== "object")
        return;
      if (!Array.isArray(cache.boxes))
        return;
      this.boxes = cache.boxes.map((item) => ({
        id: String(item.id || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
        qty: Number(item.qty || 0),
        weight: Number(item.weight || 0),
        boxNo: String(item.boxNo || ""),
        details: Array.isArray(item.details) ? item.details.map((line) => ({
          sku: String(line.sku || ""),
          fnsku: String(line.fnsku || ""),
          qty: Number(line.qty || 0)
        })).filter((line) => line.sku) : []
      }));
    },
    saveCache() {
      common_vendor.index.setStorageSync(SHIPPING_CACHE_KEY, {
        boxes: this.boxes
      });
    },
    getCloudAPI() {
      if (!this.cloudApi) {
        this.cloudApi = common_vendor.tr.importObject("CloudAPI");
      }
      return this.cloudApi;
    },
    isSkuListQrCode(content) {
      return /^[^,;|]+,\d+(?:;[^,;|]+,\d+)*\|-?\d+(?:\.\d+)?$/.test(content);
    },
    isBoxQrCode(content) {
      return /^[A-Za-z0-9]+_\d+$/.test(content);
    },
    normalizeSkuItem(raw = {}) {
      return {
        sku: String(raw.sku || raw.fnsku || ""),
        fnsku: String(raw.fnsku || ""),
        qty: Number(raw.number || 0)
      };
    },
    toPound(weight) {
      return (Number(weight || 0) * 2.20462).toFixed(2);
    },
    escapeCsvCell(value) {
      const str = String(value == null ? "" : value);
      if (/[",\r\n]/.test(str)) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    },
    buildCsvContent() {
      const rows = [["序号", "sku", "fnsku", "数量", "重量", "磅重", "箱号"]];
      this.boxes.forEach((box, boxIndex) => {
        const details = Array.isArray(box.details) && box.details.length ? box.details : [{ sku: "", fnsku: "", qty: "" }];
        const weight = Number(box.weight || 0);
        const pound = this.toPound(weight);
        details.forEach((line, lineIndex) => {
          rows.push([
            boxIndex + 1,
            line.sku === line.fnsku ? "" : line.sku,
            line.fnsku || "",
            line.qty == null ? "" : line.qty,
            lineIndex === 0 ? weight : "",
            lineIndex === 0 ? pound : "",
            lineIndex === 0 ? box.boxNo || "" : ""
          ]);
        });
      });
      return rows.map((row) => row.map((cell) => this.escapeCsvCell(cell)).join(",")).join("\r\n");
    },
    getTodayString() {
      const now = /* @__PURE__ */ new Date();
      const y = now.getFullYear();
      const m = String(now.getMonth() + 1).padStart(2, "0");
      const d = String(now.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    },
    sanitizeFileName(name) {
      const trimmed = String(name || "").trim();
      const noExt = trimmed.replace(/\.csv$/i, "");
      return noExt.replace(/[\\/:*?"<>|]/g, "_").trim();
    },
    isCancelError(error) {
      const message = String(
        error && error.errMsg || error && error.message || error || ""
      );
      return /cancel/i.test(message);
    },
    getWeChatUserDataPath() {
      if (typeof common_vendor.wx$1 !== "undefined" && common_vendor.wx$1.env && common_vendor.wx$1.env.USER_DATA_PATH) {
        return common_vendor.wx$1.env.USER_DATA_PATH;
      }
      return "";
    },
    getWeChatFileSystemManager() {
      if (typeof common_vendor.wx$1 !== "undefined" && typeof common_vendor.wx$1.getFileSystemManager === "function") {
        return common_vendor.wx$1.getFileSystemManager();
      }
      return null;
    },
    shareFileToWeChat(filePath, fileName, options = {}) {
      const { afterSuccess } = options;
      if (typeof common_vendor.wx$1 !== "undefined" && typeof common_vendor.wx$1.shareFileMessage === "function") {
        common_vendor.wx$1.shareFileMessage({
          filePath,
          fileName,
          success: async () => {
            if (typeof afterSuccess === "function") {
              try {
                await afterSuccess();
              } catch (error) {
                common_vendor.index.__f__("error", "at pages/shipping/index.vue:247", "分享成功后的处理失败", error);
              }
            }
          },
          fail: (error) => {
            common_vendor.index.__f__("error", "at pages/shipping/index.vue:252", "微信文件分享失败", error);
            if (this.isCancelError(error)) {
              return;
            }
            common_vendor.index.showToast({ title: "文件分享失败", icon: "none" });
          }
        });
        return true;
      }
      return false;
    },
    createWeChatShareFile(baseName) {
      const safeBaseName = this.sanitizeFileName(baseName || "") || this.getTodayString();
      const fileName = `${safeBaseName}.csv`;
      const csv = "\uFEFF" + this.buildCsvContent();
      const fileSystemManager = this.getWeChatFileSystemManager();
      const userDataPath = this.getWeChatUserDataPath();
      if (!fileSystemManager || !userDataPath) {
        throw new Error("unsupported");
      }
      const filePath = `${userDataPath}/${fileName}`;
      fileSystemManager.writeFileSync(filePath, csv, "utf8");
      return { filePath, fileName };
    },
    exportCsv(baseName, options = {}) {
      if (!this.boxes.length) {
        common_vendor.index.showToast({ title: "暂无可导出数据", icon: "none" });
        return false;
      }
      try {
        const { filePath, fileName } = this.createWeChatShareFile(baseName);
        return this.shareFileToWeChat(filePath, fileName, options);
        common_vendor.index.showToast({ title: "仅支持微信小程序导出分享", icon: "none" });
        return false;
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/shipping/index.vue:290", "导出文件失败", error);
        if (this.isCancelError(error)) {
          return false;
        }
        common_vendor.index.showToast({ title: "导出失败", icon: "none" });
        return false;
      }
    },
    getValidBoxNoList() {
      const list = this.boxes.map((item) => String(item.boxNo || "").trim()).filter(Boolean);
      return [...new Set(list)];
    },
    async changeWarehouseState(action) {
      const boxNoList = this.getValidBoxNoList();
      if (!boxNoList.length) {
        common_vendor.index.showToast({ title: "没有可操作的箱号", icon: "none" });
        return false;
      }
      const cloudApi = this.getCloudAPI();
      const isOut = action === "out";
      try {
        common_vendor.index.showLoading({ title: isOut ? "出库中..." : "入库中...", mask: true });
        const res = isOut ? await cloudApi.outWarehouse(boxNoList) : await cloudApi.toWarehouse(boxNoList);
        common_vendor.index.hideLoading();
        if (res && (res.code === 0 || res.code === 207)) {
          const successText = isOut ? "出库完成" : "入库完成";
          const updated = Number(res.updated || 0);
          common_vendor.index.showToast({ title: `${successText}(${updated})`, icon: "none" });
          return true;
        }
        common_vendor.index.showToast({ title: res && res.message || "操作失败", icon: "none" });
        return false;
      } catch (error) {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({ title: isOut ? "出库失败" : "入库失败", icon: "none" });
        return false;
      }
    },
    makeBoxRecord({ boxNo = "", weight = 0, skuList = [] }) {
      const details = Array.isArray(skuList) ? skuList.map(this.normalizeSkuItem).filter((item) => item.sku) : [];
      const qty = details.reduce((sum, item) => sum + Number(item.qty || 0), 0);
      return {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        qty,
        weight: Number(weight || 0),
        boxNo: String(boxNo || ""),
        details
      };
    },
    upsertBoxByBoxNo(record) {
      this.boxes.push(record);
    },
    async handleSkuListQr(content) {
      const cloudApi = this.getCloudAPI();
      const list = await cloudApi.querySkuList(content);
      if (!Array.isArray(list) || !list.length) {
        common_vendor.index.showToast({ title: "未查询到产品", icon: "none" });
        return;
      }
      const weightStr = String(content).split("|")[1] || "0";
      const record = this.makeBoxRecord({
        boxNo: "",
        weight: Number(weightStr),
        skuList: list
      });
      this.upsertBoxByBoxNo(record);
    },
    async handleBoxQr(content) {
      const cloudApi = this.getCloudAPI();
      const boxRes = await cloudApi.queryBox(content);
      if (!boxRes || !Array.isArray(boxRes.skuList) || !boxRes.skuList.length) {
        common_vendor.index.showToast({ title: "箱号无数据", icon: "none" });
        return;
      }
      const record = this.makeBoxRecord({
        boxNo: content,
        weight: Number(boxRes.weight || 0),
        skuList: boxRes.skuList
      });
      this.upsertBoxByBoxNo(record);
    },
    async scanBox() {
      common_vendor.index.scanCode({
        scanType: ["qrCode", "barCode"],
        success: async (res) => {
          const content = String(res.result || "").trim();
          if (!content) {
            common_vendor.index.showToast({ title: "扫码内容为空", icon: "none" });
            return;
          }
          try {
            if (this.isSkuListQrCode(content)) {
              await this.handleSkuListQr(content);
              return;
            }
            if (this.isBoxQrCode(content)) {
              await this.handleBoxQr(content);
              return;
            }
            common_vendor.index.showToast({ title: "二维码格式不支持", icon: "none" });
          } catch (error) {
            common_vendor.index.showToast({ title: "扫码处理失败", icon: "none" });
          }
        },
        fail: () => {
          common_vendor.index.showToast({ title: "扫码失败", icon: "none" });
        }
      });
    },
    removeBox(id) {
      this.boxes = this.boxes.filter((item) => item.id !== id);
    },
    clearAll() {
      this.boxes = [];
    },
    showBoxDetail(item) {
      this.currentBox = item;
      this.detailVisible = true;
    },
    openOperatePanel() {
      this.operationVisible = true;
    },
    closeOperatePanel() {
      this.operationVisible = false;
    },
    prepareExport(action) {
      this.exportAction = action;
      this.exportFileName = this.getTodayString();
      this.operationVisible = false;
      this.exportVisible = true;
    },
    closeExportPanel() {
      this.exportVisible = false;
      this.exportAction = "";
    },
    submitExport() {
      const fileName = this.sanitizeFileName(this.exportFileName) || this.getTodayString();
      const action = this.exportAction;
      this.closeExportPanel();
      if (action === "export-and-out") {
        this.exportCsv(fileName, {
          afterSuccess: () => this.changeWarehouseState("out")
        });
        return;
      }
      this.exportCsv(fileName);
    },
    async handleWarehouseTap(action) {
      this.closeOperatePanel();
      await this.changeWarehouseState(action);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.boxes, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item.qty),
        c: common_vendor.t(item.weight),
        d: common_vendor.t(item.boxNo || "-"),
        e: common_vendor.o(($event) => $options.removeBox(item.id), item.id),
        f: item.id,
        g: common_vendor.o(($event) => $options.showBoxDetail(item), item.id)
      };
    }),
    b: common_vendor.t($options.totalBox),
    c: common_vendor.t($options.totalQty),
    d: common_vendor.t($options.totalWeight),
    e: common_vendor.o((...args) => $options.scanBox && $options.scanBox(...args)),
    f: common_vendor.o((...args) => $options.clearAll && $options.clearAll(...args)),
    g: common_vendor.o((...args) => $options.openOperatePanel && $options.openOperatePanel(...args)),
    h: $data.detailVisible
  }, $data.detailVisible ? {
    i: common_vendor.o(($event) => $data.detailVisible = false)
  } : {}, {
    j: $data.detailVisible
  }, $data.detailVisible ? common_vendor.e({
    k: common_vendor.t($data.currentBox.boxNo || "无箱号"),
    l: $data.currentBox.details && $data.currentBox.details.length
  }, $data.currentBox.details && $data.currentBox.details.length ? {
    m: common_vendor.f($data.currentBox.details, (line, idx, i0) => {
      return {
        a: common_vendor.t(line.sku),
        b: common_vendor.t(line.qty),
        c: `${line.sku}-${idx}`
      };
    })
  } : {}, {
    n: common_vendor.o(($event) => $data.detailVisible = false)
  }) : {}, {
    o: $data.operationVisible
  }, $data.operationVisible ? {
    p: common_vendor.o((...args) => $options.closeOperatePanel && $options.closeOperatePanel(...args))
  } : {}, {
    q: $data.operationVisible
  }, $data.operationVisible ? {
    r: common_vendor.o(($event) => $options.prepareExport("export-and-out")),
    s: common_vendor.o(($event) => $options.prepareExport("export")),
    t: common_vendor.o(($event) => $options.handleWarehouseTap("out")),
    v: common_vendor.o(($event) => $options.handleWarehouseTap("in")),
    w: common_vendor.o((...args) => $options.closeOperatePanel && $options.closeOperatePanel(...args))
  } : {}, {
    x: $data.exportVisible
  }, $data.exportVisible ? {
    y: common_vendor.o((...args) => $options.closeExportPanel && $options.closeExportPanel(...args))
  } : {}, {
    z: $data.exportVisible
  }, $data.exportVisible ? {
    A: $data.exportFileName,
    B: common_vendor.o(($event) => $data.exportFileName = $event.detail.value),
    C: common_vendor.o((...args) => $options.closeExportPanel && $options.closeExportPanel(...args)),
    D: common_vendor.o((...args) => $options.submitExport && $options.submitExport(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shipping/index.js.map
