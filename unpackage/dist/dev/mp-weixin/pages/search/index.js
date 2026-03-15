"use strict";
const common_vendor = require("../../common/vendor.js");
const LOCAL_SEARCH_LIST_KEY = "__local_search_history";
const arrUnique = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const curIndex = arr.indexOf(arr[i]);
    const lastIndex = arr.lastIndexOf(arr[i]);
    if (curIndex !== lastIndex) {
      arr.splice(lastIndex, 1);
    }
  }
  return arr;
};
function escapeRegExp(string) {
  return string.replace(/[+?^${}()|[\]\\]/g, "\\$&");
}
const _sfc_main = {
  watch: {
    keyword(newVal) {
      if (!newVal || !String(newVal).trim()) {
        this.resetSuggestState();
        return;
      }
      this.searchDebounce();
    }
  },
  data() {
    return {
      keyword: "",
      searched: false,
      showSuggest: false,
      histories: [],
      associativeList: [],
      matchList: [],
      results: [],
      loading: false,
      loadingMore: false,
      hasMore: false,
      pageNo: 0,
      pageSize: 20,
      lastSearchedKeyword: "",
      currentWhere: "",
      suggestPageNo: 0,
      suggestPageSize: 50,
      suggestHasMore: false,
      suggestLoading: false,
      suggestKeyword: "",
      suggestRequestToken: 0,
      searchDebounce: () => {
      }
    };
  },
  created() {
    const localList = common_vendor.index.getStorageSync(LOCAL_SEARCH_LIST_KEY);
    this.histories = Array.isArray(localList) ? localList : [];
    this.searchDebounce = this.debounce(this.searchEvent, 300);
    this.mallGoodsDb = common_vendor.tr.database().collection("sku");
    this.inventoryDb = common_vendor.tr.database().collection("inventory");
    this.sameDb = common_vendor.tr.database().collection("same");
  },
  computed: {
    showSkuSuggest() {
      return this.showSuggest && !!this.keyword.trim();
    },
    showHistoryPanel() {
      return !this.showSkuSuggest && !this.searched && !this.keyword.trim();
    },
    showResultPanel() {
      return !this.showSkuSuggest && this.searched;
    },
    matchSkuRecommends() {
      return this.associativeList;
    }
  },
  methods: {
    getCloudAPI() {
      if (!this.cloudApi) {
        this.cloudApi = common_vendor.tr.importObject("CloudAPI");
      }
      return this.cloudApi;
    },
    isQrScanType(scanType) {
      return String(scanType || "").toUpperCase().includes("QR");
    },
    normalizeBoxLines(skuList) {
      if (!Array.isArray(skuList))
        return [];
      return skuList.map((line) => ({
        sku: line.sku || line.fnsku || "",
        qty: Number(line.number || 0)
      })).filter((line) => line.sku);
    },
    getResultData(res) {
      if (res && res.result && Array.isArray(res.result.data)) {
        return res.result.data;
      }
      if (res && Array.isArray(res.data)) {
        return res.data;
      }
      return [];
    },
    buildRegexText(text) {
      if (!text)
        return "";
      return escapeRegExp(String(text).trim()).replace(/\s+/g, ".*");
    },
    debounce(foo, delay) {
      let timer;
      return function(...args) {
        if (timer)
          clearTimeout(timer);
        timer = setTimeout(() => {
          foo.apply(this, args);
        }, delay || 1e3);
      };
    },
    resetSuggestState() {
      this.associativeList = [];
      this.suggestPageNo = 0;
      this.suggestHasMore = false;
      this.suggestLoading = false;
      this.suggestKeyword = "";
      this.suggestRequestToken += 1;
    },
    async loadSuggest({ reset = false } = {}) {
      const keyword = String(this.keyword || "").trim();
      if (!keyword) {
        this.resetSuggestState();
        return;
      }
      if (reset) {
        this.associativeList = [];
        this.suggestPageNo = 0;
        this.suggestHasMore = true;
        this.suggestKeyword = keyword;
      }
      if (this.suggestLoading || !reset && !this.suggestHasMore) {
        return;
      }
      const currentToken = ++this.suggestRequestToken;
      this.suggestLoading = true;
      const nextPage = this.suggestPageNo + 1;
      const skip = (nextPage - 1) * this.suggestPageSize;
      const queryKeyword = this.suggestKeyword || keyword;
      const sText = this.buildRegexText(queryKeyword);
      try {
        const res = await this.mallGoodsDb.where(`(${new RegExp(sText, "i")}.test(sku)||${new RegExp(sText, "i")}.test(fnsku))`).orderBy("sku", "asc").skip(skip).limit(this.suggestPageSize).get();
        if (currentToken !== this.suggestRequestToken || String(this.keyword || "").trim() !== queryKeyword) {
          return;
        }
        const data = this.getResultData(res);
        const merged = reset ? data : this.associativeList.concat(data);
        const dedupMap = /* @__PURE__ */ Object.create(null);
        this.associativeList = merged.filter((item) => {
          const key = String(item.sku || item.fnsku || item._id || "");
          if (!key || dedupMap[key])
            return false;
          dedupMap[key] = true;
          return true;
        });
        this.suggestPageNo = nextPage;
        this.suggestHasMore = data.length === this.suggestPageSize;
      } catch (error) {
        if (reset) {
          this.associativeList = [];
        }
        this.suggestHasMore = false;
      } finally {
        if (currentToken === this.suggestRequestToken) {
          this.suggestLoading = false;
        }
      }
    },
    searchEvent() {
      if (!this.keyword.trim()) {
        this.resetSuggestState();
        return;
      }
      this.loadSuggest({ reset: true });
    },
    onKeywordInput() {
      const currentKeyword = String(this.keyword || "").trim();
      if (currentKeyword !== this.lastSearchedKeyword) {
        this.searched = false;
      }
      this.showSuggest = true;
    },
    onKeywordBlur() {
    },
    onSuggestReachBottom() {
      if (!this.showSkuSuggest || this.suggestLoading || !this.suggestHasMore) {
        return;
      }
      this.loadSuggest();
    },
    async handleBarcodeScan(content) {
      const cloudApi = this.getCloudAPI();
      const sku = String(await cloudApi.querySku(content) || "").trim();
      if (!sku) {
        common_vendor.index.showToast({ title: "条码未匹配SKU", icon: "none" });
        return;
      }
      this.keyword = sku;
      await this.doSearch();
    },
    async handleQrCodeScan(content) {
      const cloudApi = this.getCloudAPI();
      const boxData = await cloudApi.queryBox(content);
      const lines = this.normalizeBoxLines(boxData && boxData.skuList);
      this.keyword = content;
      this.showSuggest = false;
      this.lastSearchedKeyword = content;
      this.saveHistory(content);
      this.searched = true;
      this.loading = false;
      this.loadingMore = false;
      this.currentWhere = "";
      this.pageNo = 0;
      this.hasMore = false;
      this.matchList = [];
      if (!lines.length) {
        this.results = [];
        common_vendor.index.showToast({ title: "箱号无数据", icon: "none" });
        return;
      }
      this.results = [{
        boxNo: content,
        lines
      }];
    },
    scan() {
      common_vendor.index.scanCode({
        scanType: ["qrCode", "barCode"],
        success: async (res) => {
          const content = String(res.result || "").trim();
          if (!content) {
            common_vendor.index.showToast({ title: "扫码内容为空", icon: "none" });
            return;
          }
          this.showSuggest = false;
          this.resetSuggestState();
          try {
            if (this.isQrScanType(res.scanType)) {
              await this.handleQrCodeScan(content);
              return;
            }
            await this.handleBarcodeScan(content);
          } catch (error) {
            common_vendor.index.showToast({ title: "扫码查询失败", icon: "none" });
          }
        },
        fail: () => {
          common_vendor.index.showToast({ title: "扫码失败", icon: "none" });
        }
      });
    },
    pickKeyword(value) {
      this.keyword = value;
      this.showSuggest = false;
      this.doSearch();
    },
    resetKeyword() {
      this.keyword = "";
      this.searched = false;
      this.showSuggest = false;
      this.resetSuggestState();
    },
    clearKeyword() {
      this.resetKeyword();
    },
    saveHistory(value) {
      if (!value)
        return;
      this.histories.unshift(value);
      arrUnique(this.histories);
      if (this.histories.length > 10) {
        this.histories.pop();
      }
      common_vendor.index.setStorageSync(LOCAL_SEARCH_LIST_KEY, this.histories);
    },
    clearHistories() {
      common_vendor.index.showModal({
        content: "确认清空搜索历史吗？",
        confirmText: "删除",
        confirmColor: "red",
        cancelColor: "#808080",
        success: (res) => {
          if (res.confirm) {
            this.histories = [];
            common_vendor.index.removeStorageSync(LOCAL_SEARCH_LIST_KEY);
          }
        }
      });
    },
    async fetchMatchList(regexText) {
      this.matchList = [];
      let skuJQL = "";
      const sameRes = await this.sameDb.where(`${new RegExp(regexText, "i")}.test(list)`).get();
      const sameData = this.getResultData(sameRes);
      if (!(sameData.length >= 1 && sameData.length <= 20)) {
        return skuJQL;
      }
      let skuList = [];
      for (const item of sameData) {
        if (Array.isArray(item.list)) {
          skuList = skuList.concat(item.list);
        }
      }
      this.matchList = [...new Set(skuList)].slice(0, 30);
      for (let i = 0; i < this.matchList.length; i++) {
        const safeSku = String(this.matchList[i]).replace(/"/g, '\\"');
        skuJQL += `||skuList.sku =="${safeSku}"`;
      }
      return skuJQL;
    },
    async buildWhere(keyword) {
      const regexText = this.buildRegexText(keyword);
      if (!regexText) {
        return "";
      }
      let skuJQL = "";
      try {
        skuJQL = await this.fetchMatchList(regexText);
      } catch (error) {
        this.matchList = [];
        skuJQL = "";
      }
      return `(${new RegExp(regexText, "i")}.test(skuList.sku)||${new RegExp(regexText, "i")}.test(boxid)${skuJQL})&&state==1`;
    },
    async loadResults({ reset = false } = {}) {
      if (!this.currentWhere || !reset && (!this.hasMore || this.loadingMore)) {
        return;
      }
      if (reset) {
        this.pageNo = 0;
        this.results = [];
        this.hasMore = true;
      }
      const nextPage = this.pageNo + 1;
      const skip = (nextPage - 1) * this.pageSize;
      if (nextPage === 1) {
        this.loading = true;
      } else {
        this.loadingMore = true;
      }
      const queryRes = await this.inventoryDb.where(this.currentWhere).orderBy("boxid", "asc").skip(skip).limit(this.pageSize).get();
      const data = this.getResultData(queryRes);
      const mapped = data.map((item) => ({
        boxNo: item.boxid || "-",
        lines: Array.isArray(item.skuList) ? item.skuList.map((line) => ({
          sku: line.sku || line.fnsku || "",
          qty: Number(line.number || 0)
        })) : []
      }));
      this.pageNo = nextPage;
      this.hasMore = mapped.length === this.pageSize;
      this.results = reset ? mapped : this.results.concat(mapped);
      this.loading = false;
      this.loadingMore = false;
    },
    async onResultReachBottom() {
      if (!this.searched || this.loading || this.loadingMore || !this.hasMore) {
        return;
      }
      try {
        await this.loadResults();
      } catch (error) {
        this.loadingMore = false;
        common_vendor.index.showToast({ title: "加载失败", icon: "none" });
      }
    },
    async doSearch() {
      const value = String(this.keyword || "").trim();
      if (!value) {
        common_vendor.index.showToast({ title: "请输入关键字", icon: "none" });
        return;
      }
      this.keyword = value;
      this.showSuggest = false;
      this.lastSearchedKeyword = value;
      this.saveHistory(value);
      this.searched = true;
      this.loading = true;
      this.loadingMore = false;
      try {
        this.currentWhere = await this.buildWhere(value);
        if (!this.currentWhere) {
          this.results = [];
          return;
        }
        await this.loadResults({ reset: true });
      } catch (error) {
        this.results = [];
        common_vendor.index.showToast({ title: "搜索失败", icon: "none" });
      } finally {
        this.loading = false;
        this.loadingMore = false;
      }
    },
    colorDisplay(value) {
      const keyword = String(this.keyword || "").trim();
      if (!keyword || !value) {
        return false;
      }
      const regexText = this.buildRegexText(keyword);
      const re = new RegExp(regexText, "i");
      return re.test(value);
    },
    sameColorDisplay(value) {
      if (!value) {
        return false;
      }
      return this.matchList.includes(value);
    },
    getSkuTextClass(value) {
      const isDirectHit = this.colorDisplay(value);
      return {
        "line-highlight": isDirectHit,
        "line-same-highlight": !isDirectHit && this.sameColorDisplay(value)
      };
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o([($event) => $data.keyword = $event.detail.value, (...args) => $options.onKeywordInput && $options.onKeywordInput(...args)]),
    b: common_vendor.o((...args) => $options.doSearch && $options.doSearch(...args)),
    c: common_vendor.o(($event) => $data.showSuggest = true),
    d: common_vendor.o((...args) => $options.onKeywordBlur && $options.onKeywordBlur(...args)),
    e: $data.keyword,
    f: $data.keyword
  }, $data.keyword ? {
    g: common_vendor.o((...args) => $options.clearKeyword && $options.clearKeyword(...args))
  } : {}, {
    h: common_vendor.o((...args) => $options.scan && $options.scan(...args)),
    i: common_vendor.o((...args) => $options.doSearch && $options.doSearch(...args)),
    j: $options.showSkuSuggest
  }, $options.showSkuSuggest ? common_vendor.e({
    k: common_vendor.f($options.matchSkuRecommends, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.sku),
        b: item._id || item.sku,
        c: common_vendor.o(($event) => $options.pickKeyword(item.sku), item._id || item.sku)
      };
    }),
    l: $data.suggestLoading && !$options.matchSkuRecommends.length
  }, $data.suggestLoading && !$options.matchSkuRecommends.length ? {} : !$data.suggestLoading && !$options.matchSkuRecommends.length ? {} : {}, {
    m: !$data.suggestLoading && !$options.matchSkuRecommends.length,
    n: $options.matchSkuRecommends.length
  }, $options.matchSkuRecommends.length ? common_vendor.e({
    o: $data.suggestLoading
  }, $data.suggestLoading ? {} : !$data.suggestHasMore ? {} : {}, {
    p: !$data.suggestHasMore
  }) : {}, {
    q: common_vendor.o((...args) => $options.onSuggestReachBottom && $options.onSuggestReachBottom(...args))
  }) : {}, {
    r: $options.showHistoryPanel
  }, $options.showHistoryPanel ? common_vendor.e({
    s: $data.histories.length
  }, $data.histories.length ? {
    t: common_vendor.o((...args) => $options.clearHistories && $options.clearHistories(...args))
  } : {}, {
    v: common_vendor.f($data.histories, (item, k0, i0) => {
      return {
        a: common_vendor.t(item),
        b: item,
        c: common_vendor.o(($event) => $options.pickKeyword(item), item)
      };
    }),
    w: !$data.histories.length
  }, !$data.histories.length ? {} : {}) : {}, {
    x: $options.showResultPanel
  }, $options.showResultPanel ? common_vendor.e({
    y: $data.loading
  }, $data.loading ? {} : $data.searched && !$data.results.length ? {} : {}, {
    z: $data.searched && !$data.results.length,
    A: common_vendor.f($data.results, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.boxNo),
        b: common_vendor.f(item.lines, (line, k1, i1) => {
          return {
            a: common_vendor.t(line.sku),
            b: common_vendor.n($options.getSkuTextClass(line.sku)),
            c: common_vendor.t(line.qty),
            d: line.sku
          };
        }),
        c: item.boxNo
      };
    }),
    B: $data.searched && $data.results.length
  }, $data.searched && $data.results.length ? common_vendor.e({
    C: $data.loadingMore
  }, $data.loadingMore ? {} : !$data.hasMore ? {} : {}, {
    D: !$data.hasMore
  }) : {}, {
    E: common_vendor.o((...args) => $options.onResultReachBottom && $options.onResultReachBottom(...args))
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/index.js.map
