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
      boxes: []
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
    promptExportFileName() {
      return new Promise((resolve, reject) => {
        common_vendor.index.showModal({
          title: "导出文件名",
          editable: true,
          placeholderText: `默认：${this.getTodayString()}`,
          success: (res) => {
            if (!res.confirm) {
              reject(new Error("cancel"));
              return;
            }
            const inputName = this.sanitizeFileName(res.content || "");
            resolve(inputName || this.getTodayString());
          },
          fail: reject
        });
      });
    },
    async exportCsv(baseName) {
      if (!this.boxes.length) {
        common_vendor.index.showToast({ title: "暂无可导出数据", icon: "none" });
        return false;
      }
      try {
        const finalBaseName = this.sanitizeFileName(baseName || "");
        const safeBaseName = finalBaseName || this.getTodayString();
        const fileName = `${safeBaseName}.csv`;
        const csv = "\uFEFF" + this.buildCsvContent();
        if (typeof common_vendor.index.getFileSystemManager === "function" && common_vendor.index.env && common_vendor.index.env.USER_DATA_PATH) {
          const filePath = `${common_vendor.index.env.USER_DATA_PATH}/${fileName}`;
          await new Promise((resolve, reject) => {
            common_vendor.index.getFileSystemManager().writeFile({
              filePath,
              data: csv,
              encoding: "utf8",
              success: resolve,
              fail: reject
            });
          });
          common_vendor.index.showToast({ title: "导出成功", icon: "success" });
          return true;
        }
        await new Promise((resolve, reject) => {
          common_vendor.index.setClipboardData({
            data: csv,
            success: resolve,
            fail: reject
          });
        });
        common_vendor.index.showToast({ title: "已复制CSV到剪贴板", icon: "none" });
        return true;
      } catch (error) {
        if (String(error && error.message) === "cancel") {
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
    operateOptions() {
      common_vendor.index.showActionSheet({
        itemList: ["导出并出库", "导出", "出库", "入库"],
        success: async (res) => {
          if (res.tapIndex === 0) {
            let fileName = "";
            try {
              fileName = await this.promptExportFileName();
            } catch (error) {
              return;
            }
            await this.changeWarehouseState("out");
            await this.exportCsv(fileName);
            return;
          }
          if (res.tapIndex === 1) {
            try {
              const fileName = await this.promptExportFileName();
              await this.exportCsv(fileName);
            } catch (error) {
              return;
            }
            return;
          }
          if (res.tapIndex === 2) {
            await this.changeWarehouseState("out");
            return;
          }
          if (res.tapIndex === 3) {
            await this.changeWarehouseState("in");
          }
        }
      });
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
    g: common_vendor.o((...args) => $options.operateOptions && $options.operateOptions(...args)),
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
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shipping/index.js.map
