"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      menus: [
        {
          title: "装箱",
          desc: "扫码装箱",
          path: "/pages/packing/index"
        },
        {
          title: "发货",
          desc: "扫描发货",
          path: "/pages/shipping/index"
        },
        {
          title: "装箱",
          desc: "扫码装箱（旧版）",
          path: "/pages/packingLoc/index"
        },
        {
          title: "搜索",
          desc: "库存查询",
          path: "/pages/search/index"
        }
      ]
    };
  },
  methods: {
    go(path) {
      common_vendor.index.navigateTo({ url: path });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.menus, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.desc),
        c: item.path,
        d: common_vendor.o(($event) => $options.go(item.path), item.path)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
