"use strict";
const common_vendor = require("../../../common/vendor.js");
function __awaiter(thisArg, _arguments, P2, generator) {
  function adopt(value) {
    return value instanceof P2 ? value : new P2(function(resolve) {
      resolve(value);
    });
  }
  return new (P2 || (P2 = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e2) {
        reject(e2);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e2) {
        reject(e2);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e2 = new Error(message);
  return e2.name = "SuppressedError", e2.error = error, e2.suppressed = suppressed, e2;
};
function t(t4, e2, i2, n2) {
  return new (i2 || (i2 = Promise))(function(s2, r2) {
    function a2(t5) {
      try {
        h2(n2.next(t5));
      } catch (t6) {
        r2(t6);
      }
    }
    function o2(t5) {
      try {
        h2(n2.throw(t5));
      } catch (t6) {
        r2(t6);
      }
    }
    function h2(t5) {
      var e3;
      t5.done ? s2(t5.value) : (e3 = t5.value, e3 instanceof i2 ? e3 : new i2(function(t6) {
        t6(e3);
      })).then(a2, o2);
    }
    h2((n2 = n2.apply(t4, [])).next());
  });
}
"function" == typeof SuppressedError && SuppressedError;
class e {
  static formatDate(t4, e2) {
    let i2 = t4 || "yyyy-MM-dd HH:mm:ss.SSS";
    const n2 = { "y+": (e2 = e2 || /* @__PURE__ */ new Date()).getFullYear(), "M+": e2.getMonth() + 1, "d+": e2.getDate(), "h+": e2.getHours(), "H+": e2.getHours(), "m+": e2.getMinutes(), "s+": e2.getSeconds(), "q+": Math.floor((e2.getMonth() + 3) / 3), "S+": e2.getMilliseconds() };
    let s2;
    for (const t5 in n2)
      if (s2 = new RegExp(`(${t5})`).exec(i2)) {
        const e3 = `${n2[t5]}`, r2 = `00${e3}`, a2 = s2[1].length > r2.length ? 0 : r2.length - s2[1].length;
        i2 = i2.replace(s2[1], 1 === s2[1].length ? e3 : r2.substring(a2));
      }
    return i2;
  }
  static createRect(t4, e2, i2, n2) {
    return { x: t4 || 0, y: e2 || 0, width: i2, height: n2 };
  }
  static parseRect(t4) {
    if (!t4)
      return;
    t4 = t4.trim();
    const e2 = /^\[?\(?\s*([0-9.+-]+)\s*,\s*([0-9.+-]+)\s*,\s*([0-9.+-]+)\s*,\s*([0-9.+-]+)\s*\)?]?$/.exec(t4);
    return e2 ? { x: parseFloat(e2[1]), y: parseFloat(e2[2]), width: parseFloat(e2[3]), height: parseFloat(e2[4]) } : void 0;
  }
  static isInnerRect(t4, e2) {
    return t4.x >= e2.x && t4.x + t4.width <= e2.x + e2.width && t4.y >= e2.y && t4.y + t4.height <= e2.y + e2.height;
  }
  static hasIntersection(t4, e2) {
    return t4.x < e2.x + e2.width && e2.x < t4.x + t4.width && t4.y < e2.y + e2.height && e2.y < t4.y + t4.height;
  }
  static getUnionRect(t4, e2) {
    const i2 = Math.min(t4.x, e2.x), n2 = Math.min(t4.y, e2.y);
    return { x: i2, y: n2, width: Math.max(t4.x + t4.width, e2.x + e2.width) - i2, height: Math.max(t4.y + t4.height, e2.y + e2.height) - n2 };
  }
  static rotate90(t4) {
    const e2 = t4.x + 0.5 * t4.width, i2 = t4.y + 0.5 * t4.height, n2 = t4.width, s2 = t4.height;
    return t4.width > 0 && t4.height > 0 && (t4.width = s2, t4.height = n2, t4.x = e2 - 0.5 * s2, t4.y = i2 - 0.5 * n2), t4;
  }
}
var i, n, s, r, a, o, h, c, d, u;
!function(t4) {
  t4[t4.NONE = 0] = "NONE", t4[t4.ERROR = 1] = "ERROR", t4[t4.WARN = 2] = "WARN", t4[t4.INFO = 3] = "INFO", t4[t4.LOG = 4] = "LOG";
}(i || (i = {}));
class l {
  static innerLog(t4, ...e2) {
    this.output ? this.output.log(t4, ...e2) : common_vendor.index.__f__("log", "at uni_modules/dothan-lpapi-ble/js_sdk/index.js:33", t4, ...e2);
  }
  static innerWarn(t4, ...e2) {
    this.output ? this.output.warn(t4, ...e2) : common_vendor.index.__f__("warn", "at uni_modules/dothan-lpapi-ble/js_sdk/index.js:33", t4, ...e2);
  }
  static innerError(t4, ...e2) {
    this.output ? this.output.error(t4, ...e2) : common_vendor.index.__f__("error", "at uni_modules/dothan-lpapi-ble/js_sdk/index.js:33", t4, ...e2);
  }
  static setLevel(t4) {
    t4 !== this.logLevel && (this.logRecords.push(this.logLevel), this.logLevel = t4, this.logRecords.length > this.RecordMaxSize && this.logRecords.shift(), this.info(`<<================ setLogLevel(${t4}) ================>>`));
  }
  static setLogOutput(t4) {
    this.output = t4;
  }
  static restorePrev() {
    const t4 = this.logLevel;
    if (this.logRecords.length > 0) {
      const e2 = this.logRecords.shift();
      return this.logLevel = void 0 === e2 ? i.WARN : e2, t4;
    }
    return -1;
  }
  static logWithLevelFunc(t4, i2, n2, ...s2) {
    const r2 = e.formatDate("HH:mm:ss.SSS");
    "string" != typeof n2 ? 1 === s2.length && "string" == typeof s2[0] ? (t4.call(l, `${i2}[${r2}]: ${s2[0] || ""}`), t4.call(l, n2)) : t4.call(l, n2, ...s2) : t4.call(l, `${i2}[${r2}]: ${n2}`, ...s2);
  }
  static log(t4, ...e2) {
    this.logLevel >= i.LOG && this.logWithLevelFunc(l.innerLog, "【LOG  】", t4, ...e2);
  }
  static info(t4, ...e2) {
    this.logLevel >= i.INFO && this.logWithLevelFunc(l.innerLog, "【INFO 】", t4, ...e2);
  }
  static warn(t4, ...e2) {
    this.logLevel >= i.WARN && this.logWithLevelFunc(l.innerWarn, "【WARN 】", t4, ...e2);
  }
  static error(t4, ...e2) {
    this.logLevel >= i.ERROR && this.logWithLevelFunc(l.innerError, "【ERROR】", t4, ...e2);
  }
}
l.logRecords = [], l.logLevel = i.WARN, l.RecordMaxSize = 10, function(t4) {
  t4[t4.Top = 0] = "Top", t4[t4.Bottom = 1] = "Bottom", t4[t4.Left = 2] = "Left", t4[t4.Right = 3] = "Right";
}(n || (n = {})), function(t4) {
  t4[t4.None = 0] = "None", t4[t4.UnderLine = 1] = "UnderLine", t4[t4.ThroughLine = 2] = "ThroughLine", t4[t4.OverLine = 3] = "OverLine";
}(s || (s = {})), function(t4) {
  t4[t4.REGULAR = 0] = "REGULAR", t4[t4.BOLD = 1] = "BOLD", t4[t4.ITALIC = 2] = "ITALIC", t4[t4.UNDERLINE = 4] = "UNDERLINE", t4[t4.STRIKEOUT = 8] = "STRIKEOUT";
}(r || (r = {})), function(t4) {
  t4[t4.Unset = 255] = "Unset", t4[t4.Start = 0] = "Start", t4[t4.Center = 1] = "Center", t4[t4.End = 2] = "End", t4[t4.Stretch = 3] = "Stretch";
}(a || (a = {})), function(t4) {
  t4[t4.Auto = 0] = "Auto", t4[t4.RotateCanvas = 1] = "RotateCanvas", t4[t4.RotateContent = 2] = "RotateContent";
}(o || (o = {})), function(t4) {
  t4[t4.None = 0] = "None", t4[t4.AntiColor = 1] = "AntiColor", t4[t4.AntiBackground = 2] = "AntiBackground", t4[t4.FillFull = 4] = "FillFull";
}(h || (h = {})), function(t4) {
  t4[t4.None = 0] = "None", t4[t4.Left = 1] = "Left", t4[t4.HInner = 2] = "HInner", t4[t4.Right = 4] = "Right", t4[t4.HOuter = 8] = "HOuter", t4[t4.Top = 16] = "Top", t4[t4.VInner = 32] = "VInner", t4[t4.Bottom = 64] = "Bottom", t4[t4.VOuter = 128] = "VOuter", t4[t4.Inner = 34] = "Inner", t4[t4.Outer = 136] = "Outer";
}(c || (c = {})), function(t4) {
  t4[t4.None = 0] = "None", t4[t4.Char = 1] = "Char", t4[t4.Word = 2] = "Word";
}(d || (d = {})), function(t4) {
  t4[t4.Auto = 0] = "Auto", t4[t4.MM = 1] = "MM", t4[t4.Pix = 2] = "Pix";
}(u || (u = {}));
class g {
  static getLineMode(t4) {
    const e2 = /^(\d+)_(\d+)$/.exec(t4);
    if (e2) {
      const t5 = parseInt(e2[1]) + parseFloat(`0.${e2[2]}`);
      return t5 > 1 ? t5 : g.LineSpaceMode_1_0;
    }
    return (t4 && /^\d*\.?\d*$/.test(t4) ? parseFloat(t4) : 0) > 0 ? g.LineSpaceMode_Custom : g.LineSpaceMode_1_0;
  }
  static toString(t4, e2) {
    switch (t4) {
      case g.LineSpaceMode_1_0:
        return g.LineSpace_1_0;
      case g.LineSpaceMode_1_2:
        return g.LineSpace_1_2;
      case g.LineSpaceMode_1_5:
        return g.LineSpace_1_5;
      case g.LineSpaceMode_2_0:
        return g.LineSpace_2_0;
      default:
        return "number" == typeof e2 ? String(e2) : "";
    }
  }
  static getModeValue(t4, e2) {
    return t4 > 1 ? (t4 - 1) * e2 : 0;
  }
  static valueOf(t4, e2) {
    if ("string" == typeof t4) {
      const i2 = /^(\d+)_(\d+)$/.exec(t4);
      if (i2) {
        const t5 = parseInt(i2[1]), n2 = parseFloat(`0.${i2[2]}`);
        return this.getModeValue(t5 + n2, e2);
      }
      {
        const e3 = parseFloat(t4);
        return isNaN(e3) ? 0 : e3;
      }
    }
    return this.getModeValue(t4, e2);
  }
}
g.LineSpace_1_0 = "1_0", g.LineSpace_1_2 = "1_2", g.LineSpace_1_5 = "1_5", g.LineSpace_2_0 = "2_0", g.LineSpaceMode_1_0 = 1, g.LineSpaceMode_1_2 = 1.2, g.LineSpaceMode_1_5 = 1.5, g.LineSpaceMode_2_0 = 2, g.LineSpaceMode_Custom = 0;
class p {
  static isNull(t4) {
    return null == t4;
  }
  static isTransparent(t4) {
    return "transparent" === (t4 = (t4 || "").toLowerCase()) || t4.match(/^#[0-9a-f]{3}0$/i) || t4.match(/^#[0-9a-f]{6}00$/i);
  }
  static getLineHeight(t4) {
    return 1.172 * t4;
  }
  static isHorizontal(t4) {
    switch (t4) {
      case 0:
      case 2:
      case 180:
        return true;
      default:
        return false;
    }
  }
  static isPortrait(t4) {
    switch (t4) {
      case 1:
      case 3:
      case 90:
      case 270:
        return true;
      default:
        return false;
    }
  }
  static validateColorStr(t4) {
    return t4 ? /^[0-9A-Fa-f]+$/.exec(t4) ? `#${t4}` : /^#([0-9A-Fa-f]+)$/.exec(t4) ? t4 : /^0[xX]([0-9A-Fa-f]+)$/.exec(t4) ? `#${t4.substring(2)}` : t4 : t4;
  }
  get supportLineDash() {
    return this.supports("setLineDash");
  }
  get Canvas() {
    return this._canvas || this.setCanvas(this.createCanvas()), this._canvas;
  }
  setCanvas(t4) {
    if (!t4)
      return;
    this._canvas = t4, this.initOptions.position && this._canvas.style && (this._canvas.style.position = this.initOptions.position);
    const e2 = this.initOptions.willReadFrequently || false;
    this.ctx = this._canvas.getContext("2d", { willReadFrequently: e2 }), this.setTextBaseline(p.TEXT_BASELINE_DEFAULT), this.setTextAlign("left");
  }
  get Context() {
    return this.ctx;
  }
  get Width() {
    return this.width;
  }
  get Height() {
    return this.height;
  }
  get Orientation() {
    return this.orientation;
  }
  get BorderAlign() {
    return this._borderAlign;
  }
  set BorderAlign(t4) {
    this._borderAlign = t4;
  }
  get ModulePixels() {
    return this._modulePixels;
  }
  set ModulePixels(t4) {
    t4 > 0 && (this._modulePixels = t4);
  }
  get DashLen() {
    return this._dashLen || [];
  }
  set DashLen(t4) {
    this._dashLen = t4;
  }
  get PixPerUnit() {
    return this._pixPerUnit;
  }
  get HorizontalAlign() {
    return this._horizontalAlign;
  }
  set HorizontalAlign(t4) {
    this._horizontalAlign = "number" == typeof t4 ? t4 : a.Unset;
  }
  get VerticalAlign() {
    return this._verticalAlign;
  }
  set VerticalAlign(t4) {
    this._verticalAlign = "number" == typeof t4 ? t4 : a.Unset;
  }
  get ItemOrientation() {
    return this._rotation || 0;
  }
  set ItemOrientation(t4) {
    this._rotation = t4;
  }
  get LineWidth() {
    return this._lineWidth > 0 ? this._lineWidth : p.LINE_WIDTH;
  }
  set LineWidth(t4) {
    t4 >= 0 && (this._lineWidth = t4);
  }
  get Foreground() {
    return this._foreground || p.COLOR_FG_DEFAULT;
  }
  set Foreground(t4) {
    this._foreground = t4;
  }
  get Background() {
    return this._background || p.COLOR_BG_DEFAULT;
  }
  set Background(t4) {
    this._background = t4;
  }
  get AutoReturn() {
    return this._autoReturn;
  }
  set AutoReturn(t4) {
    this._autoReturn = t4;
  }
  get FontName() {
    return this.fontName;
  }
  set FontName(t4) {
    t4 && "HARMONYOS SANS" === t4.toUpperCase() ? this.fontName = "HarmonyOS Sans SC" : this.fontName = t4;
  }
  get FontHeight() {
    return this.fontHeight;
  }
  set FontHeight(t4) {
    t4 >= 0 && (this.fontHeight = t4);
  }
  get FontStyle() {
    return this.fontStyle;
  }
  set FontStyle(t4) {
    t4 >= 0 && (this.fontStyle = t4);
  }
  get LineSpace() {
    return this._lineSpace;
  }
  set LineSpace(t4) {
    this._lineSpace = t4;
  }
  get CharSpace() {
    return this._charSpace;
  }
  set CharSpace(t4) {
    this._charSpace = t4;
  }
  constructor(t4) {
    this.fontName = p.FONT_NAME, this.fontStyle = 0, this.fontHeight = 0, this.width = 0, this.height = 0, this.orientation = 0, this.jobName = "", this._modulePixels = 2, this._lineWidth = 0, this._dashLen = [], this._foreground = p.COLOR_FG_DEFAULT, this._rotation = 0, this._horizontalAlign = a.Unset, this._verticalAlign = a.Unset, this._autoReturn = d.Char, this._charSpace = 0, this._lineSpace = 0, this._borderAlign = c.Inner, this._pixPerUnit = 1;
    const e2 = t4 || {};
    this.initOptions = e2, "boolean" == typeof e2.adjustFontSize && (e2.adjustFontSize = e2.adjustFontSize ? 0.95 : 0), this._canvasCreator = e2.creator, this._canvasClearAction = e2.onCanvasClear, e2.background && (this._background = e2.background), e2.foreground && (this._foreground = e2.foreground), e2.canvas && this.setCanvas(e2.canvas);
  }
  createCanvas() {
    return this._canvasCreator ? this._canvasCreator() : document && void 0 !== document.createElement ? document.createElement("canvas") : void 0;
  }
  getReturnMode(t4) {
    return void 0 !== t4 ? t4 : this.AutoReturn;
  }
  getRotateMode(t4) {
    return t4 && t4 > 0 ? t4 : o.RotateContent;
  }
  getLineSpace(t4, e2) {
    return "string" == typeof t4 && t4 ? g.valueOf(t4, e2 || this.fontHeight) : "number" == typeof t4 && t4 >= 0 ? t4 : this.LineSpace;
  }
  setTextBaseline(t4) {
    const e2 = this.ctx;
    void 0 !== this.ctx.textBaseline && (this.ctx.textBaseline = t4), "function" == typeof e2.setTextBaseline && e2.setTextBaseline(p.TEXT_BASELINE_DEFAULT);
  }
  setTextAlign(t4) {
    const e2 = this.ctx;
    void 0 !== this.ctx.textAlign && (this.ctx.textAlign = t4), "function" == typeof e2.setTextAlign && e2.setTextAlign(t4);
  }
  appendTo(t4) {
    return t4 instanceof Element && (t4.innerHTML = "", t4.appendChild(this.Canvas), true);
  }
  supports(t4) {
    switch (t4) {
      case "getImageData":
        return void 0 !== this.ctx.getImageData;
      case "setLineDash":
        return void 0 !== this.ctx.setLineDash;
      case "toDataURL":
        return void 0 !== this.Canvas.toDataURL;
      case "toDataURLWithQuality":
        try {
          return this.Canvas.toDataURL("image/jpeg", 0), true;
        } catch (t5) {
          return false;
        }
      case "measureText":
        return void 0 !== this.ctx.measureText;
      default:
        return false;
    }
  }
  clearAll() {
    this.ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height), this._background && (this.ctx.fillStyle = p.validateColorStr(this.Background), this.ctx.fillRect(0, 0, this.Canvas.width, this.Canvas.height)), "function" == typeof this._canvasClearAction && this._canvasClearAction(this.Canvas, this.ctx);
  }
  getLineWidth(t4) {
    return t4 && t4 > 0 ? t4 : this.LineWidth;
  }
  getDashLen(t4) {
    return t4 || this.DashLen;
  }
  setFont(t4, e2, i2) {
    const n2 = t4 || this.fontHeight, s2 = this.initOptions.adjustFontSize || 0;
    i2 && "HARMONYOS SANS" === i2.toUpperCase() && (i2 = "HarmonyOS Sans SC");
    const a2 = Math.floor(s2 > 0.1 && s2 < 1 ? n2 * s2 : n2), o2 = e2 || this.fontStyle, h2 = i2 || this.fontName || p.FONT_NAME, c2 = 0 !== (o2 & r.ITALIC) ? "italic" : "normal", d2 = 0 !== (o2 & r.BOLD) ? "bold" : "normal";
    this.ctx.font = `${c2} normal ${d2} ${a2}px "${h2}", system-ui`;
  }
  getPaddings(t4) {
    let e2 = [];
    Array.isArray(t4.padding) && t4.padding.length > 0 ? e2 = t4.padding : "number" == typeof t4.padding && (e2 = [t4.padding]);
    const i2 = e2[0] || 0, n2 = e2.length > 1 ? e2[1] : i2;
    return [i2, n2, e2.length > 2 ? e2[2] : i2, e2.length > 3 ? e2[3] : n2];
  }
  processPaddings(t4, e2) {
    return t4.x = t4.x || 0, t4.y = t4.y || 0, t4.x += e2[3], "number" == typeof t4.width && (t4.width -= e2[3] + e2[1]), t4.y += e2[0], "number" == typeof t4.height && (t4.height -= e2[0] + e2[2]), t4;
  }
  processPadding(t4) {
    const e2 = this.getPaddings(t4);
    return this.processPaddings(t4, e2);
  }
  getAntiColor(t4, e2) {
    return "number" == typeof t4 ? t4 : t4 && "boolean" == typeof t4 ? e2 || h.AntiColor | h.AntiBackground : h.None;
  }
  getHorizontalAlignment(t4, e2) {
    return "number" != typeof t4 && (t4 = this._horizontalAlign), t4 >= a.Start && t4 <= a.Stretch ? t4 : "number" == typeof e2 ? e2 : a.Unset;
  }
  getVerticalAlignment(t4, e2) {
    return "number" != typeof t4 && (t4 = this._verticalAlign), t4 >= a.Start && t4 <= a.Stretch ? t4 : "number" == typeof e2 ? e2 : a.Unset;
  }
  getItemRotation(t4) {
    const e2 = "object" == typeof t4 ? t4 : { rotation: t4 }, i2 = "number" == typeof e2.rotation ? e2.rotation : e2.orientation;
    let n2 = "number" == typeof i2 ? i2 : this.ItemOrientation;
    return n2 < 0 ? n2 += 360 : n2 >= 360 && (n2 %= 360), n2 > 0 && n2 < 4 && (n2 *= 90), n2;
  }
  startJob(t4) {
    if ("number" != typeof t4.width && (t4.width = 0), "number" != typeof t4.height && (t4.height = 0), "number" != typeof t4.printerWidth && (t4.printerWidth = 0), t4.width <= 0 && t4.printerWidth > 0 && (t4.width = t4.printerWidth), !(t4.width <= 0 && t4.height <= 0))
      return t4.canvas && this.setCanvas(t4.canvas), this.width = Math.round(t4.width || t4.height || 0), this.height = Math.round(t4.height || t4.width), this.orientation = t4.orientation || 0, t4.jobName && (this.jobName = t4.jobName), this.Canvas.width = this.width, this.Canvas.height = this.height, "boolean" != typeof t4.isPreview || t4.isPreview ? (t4.backgroundColor && (this._background = t4.backgroundColor), t4.color && (this._foreground = t4.color)) : (this._background = p.COLOR_BG_DEFAULT, this._foreground = p.COLOR_FG_DEFAULT), this._horizontalAlign = a.Unset, this._verticalAlign = a.Unset, this.clearAll(), t4.isPreview && t4.backgroundImage && this.drawImage({ image: t4.backgroundImage, width: t4.width, height: t4.height, alignment: a.Stretch }), this.Canvas;
    l.warn("---- 未指定标签大小！");
  }
  commitJob() {
    return this.Canvas;
  }
  setRotation(t4, e2, i2) {
    if ((t4 = (t4 || 0) % 360) > 0) {
      const n2 = e2 || { x: 0, y: 0 }, s2 = i2 || { width: 0, height: 0 };
      n2.x = Math.round(n2.x + 0.5 * s2.width) + 0.5, n2.y = Math.round(n2.y + 0.5 * s2.height) + 0.5, this.ctx.translate(n2.x, n2.y), this.ctx.rotate(t4 * Math.PI / 180), this.ctx.translate(-n2.x, -n2.y);
    }
  }
  drawLine(t4) {
    let e2 = t4.x1 || 0, i2 = t4.y1 || 0, n2 = "number" == typeof t4.x2 ? t4.x2 : e2, s2 = "number" == typeof t4.y2 ? t4.y2 : i2;
    const r2 = "number" == typeof t4.x ? t4.x : e2, a2 = "number" == typeof t4.y ? t4.y : i2;
    if (e2 === n2 && i2 === s2) {
      const o3 = t4.width || 0, h3 = t4.height || 0;
      if (o3 > 0 || h3 > 0) {
        const c2 = Math.min(o3, h3);
        c2 > 0 && (t4.lineWidth = c2), o3 > h3 ? (t4.x1 = e2 = r2, t4.x2 = n2 = r2 + o3, t4.y1 = i2 = a2 + 0.5 * h3, t4.y2 = s2 = i2) : (t4.x1 = e2 = r2 + 0.5 * o3, t4.x2 = n2 = e2, t4.y1 = i2 = a2, t4.y2 = s2 = a2 + h3);
      } else
        t4.x1 = e2 = r2, t4.x2 = n2 = r2 + this.width, t4.y1 = i2 = a2, t4.y2 = s2 = a2;
    } else
      i2 === s2 ? "number" != typeof t4.y1 && "number" != typeof t4.y2 && "number" == typeof t4.y && (t4.y1 = i2 = t4.y, t4.y2 = s2 = t4.y) : e2 === n2 && "number" != typeof t4.x1 && "number" != typeof t4.x2 && "number" == typeof t4.x && (t4.x1 = e2 = t4.x, t4.x2 = n2 = t4.x);
    this.ctx.save();
    const o2 = this.getItemRotation(t4);
    this.setRotation(o2, { x: 0.5 * (e2 + n2), y: 0.5 * (i2 + s2) });
    const h2 = this._drawLine(t4);
    return this.ctx.restore(), h2;
  }
  _drawLine(t4) {
    const e2 = Math.floor(t4.x1 || 0) + 0.5, i2 = Math.floor(t4.y1 || 0) + 0.5, n2 = "number" == typeof t4.x2 ? Math.floor(t4.x2) + 0.5 : e2, s2 = "number" == typeof t4.y2 ? Math.floor(t4.y2) + 0.5 : i2;
    this.ctx.strokeStyle = p.validateColorStr(t4.color || this.Foreground), this.ctx.lineWidth = Math.ceil(this.getLineWidth(t4.lineWidth)), this.ctx.beginPath();
    let r2 = t4.dashLens;
    return (!r2 || r2.length <= 0) && (r2 = (t4.dashLen || "").split(",").map((t5) => +t5)), this.supportLineDash && this.ctx.setLineDash(r2 || []), this.ctx.moveTo(e2, i2), this.ctx.lineTo(n2, s2), this.ctx.stroke(), this.supportLineDash && this.ctx.setLineDash([]), true;
  }
  drawRect(t4) {
    const e2 = t4.x || 0, i2 = t4.y || 0, n2 = t4.width || 0, s2 = t4.height || 0;
    if (t4.cornerWidth && t4.cornerWidth > 0 || t4.cornerHeight && t4.cornerHeight > 0 || t4.radius && t4.radius > 0)
      return this.drawRoundRect(t4);
    if (n2 > 0 && s2 > 0) {
      this.ctx.save();
      const r2 = this.getItemRotation(t4);
      return this.setRotation(r2, { x: e2, y: i2 }, { width: n2, height: s2 }), this._drawRect(t4), this.ctx.restore(), true;
    }
    return false;
  }
  _drawRect(t4) {
    const i2 = p.validateColorStr(t4.color || this.Foreground);
    let n2 = t4.x || 0, s2 = t4.y || 0, r2 = t4.width || t4.height || 0, a2 = t4.height || t4.width || 0;
    if (r2 <= 0)
      return false;
    if (i2 && p.isTransparent(i2))
      return true;
    if (this.ctx.lineJoin = t4.lineJoin || "miter", t4.fill) {
      const t5 = this.adjustRect(e.createRect(n2, s2, r2, a2), this.BorderAlign);
      this.ctx.fillStyle = i2, this.ctx.fillRect(t5.x, t5.y, t5.width, t5.height);
    } else {
      let o2 = this.getLineWidth(t4.lineWidth), h2 = t4.dashLens;
      (!h2 || h2.length <= 0) && (h2 = (t4.dashLen || "").split(",").map((t5) => +t5)), o2 = Math.ceil(o2), n2 += 0.5 * o2, s2 += 0.5 * o2, r2 -= o2, a2 -= o2;
      const c2 = this.adjustRect(e.createRect(n2, s2, r2, a2), this.BorderAlign);
      this.ctx.lineWidth = o2 || this.LineWidth, this.ctx.strokeStyle = i2, this.supportLineDash && h2.length > 0 && this.ctx.setLineDash(h2), this.ctx.strokeRect(c2.x, c2.y, c2.width, c2.height), this.supportLineDash && this.ctx.setLineDash([]);
    }
    return true;
  }
  adjustRect(t4, e2) {
    let i2 = t4.x, n2 = t4.y, s2 = t4.x + t4.width, r2 = t4.y + t4.height;
    const a2 = 240 & e2;
    switch (15 & e2) {
      case c.Left:
        i2 = Math.floor(i2), s2 = Math.floor(s2);
        break;
      case c.HInner:
        i2 = Math.ceil(i2), s2 = Math.floor(s2);
        break;
      case c.Right:
        i2 = Math.ceil(i2), s2 = Math.ceil(s2);
        break;
      case c.HOuter:
        i2 = Math.floor(i2), s2 = Math.ceil(s2);
        break;
      default:
        i2 = Math.round(i2), s2 = Math.round(s2);
    }
    switch (a2) {
      case c.Top:
        n2 = Math.floor(n2), r2 = Math.floor(r2);
        break;
      case c.VInner:
        n2 = Math.ceil(n2), r2 = Math.floor(r2);
        break;
      case c.Bottom:
        n2 = Math.ceil(n2), r2 = Math.ceil(r2);
        break;
      case c.VOuter:
        n2 = Math.floor(n2), r2 = Math.ceil(r2);
        break;
      default:
        n2 = Math.round(n2), r2 = Math.round(r2);
    }
    const o2 = s2 - i2, h2 = r2 - n2;
    return { x: i2, y: n2, width: o2 > 0 ? o2 : 1, height: h2 > 0 ? h2 : 1 };
  }
  drawRoundRect(t4) {
    let e2 = t4.x || 0, i2 = t4.y || 0, n2 = t4.width || 0, s2 = t4.height || 0;
    const r2 = t4.cornerWidth || t4.cornerHeight || t4.radius || 0;
    if (n2 <= 0 && s2 <= 0)
      return false;
    if (r2 <= 0)
      return this.drawRect(t4);
    const a2 = 0.5 * Math.min(n2, s2), o2 = p.validateColorStr(t4.color || this.Foreground);
    let h2 = this.getLineWidth(t4.lineWidth);
    t4.fill || (h2 > a2 && (h2 = a2), e2 += 0.5 * h2, i2 += 0.5 * h2, n2 -= h2, s2 -= h2), this.ctx.save();
    const c2 = this.getItemRotation(t4);
    return this.setRotation(c2, { x: e2, y: i2 }, { width: n2, height: s2 }), this.ctx.translate(e2, i2), this.ctx.fillStyle = o2, this.ctx.strokeStyle = o2, this.drawRoundRectPath(n2, s2, r2), t4.fill ? this.ctx.fill() : (this.ctx.lineWidth = h2, this.ctx.stroke()), this.ctx.restore(), true;
  }
  drawRoundRectPath(t4, e2, i2) {
    i2 = Math.min(i2, 0.5 * t4, 0.5 * e2), this.ctx.beginPath(), this.ctx.arc(t4 - i2, e2 - i2, i2, 0, Math.PI / 2), this.ctx.lineTo(i2, e2), this.ctx.arc(i2, e2 - i2, i2, Math.PI / 2, Math.PI), this.ctx.lineTo(0, i2), this.ctx.arc(i2, i2, i2, Math.PI, 3 * Math.PI / 2), this.ctx.lineTo(t4 - i2, 0), this.ctx.arc(t4 - i2, i2, i2, 3 * Math.PI / 2, 2 * Math.PI), this.ctx.lineTo(t4, e2 - i2), this.ctx.closePath();
  }
  drawEllipse(t4) {
    let e2 = t4.x || 0, i2 = t4.y || 0, n2 = t4.width || t4.height || 0, s2 = t4.height || t4.width || 0;
    if (n2 <= 0 && s2 <= 0)
      return false;
    if (n2 === s2)
      return this.drawCircle(t4);
    const r2 = p.validateColorStr(t4.color || this.Foreground), a2 = this.getLineWidth(t4.lineWidth);
    e2 += 0.5 * a2, i2 += 0.5 * a2, n2 -= a2, s2 -= a2;
    const o2 = 0.5 * n2, h2 = 0.5 * s2;
    e2 += o2, i2 += h2;
    const c2 = this.getItemRotation(t4);
    if (this.ctx.save(), this.setRotation(c2, { x: e2, y: i2 }), this.ctx.lineWidth = a2, this.ctx.fillStyle = r2, this.ctx.strokeStyle = r2, this.ctx.ellipse)
      this.ctx.beginPath(), this.ctx.ellipse(e2, i2, o2, h2, 0, 0, 2 * Math.PI);
    else {
      const t5 = 0.5 * o2, n3 = 0.6 * h2;
      this.ctx.translate(e2, i2), this.ctx.beginPath(), this.ctx.moveTo(0, h2), this.ctx.bezierCurveTo(t5, h2, o2, n3, o2, 0), this.ctx.bezierCurveTo(o2, -n3, t5, -h2, 0, -h2), this.ctx.bezierCurveTo(-t5, -h2, -o2, -n3, -o2, 0), this.ctx.bezierCurveTo(-o2, n3, -t5, h2, 0, h2), this.ctx.closePath();
    }
    return t4.fill ? this.ctx.fill() : this.ctx.stroke(), this.ctx.restore(), true;
  }
  drawCircle(t4) {
    let e2 = t4.x || 0, i2 = t4.y || 0, n2 = t4.radius || 0;
    if (n2 <= 0) {
      const s3 = t4.width || 0, r3 = t4.height || 0;
      if (s3 > 0 && r3 > 0)
        n2 = 0.5 * Math.min(s3, r3), e2 += 0.5 * s3, i2 += 0.5 * r3;
      else if (s3 > 0)
        n2 = 0.5 * s3, e2 += n2;
      else {
        if (!(r3 > 0))
          return false;
        n2 = 0.5 * r3, i2 += n2;
      }
    }
    const s2 = p.validateColorStr(t4.color || this.Foreground), r2 = this.getLineWidth(t4.lineWidth);
    return n2 -= 0.5 * r2, this.ctx.lineWidth = r2, this.ctx.fillStyle = s2, this.ctx.strokeStyle = s2, this.ctx.beginPath(), this.ctx.arc(e2, i2, n2, 0, 2 * Math.PI), this.ctx.closePath(), t4.fill ? this.ctx.fill() : this.ctx.stroke(), true;
  }
  drawText(t4) {
    "number" != typeof t4.x && (t4.x = 0), "number" != typeof t4.y && (t4.y = 0), "number" != typeof t4.width && (t4.width = 0), "number" != typeof t4.height && (t4.height = 0);
    const i2 = this.getItemRotation(t4), n2 = this.getRotateMode(t4.rotateMode), s2 = this.getAntiColor(t4.antiColor, h.AntiColor & h.FillFull);
    if (i2 > 0 || s2 > 0) {
      const r2 = this.getPaddings(t4), a2 = r2[1] + r2[3], c2 = r2[0] + r2[2];
      if ((t4.width <= 0 || t4.height <= 0) && void 0 !== this.ctx.measureText) {
        const e2 = this.measureTextExt(t4);
        t4.width <= 0 && (t4.width = e2.width + a2), t4.height <= 0 && (t4.height = e2.height + c2);
      }
      if (t4.width <= 0 || t4.height <= 0)
        return false;
      (s2 & h.FillFull) > 0 && this.drawRect(Object.assign(Object.assign({}, t4), { rotation: n2 === o.RotateContent ? 0 : i2, color: t4.color || this.Foreground, fill: true })), p.isPortrait(i2) && n2 === o.RotateContent && e.rotate90(t4);
      const d2 = t4.x + 0.5 * t4.width, u2 = t4.y + 0.5 * t4.height;
      this.ctx.save(), this.setRotation(i2, { x: d2, y: u2 });
      const l2 = this._drawText(t4);
      return this.ctx.restore(), l2;
    }
    return this._drawText(t4);
  }
  _drawText(t4) {
    if (("number" != typeof t4.x || isNaN(t4.x)) && (t4.x = 0), ("number" != typeof t4.y || isNaN(t4.y)) && (t4.y = 0), null == t4.text || null == t4.text) {
      if (void 0 === t4.content)
        return false;
      t4.text = t4.content;
    }
    const e2 = this.getAntiColor(t4.antiColor, h.AntiColor & h.FillFull), i2 = t4.color || this.Foreground, n2 = t4.bgColor || this.Background, s2 = t4.minFontHeight || 6, r2 = this.getReturnMode(t4.autoReturn), o2 = "boolean" != typeof t4.autoShrink || t4.autoShrink, c2 = this.getPaddings(t4), u2 = c2[1] + c2[3], l2 = c2[0] + c2[2];
    let g2 = i2;
    e2 > 0 && (g2 = p.isTransparent(n2) ? p.COLOR_BG_DEFAULT : n2);
    let m2 = t4.y + c2[0];
    const f2 = t4.width || 0;
    let C2 = t4.height || 0;
    (!t4.texts || t4.texts.length <= 0) && (t4.texts = Array.isArray(t4.text) ? t4.text : [String(t4.text)]);
    const P2 = t4.texts || [], b2 = t4.fontHeight || C2 || this.fontHeight;
    let y2 = this.getHorizontalAlignment(t4.horizontalAlignment), R2 = this.getVerticalAlignment(t4.verticalAlignment);
    if (b2 <= 0)
      return false;
    (y2 > a.Stretch || y2 < a.Start) && (y2 = a.Start), (R2 > a.Stretch || R2 < a.Start) && (R2 = a.Start), "number" != typeof t4.charSpace && (t4.charSpace = this.CharSpace);
    const I2 = t4.charSpace > 0 ? t4.charSpace : 0;
    this.ctx.fillStyle = p.validateColorStr(g2), this.setFont(b2, t4.fontStyle, t4.fontName), this.ctx.textBaseline = p.TEXT_BASELINE_DEFAULT;
    let A2 = [];
    for (let t5 of P2)
      "string" != typeof t5 ? A2.push(String(t5)) : (t5 = t5.replace("	", ""), A2.push(...t5.split("\n")));
    r2 !== d.None && f2 > 0 && (A2 = this.splitText(Object.assign(Object.assign({}, t4), { text: A2, width: f2 - u2, fontHeight: b2, autoReturn: r2 })));
    let E2 = this.getLineSpace(t4.lineSpace || "", b2);
    if (A2.length > 0) {
      const r3 = p.getLineHeight(b2) * A2.length, h2 = r3 + (A2.length - 1) * E2;
      C2 <= 0 && (C2 = h2 + l2), h2 <= C2 || !o2 || b2 < s2 ? (R2 === a.Stretch ? E2 = (C2 - r3 - c2[0] - c2[2]) / (A2.length - 1) : R2 === a.End ? m2 += C2 - h2 - l2 : R2 === a.Center && (m2 += 0.5 * (C2 - l2 - h2)), this.drawTextList1({ texts: A2, x: t4.x + c2[3], y: m2, width: f2 - u2, fontHeight: b2, lineSpace: E2, charSpace: I2, horizontalAlignment: y2, fontStyle: t4.fontStyle || this.fontStyle, color: e2 ? n2 : i2 })) : this._drawText(Object.assign(t4, { text: P2, width: f2, fontHeight: 0.95 * b2 }));
    }
    return true;
  }
  drawTextList1(t4) {
    const e2 = t4.lineSpace > 0 ? t4.lineSpace : 0, i2 = p.getLineHeight(t4.fontHeight);
    let n2 = 0;
    for (const s2 of t4.texts)
      this._drawSingleLineText(s2, t4.x, t4.y + n2, t4.width, t4.fontHeight, t4.horizontalAlignment, t4.charSpace, t4.fontStyle, t4.color), n2 += i2 + e2;
  }
  _drawSingleLineText(t4, e2, i2, n2, s2, o2, h2, c2, d2) {
    t4 = String(t4);
    const u2 = 0.2 * s2, l2 = s2 - u2, g2 = void 0 !== this.ctx.measureText ? this.ctx.measureText(t4) : { width: 0 }, m2 = "number" == typeof g2.actualBoundingBoxAscent ? g2.actualBoundingBoxAscent : l2, f2 = "number" == typeof g2.actualBoundingBoxDescent ? g2.actualBoundingBoxDescent : u2, C2 = t4.length > 1 && h2 > 0 ? (t4.length - 1) * h2 : 0, P2 = o2 || a.Start;
    let b2 = (null == g2 ? void 0 : g2.width) || 0, y2 = 0.05 * s2;
    y2 < 1 && (y2 = 1);
    const R2 = i2 + p.getLineHeight(l2), I2 = m2 + f2;
    if (g2 && P2 === a.Stretch && n2 > g2.width)
      h2 = (n2 - g2.width) / (t4.length - 1), 1 === t4.length ? this.ctx.fillText(t4, e2 + 0.5 * (n2 - g2.width), R2) : this.fillCharSpaceText(t4, e2, R2, h2), b2 = n2;
    else {
      const i3 = g2 ? g2.width + C2 : 0;
      (n2 = g2 ? n2 : 0) > i3 && (P2 === a.End ? e2 = e2 + n2 - i3 : P2 === a.Center && (e2 += 0.5 * (n2 - i3))), n2 > 0 && n2 < i3 ? (this.fillCharSpaceText(t4, e2, R2, h2, n2), b2 = n2) : (this.fillCharSpaceText(t4, e2, R2, h2), b2 = i3);
    }
    0 !== (c2 & r.STRIKEOUT) && this._drawRect({ x: e2, y: R2 - m2 + 0.5 * (I2 - y2), width: b2, height: y2, color: d2, fill: true }), 0 !== (c2 & r.UNDERLINE) && this._drawRect({ x: e2, y: i2 + s2 - 0.5 * y2, width: b2, height: y2, color: d2, fill: true });
  }
  fillCharSpaceText(t4, e2, i2, n2, s2) {
    if (t4.length <= 0)
      return;
    const r2 = void 0 !== this.ctx.measureText ? this.ctx.measureText(t4) : void 0, a2 = t4.length > 1 ? (t4.length - 1) * n2 : 0;
    if (r2 && n2 > 0) {
      const o2 = r2.width + a2, h2 = s2 && s2 < o2 ? s2 / o2 : 1;
      let c2 = e2;
      for (const e3 of t4) {
        const t5 = this.ctx.measureText(e3).width;
        this.ctx.fillText(e3, c2, i2, t5 * h2), c2 += (t5 + n2) * h2;
      }
    } else
      s2 && s2 > 0 ? this.ctx.fillText(t4, e2, i2, s2) : this.ctx.fillText(t4, e2, i2);
  }
  drawArcText(t4) {
    if (null != t4.text && null != t4.text || void 0 !== t4.content && (t4.text = t4.content), null == t4.text || null == t4.text)
      return false;
    const e2 = t4.fontHeight || 0;
    if (e2 <= 0)
      return false;
    const i2 = { x: t4.x || 0, y: t4.y || 0, width: t4.width || 0, height: t4.height || 0 }, n2 = { x: i2.x, y: i2.y }, s2 = t4.lineWidth || 0, r2 = this.getPaddings(t4)[0], a2 = this.getAntiColor(t4.antiColor, h.AntiColor & h.AntiBackground), o2 = h.AntiBackground | h.FillFull, c2 = t4.color || this.Foreground;
    let d2 = c2;
    0 != (a2 & o2) && (d2 = t4.bgColor || this.Background, d2 && !p.isTransparent(d2) || (d2 = p.COLOR_BG_DEFAULT));
    let u2 = t4.radius || 0;
    if (u2 <= 0) {
      if (!(i2.width > 0 || i2.height > 0))
        return false;
      i2.width > 0 && i2.height > 0 ? (u2 = 0.5 * Math.min(i2.width, i2.height), n2.x += 0.5 * i2.width, n2.y += 0.5 * i2.height) : i2.width > 0 ? (i2.height = i2.width, u2 = 0.5 * i2.width, n2.x += u2) : (i2.width = i2.height, u2 = 0.5 * i2.height, n2.y += u2);
    } else
      i2.x -= u2, i2.y -= u2, i2.width = i2.height = 2 * u2;
    0 != (a2 & h.FillFull) ? this.drawRect(Object.assign(Object.assign({}, i2), { rotation: t4.rotation, color: c2, fill: true })) : 0 != (a2 & h.AntiBackground) && this.drawCircle({ x: n2.x, y: n2.y, lineWidth: s2, radius: u2, color: c2, fill: true }), s2 > 0 && (this.drawCircle({ x: n2.x, y: n2.y, lineWidth: s2, radius: u2, color: d2 }), u2 -= s2);
    const l2 = String(t4.text);
    u2 -= e2, r2 > 0 && r2 < u2 && (u2 -= r2);
    const g2 = void 0 !== this.ctx.measureText, m2 = 2 * Math.PI * u2, f2 = (g2 ? this.measureText({ text: l2, fontHeight: e2 }).width : 0) / m2 * Math.PI * 2;
    this.setFont(0.95 * e2, t4.fontStyle, t4.fontName), this.ctx.fillStyle = p.validateColorStr(d2), this.ctx.save();
    const C2 = this.getItemRotation(t4);
    this.setRotation(C2, n2), this.ctx.translate(n2.x, n2.y), this.ctx.rotate(0.5 * -Math.PI);
    const P2 = this.ctx.textBaseline;
    return this.ctx.textBaseline = "bottom", l2.split("").forEach((t5, i3) => {
      const n3 = g2 ? this.ctx.measureText(t5).width : e2, s3 = n3 / m2 * Math.PI * 2;
      0 === i3 ? this.ctx.rotate(0.5 * -f2 + 0.5 * s3) : this.ctx.rotate(s3), this.ctx.save(), this.ctx.rotate(Math.PI / 2), this.ctx.translate(0.5 * -n3, -u2), this.ctx.fillText(t5, 0, 0), this.ctx.restore();
    }), this.ctx.textBaseline = P2, this.ctx.restore(), true;
  }
  getTextWidths(t4) {
    const e2 = [];
    if (!t4 || void 0 === this.ctx.measureText)
      return e2;
    for (const i2 of t4)
      e2.push(this.ctx.measureText(i2).width);
    return e2;
  }
  draw1DBarcode(t4) {
    "number" != typeof t4.x && (t4.x = 0), "number" != typeof t4.y && (t4.y = 0), "number" != typeof t4.width && (t4.width = 0), "number" != typeof t4.height && (t4.height = 0);
    const i2 = t4.datas;
    t4.padding && this.processPadding(t4);
    const n2 = this.getItemRotation(t4), s2 = this.getRotateMode(t4.rotateMode);
    n2 > 0 && p.isPortrait(n2) && s2 === o.RotateContent && t4.width > 0 && t4.height > 0 && e.rotate90(t4), "number" != typeof t4.textHeight && "number" == typeof t4.fontHeight && (t4.textHeight = t4.fontHeight);
    let r2 = "number" == typeof t4.textHeight && t4.textHeight > 0 ? t4.textHeight : 0, h2 = this.getHorizontalAlignment(t4.horizontalAlignment, a.Center);
    const u2 = "number" == typeof t4.autoScaleLevel ? t4.autoScaleLevel : p.AUTO_SCALE_LEVEL;
    "number" != typeof t4.textFlag && "number" == typeof t4.flag && (t4.textFlag = t4.flag);
    const l2 = "number" != typeof t4.textFlag || t4.topText ? 2 : t4.textFlag;
    r2 = l2 > 0 ? r2 : 0;
    let g2 = t4.topText ? r2 : 0;
    const m2 = t4.datas.map((t5) => t5.data || "").join(""), f2 = m2.length * this.PixPerUnit;
    t4.width = t4.width < f2 ? f2 : t4.width, (h2 > a.Stretch || h2 < a.Start) && (h2 = a.Center);
    let C2 = t4.width, P2 = 0, b2 = C2 / m2.length;
    if (u2 > 0 && b2 / this.PixPerUnit < u2 && h2 <= a.End)
      switch (b2 = 1 * this.PixPerUnit, C2 = m2.length * b2, h2) {
        case a.Start:
          break;
        case a.End:
          P2 = t4.width - C2;
          break;
        default:
          P2 = 0.5 * (t4.width - C2);
      }
    const y2 = r2 > 0 ? p.BarTextMargin * b2 : 0;
    let R2 = p.MinBarHeight;
    r2 > 0 && t4.topText ? R2 = 2 * (r2 + y2) + p.MinBarHeight : r2 && (R2 = r2 + y2 + p.MinBarHeight), t4.height <= 0 ? (r2 <= 0 && (r2 = 25), t4.height = 3 * r2) : t4.height < R2 && (t4.height = R2), this.ctx.save(), this.setRotation(n2, { x: t4.x, y: t4.y }, { width: t4.width, height: t4.height });
    const I2 = r2 + y2, A2 = 0.5 * r2 + y2 + 1, E2 = "number" == typeof t4.textAlign ? t4.textAlign : t4.textAlignment, D2 = b2;
    let v2 = t4.x + P2, w2 = t4.y + g2 + y2, x2 = w2, _2 = t4.y;
    if (t4.topText && i2.length >= 7) {
      const e2 = i2.slice(1, 6).map((t5) => t5.data).join("").length * D2;
      g2 += y2, this._drawText({ text: t4.topText, x: t4.x + i2[0].data.length * D2, y: t4.y, width: e2, height: r2, fontHeight: r2, fontStyle: t4.fontStyle, fontName: t4.fontName, color: t4.color, autoReturn: d.None, horizontalAlignment: "number" == typeof E2 ? E2 : a.Center, charSpace: t4.charSpace });
    }
    for (const e2 of i2) {
      if (t4.height > I2) {
        const i3 = e2.text ? I2 : I2 - A2, n3 = t4.height - i3 - g2;
        1 === l2 ? (x2 = t4.y, w2 = x2 + i3) : (w2 = t4.y + g2, x2 = w2 + n3, _2 = x2 + y2), this.BorderAlign = c.None;
        for (let s3 = 0; s3 < e2.data.length; s3++, v2 += D2)
          "1" === e2.data[s3] ? (t4.bgColor && this._drawRect({ x: v2, y: x2, width: D2, height: i3, color: t4.bgColor, fill: true }), this._drawRect({ x: v2, y: w2, width: D2, height: n3, color: t4.color, fill: true })) : t4.bgColor && this._drawRect({ x: v2, y: t4.y, width: D2, height: t4.height, color: t4.bgColor, fill: true });
      }
      if (e2.text) {
        const n3 = i2.length > 2 && e2.text.length > 1 ? p.DockCharMargin * D2 : 0, s3 = e2.data.length * D2;
        this._drawText({ text: e2.text, x: v2 - s3 + n3, y: _2, width: s3 - 2 * n3, height: r2, fontHeight: r2, fontStyle: t4.fontStyle, fontName: t4.fontName, color: t4.color, autoReturn: d.None, horizontalAlignment: "number" == typeof E2 ? E2 : a.Center, charSpace: t4.charSpace });
      }
    }
    return this.ctx.restore(), true;
  }
  draw2DBarcode(t4) {
    "number" != typeof t4.x && (t4.x = 0), "number" != typeof t4.y && (t4.y = 0), "number" != typeof t4.width && (t4.width = 0), "number" != typeof t4.height && (t4.height = t4.width);
    const i2 = t4.data, n2 = t4.zoneSize || 0, s2 = t4.barPixels || this.ModulePixels, r2 = "number" == typeof t4.autoScaleLevel ? t4.autoScaleLevel : p.AUTO_SCALE_LEVEL, d2 = i2.rows || 0, u2 = i2.cols || 0;
    if (d2 <= 0 || u2 <= 0)
      return false;
    const l2 = this.getItemRotation(t4), g2 = this.getRotateMode(t4.rotateMode), m2 = this.getPaddings(t4), f2 = m2[1] + m2[3], C2 = m2[0] + m2[2], P2 = d2 + 2 * n2, b2 = u2 + 2 * n2, y2 = b2 * this.PixPerUnit, R2 = P2 * this.PixPerUnit;
    let I2 = this.getHorizontalAlignment(t4.horizontalAlignment, a.Center), A2 = this.getVerticalAlignment(t4.verticalAlignment, a.Center), E2 = 0, D2 = 0;
    (I2 > a.Stretch || I2 < a.Start) && (I2 = a.Center), (A2 > a.Stretch || A2 < a.Start) && (A2 = a.Center), t4.width <= 0 ? (E2 = s2 * this.PixPerUnit, t4.width = E2 * b2 + f2) : t4.width - f2 <= y2 ? (E2 = this.PixPerUnit, t4.width = y2 + f2) : E2 = (t4.width - f2) / b2, t4.height <= 0 ? (D2 = s2 * this.PixPerUnit, t4.height = D2 * P2 + C2) : t4.height - C2 <= R2 ? (D2 = this.PixPerUnit, t4.height = R2 + C2) : D2 = (t4.height - C2) / P2, t4.color || (t4.color = this.Foreground);
    const v2 = this.getAntiColor(t4.antiColor);
    let w2 = v2 ? t4.bgColor : t4.color;
    const x2 = v2 ? t4.color : t4.bgColor;
    0 !== (v2 & h.FillFull) && (this.drawRect({ x: t4.x, y: t4.y, width: t4.width, height: t4.height, color: t4.color || this.Foreground, rotation: g2 === o.RotateContent ? 0 : l2, fill: true }), w2 && !p.isTransparent(w2) || (w2 = p.COLOR_BG_DEFAULT)), l2 > 0 && p.isPortrait(l2) && g2 === o.RotateContent && t4.width > 0 && t4.height > 0 && e.rotate90(t4), this.ctx.save(), this.setRotation(l2, { x: t4.x, y: t4.y }, { width: t4.width, height: t4.height }), f2 > 0 && (t4.x += m2[3], t4.width -= f2), C2 > 0 && (t4.y += m2[0], t4.height -= C2), I2 < a.Stretch && (E2 = Math.min(E2, D2), E2 < r2 * this.PixPerUnit && (E2 = Math.floor(E2 / this.PixPerUnit) * this.PixPerUnit)), A2 < a.Stretch && (D2 = Math.min(E2, D2), D2 < r2 * this.PixPerUnit && (D2 = Math.floor(D2 / this.PixPerUnit) * this.PixPerUnit));
    const _2 = b2 * E2, O2 = P2 * D2;
    let T2 = 0, S2 = 0;
    switch (I2) {
      case a.Start:
        break;
      case a.End:
        T2 = Math.round(t4.width - _2);
        break;
      default:
        T2 = Math.round(0.5 * (t4.width - _2));
    }
    switch (A2) {
      case a.Start:
        break;
      case a.End:
        S2 = Math.round(t4.height - O2);
        break;
      default:
        S2 = Math.round(0.5 * (t4.height - O2));
    }
    const M2 = Math.floor(t4.x + T2), B2 = Math.floor(t4.y + S2);
    this.BorderAlign = c.None, x2 && n2 > 0 && (this._drawRect({ x: M2, y: B2, width: Math.round(_2), height: Math.round(D2 * n2), color: x2, fill: true }), this._drawRect({ x: M2, y: Math.round(B2 + (d2 + n2) * D2), width: Math.round(_2), height: Math.round(n2 * D2), color: x2, fill: true }), this._drawRect({ x: M2, y: B2, width: Math.round(E2 * n2), height: Math.round(O2), color: x2, fill: true }), this._drawRect({ x: Math.round(M2 + (u2 + n2) * E2), y: B2, width: Math.round(n2 * E2), height: Math.round(O2), color: x2, fill: true }));
    for (let t5 = 0, e2 = B2 + D2 * n2; t5 < d2; t5++, e2 += D2)
      for (let s3 = 0, r3 = M2 + E2 * n2; s3 < u2; s3++, r3 += E2)
        i2.data[t5 * (i2.cols || 0) + s3] ? w2 && this._drawRect({ x: r3, y: e2, width: E2, height: D2, color: w2, fill: true }) : x2 && this._drawRect({ x: r3, y: e2, width: E2, height: D2, color: x2, fill: true });
    return this.ctx.restore(), true;
  }
  drawImage(t4) {
    const e2 = t4.image || t4.img, i2 = e2 ? e2.dzSrc || e2 : void 0;
    if (!i2)
      return false;
    if (i2.width && i2.height)
      if (t4.width && t4.height)
        if (i2.width / i2.height > t4.width / t4.height) {
          "number" != typeof t4.verticalAlignment && "number" == typeof t4.alignment && (t4.verticalAlignment = t4.alignment);
          const e3 = t4.y || 0, n3 = t4.width * i2.height / i2.width;
          0 === t4.verticalAlignment ? t4.height = n3 : 2 === t4.verticalAlignment ? (t4.y = e3 + t4.height - n3, t4.height = n3) : 3 === t4.verticalAlignment || (t4.y = e3 + 0.5 * (t4.height - n3), t4.height = n3);
        } else {
          "number" != typeof t4.horizontalAlignment && "number" == typeof t4.alignment && (t4.horizontalAlignment = t4.alignment);
          const e3 = t4.x || 0, n3 = i2.width * t4.height / i2.height;
          0 === t4.horizontalAlignment ? t4.width = n3 : 2 === t4.horizontalAlignment ? (t4.x = e3 + t4.width - n3, t4.width = n3) : 3 === t4.horizontalAlignment || (t4.x = e3 + 0.5 * (t4.width - n3), t4.width = n3);
        }
      else
        t4.width ? t4.height = t4.width * i2.height / i2.width : t4.height ? t4.width = i2.width * t4.height / i2.height : (t4.width = i2.width, t4.height = i2.height);
    const n2 = Math.ceil(t4.x || 0), s2 = Math.ceil(t4.y || 0), r2 = Math.floor(t4.width || 0), a2 = Math.floor(t4.height || 0);
    this.ctx.save();
    const o2 = this.getItemRotation(t4);
    return this.setRotation(o2, { x: n2, y: s2 }, { width: r2, height: a2 }), t4.swidth && t4.sheight ? this.ctx.drawImage(i2, t4.sx || 0, t4.sy || 0, t4.swidth, t4.sheight, n2, s2, r2, a2) : t4.width || t4.height ? this.ctx.drawImage(i2, n2 || 0, s2 || 0, r2, a2) : this.ctx.drawImage(i2, n2, s2), this.ctx.restore(), true;
  }
  drawImageResizeLabel(t4, e2) {
    if (!t4.img || this.width <= 0 || this.height <= 0)
      return;
    const i2 = t4.img, n2 = i2.width || t4.imageWidth || 0, s2 = i2.height || t4.imageHeight || 0;
    let r2 = 0, a2 = 0, o2 = 0;
    if (n2 <= 0 || s2 <= 0)
      return void l.warn("---- drawImageResizeLabel: 无法获取 img 对象的像素大小，所以无法对目标图片进行分割绘制！");
    n2 / s2 < this.width / this.height ? (o2 = this.height, a2 = n2 * this.height / n2, r2 = this.height / s2) : (a2 = this.width, o2 = this.width * s2 / n2, r2 = this.width / n2);
    let h2 = r2;
    t4.fullOfLabel ? h2 = r2 : t4.relativeScale && t4.relativeScale > 0 ? h2 = t4.relativeScale * r2 : e2 && (h2 = e2);
    const c2 = Math.floor(t4.left), d2 = Math.floor(t4.top), u2 = Math.ceil(t4.right), g2 = Math.ceil(t4.bottom), p2 = u2 - c2, m2 = g2 - d2, f2 = n2 - u2, C2 = s2 - g2, P2 = a2 / (c2 + f2 + 1), b2 = o2 / (d2 + C2 + 1), y2 = Math.min(P2, b2);
    h2 > y2 && (h2 = t4.relativeScale && t4.relativeScale > 0 ? y2 : r2);
    const R2 = Math.floor(c2 * h2), I2 = Math.floor(d2 * h2), A2 = Math.floor(f2 * h2), E2 = Math.floor(C2 * h2), D2 = this.width - A2, v2 = this.height - E2;
    if (this.ctx.drawImage(i2, 0, 0, c2, d2, 0, 0, R2, I2), this.ctx.drawImage(i2, u2, 0, f2, d2, D2, 0, A2, I2), this.ctx.drawImage(i2, u2, g2, f2, C2, D2, v2, A2, E2), this.ctx.drawImage(i2, 0, g2, c2, C2, 0, v2, R2, E2), t4.tileMode) {
      const t5 = a2 - R2 - A2, e3 = o2 - I2 - E2;
      let n3 = t5, s3 = e3, r3 = p2, h3 = m2;
      if (t5 > 0)
        for (let e4 = R2; e4 < D2; e4 += t5)
          D2 - e4 < t5 ? (n3 = D2 - e4, r3 = p2 * n3 / t5) : (n3 = t5, r3 = p2), this.ctx.drawImage(i2, c2, 0, r3, d2, e4, 0, n3, I2), this.ctx.drawImage(i2, c2, g2, r3, C2, e4, v2, n3, E2);
      if (e3 > 0)
        for (let t6 = I2; t6 < v2; t6 += e3)
          v2 - t6 < e3 ? (s3 = v2 - t6, h3 = m2 * s3 / e3) : (s3 = e3, h3 = m2), this.ctx.drawImage(i2, 0, d2, c2, h3, 0, t6, R2, s3), this.ctx.drawImage(i2, u2, d2, f2, h3, D2, t6, A2, s3);
    } else {
      const t5 = D2 - R2, e3 = v2 - I2;
      this.ctx.drawImage(i2, c2, 0, p2, d2, R2, 0, t5, I2), this.ctx.drawImage(i2, u2, d2, f2, m2, D2, I2, A2, e3), this.ctx.drawImage(i2, c2, g2, p2, C2, R2, v2, t5, E2), this.ctx.drawImage(i2, 0, d2, c2, m2, 0, I2, R2, e3);
    }
  }
  measureText(t4) {
    return (t4.fontHeight || t4.fontStyle || t4.fontName) && this.setFont(t4.fontHeight, t4.fontStyle, t4.fontName), void 0 !== this.ctx.measureText ? this.ctx.measureText(t4.text || "") : { width: 0 };
  }
  measureTextExt(t4) {
    const e2 = t4.fontHeight || this.fontHeight;
    let i2 = t4.width || 0;
    const n2 = this.splitText(Object.assign(t4, { text: t4.text || "" })), s2 = this.getLineSpace(t4.lineSpace || 0, e2), r2 = t4.charSpace || 0, a2 = n2.length > 1 ? (n2.length - 1) * s2 : 0;
    if (i2 <= 0 && void 0 !== this.ctx.measureText) {
      for (let t5 = 0; t5 < n2.length; t5++)
        if (n2[t5].length > 0) {
          const e3 = this.ctx.measureText(n2[t5]).width + (n2[t5].length - 1) * r2;
          e3 > i2 && (i2 = e3);
        }
    }
    return { width: i2, height: p.getLineHeight(e2) * n2.length + a2 };
  }
  measureFontSize(t4) {
    const e2 = t4.text || "", i2 = t4.width || 0, n2 = t4.minFontHeight || 6;
    if (i2 <= 0 || e2.length <= 0 || void 0 === this.ctx.measureText)
      return t4.fontHeight || 0;
    let s2, r2 = t4.fontHeight || this.fontHeight;
    do {
      if (s2 = this.measureText({ text: e2, fontHeight: r2, fontStyle: t4.fontStyle, fontName: t4.fontName }), s2.width <= i2)
        return r2;
      r2 *= 0.95;
    } while (r2 > n2);
    return n2;
  }
  findSplitPosition(t4, e2, i2, n2) {
    if (t4.length <= 1)
      return t4.length;
    const s2 = n2 || 0;
    let r2 = 1, a2 = this.ctx.measureText(t4.substring(0, r2)).width;
    if (a2 >= e2)
      return r2;
    let o2 = 0, h2 = 0;
    if (s2 > 0)
      for (; h2 < e2 && o2 < t4.length; )
        o2 + s2 > t4.length ? o2 = t4.length : (h2 > a2 && (r2 = o2, a2 = h2), o2 += s2), h2 = this.ctx.measureText(t4.substring(0, o2)).width + (o2 - 1) * i2;
    else
      o2 = t4.length, h2 = this.ctx.measureText(t4).width + (o2 - 1) * i2;
    if (h2 <= e2)
      return o2;
    for (; r2 < o2 && o2 !== r2 + 1; ) {
      const n3 = r2 + Math.floor((o2 - r2) / 2), s3 = this.ctx.measureText(t4.substring(0, n3)).width + (n3 - 1) * i2;
      if (s3 > e2)
        o2 = n3, h2 = s3;
      else if (r2 = n3, a2 = s3, s3 >= e2)
        break;
    }
    return r2;
  }
  findWordSplitPos(t4, e2) {
    let i2 = 0;
    if (e2 >= t4.length || /\W/.exec(t4.charAt(e2)))
      return e2;
    for (i2 = e2 - 1; i2 >= 0 && !/\W/.exec(t4.charAt(i2)); i2--)
      ;
    return i2 + 1;
  }
  splitText(t4) {
    if (p.isNull(t4.text) && !p.isNull(t4.content) && (t4.text = t4.content), p.isNull(t4.text))
      return [];
    "number" != typeof t4.charSpace && (t4.charSpace = this.CharSpace);
    const e2 = t4.charSpace > 0 ? t4.charSpace : 0, i2 = Array.isArray(t4.text) ? t4.text : [String(t4.text)], n2 = [], s2 = void 0 !== this.ctx.measureText;
    for (const t5 of i2)
      n2.push(...t5.split("\n"));
    let r2 = 0, a2 = 0;
    const o2 = [];
    this.setFont(t4.fontHeight, t4.fontStyle, t4.fontName);
    const h2 = this.getReturnMode(t4.autoReturn);
    for (const i3 of n2)
      if (i3.length > 0 && h2 && t4.width && t4.width > 0 && s2) {
        let n3 = i3;
        for (; n3.length > 0; )
          r2 = this.findSplitPosition(n3, t4.width, e2, t4.measureOptimizeStep), h2 === d.Word && (a2 = this.findWordSplitPos(n3, r2), a2 > 0 && a2 < r2 && (r2 = a2)), o2.push(n3.substring(0, r2)), n3 = r2 < n3.length ? n3.substring(r2) : "";
      } else
        o2.push(i3);
    return o2;
  }
  inverseColors() {
    const t4 = this.ctx, e2 = this.getImageData();
    if (e2) {
      const i2 = e2.data;
      for (let t5 = 0; t5 < i2.length; t5 += 4)
        i2[t5] = 255 - i2[t5], i2[t5 + 1] = 255 - i2[t5 + 1], i2[t5 + 2] = 255 - i2[t5 + 2];
      return t4.putImageData(e2, 0, 0), true;
    }
    return false;
  }
  horizontalFlip() {
    const t4 = this.ctx, e2 = this.getImageData(), i2 = t4.createImageData(this.Canvas.width, this.Canvas.height);
    if (e2 && i2) {
      const n2 = e2.width, s2 = e2.height;
      for (let t5 = 0; t5 < s2; t5++)
        for (let s3 = 0; s3 < n2; s3++)
          i2.data[t5 * n2 * 4 + 4 * s3 + 0] = e2.data[t5 * n2 * 4 + 4 * (n2 - s3) + 0], i2.data[t5 * n2 * 4 + 4 * s3 + 1] = e2.data[t5 * n2 * 4 + 4 * (n2 - s3) + 1], i2.data[t5 * n2 * 4 + 4 * s3 + 2] = e2.data[t5 * n2 * 4 + 4 * (n2 - s3) + 2], i2.data[t5 * n2 * 4 + 4 * s3 + 3] = e2.data[t5 * n2 * 4 + 4 * (n2 - s3) + 3];
      return t4.putImageData(i2, 0, 0), true;
    }
    return false;
  }
  getImageData() {
    return "function" == typeof this.ctx.getImageData ? this.ctx.getImageData(0, 0, this.Canvas.width, this.Canvas.height) : void l.info("---- 当前绘制环境不支持函数：getImageData");
  }
  static processCanvasPixels(t4, e2) {
    const i2 = t4.getContext("2d");
    if (i2) {
      const n2 = i2.createImageData(t4.width, t4.height), s2 = n2.data, r2 = i2.getImageData(0, 0, t4.width, t4.height).data;
      let a2 = 0, o2 = [];
      for (let t5 = 0; t5 < r2.length; t5 += 4)
        a2 = e2(r2[t5], r2[t5 + 1], r2[t5 + 2], r2[0]), o2 = "number" == typeof a2 ? [a2, a2, a2] : a2, s2[t5] = o2[0] || 0, s2[t5 + 1] = o2[1] || 0, s2[t5 + 2] = o2[2] || 0, s2[t5 + 3] = r2[t5 + 3];
      i2.putImageData(n2, 0, 0);
    }
  }
  static toGray256(t4) {
    p.processCanvasPixels(t4, (t5, e2, i2, n2) => Math.round(0.3 * t5 + 0.59 * e2 + 0.11 * i2));
  }
  static toBlackWhite(t4, e2) {
    const i2 = e2 || 150;
    p.processCanvasPixels(t4, (t5, e3, n2, s2) => Math.round(0.3 * t5 + 0.59 * e3 + 0.11 * n2) <= i2 ? 0 : 255);
  }
  static parseRgba(t4, e2) {
    if (!t4)
      return "number" == typeof e2 ? [e2, e2, e2] : [];
    const i2 = [];
    if ("#" === t4[0] && (t4 = t4.substring(1)), /^\[0-9a-fA-F]{3,4}$/.test(t4))
      i2.push(parseInt(t4[0], 16)), i2.push(parseInt(t4[1], 16)), i2.push(parseInt(t4[2], 16)), t4.length > 3 && i2.push(parseInt(t4[3], 16));
    else {
      if (!/^([0-9A-Fa-f]{2}){3,4}$/.test(t4))
        return "number" == typeof e2 ? [e2, e2, e2] : [];
      i2.push(parseInt(t4.substring(0, 2), 16)), i2.push(parseInt(t4.substring(2, 4), 16)), i2.push(parseInt(t4.substring(4, 6), 16)), t4.length > 6 && i2.push(parseInt(t4.substring(6, 8), 16));
    }
    return i2;
  }
  static imageConvert(t4, e2) {
    try {
      if (t4) {
        const i2 = document.createElement("canvas");
        i2.width = t4.width, i2.height = t4.height;
        const n2 = i2.getContext("2d");
        if (n2)
          return n2.drawImage(t4, 0, 0, t4.width, t4.height), p.processCanvasPixels(i2, e2), i2.toDataURL();
      }
    } catch (t5) {
      l.warn("---- Exception: imageConvert", t5);
    }
    return "";
  }
  static getGray256Value(t4, e2, i2) {
    return Math.round(0.3 * t4 + 0.59 * e2 + 0.11 * i2);
  }
  static convertToGray256(t4) {
    return this.imageConvert(t4, (t5, e2, i2) => {
      const n2 = Math.round(0.3 * t5 + 0.59 * e2 + 0.11 * i2);
      return [n2, n2, n2];
    });
  }
  static convertToBlackWhite(t4, e2) {
    const i2 = e2 || 150;
    return this.imageConvert(t4, (t5, e3, n2) => Math.round(0.3 * t5 + 0.59 * e3 + 0.11 * n2) <= i2 ? [0, 0, 0] : [255, 255, 255]);
  }
  static convertToColorImage(t4, e2, i2, n2) {
    const s2 = n2 || 150, r2 = this.parseRgba(e2, 0), a2 = this.parseRgba(i2 || "", 255);
    return this.imageConvert(t4, (t5, e3, i3) => Math.round(0.3 * t5 + 0.59 * e3 + 0.11 * i3) > s2 ? a2 : r2);
  }
}
p.NO_START_STOP = 4, p.MinBarHeight = 2, p.BarTextMargin = 1, p.DockHorizMargin = 7, p.DockCharMargin = 1, p.BarIsbnMargin = 0, p.AUTO_SCALE_LEVEL = 2, p.COLOR_FG_DEFAULT = "#000", p.COLOR_BG_DEFAULT = "#fff", p.LINE_WIDTH = 28, p.FONT_NAME = "黑体", p.TEXT_BASELINE_DEFAULT = "alphabetic";
class m {
  constructor(t4) {
    this._dpi = 203, this._dpm = 203 / 25.4, this._offsetX = 0, this._offsetY = 0, this.cvs = new p(t4);
  }
  get Base() {
    return this.cvs;
  }
  get ScaleUnit() {
    return this._scaleUnit || u.Auto;
  }
  get Dpi() {
    return this._dpi;
  }
  set Dpi(t4) {
    t4 && t4 > 0 && (this._dpi = t4, this._dpm = t4 / 25.4);
  }
  get DPM() {
    return this._dpm;
  }
  set DPM(t4) {
    t4 > 0 && (this._dpm = t4, this._dpi = 25.4 * t4);
  }
  get OffsetX() {
    return this._offsetX;
  }
  set OffsetX(t4) {
    this._offsetX = t4;
  }
  get OffsetY() {
    return this._offsetY;
  }
  set OffsetY(t4) {
    this._offsetY = t4;
  }
  get Width() {
    return this.cvs.Width / this.DPM;
  }
  get Height() {
    return this.cvs.Height / this.DPM;
  }
  get CanvasWidth() {
    return this.cvs.Canvas.width;
  }
  get CanvasHeight() {
    return this.cvs.Canvas.height;
  }
  get Foreground() {
    return this.cvs.Foreground;
  }
  set Foreground(t4) {
    this.cvs.Foreground = t4;
  }
  setFontName(t4) {
    this.cvs.FontName = t4;
  }
  getFontHeight() {
    return this.invertCvt(this.cvs.FontHeight);
  }
  setFontHeight(t4) {
    this.cvs.FontHeight = this.cvt(t4);
  }
  setLineSpace(t4) {
    this.cvs.LineSpace = this.cvt(t4);
  }
  parseLineSpace(t4, e2) {
    return "number" == typeof t4 ? t4 : "string" == typeof t4 ? this.cvs.getLineSpace(t4, e2) : 0;
  }
  setCharSpace(t4) {
    this.cvs.CharSpace = this.cvt(t4);
  }
  getLineWidth() {
    return this.invertCvt(this.cvs.LineWidth);
  }
  setLineWidth(t4) {
    this.cvs.LineWidth = this.cvt(t4);
  }
  setRotation(t4, e2, i2) {
    return e2 && (e2.x = this.cvt(e2.x), e2.y = this.cvt(e2.y)), i2 && (i2.width = this.cvt(i2.width), i2.height = this.cvt(i2.height)), this.cvs.setRotation(t4, e2, i2);
  }
  supports(t4) {
    return this.cvs.supports(t4);
  }
  startJob(t4) {
    return this._scaleUnit = t4.scaleUnit, t4.dpi && (this.Dpi = t4.dpi), this.cvs.startJob(this.cvtDrawOptions(t4)) ? this.cvs : void 0;
  }
  commitJob() {
    return this.cvs.commitJob() ? this.cvs : void 0;
  }
  drawLine(t4) {
    return this.cvs.drawLine(this.cvtDrawOptions(t4));
  }
  drawRect(t4) {
    return this.cvs.drawRect(this.cvtDrawOptions(t4));
  }
  drawRoundRect(t4) {
    return this.cvs.drawRoundRect(this.cvtDrawOptions(t4));
  }
  drawEllipse(t4) {
    return this.cvs.drawEllipse(this.cvtDrawOptions(t4));
  }
  drawCircle(t4) {
    return this.cvs.drawCircle(this.cvtDrawOptions(t4));
  }
  drawText(t4) {
    return this.cvs.drawText(this.cvtDrawOptions(t4));
  }
  drawArcText(t4) {
    return this.cvs.drawArcText(this.cvtDrawOptions(t4));
  }
  draw1DBarcode(t4) {
    return (t4 = this.cvtDrawOptions(t4)).textHeight = this.cvt(t4.textHeight), this.cvs.draw1DBarcode(t4);
  }
  draw2DBarcode(t4) {
    return this.cvs.draw2DBarcode(this.cvtDrawOptions(t4));
  }
  drawImage(t4) {
    return this.cvs.drawImage(this.cvtDrawOptions(t4));
  }
  drawImageResizeLabel(t4) {
    return this.cvs.drawImageResizeLabel(t4, this.DPM / 20);
  }
  splitText(t4) {
    return this.cvs.splitText(this.cvtDrawOptions(t4));
  }
  measureText(t4) {
    return t4.fontHeight = this.cvt(t4.fontHeight), this.cvs.measureText(t4);
  }
  measureFontSize(t4) {
    t4 = this.cvtDrawOptions(t4);
    const e2 = this.cvs.measureFontSize(t4);
    return this.invertCvt(e2);
  }
  cvt(t4) {
    return "number" == typeof t4 ? t4 * this._dpm : t4;
  }
  invertCvt(t4) {
    return "number" == typeof t4 ? t4 / this._dpm : t4;
  }
  cvtArray(t4) {
    if (Array.isArray(t4))
      for (let e2 = 0; e2 < t4.length; e2++)
        t4[e2] = this.cvt(t4[e2]);
    return t4;
  }
  cvtDrawOptions(t4) {
    if (this.ScaleUnit === u.Pix)
      return t4;
    "number" == typeof (t4 = Object.assign({}, t4)).x && (t4.x = this.cvt(t4.x + this.OffsetX)), "number" == typeof t4.y && (t4.y = this.cvt(t4.y + this.OffsetY)), t4.width && (t4.width = this.cvt(t4.width)), t4.height && (t4.height = this.cvt(t4.height)), "number" == typeof t4.margin ? t4.margin = this.cvt(t4.margin) : this.cvtArray(t4.margin);
    const e2 = t4;
    e2.lineWidth && (e2.lineWidth = this.cvt(e2.lineWidth)), e2.radius && (e2.radius = this.cvt(e2.radius));
    const i2 = t4;
    i2.cornerWidth && (i2.cornerWidth = this.cvt(i2.cornerWidth)), i2.cornerHeight && (i2.cornerHeight = this.cvt(i2.cornerHeight));
    const n2 = t4;
    n2.x1 && (n2.x1 = this.cvt(n2.x1 + this.OffsetX)), n2.y1 && (n2.y1 = this.cvt(n2.y1 + this.OffsetY)), n2.x2 && (n2.x2 = this.cvt(n2.x2 + this.OffsetX)), n2.y2 && (n2.y2 = this.cvt(n2.y2 + this.OffsetY)), n2.dashLens && (n2.dashLens = n2.dashLens.map((t5) => this.cvt(t5))), n2.dashLen && (n2.dashLen = n2.dashLen.split(",").map((t5) => this.cvt(+t5)).join(","));
    const s2 = t4;
    "number" == typeof s2.padding ? s2.padding = this.cvt(s2.padding) : this.cvtArray(s2.padding);
    const r2 = t4;
    return r2.fontHeight && (r2.fontHeight = this.cvt(r2.fontHeight)), r2.minFontHeight && (r2.minFontHeight = this.cvt(r2.minFontHeight)), r2.lineSpace && "number" == typeof r2.lineSpace && (r2.lineSpace = this.cvt(r2.lineSpace)), r2.charSpace && (r2.charSpace = this.cvt(r2.charSpace)), t4;
  }
  inverseColors() {
    return this.cvs.inverseColors();
  }
  horizontalFlip() {
    return this.cvs.horizontalFlip();
  }
  getImageData() {
    return this.cvs.getImageData();
  }
}
function f(t4, e2, i2, n2) {
  return new (i2 || (i2 = Promise))(function(e3, s2) {
    function r2(t5) {
      try {
        o2(n2.next(t5));
      } catch (t6) {
        s2(t6);
      }
    }
    function a2(t5) {
      try {
        o2(n2.throw(t5));
      } catch (t6) {
        s2(t6);
      }
    }
    function o2(t5) {
      var n3;
      t5.done ? e3(t5.value) : (n3 = t5.value, n3 instanceof i2 ? n3 : new i2(function(t6) {
        t6(n3);
      })).then(r2, a2);
    }
    o2((n2 = n2.apply(t4, [])).next());
  });
}
m.BORDER_DPM_DEFAULT = 8, "function" == typeof SuppressedError && SuppressedError;
class C {
  constructor(t4, e2) {
    this.cols = t4 || 0, this.rows = e2 || 0, this.data = new Uint8Array(this.rows * this.cols);
  }
  get reservedBit() {
    return this._reservedBit || (this._reservedBit = new Uint8Array(this.data.length)), this._reservedBit;
  }
  set(t4, e2, i2, n2) {
    const s2 = t4 * this.cols + e2;
    this.data[s2] = "number" == typeof i2 ? i2 : i2 ? 1 : 0, n2 && (this.reservedBit[s2] = 1);
  }
  get(t4, e2) {
    return this.data[t4 * this.cols + e2];
  }
  getRowData(t4) {
    const e2 = (t4 || 0) * this.cols;
    return this.data.slice(e2, e2 + this.cols);
  }
  getColData(t4) {
    return this.data.filter((e2, i2) => i2 % this.cols === t4);
  }
  xor(t4, e2, i2) {
    this.data[t4 * this.cols + e2] ^= i2 ? 1 : 0;
  }
  fill(t4, e2, i2, n2) {
    const s2 = (e2 || 0) * this.cols + (i2 || 0);
    let r2 = 0;
    r2 = "number" == typeof n2 ? n2 > 0 ? s2 + n2 : this.data.length + n2 : this.data.length, this.data.fill(t4, s2, r2);
  }
  setArray(t4, e2, i2) {
    const n2 = (e2 || 0) * this.cols + (i2 || 0);
    this.data.set(t4, n2);
  }
  addRow(t4, e2, i2) {
    e2 >= this.data.length ? common_vendor.index.__f__("error", "at uni_modules/dothan-lpapi-ble/js_sdk/index.js:33", `offset: ${e2} 越界`) : (i2 && i2 < t4.length && (t4 = t4.slice(0, i2)), this.data.set(t4, e2));
  }
  isReserved(t4, e2) {
    return this._reservedBit ? this._reservedBit[t4 * this.cols + e2] : 0;
  }
}
const P = Object.freeze({ nullCharacter: 0, maxAsciiCharacter: 127, lineFeed: 10, LF: 10, carriageReturn: 13, CR: 13, lineSeparator: 8232, paragraphSeparator: 8233, nextLine: 133, space: 32, nonBreakingSpace: 160, enQuad: 8192, emQuad: 8193, enSpace: 8194, emSpace: 8195, threePerEmSpace: 8196, fourPerEmSpace: 8197, sixPerEmSpace: 8198, figureSpace: 8199, punctuationSpace: 8200, thinSpace: 8201, hairSpace: 8202, zeroWidthSpace: 8203, narrowNoBreakSpace: 8239, ideographicSpace: 12288, mathematicalSpace: 8287, ogham: 5760, _: 95, $: 36, num_0: 48, num_9: 57, a: 97, z: 122, A: 65, Z: 90, ampersand: 38, asterisk: 42, at: 64, backslash: 92, backtick: 96, bar: 124, caret: 94, closeBrace: 125, closeBracket: 93, closeParen: 41, colon: 58, comma: 44, dot: 46, doubleQuote: 34, equals: 61, exclamation: 33, greaterThan: 62, hash: 35, lessThan: 60, minus: 45, openBrace: 123, openBracket: 91, openParen: 40, percent: 37, plus: 43, question: 63, semicolon: 59, singleQuote: 39, slash: 47, tilde: 126, backspace: 8, formFeed: 12, byteOrderMark: 65279, tab: 9, verticalTab: 11 });
class b {
  static isDigit(t4) {
    return "number" == typeof t4 ? t4 >= P.num_0 && t4 <= P.num_9 : t4 >= "0" && t4 <= "9";
  }
  static isDigits(t4, e2, i2) {
    const n2 = e2 || 0, s2 = i2 ? n2 + i2 : t4.length;
    return !(s2 > t4.length) && t4.substring(n2, s2).match(/^[0-9]+$/);
  }
  static isUpper(t4) {
    return "number" == typeof t4 ? t4 >= P.A && t4 <= P.Z : t4 >= "A" && t4 <= "Z";
  }
  static isLower(t4) {
    return "number" == typeof t4 ? t4 >= P.a && t4 <= P.z : t4 >= "a" && t4 <= "z";
  }
  static ctoi(t4) {
    const e2 = "string" == typeof t4 ? t4.charCodeAt(0) : t4;
    return e2 >= P.num_0 && e2 <= P.num_9 ? e2 - P.num_0 : e2 >= P.A && e2 <= P.Z ? e2 - P.A + 10 : e2 >= P.a && e2 <= P.z ? e2 - P.a + 10 : -1;
  }
  static itoc(t4) {
    return t4 >= 0 && t4 <= 9 ? `${t4}` : String.fromCharCode(t4 - 10 + P.A);
  }
  static repeatChar(t4, e2) {
    const i2 = [];
    for (let n2 = 0; n2 < e2; n2++)
      i2.push(t4);
    return i2.join("");
  }
  static preFillChar(t4, e2, i2) {
    return t4.length < e2 ? Array(e2 - t4.length + 1).join(i2) + t4 : t4;
  }
}
class y {
  static isISO_8859_1(t4) {
    if (!t4)
      return false;
    for (let e2 = 0; e2 < t4.length; e2++)
      if (t4.charCodeAt(e2) > 255)
        return false;
    return true;
  }
  static getCharCodes(t4) {
    t4 = t4 || "";
    const e2 = [];
    for (let i2 = 0; i2 < t4.length; i2++)
      e2.push(t4.charCodeAt(i2));
    return e2;
  }
  static getCharCodeArrayString(t4) {
    return t4.map((t5) => String.fromCharCode(t5)).join("");
  }
  static encodeUtf8(t4) {
    const e2 = [];
    for (let i2 = 0; i2 < t4.length; i2++) {
      let n2 = t4.charCodeAt(i2);
      if (n2 >= 55296 && n2 <= 56319 && t4.length > i2 + 1) {
        const e3 = t4.charCodeAt(i2 + 1);
        e3 >= 56320 && e3 <= 57343 && (n2 = 1024 * (n2 - 55296) + e3 - 56320 + 65536, i2 += 1);
      }
      n2 < 128 ? e2.push(n2) : n2 < 2048 ? (e2.push(n2 >> 6 | 192), e2.push(63 & n2 | 128)) : n2 < 55296 || n2 >= 57344 && n2 < 65536 ? (e2.push(224 | n2 >> 12), e2.push(128 | n2 >> 6 & 63), e2.push(128 | 63 & n2)) : n2 >= 65536 && n2 <= 1114111 ? (e2.push(240 | n2 >> 18), e2.push(128 | n2 >> 12 & 63), e2.push(128 | n2 >> 6 & 63), e2.push(128 | 63 & n2)) : e2.push(239, 191, 189);
    }
    return new Uint8Array(e2);
  }
  static getBytes_Utf8(t4) {
    try {
      return new TextEncoder().encode(t4);
    } catch (e2) {
      return common_vendor.index.__f__("log", "at uni_modules/dothan-lpapi-ble/js_sdk/index.js:33", "DzTextEncoder.encode: TextEncoder is not defined"), this.encodeUtf8(t4);
    }
  }
  static getBytes_ISO8859_1(t4) {
    return t4 = unescape(encodeURIComponent(t4)), Uint8Array.from(this.getCharCodes(t4));
  }
  static getBytes_Unicode(t4) {
    return Uint8Array.from(this.getCharCodes(t4));
  }
  static getBytes(t4, e2) {
    return t4 = t4 || "", e2 ? y.getBytes_Utf8(t4) : y.getBytes_Unicode(t4);
  }
  static hasBase256Chars(t4) {
    const e2 = "string" == typeof t4 ? t4.split("").map((t5) => t5.charCodeAt(0)) : t4;
    if ((null == e2 ? void 0 : e2.length) > 0) {
      for (const t5 of e2)
        if (t5 >= 128)
          return true;
    }
    return false;
  }
  static encodeUnicodeFromUtf8(t4) {
    let e2 = 0, i2 = 0, n2 = 0;
    const s2 = [];
    do {
      if (t4[i2] <= 127)
        s2[n2] = t4[i2], e2 = i2 + 1, n2++;
      else {
        if (t4[i2] >= 128 && t4[i2] <= 191)
          return;
        if (t4[i2] >= 192 && t4[i2] <= 193)
          return;
        if (t4[i2] >= 194 && t4[i2] <= 223)
          s2[n2] = ((31 & t4[i2]) << 6) + (63 & t4[i2 + 1]), e2 = i2 + 2, n2++;
        else if (t4[i2] >= 224 && t4[i2] <= 239)
          s2[n2] = ((15 & t4[i2]) << 12) + ((63 & t4[i2 + 1]) << 6) + (63 & t4[i2 + 2]), e2 = i2 + 3, n2++;
        else if (t4[i2] >= 240)
          return;
      }
      i2 = e2;
    } while (i2 < t4.length);
    return s2;
  }
}
var R;
!function(t4) {
  t4[t4.UPC_A = 20] = "UPC_A", t4[t4.UPC_E = 21] = "UPC_E", t4[t4.EAN13 = 22] = "EAN13", t4[t4.EAN8 = 23] = "EAN8", t4[t4.CODE39 = 24] = "CODE39", t4[t4.ITF25 = 25] = "ITF25", t4[t4.CODABAR = 26] = "CODABAR", t4[t4.CODE93 = 27] = "CODE93", t4[t4.CODE128 = 28] = "CODE128", t4[t4.ISBN = 29] = "ISBN", t4[t4.ECODE39 = 30] = "ECODE39", t4[t4.ITF14 = 31] = "ITF14", t4[t4.ChinaPost = 32] = "ChinaPost", t4[t4.Matrix25 = 33] = "Matrix25", t4[t4.Industrial25 = 34] = "Industrial25", t4[t4.GS1_128 = 35] = "GS1_128", t4[t4.EAN128 = 35] = "EAN128", t4[t4.AUTO = 60] = "AUTO";
}(R || (R = {}));
class I {
  constructor(t4, e2) {
    this.data = t4 || "", this.text = e2.text || t4 || "", this.options = e2;
  }
  encode(t4, e2) {
    return {};
  }
}
const A = 103, E = 104, D = 105, v = { [A]: 0, [E]: 1, [D]: 2 }, w = { 101: 0, 100: 1, 99: 2 }, x = String.fromCharCode(208), _ = String.fromCharCode(209), O = String.fromCharCode(210), T = "[\0-_È-Ï]", S = "[ -È-Ï]", M = [11011001100, 11001101100, 11001100110, 10010011e3, 10010001100, 10001001100, 10011001e3, 10011000100, 10001100100, 11001001e3, 11001000100, 11000100100, 10110011100, 10011011100, 10011001110, 10111001100, 10011101100, 10011100110, 11001110010, 11001011100, 11001001110, 11011100100, 11001110100, 11101101110, 11101001100, 11100101100, 11100100110, 11101100100, 11100110100, 11100110010, 11011011e3, 11011000110, 11000110110, 10100011e3, 10001011e3, 10001000110, 10110001e3, 10001101e3, 10001100010, 11010001e3, 11000101e3, 11000100010, 10110111e3, 10110001110, 10001101110, 10111011e3, 10111000110, 10001110110, 11101110110, 11010001110, 11000101110, 11011101e3, 11011100010, 11011101110, 11101011e3, 11101000110, 11100010110, 11101101e3, 11101100010, 11100011010, 11101111010, 11001000010, 11110001010, 1010011e4, 10100001100, 1001011e4, 10010000110, 10000101100, 10000100110, 1011001e4, 10110000100, 1001101e4, 10011000010, 10000110100, 10000110010, 11000010010, 1100101e4, 11110111010, 11000010100, 10001111010, 10100111100, 10010111100, 10010011110, 10111100100, 10011110100, 10011110010, 11110100100, 11110010100, 11110010010, 11011011110, 11011110110, 11110110110, 10101111e3, 10100011110, 10001011110, 10111101e3, 10111100010, 11110101e3, 11110100010, 10111011110, 10111101110, 11101011110, 11110101110, 11010000100, 1101001e4, 11010011100, 1100011101011];
class B extends I {
  constructor(t4, e2) {
    super(t4.substring(1), e2), this.bytes = t4.split("").map((t5) => t5.charCodeAt(0));
  }
  valid() {
    return /^[\x00-\x7F\xC8-\xD3]+$/.test(this.data);
  }
  encode() {
    const t4 = this.bytes, e2 = (t4.shift() || 0) - 105, i2 = v[e2];
    if (void 0 === i2)
      throw new RangeError("The encoding does not start with a start character.");
    this.shouldEncodeAsEan128() && t4.unshift(207);
    const n2 = B.next(t4, 1, i2);
    return { items: [{ text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, "") : this.text, data: B.getBar(e2) + n2.result + B.getBar((n2.checksum + e2) % 103) + B.getBar(106) }], text: this.text, options: this.options };
  }
  shouldEncodeAsEan128() {
    return this.options.ean128;
  }
  static getBar(t4) {
    return M[t4] ? M[t4].toString() : "";
  }
  static correctIndex(t4, e2) {
    if (0 === e2) {
      const e3 = t4.shift() || 0;
      return e3 < 32 ? e3 + 64 : e3 - 32;
    }
    return 1 === e2 ? (t4.shift() || 0) - 32 : 10 * ((t4.shift() || 0) - 48) + (t4.shift() || 0) - 48;
  }
  static next(t4, e2, i2) {
    if (!t4.length)
      return { result: "", checksum: 0 };
    let n2, s2;
    if (t4[0] >= 200) {
      s2 = (t4.shift() || 0) - 105;
      const r3 = w[s2] || 0;
      void 0 !== r3 ? n2 = B.next(t4, e2 + 1, r3) : (0 !== i2 && 1 !== i2 || 98 !== s2 || (t4[0] = 0 === i2 ? t4[0] > 95 ? t4[0] - 96 : t4[0] : t4[0] < 32 ? t4[0] + 96 : t4[0]), n2 = B.next(t4, e2 + 1, i2));
    } else
      s2 = B.correctIndex(t4, i2), n2 = B.next(t4, e2 + 1, i2);
    const r2 = s2 * e2;
    return { result: B.getBar(s2) + n2.result, checksum: r2 + n2.checksum };
  }
}
const L = (t4) => {
  const e2 = t4.match(new RegExp(`^${T}*`));
  return e2 ? e2[0].length : 0;
}, N = (t4) => {
  const e2 = t4.match(new RegExp(`^${S}*`));
  return e2 ? e2[0].length : 0;
}, j = (t4) => {
  const e2 = t4.match(new RegExp("^(Ï*[0-9]{2}Ï*)*"));
  return e2 ? e2[0] : "";
};
function U(t4, e2) {
  const i2 = e2 ? T : S, n2 = t4.match(new RegExp(`^(${i2}+?)(([0-9]{2}){2,})([^0-9]|$)`));
  if (n2)
    return n2[1] + String.fromCharCode(204) + F(t4.substring(n2[1].length));
  const s2 = t4.match(new RegExp(`^${i2}+`)), r2 = s2 ? s2[0] : "";
  return r2.length === t4.length ? t4 : r2 + String.fromCharCode(e2 ? 205 : 206) + U(t4.substring(r2.length), !e2);
}
function F(t4) {
  const e2 = j(t4), i2 = e2.length;
  if (i2 === t4.length)
    return t4;
  t4 = t4.substring(i2);
  const n2 = L(t4) >= N(t4);
  return e2 + String.fromCharCode(n2 ? 206 : 205) + U(t4, n2);
}
class k extends B {
  constructor(t4, e2) {
    if (/^[\x00-\x7F\xC8-\xD3]+$/.test(t4)) {
      let i2;
      if (j(t4).length >= 2)
        i2 = O + F(t4);
      else {
        const e3 = L(t4) > N(t4);
        i2 = (e3 ? x : _) + U(t4, e3);
      }
      super(i2.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, (t5, e3) => String.fromCharCode(203) + e3), e2);
    } else
      super(t4, e2);
  }
}
const $ = { L: ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"], G: ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"], R: ["1110010", "1100110", "1101100", "1000010", "1011100", "1001110", "1010000", "1000100", "1001000", "1110100"], O: ["0001101", "0011001", "0010011", "0111101", "0100011", "0110001", "0101111", "0111011", "0110111", "0001011"], E: ["0100111", "0110011", "0011011", "0100001", "0011101", "0111001", "0000101", "0010001", "0001001", "0010111"] }, W = (t4, e2, i2) => {
  let n2 = t4.split("").map((t5, i3) => $[e2[i3]]).map((e3, i3) => e3 ? e3[t4[i3]] : "");
  if (i2) {
    const e3 = t4.length - 1;
    n2 = n2.map((t5, n3) => n3 < e3 ? t5 + i2 : t5);
  }
  return n2.join("");
};
let H = class t2 extends I {
  constructor(t4, e2) {
    super(t4, e2), this.quietZones = 0, this.guardWhitespace = false, this.quietZones = e2.quietZones || 0, this.guardWhitespace = e2.guardWhitespace || false;
  }
  encode() {
    const t4 = this.options.flat ? this.encodeFlat() : this.encodeGuarded();
    return { options: this.options, items: t4, text: this.text };
  }
  leftText(t4, e2) {
    return this.text.substr(t4, e2);
  }
  leftEncode(t4, e2) {
    return W(t4 || "", e2 || "");
  }
  rightText(t4, e2) {
    return this.text.substr(t4, e2);
  }
  rightEncode(t4, e2) {
    return W(t4 || "", e2 || "");
  }
  encodeGuarded() {
    const e2 = [{ data: t2.SIDE_BIN, text: "" }, { data: this.leftEncode(), text: this.leftText(0) }, { data: t2.MIDDLE_BIN, text: "" }, { data: this.rightEncode(), text: this.rightText() }, { data: t2.SIDE_BIN, text: "" }];
    if (this.quietZones > 0) {
      const t4 = Array(this.quietZones).fill("0").join("");
      e2.unshift({ data: t4, text: this.guardWhitespace ? "< " : "" }), e2.push({ data: t4, text: this.guardWhitespace ? " >" : "" });
    }
    return e2;
  }
  encodeFlat() {
    return [{ data: [t2.SIDE_BIN, this.leftEncode(), t2.MIDDLE_BIN, this.rightEncode(), t2.SIDE_BIN].join(""), text: this.text }];
  }
};
H.SIDE_BIN = "101", H.MIDDLE_BIN = "01010";
class J extends I {
  constructor(t4, e2) {
    super(t4, e2);
  }
  valid() {
    return -1 !== this.data.search(/^[0-9]{2}$/);
  }
  encode() {
    const t4 = J.EAN2_STRUCTURE[parseInt(this.data) % 4], e2 = { data: "1011" + W(this.data, t4, "01"), text: this.text };
    return { options: this.options, items: [e2], text: this.text };
  }
}
J.EAN2_STRUCTURE = ["LL", "LG", "GL", "GG"];
class G extends I {
  static checksum(t4) {
    return t4.split("").map((t5) => +t5).reduce((t5, e2, i2) => i2 % 2 ? t5 + 9 * e2 : t5 + 3 * e2, 0) % 10;
  }
  constructor(t4, e2) {
    super(t4, e2);
  }
  valid() {
    return -1 !== this.data.search(/^[0-9]{5}$/);
  }
  encode() {
    const t4 = G.EAN5_STRUCTURE[G.checksum(this.data)];
    return { items: [{ data: "1011" + W(this.data, t4, "01"), text: this.text }], text: this.text, options: this.options };
  }
}
G.EAN5_STRUCTURE = ["GGLLL", "GLGLL", "GLLGL", "GLLLG", "LGGLL", "LLGGL", "LLLGG", "LGLGL", "LGLLG", "LLGLG"];
class V extends H {
  static checksum(t4) {
    return (10 - t4.substring(0, 7).split("").map((t5) => +t5).reduce((t5, e2, i2) => i2 % 2 ? t5 + e2 : t5 + 3 * e2, 0) % 10) % 10;
  }
  constructor(t4, e2) {
    -1 !== t4.search(/^[0-9]{7}$/) && (t4 += V.checksum(t4)), super(t4, e2);
  }
  valid() {
    return -1 !== this.data.search(/^[0-9]{8}$/) && +this.data[7] === V.checksum(this.data);
  }
  leftText() {
    return super.leftText(0, 4);
  }
  leftEncode() {
    const t4 = this.data.substring(0, 4);
    return super.leftEncode(t4, "LLLL");
  }
  rightText() {
    return super.rightText(4, 4);
  }
  rightEncode() {
    const t4 = this.data.substring(4, 8);
    return super.rightEncode(t4, "RRRR");
  }
}
let K = class t3 extends H {
  static checksum(t4) {
    return (10 - t4.substring(0, 12).split("").map((t5) => +t5).reduce((t5, e2, i2) => i2 % 2 ? t5 + 3 * e2 : t5 + e2, 0) % 10) % 10;
  }
  constructor(e2, i2) {
    -1 !== e2.search(/^[0-9]{12}$/) && (e2 += t3.checksum(e2)), super(e2, i2);
  }
  valid() {
    return -1 !== this.data.search(/^[0-9]{13}$/) && +this.data[12] === t3.checksum(this.data);
  }
  leftText() {
    return super.leftText(1, 6);
  }
  leftEncode() {
    const e2 = this.data.substring(1, 7), i2 = t3.EAN13_STRUCTURE[Number(this.data[0])];
    return super.leftEncode(e2, i2);
  }
  rightText() {
    return super.rightText(7, 6);
  }
  rightEncode() {
    const t4 = this.data.substring(7, 13);
    return super.rightEncode(t4, "RRRRRR");
  }
  encodeGuarded() {
    const t4 = super.encodeGuarded();
    return this.quietZones > 0 ? t4[0].text = this.text[0] : t4.unshift({ data: "00000", text: this.text[0] }), t4;
  }
};
K.EAN13_STRUCTURE = ["LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG", "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"];
class z extends I {
  static checksum(t4) {
    let e2, i2 = 0;
    for (e2 = 1; e2 < 11; e2 += 2)
      i2 += parseInt(t4[e2]);
    for (e2 = 0; e2 < 11; e2 += 2)
      i2 += 3 * parseInt(t4[e2]);
    return (10 - i2 % 10) % 10;
  }
  constructor(t4, e2) {
    -1 !== t4.search(/^[0-9]{11}$/) && (t4 += z.checksum(t4)), super(t4, e2), this.displayValue = e2.displayValue;
  }
  valid() {
    return -1 !== this.data.search(/^[0-9]{12}$/) && parseInt(this.data[11]) === z.checksum(this.data);
  }
  encode() {
    return { items: this.options.flat ? this.flatEncoding() : this.guardedEncoding(), text: this.text, options: this.options };
  }
  flatEncoding() {
    let t4 = "";
    return t4 += "101", t4 += W(this.data.substring(0, 6), "LLLLLL"), t4 += "01010", t4 += W(this.data.substring(6, 6), "RRRRRR"), t4 += "101", [{ data: t4, text: this.text }];
  }
  guardedEncoding() {
    const t4 = [], e2 = "number" == typeof this.options.quietZones && this.options.quietZones > 2 ? this.options.quietZones : 2, i2 = Array(e2).fill("0").join("");
    return t4.push({ data: i2, text: this.text.substring(0, 1) }), t4.push({ data: "101" + W(this.data[0], "L") }), t4.push({ data: W(this.data.substring(1, 6), "LLLLL"), text: this.text.substring(1, 6) }), t4.push({ data: "01010" }), t4.push({ data: W(this.data.substring(6, 11), "RRRRR"), text: this.text.substring(6, 11) }), t4.push({ data: W(this.data[11], "R") + "101" }), t4.push({ data: i2, text: this.text.substring(11, 12) }), t4;
  }
}
const Z = ["XX00000XXX", "XX10000XXX", "XX20000XXX", "XXX00000XX", "XXXX00000X", "XXXXX00005", "XXXXX00006", "XXXXX00007", "XXXXX00008", "XXXXX00009"], q = [["EEEOOO", "OOOEEE"], ["EEOEOO", "OOEOEE"], ["EEOOEO", "OOEEOE"], ["EEOOOE", "OOEEEO"], ["EOEEOO", "OEOOEE"], ["EOOEEO", "OEEOOE"], ["EOOOEE", "OEEEOO"], ["EOEOEO", "OEOEOE"], ["EOEOOE", "OEOEEO"], ["EOOEOE", "OEEOEO"]];
class X extends I {
  static expandToUPCA(t4, e2) {
    const i2 = parseInt(t4[t4.length - 1]), n2 = Z[i2];
    let s2 = "", r2 = 0;
    for (let e3 = 0; e3 < n2.length; e3++) {
      const i3 = n2[e3];
      s2 += "X" === i3 ? t4[r2++] : i3;
    }
    return s2 = `${e2}${s2}`, `${s2}${z.checksum(s2)}`;
  }
  constructor(t4, e2) {
    if (super(t4, e2), this.middleDigits = "", this.upcA = "", this.isValid = false, -1 !== t4.search(/^[0-9]{6}$/))
      this.middleDigits = t4, this.upcA = X.expandToUPCA(t4, "0"), this.text = e2.text || `${this.upcA[0]}${t4}${this.upcA[this.upcA.length - 1]}`, this.isValid = true;
    else {
      if (-1 === t4.search(/^[01][0-9]{7}$/))
        return;
      if (this.middleDigits = t4.substring(1, t4.length - 1), this.upcA = X.expandToUPCA(this.middleDigits, t4[0]), this.upcA[this.upcA.length - 1] !== t4[t4.length - 1])
        return;
      this.isValid = true;
    }
    this.displayValue = e2.displayValue;
  }
  valid() {
    return this.isValid;
  }
  encode() {
    return { items: this.options.flat ? this.flatEncoding() : this.guardedEncoding(), text: this.text, options: this.options };
  }
  flatEncoding() {
    let t4 = "";
    return t4 += "101", t4 += this.encodeMiddleDigits(), t4 += "010101", [{ data: t4, text: this.text }];
  }
  guardedEncoding() {
    const t4 = [], e2 = "number" == typeof this.options.quietZones && this.options.quietZones > 2 ? this.options.quietZones : 2, i2 = Array(e2).fill("0").join("");
    return t4.push({ data: i2, text: this.text[0] }), t4.push({ data: "101", text: "" }), t4.push({ data: this.encodeMiddleDigits(), text: this.text.substring(1, 7) }), t4.push({ data: "010101", text: "" }), t4.push({ data: i2, text: this.text[7] }), t4;
  }
  encodeMiddleDigits() {
    const t4 = this.upcA[0], e2 = this.upcA[this.upcA.length - 1], i2 = q[parseInt(e2)][parseInt(t4)];
    return W(this.middleDigits, i2);
  }
}
class Y {
  constructor() {
    this.latch = true, this.allEncodes = "";
  }
  static getDigitText(t4) {
    return (t4 || "").replace(/\D/g, "");
  }
  static getInstance() {
    return this.instance || (this.instance = new Y());
  }
  static encode(t4) {
    return this.getInstance().init().expand(t4);
  }
  static checkDigit(t4, e2) {
    const i2 = e2 || t4.length;
    let n2 = 0, s2 = 1 & i2 ? 3 : 1;
    for (let e3 = 0; e3 < i2; e3++)
      n2 += s2 * parseInt(t4[e3]), s2 ^= 2;
    return String((10 - n2 % 10) % 10);
  }
  init() {
    return this.latch = true, this.allEncodes = "", this;
  }
  expand(t4) {
    let e2 = "";
    for (let i2 = 0, n2 = 0; i2 < t4.length; i2++)
      n2 = parseInt(t4[i2]), e2 += Array(n2).fill(this.latch ? "1" : "0").join(""), this.latch = !this.latch;
    return this.allEncodes += e2, e2;
  }
}
const Q = ["BBBAAA", "BBABAA", "BBAABA", "BBAAAB", "BABBAA", "BAABBA", "BAAABB", "BABABA", "BABAAB", "BAABAB"], tt = ["AAABBB", "AABABB", "AABBAB", "AABBBA", "ABAABB", "ABBAAB", "ABBBAA", "ABABAB", "ABABBA", "ABBABA"], et = ["AA", "AB", "BA", "BB"], it = ["BBAAA", "BABAA", "BAABA", "BAAAB", "ABBAA", "AABBA", "AAABB", "ABABA", "ABAAB", "AABAB"], nt = ["AAAAA", "ABABB", "ABBAB", "ABBBA", "BAABB", "BBAAB", "BBBAA", "BABAB", "BABBA", "BBABA"], st = ["3211", "2221", "2122", "1411", "1132", "1231", "1114", "1312", "1213", "3112"], rt = ["1123", "1222", "2212", "1141", "2311", "1321", "4111", "2131", "3121", "2113"], at = ["112211", "211121", "121121", "221111", "112121", "212111", "122111", "111221", "211211", "121211"], ot = ["1111212111", "2111111121", "1121111121", "2121111111", "1111211121", "2111211111", "1121211111", "1111112121", "2111112111", "1121112111"], ht = ["11221", "21112", "12112", "22111", "11212", "21211", "12211", "11122", "21121", "12121"], ct = ["1111", "211"], dt = ["411111", "41111"], ut = ["212111", "21112"], lt = ["1111", "211"];
class gt extends I {
  constructor(t4, e2) {
    super(t4 = Y.getDigitText(t4), e2);
  }
  static gs1_check_digit(t4, e2) {
    "number" == typeof e2 && (e2 > t4.length ? t4 = t4.padStart(e2, "0") : e2 < t4.length && (t4 = t4.substring(0, e2)));
    let i2 = 1 & t4.length ? 3 : 1, n2 = 0;
    for (let e3 = 0; e3 < t4.length; e3++)
      n2 += i2 * parseInt(t4[e3]), i2 ^= 2;
    return "" + (10 * Math.ceil(n2 / 10) - n2);
  }
  static c25_common(t4, e2, i2, n2, s2) {
    t4 = Y.getDigitText(t4), n2 && n2 > 0 && t4.length > n2 && (t4 = t4.substring(0, n2)), s2.checkDigit && (t4 += gt.gs1_check_digit(t4));
    const r2 = [];
    if (i2)
      for (let e3 = 0; e3 < t4.length; e3++)
        r2.push(at[t4.charCodeAt(e3) - P.num_0]);
    else
      for (let e3 = 0; e3 < t4.length; e3++)
        r2.push(ot[t4.charCodeAt(e3) - P.num_0]);
    return { options: s2, items: [{ text: t4, data: Y.encode([e2[0], ...r2, e2[1]].join("")) }], text: t4 };
  }
  static c25_inter_common(t4, e2) {
    (t4 = Y.getDigitText(t4)).length > 125 && (t4 = t4.substring(0, 125)), (t4.length % 2 == 1 && !e2.checkDigit || t4.length % 2 == 1 && e2.checkDigit) && (t4 = "0" + t4), e2.checkDigit && (t4 += gt.gs1_check_digit(t4));
    const i2 = [];
    for (let e3 = 0; e3 < t4.length; e3 += 2) {
      const n2 = ht[parseInt(t4[e3])], s2 = ht[parseInt(t4[e3 + 1])];
      for (let t5 = 0; t5 < 5; t5++)
        i2.push(`${n2[t5]}${s2[t5]}`);
    }
    return { options: e2, items: [{ text: t4, data: Y.encode([ct[0], ...i2, ct[1]].join("")) }], text: t4 };
  }
  encode() {
    return gt.c25_inter_common(this.data, this.options);
  }
}
class pt extends gt {
  encode() {
    return gt.c25_common(this.data, dt, true, 80, this.options);
  }
}
class mt extends gt {
  encode() {
    return gt.c25_common(this.data, ut, false, 45, this.options);
  }
}
class ft extends gt {
  encode() {
    return gt.c25_common(this.data, lt, true, 80, this.options);
  }
}
class Ct extends gt {
  encode() {
    let t4 = this.data;
    return t4.length > 13 ? t4 = t4.substring(0, 13) : t4.length < 13 && (t4 = t4.padStart(13, "0")), t4 += gt.gs1_check_digit(t4), this.data = this.text = t4, gt.c25_inter_common(t4, this.options);
  }
}
class Pt extends I {
  constructor(t4, e2) {
    0 === t4.search(/^[0-9\-\$\:\.\+\/]+$/) && (t4 = "A" + t4 + "A"), super(t4.toUpperCase(), e2), this.text = this.options.text || this.text.replace(/[A-D]/g, "");
  }
  valid() {
    return -1 !== this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/);
  }
  encode() {
    const t4 = [], e2 = this.getEncodings();
    for (let i2 = 0; i2 < this.data.length; i2++)
      t4.push(e2[this.data.charAt(i2)]), i2 !== this.data.length - 1 && t4.push("0");
    return { items: [{ text: this.text, data: t4.join("") }], text: this.text, options: this.options };
  }
  getEncodings() {
    return { 0: "101010011", 1: "101011001", 2: "101001011", 3: "110010101", 4: "101101001", 5: "110101001", 6: "100101011", 7: "100101101", 8: "100110101", 9: "110100101", "-": "101001101", $: "101100101", ":": "1101011011", "/": "1101101011", ".": "1101101101", "+": "1011011011", A: "1011001001", B: "1001001011", C: "1010010011", D: "1010011001" };
  }
}
const bt = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%abcd", yt = ["1112212111", "2112111121", "1122111121", "2122111111", "1112211121", "2112211111", "1122211111", "1112112121", "2112112111", "1122112111", "2111121121", "1121121121", "2121121111", "1111221121", "2111221111", "1121221111", "1111122121", "2111122111", "1121122111", "1111222111", "2111111221", "1121111221", "2121111211", "1111211221", "2111211211", "1121211211", "1111112221", "2111112211", "1121112211", "1111212211", "2211111121", "1221111121", "2221111111", "1211211121", "2211211111", "1221211111", "1211112121", "2211112111", "1221112111", "1212121111", "1212111211", "1211121211", "1112121211"], Rt = ["%U", "$A", "$B", "$C", "$D", "$E", "$F", "$G", "$H", "$I", "$J", "$K", "$L", "$M", "$N", "$O", "$P", "$Q", "$R", "$S", "$T", "$U", "$V", "$W", "$X", "$Y", "$Z", "%A", "%B", "%C", "%D", "%E", " ", "/A", "/B", "/C", "/D", "/E", "/F", "/G", "/H", "/I", "/J", "/K", "/L", "-", ".", "/O", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "/Z", "%F", "%G", "%H", "%I", "%J", "%V", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "%K", "%L", "%M", "%N", "%O", "%W", "+A", "+B", "+C", "+D", "+E", "+F", "+G", "+H", "+I", "+J", "+K", "+L", "+M", "+N", "+O", "+P", "+Q", "+R", "+S", "+T", "+U", "+V", "+W", "+X", "+Y", "+Z", "%P", "%Q", "%R", "%S", "%T"], It = ["bU", "aA", "aB", "aC", "aD", "aE", "aF", "aG", "aH", "aI", "aJ", "aK", "aL", "aM", "aN", "aO", "aP", "aQ", "aR", "aS", "aT", "aU", "aV", "aW", "aX", "aY", "aZ", "bA", "bB", "bC", "bD", "bE", " ", "cA", "cB", "cC", "$", "%", "cF", "cG", "cH", "cI", "cJ", "+", "cL", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "cZ", "bF", "bG", "bH", "bI", "bJ", "bV", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "bK", "bL", "bM", "bN", "bO", "bW", "dA", "dB", "dC", "dD", "dE", "dF", "dG", "dH", "dI", "dJ", "dK", "dL", "dM", "dN", "dO", "dP", "dQ", "dR", "dS", "dT", "dU", "dV", "dW", "dX", "dY", "dZ", "bP", "bQ", "bR", "bS", "bT"], At = ["131112", "111213", "111312", "111411", "121113", "121212", "121311", "111114", "131211", "141111", "211113", "211212", "211311", "221112", "221211", "231111", "112113", "112212", "112311", "122112", "132111", "111123", "111222", "111321", "121122", "131121", "212112", "212211", "211122", "211221", "221121", "222111", "112122", "112221", "122121", "123111", "121131", "311112", "311211", "321111", "112131", "113121", "211131", "121221", "312111", "311121", "122211"];
class Et extends I {
  constructor(t4, e2) {
    const i2 = function(t5) {
      const e3 = [], i3 = [];
      let n2 = 0, s2 = 0;
      for (let r2 = 0, a2 = "", o2 = ""; r2 < t5.length; r2++)
        if (a2 = t5[r2], s2 = t5.charCodeAt(r2), o2 = It[s2], s2 > 127)
          l.warn(`---- [encode with code93] invalid char: '${a2}'[${s2}]`);
        else {
          if (n2 + o2.length > 107) {
            l.warn(`---- content too long, discarded content[${r2} --> ${t5.length}]: "${t5.substring(r2)}"`);
            break;
          }
          e3.push(o2), i3.push(a2 > " " && 127 !== s2 ? a2 : " "), n2 += o2.length;
        }
      return { data: e3.join(""), text: i3.join("") };
    }(t4);
    e2.text = i2.text, super(i2.data, e2);
  }
  encode() {
    const t4 = [], e2 = [];
    for (let e3 = 0; e3 < this.data.length; e3++)
      t4.push(bt.indexOf(this.data[e3]));
    let i2 = 0, n2 = 1;
    for (let e3 = this.data.length - 1; e3 >= 0; e3--)
      i2 += t4[e3] * n2, n2++, 21 == n2 && (n2 = 1);
    i2 %= 47, t4.push(i2);
    let s2 = 0;
    n2 = 1;
    for (let e3 = this.data.length; e3 >= 0; e3--)
      s2 += t4[e3] * n2, n2++, 16 == n2 && (n2 = 1);
    s2 %= 47, t4.push(s2), e2.push("111141");
    for (let i3 = 0; i3 < t4.length; i3++)
      e2.push(At[t4[i3]]);
    return e2.push("1111411"), { items: [{ data: Y.encode(e2.join("")), text: this.options.mod43 ? `${this.text}${bt[i2]}${bt[s2]}` : this.text }], text: this.text, options: this.options };
  }
  valid() {
    return -1 !== this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/);
  }
}
function Dt(t4) {
  const e2 = t4.charCodeAt(0);
  return Rt[e2];
}
class vt extends I {
  constructor(t4, e2) {
    if (t4 = t4.toUpperCase(), e2.mod43) {
      const i2 = e2.text || t4, n2 = function(t5) {
        const e3 = t5.length % 43;
        return bt[e3];
      }(t4);
      t4 += n2, e2.text = i2 + n2;
    }
    super(t4, e2);
  }
  encode() {
    const t4 = [], e2 = [], i2 = this.data;
    for (let e3 = 0; e3 < i2.length; e3++) {
      const n3 = bt.indexOf(i2[e3]);
      n3 >= 0 ? t4.push(n3) : l.warn(`---- 检测到无效字符[encode with code39]: '${i2[e3]}'`);
    }
    e2.push("1211212111");
    for (let n3 = 0; n3 < i2.length; n3++)
      e2.push(yt[t4[n3]]);
    e2.push("121121211");
    const n2 = { data: Y.encode(e2.join("")), text: this.options.showStartEndChar ? `*${this.text}*` : this.text };
    return { options: this.options, items: [n2], text: this.text };
  }
}
class wt extends vt {
  constructor(t4, e2) {
    const i2 = function(t5) {
      const e3 = [], i3 = [];
      let n2 = 0, s2 = 0;
      for (let r2 = 0, a2 = "", o2 = ""; r2 < t5.length; r2++)
        if (a2 = t5[r2], s2 = t5.charCodeAt(r2), o2 = Dt(a2), s2 > 127)
          l.warn(`---- [ECode39] invalidate char: '${a2}'[${s2}]`);
        else {
          if (n2 + o2.length > 85) {
            l.warn(`---- discarded content[${r2} --> ${t5.length}]: "${t5.slice(r2)}"`);
            break;
          }
          i3.push(a2), e3.push(o2), n2 += o2.length;
        }
      return { data: e3.join(""), text: i3.join("") };
    }(t4);
    e2.text = i2.text, super(i2.data, e2);
  }
  valid() {
    return -1 !== this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/);
  }
}
class xt extends I {
  static convertUPCE2UPCA(t4) {
    (t4 = Y.getDigitText(t4)).length > 7 ? t4 = t4.substring(0, 7) : t4.length < 7 && (t4 = t4.padStart(7, "0"));
    const e2 = t4.substring(1), i2 = e2[5], n2 = Array(11).fill("0");
    switch ("1" == t4[0] && (n2[0] = "1"), n2[1] = e2[0], n2[2] = e2[1], i2) {
      case "0":
      case "1":
      case "2":
        n2[3] = i2, n2[8] = e2[2], n2[9] = e2[3], n2[10] = e2[4];
        break;
      case "3":
        n2[3] = e2[2], n2[9] = e2[3], n2[10] = e2[4], "0" != e2[2] && "1" != e2[2] && "2" != e2[2] || l.warn("271: Invalid UPC-E data, X3 shall not be equal to 0, 1 or ");
        break;
      case "4":
        n2[3] = e2[2], n2[4] = e2[3], n2[10] = e2[4], "0" == e2[3] && l.warn("272: Invalid UPC-E data, X4 shall not be equal to 0");
        break;
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        n2[3] = e2[2], n2[4] = e2[3], n2[5] = e2[4], n2[10] = i2, "0" == e2[4] && l.warn("273: Invalid UPC-E data X5 shall not be equal to 0");
    }
    return n2.join("");
  }
  static getUPCECheckCode(t4) {
    const e2 = xt.convertUPCE2UPCA(t4);
    return Y.checkDigit(e2, 11);
  }
  constructor(t4, e2) {
    (t4 = Y.getDigitText(t4)).length > 7 ? t4 = t4.substring(0, 7) : t4.length < 7 && (t4 = t4.padStart(7, "0")), super(t4, e2);
  }
  encode() {
    let t4 = this.text;
    const e2 = xt.convertUPCE2UPCA(this.text), i2 = Y.checkDigit(e2, 11);
    t4 += i2;
    let n2 = "";
    n2 = "1" == e2[0] ? tt[b.ctoi(i2)] : Q[b.ctoi(i2)];
    const s2 = [];
    for (let e3 = 0; e3 < length; e3++)
      switch (n2[e3]) {
        case "A":
          s2.push(st[t4.charCodeAt(e3) - P.num_0]);
          break;
        case "B":
          s2.push(rt[t4.charCodeAt(e3) - P.num_0]);
      }
    const r2 = [], a2 = new Y();
    return r2.push({ text: "", data: a2.expand("111") }), r2.push({ text: "", data: a2.expand(s2.join("")) }), r2.push({ text: "", data: a2.expand("111111") }), { options: this.options, items: r2, text: t4 };
  }
}
class _t extends I {
  constructor(t4, e2) {
    super(t4 = Y.getDigitText(t4), e2);
  }
  encode() {
    let t4 = this.text, e2 = "";
    if (t4.length < 2 && (t4 = t4.padStart(2, "0")), t4.length <= 2) {
      const i3 = 10 * b.ctoi(t4[0]) + b.ctoi(t4[1]);
      e2 = et[i3 % 4];
    } else {
      t4.length < 5 && (t4 = t4.padStart(5, "0"));
      const i3 = [];
      for (let e3 = 0; e3 < 5; e3++)
        i3[e3] = b.ctoi(t4[e3]);
      let n3 = 3 * (i3[0] + i3[2] + i3[4]);
      n3 += 9 * (i3[1] + i3[3]), e2 = it[n3 % 10];
    }
    const i2 = [];
    i2.push("112");
    for (let n3 = 0; n3 < t4.length; n3++) {
      switch (e2[n3]) {
        case "A":
          i2.push(st[t4.charCodeAt(n3) - P.num_0]);
          break;
        case "B":
          i2.push(rt[t4.charCodeAt(n3) - P.num_0]);
      }
      n3 != length - 1 && i2.push("11");
    }
    const n2 = [{ text: t4, data: Y.encode(i2.join("")) }];
    return { options: this.options, items: n2, text: t4 };
  }
}
class Ot extends _t {
  constructor(t4, e2) {
    super(t4 = Y.getDigitText(t4), e2);
  }
  encode() {
    let t4 = this.text;
    t4.length > 13 ? t4 = t4.substring(0, 13) : t4.length < 12 && (t4 = t4.padStart(12, "0"));
    const e2 = Y.checkDigit(t4, 12);
    12 == t4.length ? t4 += e2 : e2 !== t4[12] && (t4 = t4.substring(0, 12) + e2);
    const i2 = nt[t4.charCodeAt(0) - P.num_0], n2 = [], s2 = [];
    for (let e3 = 1; e3 < t4.length; e3++)
      e3 > 1 && e3 < 7 && "B" == i2[e3 - 2] ? e3 < 7 ? n2.push(rt[t4.charCodeAt(e3) - P.num_0]) : s2.push(rt[t4.charCodeAt(e3) - P.num_0]) : e3 < 7 ? n2.push(st[t4.charCodeAt(e3) - P.num_0]) : s2.push(st[t4.charCodeAt(e3) - P.num_0]);
    const r2 = this.options.quietZones || 0, a2 = [], o2 = new Y(), h2 = Array(r2 > 2 ? r2 : 2).fill("0").join("");
    return a2.push({ text: t4[0], data: h2 }), a2.push({ text: "", data: o2.expand("111") }), a2.push({ text: t4.substring(1, 7), data: o2.expand(n2.join("")) }), a2.push({ text: "", data: o2.expand("11111") }), a2.push({ text: t4.substring(7), data: o2.expand(s2.join("")) }), a2.push({ text: "", data: o2.expand("111") }), a2.push({ text: this.options.guardWhitespace ? " >" : "", data: h2 }), { items: a2, text: t4, options: this.options };
  }
}
class Tt extends Ot {
  static getCheckCode(t4, e2) {
    let i2 = 0, n2 = 1;
    const s2 = e2 || t4.length;
    for (let e3 = 0; e3 < s2; e3++)
      i2 += b.ctoi(t4[e3]) * n2, n2++;
    const r2 = i2 % 11;
    let a2 = b.itoc(r2);
    return 10 == r2 && (a2 = "X"), a2;
  }
  static filterText(t4) {
    const e2 = [];
    t4 = t4.toUpperCase();
    for (let i2 = 0; i2 < t4.length && !(e2.length > 13); i2++)
      if (b.isDigit(t4.charCodeAt(i2)))
        e2.push(t4[i2]);
      else if ("X" === t4[i2] && 9 === e2.length && i2 === t4.length - 1) {
        e2.push(t4[i2]);
        break;
      }
    return e2.join("");
  }
  constructor(t4, e2) {
    if (super(t4, e2), (t4 = Tt.filterText(t4)).length > 13 && (t4 = t4.substring(0, 13)), 13 == t4.length) {
      const e3 = t4.substring(0, 3);
      "978" !== e3 && "979" !== e3 && (t4 = "978" + t4.substring(3));
      const i2 = Y.checkDigit(t4, 12);
      t4[12] != i2 && (t4 = t4.substring(0, 12) + i2);
    } else
      t4.length > 10 && (t4 = t4.substring(0, 10)), t4.length < 9 && (t4 = t4.padStart(9, "0")), t4 = `978${t4.substring(0, 9)}`;
    this.data = this.text = t4;
  }
}
class St {
  static registerEncoder(t4, e2) {
    this.registedEncoderMap.set(t4, e2);
  }
  static getEncoder(t4) {
    const e2 = t4.type || R.AUTO, i2 = t4.text || "", n2 = this.registedEncoderMap.get(e2);
    if (n2 && "function" == typeof n2.encode)
      return n2;
    switch (e2) {
      case R.UPC_A:
        return new z(i2, t4);
      case R.UPC_E:
        return new X(i2, t4);
      case R.EAN13:
        return new K(i2, t4);
      case R.EAN8:
        return new V(i2, t4);
      case R.CODE39:
        return new vt(i2, t4);
      case R.ITF25:
        return new gt(i2, t4);
      case R.CODABAR:
        return new Pt(i2, t4);
      case R.CODE93:
        return new Et(i2, t4);
      case R.ISBN:
        return new Tt(i2, t4);
      case R.ECODE39:
        return new wt(i2, t4);
      case R.ITF14:
        return new Ct(i2, t4);
      case R.ChinaPost:
        return new ft(i2, t4);
      case R.Matrix25:
        return new pt(i2, t4);
      case R.Industrial25:
        return new mt(i2, t4);
      case R.CODE128:
      default:
        return new k(i2, t4);
    }
  }
  static encode(t4) {
    "boolean" != typeof t4.displayValue && (t4.displayValue = true);
    const e2 = this.getEncoder(t4), i2 = e2.encode(t4.text || "", t4);
    return i2.data || (i2.data = i2.items.map((t5) => t5.data).join("")), i2.options || (i2.options = e2.options), i2;
  }
}
St.registedEncoderMap = /* @__PURE__ */ new Map();
class Mt {
  static registerBarcodeCreator(t4, e2) {
    St.registerEncoder(t4, e2);
  }
  static IsProductType(t4) {
    switch (t4) {
      case R.EAN13:
      case R.EAN8:
      case R.UPC_A:
      case R.UPC_E:
      case R.ISBN:
        return true;
      default:
        return false;
    }
  }
  static create1DBarcode(t4) {
    const e2 = t4;
    let i2 = R.AUTO;
    "number" == typeof t4.barcodeType ? i2 = t4.barcodeType : "number" == typeof e2.type && (i2 = e2.type);
    let n2 = "number" == typeof t4.text ? `${t4.text}` : (t4.text || "").trim();
    if (n2 || (n2 = void 0 === t4.content || null === t4.content ? "" : String(t4.content)), n2) {
      n2 = this.normalize(n2, i2);
      try {
        let e3 = 0;
        switch (i2) {
          case R.EAN13:
          case R.UPC_A:
          case R.UPC_E:
          case R.ISBN:
            e3 = Mt.DockHorMargin;
        }
        return St.encode({ text: n2, type: i2, quietZones: e3, showStartEndChar: t4.showStartEnd });
      } catch (t5) {
        return void l.warn(t5);
      }
    }
  }
  static normalize(t4, e2) {
    if (e2 === R.CODE39 || e2 === R.CODE93)
      t4 = this.normalizeLength(t4, 107, (t5) => t5 >= 0 && t5 < 128, "?");
    else {
      if (e2 === R.CODABAR) {
        const e3 = "0123456789-$:/.+ABCD";
        let i2, n2;
        if (t4.length >= 2) {
          const e4 = "ABCD", s2 = "TN*E";
          i2 = t4.charAt(0).toUpperCase(), n2 = t4.charAt(t4.length - 1).toUpperCase();
          const r2 = e4.indexOf(i2) >= 0 && e4.indexOf(n2) >= 0, a2 = s2.indexOf(i2) >= 0 && s2.indexOf(n2) >= 0;
          r2 || a2 ? t4 = t4.substring(1, t4.length - 1) : i2 = n2 = "A";
        } else
          i2 = n2 = "A";
        return i2 + (t4 = this.normalizeLength(t4, 0, (t5) => e3.indexOf(String.fromCharCode(t5)) >= 0, "0")) + n2;
      }
      if (e2 === R.EAN13)
        t4 = this.normalizeDigitLength(t4, 12), t4 += this.getEAN13CheckCode(t4);
      else if (e2 === R.EAN8)
        t4 = this.normalizeDigitLength(t4, 7), t4 += this.getEAN8CheckCode(t4);
      else if (e2 === R.UPC_A)
        t4 = this.normalizeDigitLength(t4, 11), t4 += Y.checkDigit(t4);
      else if (e2 === R.UPC_E) {
        const e3 = (t4 = this.normalizeDigitLength(t4, 7)).charAt(0);
        "0" !== e3 && "1" !== e3 && (t4 = "0" + t4.substring(1)), t4 += xt.getUPCECheckCode(t4);
      } else if (e2 === R.ITF14)
        t4 = this.normalizeDigitLength(t4, 13), t4 += this.getITD14CheckCode(t4);
      else {
        if (e2 === R.ITF25)
          return (t4 = this.normalizeLength(t4, 80, (t5) => b.isDigit(t5), "0")).length % 2 != 0 ? "0" + t4 : t4;
        if (e2 === R.GS1_128)
          if ("(" === t4[0]) {
            if (t4.indexOf(")") < 0) {
              const e3 = t4.indexOf("]");
              e3 > 0 && (t4 = t4.substring(0, e3) + ")" + t4.substring(e3 + 1));
            }
          } else if ("[" === t4[0]) {
            if (t4.indexOf("]") < 0) {
              const e3 = t4.indexOf(")");
              e3 > 0 && (t4 = t4.substring(0, e3) + "]" + t4.substring(e3 + 1));
            }
          } else
            t4.length < 2 && (t4 = "0" + t4), t4 = t4.length <= 20 ? "(10)" + t4 : t4.length <= 30 ? "(90)" + t4 : "(91)" + t4;
        else
          t4 = this.normalizeLength(t4, 80, (t5) => t5 >= 32 && t5 <= 126, "?");
      }
    }
    return t4;
  }
  static normalizeDigitLength(t4, e2) {
    return (t4 = this.normalizeLength(t4, e2, (t5) => b.isDigit(t5), "0")).length < e2 && (t4 = b.preFillChar(t4, e2, "0")), t4;
  }
  static normalizeLength(t4, e2, i2, n2) {
    if (e2 > 0 && t4.length > e2 && (t4 = t4.substring(0, e2)), i2 && n2) {
      const e3 = [];
      for (let s2 = 0; s2 < t4.length; s2++)
        i2(t4.charCodeAt(s2)) ? e3.push(t4.charAt(s2)) : e3.push(n2);
      t4 = e3.join("");
    }
    return t4;
  }
  static getEAN13CheckCode(t4) {
    let e2 = 0, i2 = 0;
    for (i2 = 0; i2 < t4.length; ++i2) {
      const n2 = t4.charCodeAt(i2) - P.num_0;
      if (n2 < 0 || n2 > 9)
        throw "检测到非发字符";
      e2 += (1 & i2 ? 3 : 1) * n2;
    }
    return e2 = 10 - e2 % 10, 10 == e2 && (e2 = 0), String(e2);
  }
  static getEAN8CheckCode(t4) {
    return Y.checkDigit(t4);
  }
  static getITD14CheckCode(t4) {
    return Y.checkDigit(t4);
  }
}
var Bt;
Mt.DockHorMargin = 7, function(t4) {
  t4[t4.Low = 0] = "Low", t4[t4.Middle = 1] = "Middle", t4[t4.Quality = 2] = "Quality", t4[t4.High = 3] = "High";
}(Bt || (Bt = {}));
const Lt = [0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706];
class Nt {
  static getSymbolSize(t4) {
    if (!t4)
      throw new Error('"version" cannot be null or undefined');
    if (t4 < 1 || t4 > 40)
      throw new Error('"version" should be in range from 1 to 40');
    return 4 * t4 + 17;
  }
  static getSymbolTotalCodewords(t4) {
    return Lt[t4];
  }
  static getBCHDigit(t4) {
    let e2 = 0;
    for (; 0 !== t4; )
      e2++, t4 >>>= 1;
    return e2;
  }
  static calcWaterMarkSeed(t4) {
    if ("number" == typeof t4)
      return t4;
    if ("string" == typeof t4) {
      if (!t4)
        return 1024;
      let e2 = 4660;
      const i2 = y.getBytes_Utf8(t4);
      for (let t5 = 0; t5 < i2.length; ++t5)
        e2 += e2 >>> 5, e2 += (255 & i2[t5]) * (2 & t5 ? 5 : 3), e2 += 1 & t5 ? 13 : 11;
      return 1025 + (1048575 & e2);
    }
    return 0;
  }
  static hasWaterMarkSeed(t4, e2, i2) {
    if (!e2 || e2.length < 3)
      return false;
    let n2, s2;
    if ((255 & e2[0]) >>> 4 == 5)
      if (9 == (15 & e2[0])) {
        if (e2.length < 4)
          return false;
        if ((255 & e2[1]) >>> 4 != 3)
          return false;
        if (13 != (15 & e2[1]))
          return false;
        n2 = (255 & e2[2]) >>> 6 & 3, s2 = (63 & e2[2]) << 4 | (255 & e2[3]) >>> 4;
      } else {
        if (3 != (15 & e2[0]))
          return false;
        if ((255 & e2[1]) >>> 4 != 13)
          return false;
        n2 = (255 & e2[1]) >>> 2 & 3, s2 = (3 & e2[1]) << 8 | 255 & e2[2];
      }
    else {
      if ((255 & e2[0]) >>> 4 != 3)
        return false;
      if (13 != (15 & e2[0]))
        return false;
      n2 = (255 & e2[1]) >>> 6 & 3, s2 = (63 & e2[1]) << 4 | (255 & e2[2]) >>> 4;
    }
    return 1022 == s2 || s2 == this.calcDtCheckSum(n2, i2, t4);
  }
  static calcDtCheckSum(t4, e2, i2) {
    "string" == typeof e2 && (e2 = this.calcWaterMarkSeed(e2));
    let n2 = this.sDtWaterMarkCheckSums[3 & t4];
    if (n2 = n2 + e2 & 1048575, i2 && i2.length > 0) {
      const t5 = y.getBytes_Utf8(i2);
      for (let e3 = 0; e3 < t5.length; ++e3)
        n2 += n2 >>> 5, n2 += (255 & t5[e3]) * (2 & e3 ? 5 : 3), n2 += 1 & e3 ? 13 : 11;
    }
    return n2 % 1019 + 3;
  }
}
Nt.sDtWaterMarkCheckSums = [197, 257, 571, 991];
class jt {
  static getRowColCoords(t4) {
    if (1 === t4)
      return [];
    const e2 = Math.floor(t4 / 7) + 2, i2 = Nt.getSymbolSize(t4), n2 = 145 === i2 ? 26 : 2 * Math.ceil((i2 - 13) / (2 * e2 - 2)), s2 = [i2 - 7];
    for (let t5 = 1; t5 < e2 - 1; t5++)
      s2[t5] = s2[t5 - 1] - n2;
    return s2.push(6), s2.reverse();
  }
  static getPositions(t4) {
    const e2 = [], i2 = jt.getRowColCoords(t4), n2 = i2.length;
    for (let t5 = 0; t5 < n2; t5++)
      for (let s2 = 0; s2 < n2; s2++)
        0 === t5 && 0 === s2 || 0 === t5 && s2 === n2 - 1 || t5 === n2 - 1 && 0 === s2 || e2.push([i2[t5], i2[s2]]);
    return e2;
  }
}
class Ut {
  constructor() {
    this.mBuffer = [], this.mLength = 0;
  }
  get buffer() {
    return this.mBuffer;
  }
  get length() {
    return this.mLength;
  }
  get(t4) {
    const e2 = Math.floor(t4 / 8);
    return 1 == (this.buffer[e2] >>> 7 - t4 % 8 & 1);
  }
  put(t4, e2) {
    for (let i2 = 0; i2 < e2; i2++)
      this.putBit(1 == (t4 >>> e2 - i2 - 1 & 1));
  }
  getLengthInBits() {
    return this.length;
  }
  putBit(t4) {
    const e2 = Math.floor(this.length / 8);
    this.buffer.length <= e2 && this.buffer.push(0), t4 && (this.buffer[e2] |= 128 >>> this.length % 8), this.mLength++;
  }
}
const Ft = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81], kt = [7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430];
class $t {
  static getBlocksCount(t4, e2) {
    switch (e2) {
      case Bt.Low:
        return Ft[4 * (t4 - 1) + 0];
      case Bt.Middle:
        return Ft[4 * (t4 - 1) + 1];
      case Bt.Quality:
        return Ft[4 * (t4 - 1) + 2];
      case Bt.High:
        return Ft[4 * (t4 - 1) + 3];
      default:
        return;
    }
  }
  static getTotalCodewordsCount(t4, e2) {
    switch (e2) {
      case Bt.Low:
        return kt[4 * (t4 - 1) + 0];
      case Bt.Middle:
        return kt[4 * (t4 - 1) + 1];
      case Bt.Quality:
        return kt[4 * (t4 - 1) + 2];
      case Bt.High:
        return kt[4 * (t4 - 1) + 3];
      default:
        return;
    }
  }
}
const Wt = Nt.getBCHDigit(1335);
class Ht {
  static getEccBit(t4) {
    switch (t4) {
      case Bt.Low:
        return 1;
      default:
      case Bt.Middle:
        return 0;
      case Bt.Quality:
        return 3;
      case Bt.High:
        return 2;
    }
  }
  static getEncodedBits(t4, e2) {
    const i2 = Ht.getEccBit(t4) << 3 | e2;
    let n2 = i2 << 10;
    for (; Nt.getBCHDigit(n2) - Wt >= 0; )
      n2 ^= 1335 << Nt.getBCHDigit(n2) - Wt;
    return 21522 ^ (i2 << 10 | n2);
  }
}
class Jt {
  static isValid(t4) {
    return t4 && !isNaN(t4) && t4 >= 0 && t4 <= 7;
  }
  static getPenaltyN1(t4) {
    const e2 = t4.cols;
    let i2 = 0, n2 = 0, s2 = 0, r2 = null, a2 = null;
    for (let o2 = 0; o2 < e2; o2++) {
      n2 = s2 = 0, r2 = a2 = null;
      for (let h2 = 0; h2 < e2; h2++) {
        let e3 = t4.get(o2, h2);
        e3 === r2 ? n2++ : (n2 >= 5 && (i2 += n2 - 5 + 3), r2 = e3, n2 = 1), e3 = t4.get(h2, o2), e3 === a2 ? s2++ : (s2 >= 5 && (i2 += s2 - 5 + 3), a2 = e3, s2 = 1);
      }
      n2 >= 5 && (i2 += n2 - 5 + 3), s2 >= 5 && (i2 += s2 - 5 + 3);
    }
    return i2;
  }
  static getPenaltyN2(t4) {
    const e2 = t4.cols;
    let i2 = 0;
    for (let n2 = 0; n2 < e2 - 1; n2++)
      for (let s2 = 0; s2 < e2 - 1; s2++) {
        const e3 = t4.get(n2, s2) + t4.get(n2, s2 + 1) + t4.get(n2 + 1, s2) + t4.get(n2 + 1, s2 + 1);
        4 !== e3 && 0 !== e3 || i2++;
      }
    return 3 * i2;
  }
  static getPenaltyN3(t4) {
    const e2 = t4.cols;
    let i2 = 0, n2 = 0, s2 = 0;
    for (let r2 = 0; r2 < e2; r2++) {
      n2 = s2 = 0;
      for (let a2 = 0; a2 < e2; a2++)
        n2 = n2 << 1 & 2047 | t4.get(r2, a2), a2 >= 10 && (1488 === n2 || 93 === n2) && i2++, s2 = s2 << 1 & 2047 | t4.get(a2, r2), a2 >= 10 && (1488 === s2 || 93 === s2) && i2++;
    }
    return 40 * i2;
  }
  static getPenaltyN4(t4) {
    let e2 = 0;
    const i2 = t4.data.length;
    for (let n2 = 0; n2 < i2; n2++)
      e2 += t4.data[n2];
    return 10 * Math.abs(Math.ceil(100 * e2 / i2 / 5) - 10);
  }
  static getMaskAt(t4, e2, i2) {
    switch (t4) {
      case this.Patterns.PATTERN000:
        return (e2 + i2) % 2 == 0;
      case this.Patterns.PATTERN001:
        return e2 % 2 == 0;
      case this.Patterns.PATTERN010:
        return i2 % 3 == 0;
      case this.Patterns.PATTERN011:
        return (e2 + i2) % 3 == 0;
      case this.Patterns.PATTERN100:
        return (Math.floor(e2 / 2) + Math.floor(i2 / 3)) % 2 == 0;
      case this.Patterns.PATTERN101:
        return e2 * i2 % 2 + e2 * i2 % 3 == 0;
      case this.Patterns.PATTERN110:
        return (e2 * i2 % 2 + e2 * i2 % 3) % 2 == 0;
      case this.Patterns.PATTERN111:
        return (e2 * i2 % 3 + (e2 + i2) % 2) % 2 == 0;
      default:
        throw new Error("bad maskPattern:" + t4);
    }
  }
  static applyMask(t4, e2) {
    const i2 = e2.cols;
    for (let n2 = 0; n2 < i2; n2++)
      for (let s2 = 0; s2 < i2; s2++)
        e2.isReserved(s2, n2) || e2.xor(s2, n2, this.getMaskAt(t4, s2, n2));
  }
  static getBestMask(t4, e2) {
    const i2 = Object.keys(this.Patterns).length;
    let n2 = 0, s2 = 1 / 0;
    for (let r2 = 0; r2 < i2; r2++) {
      e2(r2), this.applyMask(r2, t4);
      const i3 = this.getPenaltyN1(t4) + this.getPenaltyN2(t4) + this.getPenaltyN3(t4) + this.getPenaltyN4(t4);
      this.applyMask(r2, t4), i3 < s2 && (s2 = i3, n2 = r2);
    }
    return n2;
  }
}
Jt.Patterns = { PATTERN000: 0, PATTERN001: 1, PATTERN010: 2, PATTERN011: 3, PATTERN100: 4, PATTERN101: 5, PATTERN110: 6, PATTERN111: 7 };
const Gt = "[0-9]+";
let Vt = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
Vt = Vt.replace(/u/g, "\\u");
const Kt = "(?:(?![A-Z0-9 $%*+\\-./:]|" + Vt + ")(?:.|[\r\n]))+", zt = new RegExp("^" + Vt + "$"), Zt = new RegExp("^" + Gt + "$"), qt = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
class Xt {
  static testKanji(t4) {
    return zt.test(t4);
  }
  static testNumeric(t4) {
    return Zt.test(t4);
  }
  static testAlphanumeric(t4) {
    return qt.test(t4);
  }
}
Xt.KANJI = new RegExp(Vt, "g"), Xt.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), Xt.BYTE = new RegExp(Kt, "g"), Xt.NUMERIC = new RegExp(Gt, "g"), Xt.ALPHANUMERIC = new RegExp("[A-Z $%*+\\-./:]+", "g");
class Yt {
  static isValid(t4) {
    return !isNaN(t4) && t4 >= 1 && t4 <= 40;
  }
}
class Qt {
  static getCharCountIndicator(t4, e2) {
    if (!t4.ccBits)
      throw new Error("Invalid mode: " + t4);
    if (!Yt.isValid(e2))
      throw new Error("Invalid version: " + e2);
    return e2 >= 1 && e2 < 10 ? t4.ccBits[0] : e2 < 27 ? t4.ccBits[1] : t4.ccBits[2];
  }
  static getBestModeForData(t4) {
    return Xt.testNumeric(t4) ? this.NUMERIC : Xt.testAlphanumeric(t4) ? this.ALPHANUMERIC : Xt.testKanji(t4) ? this.KANJI : this.BYTE;
  }
  static toString(t4) {
    if (t4 && t4.id)
      return t4.id;
    throw new Error("Invalid mode");
  }
  static isValid(t4) {
    return "string" != typeof t4 && t4 && t4.bit && t4.ccBits;
  }
  static fromString(t4) {
    if ("string" != typeof t4)
      throw new Error("Param is not a string");
    switch (t4.toLowerCase()) {
      case "numeric":
        return this.NUMERIC;
      case "alphanumeric":
        return this.ALPHANUMERIC;
      case "kanji":
        return this.KANJI;
      case "byte":
        return this.BYTE;
      default:
        throw new Error("Unknown mode: " + t4);
    }
  }
  static from(t4, e2) {
    if (this.isValid(t4))
      return t4;
    try {
      return this.fromString(t4);
    } catch (t5) {
      return e2;
    }
  }
}
Qt.NUMERIC = { id: "Numeric", bit: 1, ccBits: [10, 12, 14] }, Qt.ALPHANUMERIC = { id: "Alphanumeric", bit: 2, ccBits: [9, 11, 13] }, Qt.BYTE = { id: "Byte", bit: 4, ccBits: [8, 16, 16] }, Qt.KANJI = { id: "Kanji", bit: 8, ccBits: [8, 10, 12] }, Qt.MIXED = { id: "", bit: -1, ccBits: [] }, Qt.STRUCTURED = { id: "Structured", bit: 3, ccBits: [0, 0, 0] };
const te = new Uint8Array(512), ee = new Uint8Array(256);
!function() {
  let t4 = 1;
  for (let e2 = 0; e2 < 255; e2++)
    te[e2] = t4, ee[t4] = e2, t4 <<= 1, 256 & t4 && (t4 ^= 285);
  for (let t5 = 255; t5 < 512; t5++)
    te[t5] = te[t5 - 255];
}();
class ie {
  static log(t4) {
    if (t4 < 1)
      throw new Error("log(" + t4 + ")");
    return ee[t4];
  }
  static exp(t4) {
    return te[t4];
  }
  static mul(t4, e2) {
    return 0 === t4 || 0 === e2 ? 0 : te[ee[t4] + ee[e2]];
  }
}
class ne {
  static mul(t4, e2) {
    const i2 = new Uint8Array(t4.length + e2.length - 1);
    for (let n2 = 0; n2 < t4.length; n2++)
      for (let s2 = 0; s2 < e2.length; s2++)
        i2[n2 + s2] ^= ie.mul(t4[n2], e2[s2]);
    return i2;
  }
  static mod(t4, e2) {
    let i2 = new Uint8Array(t4);
    for (; i2.length - e2.length >= 0; ) {
      const t5 = i2[0];
      for (let n3 = 0; n3 < e2.length; n3++)
        i2[n3] ^= ie.mul(e2[n3], t5);
      let n2 = 0;
      for (; n2 < i2.length && 0 === i2[n2]; )
        n2++;
      i2 = i2.slice(n2);
    }
    return i2;
  }
  static generateECPolynomial(t4) {
    let e2 = new Uint8Array([1]);
    for (let i2 = 0; i2 < t4; i2++)
      e2 = this.mul(e2, new Uint8Array([1, ie.exp(i2)]));
    return e2;
  }
}
class se {
  constructor(t4) {
    this.degree = t4, this.degree && this.initialize(this.degree);
  }
  initialize(t4) {
    this.degree = t4, this.genPoly = ne.generateECPolynomial(this.degree);
  }
  encode(t4) {
    if (!this.genPoly)
      throw new Error("Encoder not initialized");
    const e2 = new Uint8Array(t4.length + this.degree);
    e2.set(t4);
    const i2 = ne.mod(e2, this.genPoly), n2 = this.degree - i2.length;
    if (n2 > 0) {
      const t5 = new Uint8Array(this.degree);
      return t5.set(i2, n2), t5;
    }
    return i2;
  }
}
const re = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:".split("");
class ae {
  get mode() {
    return this.mMode;
  }
  get data() {
    return this.mData;
  }
  constructor(t4, e2) {
    this.mMode = t4, this.mData = e2 || "";
  }
  getLength() {
    return this.mData.length;
  }
  getBitsLength() {
    return 0;
  }
  write(t4) {
  }
}
class oe extends ae {
  constructor(t4) {
    super(Qt.ALPHANUMERIC, t4);
  }
  static getBitsLength(t4) {
    return 11 * Math.floor(t4 / 2) + t4 % 2 * 6;
  }
  getBitsLength() {
    return oe.getBitsLength(this.mData.length);
  }
  write(t4) {
    let e2;
    for (e2 = 0; e2 + 2 <= this.mData.length; e2 += 2) {
      let i2 = 45 * re.indexOf(this.mData[e2]);
      i2 += re.indexOf(this.mData[e2 + 1]), t4.put(i2, 11);
    }
    this.mData.length % 2 && t4.put(re.indexOf(this.mData[e2]), 6);
  }
}
class he extends ae {
  constructor(t4) {
    super(Qt.NUMERIC, t4);
  }
  static getBitsLength(t4) {
    return 10 * Math.floor(t4 / 3) + (t4 % 3 ? t4 % 3 * 3 + 1 : 0);
  }
  getBitsLength() {
    return he.getBitsLength(this.getLength());
  }
  write(t4) {
    let e2, i2, n2;
    for (e2 = 0; e2 + 3 <= this.mData.length; e2 += 3)
      i2 = this.mData.substr(e2, 3), n2 = parseInt(i2, 10), t4.put(n2, 10);
    const s2 = this.mData.length - e2;
    s2 > 0 && (i2 = this.mData.substr(e2), n2 = parseInt(i2, 10), t4.put(n2, 3 * s2 + 1));
  }
}
class ce extends ae {
  constructor(t4) {
    super(Qt.BYTE, t4), this.bytes = y.getBytes_Utf8(t4);
  }
  static getBitsLength(t4) {
    return 8 * t4;
  }
  getLength() {
    return this.bytes.length;
  }
  getBitsLength() {
    return 8 * this.bytes.length;
  }
  write(t4) {
    for (let e2 = 0, i2 = this.bytes.length; e2 < i2; e2++)
      t4.put(this.bytes[e2], 8);
  }
}
class de extends ae {
  constructor(t4) {
    super(Qt.KANJI, t4);
  }
  static getBitsLength(t4) {
    return 13 * t4;
  }
  getBitsLength() {
    return de.getBitsLength(this.getLength());
  }
  write(t4) {
    let e2;
    for (e2 = 0; e2 < this.mData.length; e2++) {
      let i2 = Nt.toSJISFunction ? Nt.toSJISFunction(this.mData[e2]) : this.mData.charCodeAt(e2);
      if (i2 >= 33088 && i2 <= 40956)
        i2 -= 33088;
      else {
        if (!(i2 >= 57408 && i2 <= 60351))
          throw new Error("Invalid SJIS character: " + this.mData[e2] + "\nMake sure your charset is UTF-8");
        i2 -= 49472;
      }
      i2 = 192 * (i2 >>> 8 & 255) + (255 & i2), t4.put(i2, 13);
    }
  }
}
const ue = { queue: [], sorter: null, make: function(t4) {
  const e2 = ue, i2 = {};
  t4 = t4 || {};
  for (const t5 in e2)
    e2.hasOwnProperty(t5) && (i2[t5] = e2[t5]);
  return i2.queue = [], i2.sorter = t4.sorter || e2.default_sorter, i2;
}, default_sorter: (t4, e2) => t4.cost - e2.cost, push(t4, e2) {
  this.queue.push({ value: t4, cost: e2 }), this.queue.sort(this.sorter);
}, pop() {
  return this.queue.shift();
}, empty() {
  return 0 === this.queue.length;
} }, le = { single_source_shortest_paths: function(t4, e2, i2) {
  const n2 = {}, s2 = {};
  s2[e2] = 0;
  const r2 = le.PriorityQueue.make();
  let a2, o2, h2, c2, d2, u2, l2, g2, p2;
  for (r2.push(e2, 0); !r2.empty(); )
    for (h2 in a2 = r2.pop(), o2 = null == a2 ? void 0 : a2.value, c2 = null == a2 ? void 0 : a2.cost, d2 = t4[o2] || {}, d2)
      d2.hasOwnProperty(h2) && (u2 = d2[h2], l2 = c2 + u2, g2 = s2[h2], p2 = void 0 === s2[h2], (p2 || g2 > l2) && (s2[h2] = l2, r2.push(h2, l2), n2[h2] = o2));
  if (void 0 !== i2 && void 0 === s2[i2]) {
    const t5 = ["Could not find a path from ", e2, " to ", i2, "."].join("");
    throw new Error(t5);
  }
  return n2;
}, extract_shortest_path_from_predecessor_list: function(t4, e2) {
  const i2 = [];
  let n2 = e2;
  for (; n2; )
    i2.push(n2), t4[n2], n2 = t4[n2];
  return i2.reverse(), i2;
}, find_path: function(t4, e2, i2) {
  const n2 = le.single_source_shortest_paths(t4, e2, i2);
  return le.extract_shortest_path_from_predecessor_list(n2, i2);
}, PriorityQueue: ue };
class ge {
  static getStringByteLength(t4) {
    return unescape(encodeURIComponent(t4)).length;
  }
  static getSegments(t4, e2, i2) {
    const n2 = [];
    let s2;
    for (; s2 = t4.exec(i2); )
      n2.push({ data: s2[0], index: s2.index, mode: e2, length: s2[0].length });
    return n2;
  }
  static getSegmentsFromString(t4) {
    const e2 = this.getSegments(Xt.NUMERIC, Qt.NUMERIC, t4), i2 = this.getSegments(Xt.ALPHANUMERIC, Qt.ALPHANUMERIC, t4);
    let n2, s2;
    return "function" == typeof Nt.toSJISFunction ? (n2 = this.getSegments(Xt.BYTE, Qt.BYTE, t4), s2 = this.getSegments(Xt.KANJI, Qt.KANJI, t4)) : (n2 = this.getSegments(Xt.BYTE_KANJI, Qt.BYTE, t4), s2 = []), e2.concat(i2, n2, s2).sort(function(t5, e3) {
      return t5.index - e3.index;
    }).map(function(t5) {
      return { data: t5.data, mode: t5.mode, length: t5.length, index: 0 };
    });
  }
  static getSegmentBitsLength(t4, e2) {
    switch (e2) {
      case Qt.NUMERIC:
        return he.getBitsLength(t4);
      case Qt.ALPHANUMERIC:
        return oe.getBitsLength(t4);
      case Qt.KANJI:
        return de.getBitsLength(t4);
      case Qt.BYTE:
      default:
        return ce.getBitsLength(t4);
    }
  }
  static mergeSegments(t4) {
    return t4.reduce(function(t5, e2) {
      const i2 = t5.length - 1 >= 0 ? t5[t5.length - 1] : null;
      return i2 && i2.mode === e2.mode ? (t5[t5.length - 1].data += e2.data, t5) : (t5.push(e2), t5);
    }, []);
  }
  static buildNodes(t4) {
    const e2 = [];
    for (let i2 = 0; i2 < t4.length; i2++) {
      const n2 = t4[i2];
      switch (n2.mode) {
        case Qt.NUMERIC:
          e2.push([n2, { data: n2.data, mode: Qt.ALPHANUMERIC, length: n2.length }, { data: n2.data, mode: Qt.BYTE, length: n2.length }]);
          break;
        case Qt.ALPHANUMERIC:
          e2.push([n2, { data: n2.data, mode: Qt.BYTE, length: n2.length }]);
          break;
        case Qt.KANJI:
          e2.push([n2, { data: n2.data, mode: Qt.BYTE, length: this.getStringByteLength(n2.data) }]);
          break;
        case Qt.BYTE:
          e2.push([{ data: n2.data, mode: Qt.BYTE, length: this.getStringByteLength(n2.data) }]);
      }
    }
    return e2;
  }
  static buildGraph(t4, e2) {
    const i2 = {}, n2 = { start: {} };
    let s2 = ["start"];
    for (let r2 = 0; r2 < t4.length; r2++) {
      const a2 = t4[r2], o2 = [];
      for (let t5 = 0; t5 < a2.length; t5++) {
        const h2 = a2[t5], c2 = "" + r2 + t5;
        o2.push(c2), i2[c2] = { node: h2, lastCount: 0 }, n2[c2] = {};
        for (let t6 = 0; t6 < s2.length; t6++) {
          const r3 = s2[t6];
          i2[r3] && i2[r3].node.mode === h2.mode ? (n2[r3][c2] = this.getSegmentBitsLength(i2[r3].lastCount + h2.length, h2.mode) - this.getSegmentBitsLength(i2[r3].lastCount, h2.mode), i2[r3].lastCount += h2.length) : (i2[r3] && (i2[r3].lastCount = h2.length), n2[r3][c2] = this.getSegmentBitsLength(h2.length, h2.mode) + 4 + Qt.getCharCountIndicator(h2.mode, e2));
        }
      }
      s2 = o2;
    }
    for (let t5 = 0; t5 < s2.length; t5++)
      n2[s2[t5]].end = 0;
    return { map: n2, table: i2 };
  }
  static buildSingleSegment(t4, e2) {
    let i2;
    const n2 = Qt.getBestModeForData(t4);
    if (i2 = Qt.from(e2 || "", n2), !i2 || i2 !== Qt.BYTE && (null == i2 ? void 0 : i2.bit) < n2.bit)
      throw new Error('"' + t4 + '" cannot be encoded with mode ' + Qt.toString(i2) + ".\n Suggested mode is: " + Qt.toString(n2));
    switch (i2 === Qt.KANJI && "function" != typeof Nt.toSJISFunction && (i2 = Qt.BYTE), i2) {
      case Qt.NUMERIC:
        return new he(t4);
      case Qt.ALPHANUMERIC:
        return new oe(t4);
      case Qt.KANJI:
        return new de(t4);
      case Qt.BYTE:
        return new ce(t4);
    }
  }
  static fromArray(t4) {
    return t4.reduce((t5, e2) => {
      if ("string" == typeof e2) {
        const i2 = ge.buildSingleSegment(e2);
        i2 && t5.push(i2);
      } else if (e2.data) {
        const i2 = ge.buildSingleSegment(e2.data, e2.mode);
        i2 && t5.push(i2);
      }
      return t5;
    }, []);
  }
  static fromString(t4, e2) {
    const i2 = this.getSegmentsFromString(t4), n2 = this.buildNodes(i2), s2 = this.buildGraph(n2, e2), r2 = le.find_path(s2.map, "start", "end"), a2 = [];
    for (let t5 = 1; t5 < r2.length - 1; t5++)
      a2.push(s2.table[r2[t5]].node);
    return this.fromArray(this.mergeSegments(a2));
  }
  static rawSplit(t4) {
    return this.fromArray(this.getSegmentsFromString(t4));
  }
}
const pe = Nt.getBCHDigit(7973);
class me {
  static getBestVersionForDataLength(t4, e2, i2) {
    for (let n2 = 1; n2 <= 40; n2++)
      if (e2 <= this.getCapacity(n2, i2, t4))
        return n2;
  }
  static getReservedBitsCount(t4, e2) {
    return Qt.getCharCountIndicator(t4, e2) + 4;
  }
  static getTotalBitsFromDataArray(t4, e2) {
    let i2 = 0;
    return t4.forEach(function(t5) {
      const n2 = me.getReservedBitsCount(t5.mode, e2);
      i2 += n2 + t5.getBitsLength();
    }), i2;
  }
  static getBestVersionForMixedData(t4, e2, i2) {
    const n2 = t4 && t4.length > 0 ? t4.length : 0;
    for (let t5 = 1; t5 <= 40; t5++)
      if (this.getTotalBitsFromDataArray(e2, t5) + n2 <= this.getCapacity(t5, i2, Qt.MIXED))
        return t5;
  }
  static isValid(t4) {
    return !isNaN(t4) && t4 >= 1 && t4 <= 40;
  }
  static getCapacity(t4, e2, i2) {
    if (!me.isValid(t4))
      throw new Error("Invalid QR Code version");
    void 0 === i2 && (i2 = Qt.BYTE);
    const n2 = 8 * (Nt.getSymbolTotalCodewords(t4) - ($t.getTotalCodewordsCount(t4, e2) || 0));
    if (i2 === Qt.MIXED)
      return n2;
    const s2 = n2 - this.getReservedBitsCount(i2, t4);
    switch (i2) {
      case Qt.NUMERIC:
        return Math.floor(s2 / 10 * 3);
      case Qt.ALPHANUMERIC:
        return Math.floor(s2 / 11 * 2);
      case Qt.KANJI:
        return Math.floor(s2 / 13);
      case Qt.BYTE:
      default:
        return Math.floor(s2 / 8);
    }
  }
  static getBestVersionForData(t4, e2, i2) {
    let n2;
    if (Array.isArray(e2)) {
      if (e2.length > 1)
        return this.getBestVersionForMixedData(t4, e2, i2);
      if (0 === e2.length)
        return 1;
      n2 = e2[0];
    } else
      n2 = e2;
    const s2 = t4 ? Math.ceil(t4.length / 8) : 0;
    return this.getBestVersionForDataLength(n2.mode, n2.getLength() + s2, i2);
  }
  static getEncodedBits(t4) {
    if (!me.isValid(t4) || t4 < 7)
      throw new Error("Invalid QR Code version");
    let e2 = t4 << 12;
    for (; Nt.getBCHDigit(e2) - pe >= 0; )
      e2 ^= 7973 << Nt.getBCHDigit(e2) - pe;
    return t4 << 12 | e2;
  }
}
class fe {
  static getPositions(t4) {
    const e2 = Nt.getSymbolSize(t4);
    return [[0, 0], [e2 - 7, 0], [0, e2 - 7]];
  }
}
class Ce {
  static setupFinderPattern(t4, e2) {
    const i2 = t4.cols, n2 = fe.getPositions(e2);
    for (let e3 = 0; e3 < n2.length; e3++) {
      const s2 = n2[e3][0], r2 = n2[e3][1];
      for (let e4 = -1; e4 <= 7; e4++)
        if (!(s2 + e4 <= -1 || i2 <= s2 + e4))
          for (let n3 = -1; n3 <= 7; n3++)
            r2 + n3 <= -1 || i2 <= r2 + n3 || (e4 >= 0 && e4 <= 6 && (0 === n3 || 6 === n3) || n3 >= 0 && n3 <= 6 && (0 === e4 || 6 === e4) || e4 >= 2 && e4 <= 4 && n3 >= 2 && n3 <= 4 ? t4.set(s2 + e4, r2 + n3, true, true) : t4.set(s2 + e4, r2 + n3, false, true));
    }
  }
  static setupTimingPattern(t4) {
    const e2 = t4.cols;
    for (let i2 = 8; i2 < e2 - 8; i2++) {
      const e3 = i2 % 2 == 0;
      t4.set(i2, 6, e3, true), t4.set(6, i2, e3, true);
    }
  }
  static setupAlignmentPattern(t4, e2) {
    const i2 = jt.getPositions(e2);
    for (let e3 = 0; e3 < i2.length; e3++) {
      const n2 = i2[e3][0], s2 = i2[e3][1];
      for (let e4 = -2; e4 <= 2; e4++)
        for (let i3 = -2; i3 <= 2; i3++)
          -2 === e4 || 2 === e4 || -2 === i3 || 2 === i3 || 0 === e4 && 0 === i3 ? t4.set(n2 + e4, s2 + i3, true, true) : t4.set(n2 + e4, s2 + i3, false, true);
    }
  }
  static setupVersionInfo(t4, e2) {
    const i2 = t4.cols, n2 = me.getEncodedBits(e2);
    let s2, r2, a2;
    for (let e3 = 0; e3 < 18; e3++)
      s2 = Math.floor(e3 / 3), r2 = e3 % 3 + i2 - 8 - 3, a2 = 1 == (n2 >> e3 & 1), t4.set(s2, r2, a2, true), t4.set(r2, s2, a2, true);
  }
  static setupFormatInfo(t4, e2, i2) {
    const n2 = t4.cols, s2 = Ht.getEncodedBits(e2, i2);
    let r2 = false;
    for (let e3 = 0; e3 < 15; e3++)
      r2 = 1 == (s2 >> e3 & 1), e3 < 6 ? t4.set(e3, 8, r2, true) : e3 < 8 ? t4.set(e3 + 1, 8, r2, true) : t4.set(n2 - 15 + e3, 8, r2, true), e3 < 8 ? t4.set(8, n2 - e3 - 1, r2, true) : e3 < 9 ? t4.set(8, 15 - e3 - 1 + 1, r2, true) : t4.set(8, 15 - e3 - 1, r2, true);
    t4.set(n2 - 8, 8, 1, true);
  }
  static setupData(t4, e2) {
    const i2 = t4.cols;
    let n2 = -1, s2 = i2 - 1, r2 = 7, a2 = 0;
    for (let o2 = i2 - 1; o2 > 0; o2 -= 2)
      for (6 === o2 && o2--; ; ) {
        for (let i3 = 0; i3 < 2; i3++)
          if (!t4.isReserved(s2, o2 - i3)) {
            let n3 = false;
            a2 < e2.length && (n3 = 1 == (e2[a2] >>> r2 & 1)), t4.set(s2, o2 - i3, n3), r2--, -1 === r2 && (a2++, r2 = 7);
          }
        if (s2 += n2, s2 < 0 || i2 <= s2) {
          s2 -= n2, n2 = -n2;
          break;
        }
      }
  }
  static createData(t4, e2, i2, n2) {
    i2 || (i2 = new Ut()), n2.forEach(function(e3) {
      i2.put(e3.mode.bit, 4), i2.put(e3.getLength(), Qt.getCharCountIndicator(e3.mode, t4)), e3.write(i2);
    });
    const s2 = 8 * (Nt.getSymbolTotalCodewords(t4) - ($t.getTotalCodewordsCount(t4, e2) || 0));
    for (i2.getLengthInBits() + 4 <= s2 && i2.put(0, 4); i2.getLengthInBits() % 8 != 0; )
      i2.putBit(0);
    const r2 = (s2 - i2.getLengthInBits()) / 8;
    for (let t5 = 0; t5 < r2; t5++)
      i2.put(t5 % 2 ? 17 : 236, 8);
    return this.createCodewords(i2, t4, e2);
  }
  static createCodewords(t4, e2, i2) {
    const n2 = Nt.getSymbolTotalCodewords(e2), s2 = $t.getTotalCodewordsCount(e2, i2);
    if (!s2)
      return;
    const r2 = n2 - s2, a2 = $t.getBlocksCount(e2, i2);
    if (!a2)
      return;
    const o2 = a2 - n2 % a2, h2 = Math.floor(n2 / a2), c2 = Math.floor(r2 / a2), d2 = c2 + 1, u2 = h2 - c2, l2 = new se(u2);
    let g2 = 0;
    const p2 = new Array(a2), m2 = new Array(a2);
    let f2 = 0;
    const C2 = new Uint8Array(t4.buffer);
    for (let t5 = 0; t5 < a2; t5++) {
      const e3 = t5 < o2 ? c2 : d2;
      p2[t5] = C2.slice(g2, g2 + e3), m2[t5] = l2.encode(p2[t5]), g2 += e3, f2 = Math.max(f2, e3);
    }
    const P2 = new Uint8Array(n2);
    let b2, y2, R2 = 0;
    for (b2 = 0; b2 < f2; b2++)
      for (y2 = 0; y2 < a2; y2++)
        b2 < p2[y2].length && (P2[R2++] = p2[y2][b2]);
    for (b2 = 0; b2 < u2; b2++)
      for (y2 = 0; y2 < a2; y2++)
        P2[R2++] = m2[y2][b2];
    return P2;
  }
  static create(t4) {
    let e2 = null === t4.text || void 0 === t4.text ? t4.content : t4.text;
    if (null == e2 || "" === e2)
      return;
    e2 = String(e2);
    const i2 = "number" == typeof t4.eccLevel ? t4.eccLevel : Bt.Middle;
    let n2 = "number" == typeof t4.version ? t4.version : 0, s2 = "number" == typeof t4.qrMask ? t4.qrMask : 0;
    "function" == typeof t4.toSJISFunc && (Nt.toSJISFunction = t4.toSJISFunc);
    const r2 = new Ut();
    let a2 = "number" == typeof t4.waterMarkMode ? t4.waterMarkMode : 4;
    if (t4.waterMarkSeed && a2 >= 0) {
      a2 = a2 > 3 ? 3 & Date.now() : a2;
      const i3 = this.getWaterSeedCheckSum(e2, a2, t4.waterMarkSeed);
      this.appendDtWaterMark(a2, i3, r2);
    }
    let o2 = n2;
    if (n2 <= 0) {
      const t5 = ge.rawSplit(e2);
      o2 = me.getBestVersionForData(r2, t5, i2) || 0;
    }
    const h2 = ge.fromString(e2, o2 || 40), c2 = me.getBestVersionForData(r2, h2, i2);
    if (!c2)
      throw new Error("The amount of data is too big to be stored in a QR Code");
    if (n2 <= 0)
      n2 = c2;
    else if (n2 < c2)
      throw new Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + c2 + ".\n");
    const d2 = this.createData(n2, i2, r2, h2);
    if (!d2)
      return;
    const u2 = Nt.getSymbolSize(n2), l2 = new C(u2, u2);
    return this.setupFinderPattern(l2, n2), this.setupTimingPattern(l2), this.setupAlignmentPattern(l2, n2), this.setupFormatInfo(l2, i2, 0), n2 >= 7 && this.setupVersionInfo(l2, n2), this.setupData(l2, d2), s2 <= 0 && (s2 = Jt.getBestMask(l2, this.setupFormatInfo.bind(null, l2, i2))), Jt.applyMask(s2, l2), this.setupFormatInfo(l2, i2, s2), l2;
  }
  static getWaterSeedCheckSum(t4, e2, i2) {
    const n2 = 3 & e2;
    let s2 = this.sDtWaterMarkCheckSums[n2];
    s2 = s2 + (i2 = Nt.calcWaterMarkSeed(i2)) & 1048575;
    const r2 = y.getBytes_Utf8(t4);
    for (let t5 = 0; t5 < r2.length; ++t5)
      s2 += s2 >>> 5, s2 += (255 & r2[t5]) * (2 & t5 ? 5 : 3), s2 += 1 & t5 ? 13 : 11;
    return s2 = s2 % 1019 + 3, s2;
  }
  static appendDtWaterMark(t4, e2, i2) {
    e2 = 53248 | (3 & t4) << 10 | 1023 & e2, this.appendStructuredAppend(e2 >>> 8, 255 & e2, i2);
  }
  static appendStructuredAppend(t4, e2, i2) {
    this.appendModeInfo(Qt.STRUCTURED, i2), i2.put(t4, 8), i2.put(e2, 8);
  }
  static appendModeInfo(t4, e2) {
    e2.put(t4.bit, 4);
  }
}
Ce.sDtWaterMarkCheckSums = [197, 257, 571, 991];
const Pe = Object.freeze({ Auto: "auto", QRCode: "qrcode", PDF417: "pdf417", DMCode: "dataMatrix", GMCode: "gridMatrix" });
class be {
  static getEncoder(t4) {
    if (!t4)
      return;
    t4 = t4.toUpperCase();
    const e2 = this.barcodeCreatorMap[t4];
    return l.log(`---- getBarcode2DEncoder[${t4}]: ${!!e2}`), e2;
  }
  static setEncoder(t4, e2) {
    return !(!t4 || !e2 || "function" != typeof e2.encode || (t4 = t4.toUpperCase(), l.log(`---- setBarcode2DEncoder[${t4}]:`), this.barcodeCreatorMap[t4] = e2, 0));
  }
  static checkAndRegisterEncodeModule(t4) {
    if (!t4 || !window)
      return;
    const e2 = window;
    let i2;
    if ((t4 = t4.toUpperCase()) === Pe.PDF417.toUpperCase() ? i2 = e2.DzPdf417 : t4 === Pe.DMCode.toUpperCase() ? i2 = e2.DzDataMatrix : t4 === Pe.GMCode.toUpperCase() && (i2 = e2.DzGridMatrix), i2) {
      if ("function" == typeof i2.getInstance) {
        const e3 = i2.getInstance();
        return this.setEncoder(t4, e3), e3;
      }
      return "function" == typeof i2.register ? (i2.register(this.getInstance()), this.getEncoder(t4)) : void 0;
    }
  }
  static getInstance() {
    return this._instance || (this._instance = new be());
  }
  static createQRCode(t4) {
    return Ce.create(t4);
  }
  static create2DBarcode(t4) {
    const e2 = t4.barcodeType || t4.type;
    let i2;
    return e2 && (i2 = this.getEncoder(e2), i2 || (i2 = this.checkAndRegisterEncodeModule(e2))), null !== t4.text && void 0 !== t4.text || (t4.text = t4.content), i2 ? i2.encode(t4) : Ce.create(t4);
  }
  static createPDF417(t4) {
    return t4.barcodeType || (t4.barcodeType = Pe.PDF417), this.create2DBarcode(t4);
  }
  static createDataMatrix(t4) {
    return t4.barcodeType || (t4.barcodeType = Pe.DMCode), this.create2DBarcode(t4);
  }
  static createGridMatrix(t4) {
    return t4.barcodeType || (t4.barcodeType = Pe.GMCode), this.create2DBarcode(t4);
  }
  static drawQrcode(t4, e2) {
    const i2 = Ce.create(Object.assign(Object.assign({}, e2), { eccLevel: Bt.Middle })), n2 = e2.width || t4.width;
    if (i2) {
      const e3 = new p({ canvas: t4 });
      e3.startJob({ width: n2 }), e3.draw2DBarcode({ data: i2, width: n2 });
    }
  }
  register(t4) {
    return !!t4 && be.setEncoder(t4.barcodeType, t4);
  }
}
be.barcodeCreatorMap = {};
class ye {
  constructor(t4, e2, i2) {
    if (this.contentLeft = "", this._currValue = 0, this.currLength = 0, this.contentRight = "", this.degreeOffset = 0, this.maxDegreeValue = 0, !t4)
      return;
    e2 = e2 || 1, i2 = i2 || 0;
    let n2 = -1, s2 = -1;
    for (s2 = t4.length - 1; s2 >= 0 && !b.isDigit(t4.charCodeAt(s2)); s2--)
      ;
    if (!(s2 < 0)) {
      for (n2 = s2 - 1; n2 >= 0 && b.isDigit(t4.charCodeAt(n2)) && !(s2 - n2 >= ye.MaxDegreeLength); n2--)
        ;
      n2++, this._currValue = parseInt(t4.substring(n2, s2 + 1)), this.maxDegreeValue = Number.MAX_VALUE, this.contentLeft = t4.substring(0, n2), this.contentRight = t4.substring(s2 + 1), this.currLength = i2 > 0 ? i2 : s2 - n2 + 1, this.degreeOffset = e2 || 0;
    }
  }
  get IsValid() {
    return 0 != this.degreeOffset;
  }
  get CurrValue() {
    return this._currValue;
  }
  set CurrValue(t4) {
    t4 > ye.MaxDegreeValue ? this._currValue = ye.MaxDegreeValue : this._currValue = t4 < 0 ? 0 : t4;
  }
  step(t4) {
    return this.CurrValue += this.degreeOffset * t4, this.toString();
  }
  get ShownDegree() {
    if (this.IsValid) {
      let t4 = this.CurrValue || 0;
      const e2 = t4 < 0 ? "-" : "";
      t4 = Math.abs(t4);
      const i2 = t4.toFixed();
      return `${e2}${i2.length < this.currLength ? b.repeatChar("0", this.currLength - i2.length) : ""}${i2}`;
    }
    return "";
  }
  toString() {
    return this.IsValid ? this.contentLeft + this.ShownDegree + this.contentRight : "";
  }
}
ye.MaxDegreeLength = 15, ye.MaxDegreeValue = Math.pow(10, ye.MaxDegreeLength) - 1, ye.MaxDegreeOffset = Math.pow(10, ye.MaxDegreeLength - 1);
class Re {
  get Text() {
    return this.text;
  }
  constructor() {
    this.keyGroup = [], this.text = "";
  }
  setKeyWordAction(t4) {
    this.keyWordAction = t4;
  }
  setKeys(t4) {
    if (!t4)
      return;
    t4 = t4.replace(/\\n/g, "\n"), this.text = t4;
    const e2 = [];
    let i2 = 0;
    for (let n2 = 0, s2 = 0, r2 = false; n2 < t4.length; n2++) {
      const a2 = t4.charAt(n2);
      "[" === a2 ? (r2 = true, s2 = n2) : "]" === a2 && r2 && (r2 = false, e2.push({ text: t4.substring(i2, s2) }), e2.push({ text: t4.substring(s2 + 1, n2), isKey: true }), i2 = n2 + 1);
    }
    i2 < t4.length && e2.push({ text: t4.substr(i2), isKey: e2.length < 1 }), this.keyGroup = e2;
  }
  hasKeyWord() {
    return !!this.keyGroup.find((t4) => t4.isKey);
  }
  toString(t4) {
    const e2 = [];
    let i2 = false;
    if (!this.keyWordAction)
      return t4 || this.text;
    for (const t5 of this.keyGroup)
      if (t5.isKey) {
        const n2 = this.keyWordAction(t5.text);
        void 0 !== n2 && (e2.push(n2 || ""), i2 = true);
      } else
        e2.push(t5.text);
    return !i2 && t4 ? t4 : e2.join("");
  }
}
const Ie = Object.freeze({ text: "text", barcode: "barcode", qrcode: "qrcode", pdf417: "pdf417", dataMatrix: "dataMatrix", data_matrix: "datamatrix", gridMatrix: "gridMatrix", grid_matrix: "gridmatrix", image: "image", rect: "rect", rectangle: "rectangle", ellipse: "ellipse", circle: "circle", line: "line", table: "table", arcText: "arcText", arc_text: "arctext", html: "html" });
class Ae {
  static Pix2MM(t4, e2) {
    return 25.4 * t4 / e2;
  }
  static MM2Pix(t4, e2) {
    return t4 * e2 / 25.4;
  }
  static isPreviewJobName(t4) {
    return !!t4 && ((t4 = t4.toLowerCase()).startsWith(this.JOB_NAME_PREV.substring(0, 7)) || t4.startsWith(this.JOB_NAME_TRANS.substring(0, 8)));
  }
  static isTransPrevJob(t4) {
    return !!t4 && t4.toLowerCase().startsWith(this.JOB_NAME_TRANS.substring(0, 8));
  }
  static isWhitePrevJob(t4) {
    return !!t4 && t4.toLowerCase().startsWith(this.JOB_NAME_PREV.substring(0, 7));
  }
  static calcPageHeight(t4, e2) {
    return ("number" != typeof e2 || e2 <= 0) && (e2 = 0), t4.reduce((t5, e3) => {
      const i2 = (e3.y || 0) + (e3.height || e3.fontHeight || 0);
      return i2 > t5 ? i2 : t5;
    }, 0) + (e2 > 0 ? e2 : 2);
  }
  static getJobStartOptions(t4, i2) {
    const n2 = i2 || {};
    let s2 = "number" == typeof n2.printerDPI ? n2.printerDPI : t4.printerDpi;
    "number" != typeof s2 && ("number" == typeof t4.dpi && t4.dpi > 0 ? s2 = t4.dpi : "number" == typeof t4.printerDPI && t4.printerDPI > 0 && (s2 = t4.printerDPI));
    const r2 = "number" == typeof n2.printerWidth ? n2.printerWidth : t4.printerWidth;
    return Object.assign(Object.assign({}, t4), { dpi: s2, printerDpi: s2, printerWidth: r2, svgViewBox: "string" == typeof t4.svgViewBox ? e.parseRect(t4.svgViewBox) : t4.svgViewBox, color: t4.drawColor });
  }
  static loadImageSrc(t4) {
    l.log("#### 【DrawContext.loadImage】src:");
    const e2 = "string" == typeof t4 ? t4 : t4.src;
    return l.log(e2.length > 100 ? e2.substring(0, 100) + "..." : e2), new Promise((t5) => {
      try {
        if (e2) {
          const i2 = new Image();
          i2.crossOrigin = "anonymous", i2.src = e2, i2.onload = () => {
            t5(i2);
          }, i2.onerror = (e3) => {
            l.warn(e3), t5(null);
          };
        } else
          l.warn("【DrawContext.CreateImage: src不能为空!"), t5(null);
      } catch (e3) {
        l.warn(e3, "#### 【【DrawContext.loadImage.catch】 图片加载异常，error:"), t5(null);
      }
    });
  }
  static html2ImageSrc(t4) {
    return t4 ? `data:image/svg+xml,
<svg xmlns='http://www.w3.org/2000/svg'>
<foreignObject width='100%' height='100%'>
<div xmlns='http://www.w3.org/1999/xhtml' style='font-size:16px;font-family:Helvetica'>${t4}</div>
</foreignObject>
</svg>` : t4;
  }
  static html2Image(t4) {
    const e2 = Ae.html2ImageSrc(t4);
    return Ae.loadImageSrc(e2);
  }
  static loadSvgContent(t4) {
    const e2 = new Blob([t4], { type: "image/svg+xml" });
    return new Promise((i2) => {
      const n2 = new FileReader();
      n2.onload = (t5) => {
        var e3;
        i2(null === (e3 = t5.target) || void 0 === e3 ? void 0 : e3.result);
      }, n2.onerror = (e3) => {
        l.warn(e3, `---- failed to load svg: '${t4.substring(0, 50)}...'`), i2(void 0);
      }, n2.readAsDataURL(e2);
    });
  }
  static getMargins(t4) {
    const e2 = "number" == typeof t4.margin && t4.margin >= 0 ? t4.margin : 0, i2 = "number" == typeof t4.marginH && t4.marginH >= 0 ? t4.marginH : e2, n2 = "number" == typeof t4.marginV && t4.marginV >= 0 ? t4.marginV : e2, s2 = [];
    return s2[0] = "number" == typeof t4.marginTop ? t4.marginTop : n2, s2[1] = "number" == typeof t4.marginRight ? t4.marginRight : i2, s2[2] = "number" == typeof t4.marginBottom ? t4.marginBottom : n2, s2[3] = "number" == typeof t4.marginLeft ? t4.marginLeft : i2, s2;
  }
  get Context() {
    return this.cvs.Base.Context;
  }
  get CanvasElement() {
    return this.cvs.Base.Canvas;
  }
  get Canvas() {
    return this.cvs;
  }
  get Dpi() {
    return this.cvs.Dpi;
  }
  set Dpi(t4) {
    this.cvs.Dpi = t4;
  }
  get JobInfo() {
    return this.jobOptions;
  }
  get isPrintJob() {
    return !!this.jobOptions && !this.jobOptions.isPreview;
  }
  get isPreviewJob() {
    return !!this.jobOptions && !!this.jobOptions.isPreview;
  }
  get Width() {
    return this.jobWidth;
  }
  get Height() {
    return this.jobHeight;
  }
  get Orientation() {
    return this.jobOrientation || 0;
  }
  get JobName() {
    var t4;
    return null === (t4 = this.jobOptions) || void 0 === t4 ? void 0 : t4.jobName;
  }
  get ZoomRate() {
    return this.Canvas.DPM;
  }
  set ZoomRate(t4) {
    t4 < this.mMinZoomRate && (t4 = this.mMinZoomRate), t4 > this.mMaxZoomRate && (t4 = this.mMaxZoomRate);
    const e2 = this.Canvas.DPM;
    t4 !== e2 && (this.Canvas.DPM = t4, this.CanvasElement.style && (this.CanvasElement.style.borderRadius = 0.5 * t4 + "px"), this.onZoomRateChanged(t4, e2));
  }
  get PixWidth() {
    return this.Canvas.DPM * this.Width;
  }
  get PixHeight() {
    return this.Canvas.DPM * this.Height;
  }
  get Foreground() {
    return this.Canvas.Foreground;
  }
  set Foreground(t4) {
    (t4 || "").match(/^([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/) && (t4 = `#${t4}`), this.Canvas.Foreground = t4;
  }
  get Background() {
    return this.cvs.Base.Background;
  }
  get IsApiMode() {
    return this._apiMode || false;
  }
  set IsApiMode(t4) {
    this._apiMode = t4;
  }
  constructor(t4) {
    this.jobWidth = 0, this.jobHeight = 0, this.jobOrientation = 0, this.mMinZoomRate = 0.5, this.mMaxZoomRate = 40;
    const e2 = t4 || {};
    e2.creator || (e2.creator = () => this.createCanvas()), "function" != typeof e2.onCanvasClear && (e2.onCanvasClear = (t5, e3) => {
      this.onCanvasClear(t5, e3);
    }), e2.apiMode && (e2.willReadFrequently = true, this._apiMode = true), this.cvs = new m(e2), this.mKeyWordParser = new Re();
  }
  onZoomRateChanged(t4, e2) {
  }
  createCanvas() {
    try {
      return null === document || void 0 === document ? void 0 : document.createElement("canvas");
    } catch (t4) {
      return void l.warn("---- exception of document.createElement: ", t4);
    }
  }
  onCanvasClear(t4, e2) {
  }
  loadImage(t4) {
    return Ae.loadImageSrc(t4);
  }
  loadHtml(t4) {
    const e2 = Ae.html2ImageSrc(t4);
    return this.loadImage(e2);
  }
  setMaxZoomRate(t4) {
    t4 > 0 && (this.mMaxZoomRate = t4);
  }
  setMinZoomRate(t4) {
    t4 > 0 && (this.mMinZoomRate = t4);
  }
  setOffset(t4, e2) {
    switch (this.Orientation) {
      case 1:
      case 90:
        this.Canvas.OffsetX = e2, this.Canvas.OffsetY = -t4;
        break;
      case 2:
      case 180:
        this.Canvas.OffsetX = -t4, this.Canvas.OffsetY = -e2;
        break;
      case 3:
      case 270:
        this.Canvas.OffsetX = -e2, this.Canvas.OffsetY = t4;
        break;
      default:
        this.Canvas.OffsetX = t4, this.Canvas.OffsetY = e2;
    }
  }
  save() {
    this.Canvas.Base.Context.save();
  }
  restore() {
    this.Canvas.Base.Context.restore();
  }
  setItemOrientation(t4) {
    return this.Canvas.Base.ItemOrientation = t4, true;
  }
  setItemHorizontalAlignment(t4) {
    return this.Canvas.Base.HorizontalAlign = t4, true;
  }
  setItemVerticalAlignment(t4) {
    return this.Canvas.Base.VerticalAlign = t4, true;
  }
  setFontName(t4) {
    this.Canvas.setFontName(t4);
  }
  getFontHeight() {
    return this.Canvas.getFontHeight();
  }
  setFontHeight(t4) {
    this.Canvas.setFontHeight(t4);
  }
  setLineWidth(t4) {
    this.Canvas.setLineWidth(t4);
  }
  setLineSpace(t4) {
    return this.Canvas.setLineSpace(t4), true;
  }
  parseLineSpace(t4, e2) {
    return this.Canvas.parseLineSpace(t4, e2);
  }
  setCharSpace(t4) {
    return this.Canvas.setCharSpace(t4), true;
  }
  setAutoTextLine(t4) {
    this.Canvas.Base.AutoReturn = t4;
  }
  setRotation(t4, e2, i2) {
    return this.Canvas.setRotation(t4 > 3 ? t4 : 90 * t4, e2, i2), true;
  }
  setBorderAlign(t4) {
    this.Canvas.Base.BorderAlign = t4;
  }
  resetCanvas(t4 = {}) {
    const e2 = t4.jobWidth || 0, i2 = t4.jobHeight || 0;
    e2 > 0 && this.Canvas.startJob({ width: e2, height: i2 > 0 ? i2 : e2 });
  }
  resetJobInfo(t4) {
    "number" != typeof t4.width && (t4.width = 0), "number" != typeof t4.height && (t4.height = 0), "number" != typeof t4.dpi && (t4.dpi = t4.printerDpi), "number" != typeof t4.dpi && (t4.dpi = 0), "number" != typeof t4.printerWidth && (t4.printerWidth = 0), this.jobOptions = t4, this.jobWidth = t4.width > 0 ? t4.width : 0, this.jobWidth <= 0 && t4.dpi > 0 && t4.printerWidth > 0 && (this.jobWidth = t4.printerWidth / t4.dpi * 25.4), this.jobHeight = t4.height > 0 ? t4.height : t4.width, this.jobOrientation = t4.orientation || 0, this.Canvas.Base.ItemOrientation = 0, this.Canvas.Base.HorizontalAlign = 0, this.Canvas.Base.VerticalAlign = 0;
  }
  poundToMm(t4) {
    return 25.4 * t4 / 72;
  }
  mmToPound(t4) {
    return 72 * t4 / 25.4;
  }
  isPreviewMode(t4, e2) {
    return "boolean" == typeof t4.printMode ? !t4.printMode : "boolean" == typeof t4.isPreview ? t4.isPreview : "boolean" == typeof t4.preview ? t4.preview : "boolean" == typeof t4.previewMode ? t4.previewMode : this.IsApiMode && t4.jobName ? Ae.isPreviewJobName(t4.jobName) : "boolean" == typeof e2 ? e2 : !this.IsApiMode;
  }
  startJob(t4) {
    if ((t4 = t4 || {}).width || (t4.width = t4.jobWidth || t4.labelWidth), t4.height || (t4.height = t4.jobHeight || t4.labelHeight), "number" != typeof t4.width && (t4.width = 0), "number" != typeof t4.height && (t4.height = 0), "number" != typeof t4.printerWidth && (t4.printerWidth = 0), "0" === t4.drawColor && delete t4.drawColor, !(t4.width <= 0 && t4.printerWidth <= 0))
      return !t4.backgroundImage && t4.background && (t4.backgroundImage = t4.background, delete t4.background), !t4.borderImage && t4.border && (t4.borderImage = t4.border, delete t4.border), "boolean" != typeof t4.isPreview && (t4.isPreview = this.isPreviewMode(t4)), t4.printMode = !t4.isPreview, t4.isPreview && (t4.backgroundColor || (Ae.isTransPrevJob(t4.jobName) ? t4.backgroundColor = Ae.JOB_COLOR_TRANS : t4.backgroundColor = Ae.JOB_COLOR_WHITE), t4.color || (t4.color = t4.drawColor || p.COLOR_FG_DEFAULT)), this.resetJobInfo(Object.assign({}, t4)), this.Canvas.startJob(t4) ? (t4.borderImage && ("string" == typeof t4.borderImage ? this.drawImage({ image: t4.borderImage, width: t4.width, height: t4.height }) : this.drawBorderImage({ image: t4.borderImage, svgElement: t4.svgElement, borderScale: t4.borderScale, tileMode: !t4.svgElement, svgWidth: t4.svgWidth, svgHeight: t4.svgHeight, svgViewBox: t4.svgViewBox })), t4.watermark && t4.isPreview && "string" == typeof t4.watermark && this.drawWatermark({ text: t4.watermark }), t4) : void 0;
  }
  endJob() {
    const t4 = this.jobOptions;
    if (!t4)
      return;
    const e2 = this.Canvas.commitJob();
    if (!e2)
      return;
    const i2 = Object.assign(Object.assign({}, t4), { apiMode: this.IsApiMode });
    return this.IsApiMode && (t4.isPreview ? (i2.dataUrl = e2.Canvas.toDataURL(), i2.imageData = t4.withImageData ? e2.getImageData() : void 0) : (t4.antiColor && this.Canvas.inverseColors(), t4.horizontalFlip && this.Canvas.horizontalFlip(), "boolean" != typeof t4.withDataUrl && "boolean" == typeof t4.withPreview && (t4.withDataUrl = t4.withPreview), i2.imageData = e2.getImageData(), i2.dataUrl = t4.withDataUrl ? e2.Canvas.toDataURL() : "")), i2;
  }
  commitJob() {
    return Promise.resolve(this.endJob());
  }
  drawWatermark(t4) {
    const e2 = this.jobOptions;
    if (e2) {
      const i2 = t4.width || e2.width || 0, n2 = t4.height || e2.height || 0;
      this.drawText(Object.assign(Object.assign({}, t4), { width: i2, height: n2, fontHeight: e2.watermarkFontHeight || 0.25 * Math.min(i2, n2), rotation: "number" == typeof e2.watermarkRotation ? e2.watermarkRotate : -45, color: e2.watermarkColor || "#d0d0d0", horizontalAlignment: "number" == typeof t4.horizontalAlignment ? t4.horizontalAlignment : 1, verticalAlignment: "number" == typeof t4.verticalAlignment ? t4.verticalAlignment : 1 }));
    }
  }
  drawLine(t4) {
    return "number" != typeof t4.lineWidth && (t4.lineWidth = Ae.LINE_WIDTH_MM), this.Canvas.drawLine(t4);
  }
  drawLines(t4, e2, i2, n2, s2, r2, a2) {
    r2 = r2 || [], a2 = a2 || [];
    let o2 = 0;
    this.drawLine({ x1: t4, y1: e2, x2: i2, y2: n2, lineWidth: s2 });
    for (let a3 = 0; a3 < r2.length; a3++)
      o2 += r2[a3], this.drawLine({ x1: t4, y1: e2 + o2, x2: i2, y2: n2 + o2, lineWidth: s2 });
    o2 = 0;
    for (let r3 = 0; r3 < a2.length; r3++)
      o2 += a2[r3], this.drawLine({ x1: t4 + o2, y1: e2, x2: i2 + o2, y2: n2, lineWidth: s2 });
  }
  drawRect(t4) {
    return t4.fill || "number" == typeof t4.lineWidth || (t4.lineWidth = Ae.LINE_WIDTH_MM), this.Canvas.drawRect(t4);
  }
  drawRectangle(t4) {
    return this.drawRect(t4);
  }
  fillRect(t4) {
    return this.Canvas.drawRect(Object.assign(Object.assign({}, t4), { fill: true }));
  }
  drawRoundRect(t4) {
    t4.fill || "number" == typeof t4.lineWidth || (t4.lineWidth = Ae.LINE_WIDTH_MM), this.Canvas.drawRoundRect(t4);
  }
  drawEllipse(t4) {
    return t4.fill || "number" == typeof t4.lineWidth || (t4.lineWidth = Ae.LINE_WIDTH_MM), this.Canvas.drawEllipse(t4);
  }
  drawCircle(t4) {
    return t4.fill || "number" == typeof t4.lineWidth || (t4.lineWidth = Ae.LINE_WIDTH_MM), this.Canvas.drawCircle(t4);
  }
  getMineFontHeight(t4) {
    let e2 = Ae.FONT_SIZE_MIN_DEFAULT;
    return t4.minFontHeight && t4.minFontHeight > 0 ? e2 = t4.minFontHeight : t4.minFontSize && t4.minFontSize > 0 && (e2 = t4.minFontSize), e2;
  }
  drawText(t4) {
    !t4.fontHeight && t4.fontSize && (t4.fontHeight = this.poundToMm(t4.fontSize));
    const e2 = this.getMineFontHeight(t4);
    return t4.fontHeight || (t4.fontHeight = this.Canvas.getFontHeight()), t4.fontHeight < e2 && (t4.fontHeight = e2), "string" == typeof t4.lineSpace && t4.lineSpace && /^\d*\.?\d*$/.test(t4.lineSpace) && (t4.lineSpace = parseFloat(t4.lineSpace)), this.Canvas.drawText(t4);
  }
  drawArcText(t4) {
    return !t4.fontHeight && t4.fontSize && (t4.fontHeight = this.poundToMm(t4.fontSize)), this.Canvas.drawArcText(t4);
  }
  splitText(t4) {
    return this.Canvas.splitText(t4);
  }
  measureText(t4) {
    const e2 = this.Canvas.splitText(t4);
    if (e2.length <= 0)
      return { textArray: [], width: 0, height: 0 };
    const i2 = t4.fontHeight || this.Canvas.getFontHeight(), n2 = p.getLineHeight(i2), s2 = t4.lineSpace ? this.Canvas.parseLineSpace(t4.lineSpace, t4.fontHeight || t4.height) : 0;
    let r2 = 0;
    for (const i3 of e2) {
      const e3 = this.Canvas.measureText(Object.assign(Object.assign({}, t4), { text: i3 }));
      e3.width && e3.width > r2 && (r2 = e3.width);
    }
    return { textArray: e2, lineHeight: n2, lineSpace: s2, width: this.Canvas.invertCvt(r2), height: e2.length * (n2 + s2) - s2 };
  }
  measureFontSize(t4) {
    const e2 = this.getMineFontHeight(t4);
    return t4.fontHeight || (t4.fontHeight = this.Canvas.getFontHeight()), t4.fontHeight < e2 && (t4.fontHeight = e2), this.Canvas.measureFontSize(t4);
  }
  draw1DMatrix(t4) {
    return !!t4.datas && this.Canvas.draw1DBarcode(t4);
  }
  drawBarcode(t4) {
    return "string" == typeof t4.barcodeType && t4.barcodeType ? this.draw2DBarcode(t4) : this.draw1DBarcode(t4);
  }
  draw1DBarcode(t4) {
    const e2 = Mt.create1DBarcode(t4);
    return t4.barcodeType === R.ISBN && (t4.textFlag = 2), !!e2 && this.draw1DMatrix(Object.assign(t4, { datas: e2.items }));
  }
  draw2DBarcode(t4) {
    const e2 = be.create2DBarcode(t4);
    return !!e2 && this.draw2DMatrix(Object.assign(Object.assign({}, t4), { data: e2 }));
  }
  draw2DMatrix(t4) {
    return !!t4.data && this.Canvas.draw2DBarcode(t4);
  }
  drawQRCode(t4) {
    if ("number" == typeof t4.barcodeType && (1 === t4.barcodeType ? t4.barcodeType = Pe.PDF417 : 2 === t4.barcodeType ? t4.barcodeType = Pe.DMCode : 3 === t4.barcodeType && (t4.barcodeType = Pe.GMCode)), t4.barcodeType === Pe.PDF417)
      return this.drawPDF417(t4);
    if (t4.barcodeType === Pe.DMCode)
      return this.drawDataMatrix(t4);
    if (t4.barcodeType === Pe.GMCode)
      return this.drawGridMatrix(t4);
    "number" == typeof t4.mask && (t4.qrMask = t4.mask), "number" == typeof t4.mode && (t4.qrMode = t4.mode);
    const e2 = be.create2DBarcode(t4);
    return !!e2 && this.draw2DMatrix(Object.assign(Object.assign({}, t4), { data: e2, margin: "number" == typeof t4.margin ? t4.margin : void 0 }));
  }
  draw2DQRCode(t4) {
    return this.drawQRCode(t4);
  }
  drawPDF417(t4) {
    "number" == typeof t4.pdf417EccLevel && (t4.eccLevel = t4.pdf417EccLevel), "number" == typeof t4.pdf417Cols && (t4.cols = t4.pdf417Cols), "number" != typeof t4.aspectRatio && t4.width && t4.height && (t4.aspectRatio = t4.width / t4.height);
    const e2 = be.createPDF417(t4);
    return !!e2 && this.draw2DMatrix(Object.assign(Object.assign({}, t4), { data: e2, margin: "number" == typeof t4.margin ? t4.margin : void 0 }));
  }
  draw2DPdf417(t4) {
    return this.drawPDF417(t4);
  }
  drawDataMatrix(t4) {
    "number" == typeof t4.dmCodeShape && (t4.codeShape = t4.dmCodeShape), "number" != typeof t4.aspectRatio && t4.width && t4.height && (t4.aspectRatio = t4.width / t4.height);
    const e2 = be.createDataMatrix(t4);
    return !!e2 && this.draw2DMatrix(Object.assign(Object.assign({}, t4), { data: e2, margin: "number" == typeof t4.margin ? t4.margin : void 0 }));
  }
  draw2DDataMatrix(t4) {
    return this.drawDataMatrix(t4);
  }
  drawGridMatrix(t4) {
    const e2 = be.createGridMatrix(t4);
    return !!e2 && this.draw2DMatrix(Object.assign(Object.assign({}, t4), { data: e2, margin: "number" == typeof t4.margin ? t4.margin : void 0 }));
  }
  draw2DGridMatrix(t4) {
    return this.drawGridMatrix(t4);
  }
  drawImage(t4) {
    const e2 = t4;
    if (e2.image || (e2.img ? (e2.image = e2.img, delete e2.img) : e2.imageSrc ? (e2.image = e2.imageSrc, delete e2.imageSrc) : e2.imageFile && (e2.image = e2.imageFile, delete e2.imageFile)), e2.image) {
      const t5 = e2.image;
      return t5.dzSrc && (e2.image = t5.dzSrc), this.Canvas.drawImage(e2);
    }
    return false;
  }
  drawImageResizeLabel(t4) {
    return this.Canvas.drawImageResizeLabel(t4);
  }
  drawBorderImage(t4) {
    const e2 = t4.image;
    if (!e2 || "string" == typeof e2)
      return;
    const i2 = t4.svgElement, n2 = "boolean" == typeof t4.svgMode ? t4.svgMode : !!i2;
    let s2 = e2.width || t4.imageWidth || 0, r2 = e2.height || t4.imageHeight || 0;
    if (i2) {
      l.log("---- SVG 图片适配:");
      const i3 = t4.svgViewBox, n3 = t4.svgWidth, a3 = t4.svgHeight, o3 = this.Canvas.CanvasWidth, h2 = this.Canvas.CanvasHeight;
      if (n3 && n3 > 0 || a3 && a3 > 0)
        s2 || (s2 = n3 || a3 || 0), r2 || (r2 = a3 || n3 || 0);
      else {
        let t5 = s2, n4 = r2;
        i3 && (t5 = i3.width, n4 = i3.height), t5 && n4 ? t5 / n4 > o3 / h2 ? (s2 = o3, r2 = o3 * n4 / t5) : (r2 = h2, s2 = t5 * h2 / n4) : s2 = r2 = Math.min(o3, h2), "string" != typeof e2 && (e2.width = s2, e2.height = r2);
      }
    }
    if (!s2 || !r2)
      return void l.warn("---- drawBorderImage.fail: [无法获取图片大小]！");
    const a2 = s2 / 3, o2 = r2 / 3;
    this.Canvas.drawImageResizeLabel({ img: e2.dzSrc || e2, left: a2, top: o2, right: e2.width - a2, bottom: e2.height - o2, tileMode: !n2 && t4.tileMode, relativeScale: n2 ? t4.borderScale || 1 : void 0, imageWidth: s2, imageHeight: r2 });
  }
  drawItem(t4, e2, i2) {
    const n2 = t4, s2 = this.JobInfo;
    if (s2) {
      if ("boolean" != typeof t4.printable && "boolean" == typeof t4.printing && (t4.printable = t4.printing), !s2.isPreview && "boolean" == typeof t4.printable && !t4.printable)
        return;
      t4.color && !s2.isPreview && (t4.color = void 0);
    }
    const r2 = "string" == typeof n2.layerClass ? n2.layerClass : "";
    let a2 = "string" == typeof t4.type && t4.type ? t4.type : r2;
    a2 = a2 ? a2.toLowerCase() : Ie.text;
    const o2 = "number" == typeof n2.contentType ? n2.contentType : e2 ? 2 : 0;
    if (2 === o2 && e2) {
      let t5;
      !n2.columnName && n2.dataColumnName && (n2.columnName = n2.dataColumnName), n2.columnName ? (this.mKeyWordParser.setKeys(n2.columnName), t5 = this.mKeyWordParser.hasKeyWord() ? this.mKeyWordParser.toString(n2.text) : e2[n2.columnName]) : n2.text && n2.text.indexOf("[") >= 0 && (this.mKeyWordParser.setKeys(n2.text), this.mKeyWordParser.hasKeyWord() && (t5 = this.mKeyWordParser.toString(n2.text))), void 0 !== t5 && (n2.text = t5);
    } else if (1 === o2 && i2 && i2 > 0) {
      const e3 = t4;
      e3.rawText || (e3.rawText = e3.text);
      const n3 = e3.rawText || "", s3 = new ye(n3, e3.degreeOffset, e3.degreeLength);
      s3.IsValid && (e3.text = s3.step(i2));
    }
    switch ("number" == typeof n2.horAlignment && "number" != typeof n2.horizontalAlignment && (t4.horizontalAlignment = n2.horAlignment), "number" == typeof n2.verAlignment && "number" != typeof n2.verticalAlignment && (t4.verticalAlignment = n2.verAlignment), "boolean" == typeof n2.filled && "boolean" != typeof n2.fill && (n2.fill = n2.filled), a2) {
      case Ie.text:
        return this.drawText(t4);
      case Ie.barcode:
        return this.draw1DBarcode(t4);
      case Ie.qrcode:
        return this.drawQRCode(t4);
      case Ie.pdf417:
        return this.drawPDF417(t4);
      case Ie.data_matrix:
        return this.drawDataMatrix(t4);
      case Ie.grid_matrix:
        return this.drawGridMatrix(t4);
      case Ie.image:
        return this.drawImage(t4);
      case Ie.rect:
      case Ie.rectangle:
        return this.drawRect(t4);
      case Ie.ellipse:
        return this.drawEllipse(t4);
      case Ie.circle:
        return this.drawCircle(t4);
      case Ie.arc_text:
        return this.drawArcText(t4);
      case Ie.line:
        return this.drawLine(t4);
      case Ie.table:
        return this.drawTable(t4, e2, i2);
      default:
        return l.warn(`---- 不支持的 DrawType: ${t4.type}`), false;
    }
  }
  static getUnionRectOfRelateRect(t4, i2, n2) {
    for (const s2 of i2)
      s2 !== t4 ? e.hasIntersection(t4, s2) && (n2 && n2.push(s2), t4 = e.getUnionRect(t4, s2)) : n2 && n2.push(s2);
    return t4;
  }
  static shrinkCellContent(t4, e2) {
    return { x: t4.x + e2, y: t4.y + e2, width: t4.width - 2 * e2, height: t4.height - 2 * e2 };
  }
  drawTableWithoutRotation(t4, i2, n2) {
    !t4.tableRows && Array.isArray(t4.rows) && (t4.tableRows = t4.rows);
    const s2 = t4, r2 = t4.width || 0, a2 = t4.height || 0, o2 = t4.tableRows || [];
    if (r2 <= 0 || a2 <= 0 || o2.length <= 0)
      return false;
    "number" != typeof t4.lineWidth && (t4.lineWidth = Ae.LINE_WIDTH_MM);
    const h2 = t4.lineWidth > 0 ? t4.lineWidth : 0, c2 = t4.cellPadding || 0, d2 = 0.5 * h2, u2 = "number" == typeof t4.horizontalAlignment ? t4.horizontalAlignment : 1, l2 = "number" == typeof t4.verticalAlignment ? t4.verticalAlignment : 1, g2 = t4.x || 0, p2 = t4.y || 0;
    let m2 = "number" == typeof t4.rowCount && t4.rowCount > 0 ? t4.rowCount : 0, f2 = "number" == typeof t4.columnCount && t4.columnCount > 0 ? t4.columnCount : 0;
    m2 <= 0 && (m2 = "number" == typeof t4.rows && t4.rows > 0 ? t4.rows : o2.length), f2 <= 0 && (f2 = "number" == typeof t4.columns && t4.columns > 0 ? t4.columns : o2.reduce((t5, e2) => e2 && e2.length > t5 ? e2.length : t5, 0));
    let C2 = Array(f2).fill(0);
    t4.columnWidths && t4.columnWidths.length > 1 ? C2 = t4.columnWidths : ("string" == typeof s2.colWidth && s2.colWidth && (s2.colWidth = s2.colWidth.split(",")), Array.isArray(s2.colWidth) && s2.colWidth.length > 1 && (C2 = s2.colWidth.map((t5) => t5 ? Number(t5) : 0))), C2.length > f2 ? C2 = C2.slice(0, f2) : C2.length < f2 && (C2 = C2.concat(Array(f2 - C2.length).fill(0))), C2 = C2.map((t5) => t5 > 0 ? t5 : 0);
    const P2 = C2.filter((t5) => t5 > 1).reduce((t5, e2) => t5 + e2, 0), b2 = C2.filter((t5) => t5 > 0 && t5 <= 1), y2 = C2.filter((t5) => t5 <= 0);
    let R2 = b2.reduce((t5, e2) => t5 + e2, 0);
    if (y2.length > 0)
      if (R2 >= 1) {
        const t5 = b2[b2.length - 1];
        R2 += t5 * y2.length, C2.forEach((t6, e2) => {
          t6 <= 0 && (C2[e2] = b2[b2.length - 1]);
        });
      } else {
        const t5 = (1 - R2) / y2.length;
        R2 = 1, C2.forEach((e2, i3) => {
          e2 <= 0 && (C2[i3] = t5);
        });
      }
    R2 > 0 ? C2 = C2.map((t5) => t5 > 1 ? t5 : (r2 - P2) / R2 * t5) : P2 !== r2 && (C2 = C2.map((t5) => t5 / P2 * r2));
    let I2 = Array(m2).fill(0.5);
    t4.rowHeights && t4.rowHeights.length > 1 ? I2 = t4.rowHeights : ("string" == typeof s2.rowHeight && s2.rowHeight && (s2.rowHeight = s2.rowHeight.split(",")), Array.isArray(s2.rowHeight) && s2.rowHeight.length > 1 && (I2 = s2.rowHeight.map((t5) => t5 ? Number(t5) : 0))), I2.length > m2 ? I2 = I2.slice(0, m2) : I2.length < m2 && (I2 = I2.concat(Array(m2 - I2.length).fill(I2[I2.length - 1]))), I2 = I2.map((t5) => t5 > 0 ? t5 : 0.5);
    const A2 = I2.filter((t5) => t5 > 1).reduce((t5, e2) => t5 + e2, 0), E2 = I2.filter((t5) => t5 <= 1).reduce((t5, e2) => t5 + e2, 0);
    E2 > 0 ? I2 = I2.map((t5) => t5 > 1 ? t5 : (a2 - A2) / E2 * t5) : A2 !== a2 && (I2 = I2.map((t5) => t5 / A2 * a2));
    let D2 = t4.groups || [];
    if ("string" == typeof s2.group && (D2 = s2.group.split(";").map((t5) => {
      const e2 = t5.split(",").map((t6) => t6[0] >= "0" && t6[0] <= "9" ? Number(t6) : 0);
      return e2.length > 3 ? { x: e2.length > 1 ? e2[1] - 1 : 0, y: e2.length > 0 ? e2[0] - 1 : 0, width: e2.length > 3 ? e2[3] - e2[1] + 1 : 0, height: e2.length > 2 ? e2[2] - e2[0] + 1 : 0 } : void 0;
    }).filter((t5) => !!t5)), o2.forEach((t5, e2) => {
      for (let i3 = 0; i3 < f2; i3++) {
        const n3 = t5[i3];
        if ("object" == typeof n3) {
          const t6 = n3.rowSpan || 0, s3 = n3.columnSpan || n3.colSpan || 0;
          (t6 > 1 || s3 > 1) && D2.push({ x: i3, y: e2, width: s3 > 1 ? s3 : 1, height: t6 > 1 ? t6 : 1 });
        }
      }
    }), D2.length > 1) {
      const t5 = D2.slice(0);
      D2.splice(0);
      const e2 = [];
      for (const i3 of t5) {
        if (e2.indexOf(i3) >= 0)
          continue;
        const n3 = Ae.getUnionRectOfRelateRect(i3, t5, e2);
        D2.push(n3);
      }
    }
    h2 > 0 && this.drawRect({ x: t4.x, y: t4.y, width: t4.width, height: t4.height, lineWidth: h2 });
    for (let s3 = 0, r3 = 0; s3 < m2; r3 += I2[s3], s3++) {
      const a3 = o2[s3] || [];
      for (let o3 = 0, P3 = 0; o3 < f2; P3 += C2[o3], o3++) {
        const b3 = { x: o3, y: s3, width: 1, height: 1 }, y3 = D2.filter((t5) => e.isInnerRect(b3, t5)).shift();
        if (y3) {
          if (b3.x !== y3.x || b3.y !== y3.y)
            continue;
          b3.width = y3.width, b3.height = y3.height;
        }
        const R3 = (t5, e2) => (t5 || 0) + e2, A3 = { x: g2 + P3, y: p2 + r3, width: b3.width > 0 ? C2.slice(b3.x, b3.x + b3.width).reduce(R3, 0) : C2[b3.x], height: b3.height > 0 ? I2.slice(b3.y, b3.y + b3.height).reduce(R3, 0) : I2[b3.y] };
        b3.x > 0 && h2 > 0 && this.drawLine({ x1: A3.x, x2: A3.x, y1: A3.y + (b3.y <= 0 ? d2 : 0), y2: A3.y + A3.height - (b3.y + b3.height >= m2 ? d2 : 0), lineWidth: h2 }), b3.y > 0 && h2 > 0 && this.drawLine({ x1: A3.x + (b3.x < 1 ? d2 : 0), x2: A3.x + A3.width - (b3.x + b3.width >= f2 ? d2 : 0), y1: A3.y, y2: A3.y, lineWidth: h2 });
        const E3 = a3[o3];
        let v2 = 0;
        if (void 0 !== E3) {
          let e2 = E3;
          if ("object" != typeof E3 && (e2 = { type: Ie.text, text: E3 }), "string" != typeof e2.type || !e2.type) {
            let t5 = "string" == typeof e2.layerClass ? e2.layerClass : "";
            t5 ? (t5 = t5.toLowerCase(), "barcode" !== t5 && "qrcode" !== t5 || "number" == typeof e2.type && (e2.barcodeType = e2.type), "barcode" === t5 && c2 <= 0 && (v2 = h2), e2.type = t5) : e2.type = Ie.text;
          }
          const s4 = e2;
          "number" != typeof s4.horizontalAlignment && (s4.horizontalAlignment = "number" == typeof s4.horAlignment ? s4.horAlignment : u2), "number" != typeof s4.verticalAlignment && (s4.verticalAlignment = "number" == typeof s4.verAlignment ? s4.verAlignment : l2);
          let r4 = d2 + c2 + v2;
          if (e2.type === Ie.text) {
            const i3 = e2;
            i3.fontHeight || (i3.fontHeight = t4.fontHeight || 0.3 * A3.height), !i3.fontName && t4.fontName && (i3.fontName = t4.fontName), "number" != typeof i3.fontStyle && "number" == typeof t4.fontStyle && (i3.fontStyle = t4.fontStyle), c2 <= 0 && (r4 = d2 + 1);
          } else
            e2.type === Ie.qrcode && c2 <= 0 && (r4 = d2 + 1);
          this.drawItem(Object.assign(e2, Ae.shrinkCellContent(A3, r4)), i2, n2);
        }
      }
    }
    return true;
  }
  drawTable(t4, e2, i2) {
    let n2 = t4.x || 0, s2 = t4.y || 0, r2 = t4.width || 0, a2 = t4.height || 0;
    if (!this.jobOptions)
      return false;
    let o2 = Array.isArray(t4.margin) ? t4.margin[0] : t4.margin, h2 = Array.isArray(t4.margin) ? t4.margin[1] : o2;
    if (r2 <= 0) {
      const e3 = this.jobWidth;
      o2 = "number" == typeof o2 && o2 >= 0 ? o2 : 0.05 * e3, n2 = t4.x = "number" == typeof t4.x ? t4.x : o2, r2 = t4.width = e3 - n2 - o2;
    }
    if (a2 <= 0) {
      const e3 = this.jobHeight;
      h2 = "number" == typeof h2 && h2 >= 0 ? h2 : 0.05 * e3, s2 = t4.y = "number" == typeof t4.y ? t4.y : h2, a2 = t4.height = e3 - s2 - h2;
    }
    const c2 = t4, d2 = t4.columnWidths || [], u2 = t4.columnCount || t4.columns || c2.cols || d2.length || 0;
    if (c2.Cells && Array.isArray(c2.Cells) && !t4.cells && (t4.cells = c2.Cells, delete c2.Cells), !t4.tableRows) {
      if (Array.isArray(t4.rows))
        t4.tableRows = t4.rows;
      else if (t4.cells && u2 > 0) {
        t4.tableRows = [];
        for (let e3 = 0; e3 < t4.cells.length; e3 += u2)
          t4.tableRows.push(t4.cells.slice(e3, e3 + u2));
      }
    }
    if (!t4.tableRows || t4.tableRows.length <= 0)
      return false;
    t4.fontSize && !t4.fontHeight && (t4.fontHeight = this.poundToMm(t4.fontSize));
    const l2 = "number" == typeof t4.rotation ? t4.rotation : t4.orientation;
    this.save(), this.setRotation(l2 || 0, { x: n2, y: s2 }, { width: r2, height: a2 });
    const g2 = this.drawTableWithoutRotation(t4, e2, i2);
    return this.restore(), g2;
  }
  printPageGroup(t4, e2) {
    const i2 = t4.jobPages || [], n2 = t4.jobArguments || [], s2 = { printCopies: 1, copyIndex: 0, printPages: 1, pageIndex: 0 }, r2 = t4.jobInfo || {}, a2 = t4.printerInfo || {}, o2 = Ae.getJobStartOptions(r2, a2), h2 = r2.jobHeight || 0, c2 = Ae.getMargins(r2);
    let d2 = 0;
    const u2 = r2.startPage && r2.startPage > 0 ? r2.startPage : 0, l2 = r2.printPages || 0;
    if (n2.length > 0 || l2 > 1 && i2.length <= 1) {
      const t5 = n2.length > 0 ? n2.length : u2 + l2;
      let r3 = t5;
      l2 > 0 && (r3 = u2 + l2 > t5 ? t5 : u2 + l2), h2 <= 0 && (o2.height = Ae.calcPageHeight(i2[0], c2[2]));
      for (let t6 = u2; t6 < r3; t6++) {
        const a3 = n2[t6];
        if (s2.printPages = r3, s2.pageIndex = t6, !this.startJob(Object.assign({}, o2)))
          break;
        this.mKeyWordParser.setKeyWordAction((t7) => a3[t7]);
        for (const e3 of i2[0])
          this.drawItem(e3, a3, t6);
        const h3 = this.endJob();
        if (!h3)
          break;
        const c3 = e2(Object.assign(h3, s2));
        if ("number" == typeof c3 && (d2 = c3), d2 > 0)
          break;
        d2 < 0 && t6--;
      }
    } else {
      let t5 = i2.length;
      l2 > 0 && (t5 = u2 + l2 > i2.length ? i2.length : u2 + l2);
      for (let n3 = u2; n3 < t5; n3++) {
        s2.printPages = t5, s2.pageIndex = n3, h2 <= 0 && (o2.height = Ae.calcPageHeight(i2[n3], c2[2]));
        const r3 = i2[n3];
        if (!this.startJob(Object.assign({}, o2)))
          break;
        for (const t6 of r3)
          this.drawItem(t6);
        const a3 = this.endJob();
        if (!a3)
          break;
        const u3 = e2(Object.assign(a3, s2));
        if ("number" == typeof u3 && (d2 = u3), d2 > 0)
          break;
        d2 < 0 && n3--;
      }
    }
    return d2;
  }
  printAsyncPageGroup(t4, e2) {
    return f(this, 0, void 0, function* () {
      const i2 = t4.jobPages || [], n2 = t4.jobArguments || [], s2 = { printCopies: 1, copyIndex: 0, printPages: 1, pageIndex: 0 }, r2 = t4.jobInfo || {}, a2 = t4.printerInfo || {}, o2 = Ae.getJobStartOptions(r2, a2), h2 = r2.jobHeight || 0, c2 = Ae.getMargins(r2);
      let d2 = 0, u2 = r2.startPage && r2.startPage > 0 ? r2.startPage : 0;
      const l2 = r2.printPages || 0;
      if (n2.length > 0 || l2 > 1 && i2.length <= 1) {
        const t5 = n2.length > 0 ? n2.length : u2 + l2;
        let r3 = t5;
        l2 > 0 && (r3 = u2 + l2 > t5 ? t5 : u2 + l2), u2 >= r3 && (u2 = r3 - 1), h2 <= 0 && (o2.height = Ae.calcPageHeight(i2[0], c2[2]));
        for (let t6 = u2; t6 < r3; t6++) {
          const a3 = n2[t6];
          if (s2.printPages = r3, s2.pageIndex = t6, s2.isEndPage = t6 + 1 >= r3, !this.startJob(Object.assign({}, o2)))
            break;
          this.mKeyWordParser.setKeyWordAction((t7) => a3[t7]);
          for (const e3 of i2[0])
            this.drawItem(e3, a3, t6);
          const h3 = yield this.commitJob();
          if (!h3)
            break;
          const c3 = yield e2(Object.assign(h3, s2));
          if ("number" == typeof c3 && (d2 = c3), d2 > 0)
            break;
          d2 < 0 && t6--;
        }
      } else {
        let t5 = i2.length;
        l2 > 0 ? t5 = u2 + l2 > i2.length ? i2.length : u2 + l2 : i2.length <= 1 && u2 > 0 && (u2 = 0);
        for (let n3 = u2; n3 < t5; n3++) {
          s2.printPages = i2.length, s2.pageIndex = n3, s2.isEndPage = n3 + 1 >= i2.length, h2 <= 0 && (o2.height = Ae.calcPageHeight(i2[n3], c2[2]));
          const t6 = i2[n3];
          if (!this.startJob(Object.assign({}, o2)))
            break;
          for (const e3 of t6)
            this.drawItem(e3);
          const r3 = yield this.commitJob();
          if (!r3)
            break;
          const a3 = yield e2(Object.assign(r3, s2));
          if ("number" == typeof a3 && (d2 = a3), d2 > 0)
            break;
          d2 < 0 && n3--;
        }
      }
      return d2;
    });
  }
  drawJob(t4) {
    l.log("#### drawJob:"), t4.jobPages || (t4.jobPages = []);
    const e2 = t4.jobInfo || {}, i2 = e2.startCopy || 0, n2 = e2.remainCopies || 0;
    let s2 = 0;
    if (t4.jobPages.length <= 0 && t4.jobPage && t4.jobPages.push(t4.jobPage), t4.jobPages.length <= 0)
      return s2 = 1, s2;
    const r2 = e2.printCopies && e2.printCopies > 0 ? e2.printCopies : 1;
    if (r2 > 1 && e2.autoPage) {
      for (let e3 = 0; e3 < r2 && (s2 = this.printPageGroup(t4, (s3) => t4.onPageComplete ? (s3.printCopies = r2 + i2 + n2, s3.copyIndex = e3 + i2, s3.isEndCopy = e3 + 1 >= r2, t4.onPageComplete(s3) || 0) : 0), 0 === s2); e3++)
        ;
      return s2;
    }
    return this.printPageGroup(t4, (e3) => (t4.onPageComplete && (s2 = t4.onPageComplete(Object.assign(Object.assign({}, e3), { printCopies: r2 + i2 + n2, copyIndex: i2, isEndCopy: true })) || 0), s2));
  }
  drawAsyncJob(t4) {
    return f(this, 0, void 0, function* () {
      l.info("#### drawAsyncJob:"), t4.jobPages || (t4.jobPages = []);
      const e2 = t4.jobInfo || {}, i2 = e2.startCopy || 0, n2 = e2.remainCopies || 0;
      let s2 = 0;
      if (t4.jobPages.length <= 0 && t4.jobPage && t4.jobPages.push(t4.jobPage), t4.jobPages.length <= 0)
        return s2 = 1, s2;
      const r2 = e2.printCopies && e2.printCopies > 0 ? e2.printCopies : 1;
      if (r2 > 1 && e2.autoPage) {
        for (let e3 = 0; e3 < r2 && (s2 = yield this.printAsyncPageGroup(t4, (s3) => {
          var a2;
          return t4.onPageComplete ? (s3.printCopies = r2 + i2 + n2, s3.copyIndex = e3 + i2, s3.isEndCopy = e3 + 1 >= r2, Promise.resolve(null !== (a2 = t4.onPageComplete(s3)) && void 0 !== a2 ? a2 : 0)) : Promise.resolve(0);
        }), 0 === s2); e3++)
          ;
        return s2;
      }
      return yield this.printAsyncPageGroup(t4, (e3) => t4.onPageComplete ? Promise.resolve(t4.onPageComplete(Object.assign(Object.assign({}, e3), { printCopies: r2 + i2 + n2, copyIndex: i2, isEndCopy: true })) || 0) : Promise.resolve(0));
    });
  }
  autoLoadDrawItemImage(t4, e2) {
    return f(this, 0, void 0, function* () {
      if (t4.type === Ie.image) {
        const i2 = !this.isPreviewMode(e2), n2 = t4;
        if (n2 && "string" == typeof n2.image) {
          n2.image = yield this.loadImage(n2.image).catch((t5) => (l.warn("---- 图片加载异常！", t5), n2.image));
          try {
            const t5 = n2.color || e2.color || e2.drawColor, s2 = n2.colorMode;
            if (n2.image instanceof HTMLImageElement) {
              let e3 = "";
              1 === s2 ? e3 = p.convertToGray256(n2.image) : 2 === s2 && (e3 = !i2 && t5 ? p.convertToColorImage(n2.image, t5) : p.convertToBlackWhite(n2.image, n2.threshold)), e3 && "string" == typeof e3 && (n2.image = yield this.loadImage(e3));
            }
          } catch (t5) {
            return l.warn("代码异常！", t5), false;
          }
        }
      } else if (t4.type === Ie.html) {
        const e3 = t4;
        "string" != typeof e3.html && e3.html && (e3.html = e3.html.innerHTML), e3.image = yield this.loadHtml(e3.html);
      } else if (t4.type === Ie.table) {
        const i2 = t4;
        if (i2.tableRows)
          for (const t5 of i2.tableRows)
            for (const i3 of t5 || [])
              i3 && "string" != typeof i3 && i3.type && (yield this.autoLoadDrawItemImage(i3, e2));
        else if (i2.cells)
          for (const t5 of i2.cells)
            t5 && "string" != typeof t5 && t5.type && (yield this.autoLoadDrawItemImage(t5, e2));
      }
      return true;
    });
  }
  autoLoadImage(t4) {
    return f(this, 0, void 0, function* () {
      const e2 = t4.jobInfo || {};
      if (t4.jobInfo) {
        const i3 = this.isPreviewMode(t4.jobInfo);
        !e2.backgroundImage && e2.background && (e2.backgroundImage = e2.background), e2.background && delete e2.background, i3 ? e2.backgroundImage && "string" == typeof e2.backgroundImage ? e2.backgroundImage = yield this.loadImage(e2.backgroundImage) : e2.background && "string" == typeof e2.background && (e2.background = yield this.loadImage(e2.background)) : (e2.backgroundImage = void 0, e2.background = void 0), e2.borderImage && "string" == typeof e2.borderImage ? e2.borderImage = yield this.loadImage({ src: e2.borderImage, withSize: true }) : e2.border && "string" == typeof e2.border && (e2.border = yield this.loadImage({ src: e2.border, withSize: true }));
      }
      t4.jobPage && (!t4.jobPages || t4.jobPages.length <= 0) && (t4.jobPages = [t4.jobPage]);
      const i2 = t4.jobPages || [];
      for (const t5 of i2)
        for (const i3 of t5)
          yield this.autoLoadDrawItemImage(i3, e2);
      return t4;
    });
  }
}
Ae.JOB_NAME_TRANS = "#!#transparent#!#", Ae.JOB_NAME_PREV = "#!#preview#!#", Ae.JOB_COLOR_WHITE = "#fff", Ae.JOB_COLOR_TRANS = "transparent", Ae.LINE_WIDTH_MM = 0.35, Ae.FONT_SIZE_MIN_DEFAULT = 2;
class Ee {
  constructor(t4) {
    this._margin = [], this.data = t4.data, this.init(t4);
  }
  get marginTop() {
    return this._margin.length > 0 ? this._margin[0] : 0;
  }
  get marginRight() {
    return this._margin.length > 1 ? this._margin[1] : 0;
  }
  get marginLeft() {
    return this._margin.length > 3 ? this._margin[3] : this.marginRight;
  }
  get marginBottom() {
    return this._margin.length > 2 ? this._margin[2] : this.marginTop;
  }
  get cornerRadius() {
    return this._radius || 0;
  }
  get jobInfo() {
    return this.data.jobInfo;
  }
  get jobPages() {
    return this.data.jobPages;
  }
  get jobWidth() {
    var t4;
    return (null === (t4 = this.data.jobInfo) || void 0 === t4 ? void 0 : t4.jobWidth) || 0;
  }
  get jobHeight() {
    var t4;
    return (null === (t4 = this.data.jobInfo) || void 0 === t4 ? void 0 : t4.jobHeight) || 0;
  }
  get orientation() {
    var t4;
    return (null === (t4 = this.data.jobInfo) || void 0 === t4 ? void 0 : t4.orientation) || 0;
  }
  init(t4) {
    this._radius = t4.radius || 0, this._margin = t4.margin || [], this._jobStartAction = t4.onJobStart, 1 === this._margin.length && this._margin.push(this._margin[0]), t4.element && this.attachTo({ element: t4.element });
  }
  createDrawContext(t4) {
    return new Ae(Object.assign(Object.assign({}, t4), { apiMode: false, position: t4.position || "relative" }));
  }
  attachTo(t4) {
    return f(this, 0, void 0, function* () {
      if (!t4.element && !t4.canvas)
        return false;
      if (!this.drawContext) {
        const e3 = this.createDrawContext(t4);
        if (!e3)
          return false;
        const i3 = this.data.jobInfo;
        i3 && e3.resetJobInfo({ width: i3.jobWidth || 0, height: i3.jobHeight || 0 }), this.drawContext = e3;
      }
      const e2 = t4.element, i2 = t4.canvas;
      if (e2)
        return this.drawContext.Canvas.Base.appendTo(e2), this.raiseViewChanged(e2.offsetWidth, e2.offsetHeight, t4.styles);
      {
        const e3 = t4.viewWidth || i2.width || 0, n2 = t4.viewHeight || i2.height || 0;
        return this.raiseViewChanged(e3, n2, t4.styles);
      }
    });
  }
  raiseViewChanged(t4, e2, i2) {
    return f(this, 0, void 0, function* () {
      const n2 = this.data ? this.data.jobInfo : void 0, s2 = (null == n2 ? void 0 : n2.jobWidth) || 0, r2 = (null == n2 ? void 0 : n2.jobHeight) || 0, a2 = this.drawContext;
      if (!n2)
        return l.warn("---- 未检测到 jobInfo 相关信息！"), false;
      if (s2 <= 0 || r2 <= 0)
        return l.warn(`---- 纸张大小错误：{jobWidth: ${s2}, jobHeight: ${r2}}`), false;
      if (!a2)
        return l.warn("---- 未检测到绘制上下文！"), false;
      if (t4 <= 0 || e2 <= 0)
        return l.warn(`---- 参数错误：viewWidth = ${t4}, viewHeight = ${e2}`), false;
      const o2 = e2 - 2, h2 = t4 - 2 - this.marginLeft - this.marginRight, c2 = o2 - this.marginTop - this.marginBottom, d2 = h2 > 0 ? h2 / s2 : 0, u2 = c2 > 0 ? c2 / r2 : 0;
      return a2.ZoomRate = Math.min(d2, u2), this.updateCanvasPosition(a2, i2), this.refreshView();
    });
  }
  updateCanvasPosition(t4, e2) {
    var i2;
    if ("absolute" !== (null === (i2 = t4.CanvasElement.style) || void 0 === i2 ? void 0 : i2.position))
      return;
    const n2 = t4.CanvasElement.parentElement;
    if (n2) {
      const i3 = n2.offsetWidth, s2 = n2.offsetHeight, r2 = 0.5 * (i3 - t4.PixWidth), a2 = this.marginTop + 0.5 * (s2 - this.marginTop - this.marginBottom - t4.PixHeight);
      if (t4.CanvasElement.style) {
        if (t4.CanvasElement.style.left = `${r2}px`, t4.CanvasElement.style.top = `${a2}px`, e2) {
          const i4 = Object.keys(e2);
          for (const n3 of i4)
            void 0 !== e2[n3] && void 0 !== t4.CanvasElement.style[n3] && (t4.CanvasElement.style[n3] = e2[n3]);
        }
        e2 && "string" == typeof e2.borderRadius ? t4.CanvasElement.style.borderRadius = e2.borderRadius : this.cornerRadius >= 0 && (t4.CanvasElement.style.borderRadius = t4.ZoomRate * this.cornerRadius + "px");
      }
    }
  }
  refreshView(t4) {
    return f(this, 0, void 0, function* () {
      const e2 = this.drawContext, i2 = this.data.jobInfo;
      if (!e2 || !i2)
        return false;
      t4 && (Array.isArray(t4) ? this.data.jobArguments = t4 : "object" == typeof t4 && (this.data.jobArguments = [t4])), yield e2.autoLoadImage(this.data);
      const n2 = Ae.getJobStartOptions(i2, this.data.printerInfo), s2 = e2.startJob(n2);
      return !!s2 && (this._jobStartAction && (yield Promise.resolve(this._jobStartAction(s2))), e2.drawAsyncJob(this.data).then((t5) => 0 === t5));
    });
  }
}
class De {
  static innerDecode(t4) {
    const e2 = new Uint16Array(32), i2 = t4.length, n2 = i2 - 32;
    let s2 = "", r2 = "", a2 = 0, o2 = 0, h2 = 0, c2 = -1;
    for (let d2 = 0, u2 = 0, l2 = 0, g2 = 0; g2 < i2; ) {
      for (a2 = g2 <= n2 ? 32 : i2 - g2 | 0; d2 < a2; g2 = g2 + 1 | 0, d2 = d2 + 1 | 0) {
        switch (u2 = 255 & t4[g2], u2 >> 4) {
          case 15:
            if (l2 = 255 & t4[g2 = g2 + 1 | 0], l2 >> 6 != 2 || 247 < u2) {
              g2 = g2 - 1 | 0;
              break;
            }
            o2 = (7 & u2) << 6 | 63 & l2, h2 = 5, u2 = 256;
          case 14:
            l2 = 255 & t4[g2 = g2 + 1 | 0], o2 <<= 6, o2 |= (15 & u2) << 6 | 63 & l2, h2 = l2 >> 6 == 2 ? h2 + 4 | 0 : 24, u2 = u2 + 256 & 768;
          case 13:
          case 12:
            l2 = 255 & t4[g2 = g2 + 1 | 0], o2 <<= 6, o2 |= (31 & u2) << 6 | 63 & l2, h2 = h2 + 7 | 0, g2 < i2 && l2 >> 6 == 2 && o2 >> h2 && o2 < 1114112 ? (u2 = o2, o2 = o2 - 65536 | 0, 0 <= o2 ? (c2 = 55296 + (o2 >> 10) | 0, u2 = 56320 + (1023 & o2) | 0, d2 < 31 ? (e2[d2] = c2, d2 = d2 + 1 | 0, c2 = -1) : (l2 = c2, c2 = u2, u2 = l2)) : a2 = a2 + 1 | 0) : (u2 >>= 8, g2 = g2 - u2 - 1 | 0, u2 = 65533), h2 = 0, o2 = 0, a2 = g2 <= n2 ? 32 : i2 - g2 | 0;
          default:
            e2[d2] = u2;
            continue;
          case 11:
          case 10:
          case 9:
          case 8:
        }
        e2[d2] = 65533;
      }
      if (r2 += String.fromCharCode(e2[0], e2[1], e2[2], e2[3], e2[4], e2[5], e2[6], e2[7], e2[8], e2[9], e2[10], e2[11], e2[12], e2[13], e2[14], e2[15], e2[16], e2[17], e2[18], e2[19], e2[20], e2[21], e2[22], e2[23], e2[24], e2[25], e2[26], e2[27], e2[28], e2[29], e2[30], e2[31]), d2 < 32 && (r2 = r2.slice(0, d2 - 32 | 0)), g2 < i2) {
        if (e2[0] = c2, d2 = ~c2 >>> 31, c2 = -1, r2.length < s2.length)
          continue;
      } else
        -1 !== c2 && (r2 += String.fromCharCode(c2));
      s2 += r2, r2 = "";
    }
    return s2;
  }
  static decode(t4, e2) {
    try {
      return new TextDecoder(e2).decode(Uint8Array.from(t4));
    } catch (e3) {
      return l.log("DzTextDecoder.decode: TextDecoder is not defined"), this.innerDecode(t4);
    }
  }
}
class we {
}
var xe, _e, Oe, Te, Se;
we.base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", we.base64DecodeChars = Uint8Array.from([255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 62, 255, 255, 255, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 255, 255, 255, 64, 255, 255, 255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 255, 255, 255, 255, 255, 255, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 255, 255, 255, 255, 255]), function(t4) {
  t4[t4.ASYNC_WAIT = -1] = "ASYNC_WAIT", t4[t4.OK = 0] = "OK", t4[t4.ERROR_PARAM = 1] = "ERROR_PARAM", t4[t4.ERROR_NO_PRINTER = 2] = "ERROR_NO_PRINTER", t4[t4.ERROR_DISCONNECTED = 3] = "ERROR_DISCONNECTED", t4[t4.ERROR_CONNECT_FAILED = 4] = "ERROR_CONNECT_FAILED", t4[t4.ERROR_GET_SERVICE = 5] = "ERROR_GET_SERVICE", t4[t4.ERROR_GET_CHARACTERISTIC = 6] = "ERROR_GET_CHARACTERISTIC", t4[t4.ERROR_OPEN_ADAPTER = 7] = "ERROR_OPEN_ADAPTER", t4[t4.ERROR_DATA_SEND_ERROR = 8] = "ERROR_DATA_SEND_ERROR", t4[t4.ERROR_DATA_RECEIVE_ERROR = 9] = "ERROR_DATA_RECEIVE_ERROR", t4[t4.ERROR_IS_PRINTING = 10] = "ERROR_IS_PRINTING", t4[t4.ERROR_RESPONSE_TIMEOUT = 11] = "ERROR_RESPONSE_TIMEOUT", t4[t4.ERROR_PRINTER_CANCELED = 12] = "ERROR_PRINTER_CANCELED", t4[t4.ERROR_JOB_CREATE = 13] = "ERROR_JOB_CREATE", t4[t4.ERROR_JOB_CANCELED = 14] = "ERROR_JOB_CANCELED", t4[t4.ERROR_GET_IMAGE_DATA = 15] = "ERROR_GET_IMAGE_DATA", t4[t4.ERROR_PRINTER_NOT_AVAILABLE = 16] = "ERROR_PRINTER_NOT_AVAILABLE", t4[t4.ERROR_DATA_PARSE = 17] = "ERROR_DATA_PARSE", t4[t4.ERROR_NO_IMPLEMENT = 18] = "ERROR_NO_IMPLEMENT", t4[t4.ERROR_UN_SUPPORTED = 19] = "ERROR_UN_SUPPORTED", t4[t4.ERROR_NOTIFY_CHARACTERISTIC = 21] = "ERROR_NOTIFY_CHARACTERISTIC", t4[t4.ERROR_READ_CHARACTERISTIC = 22] = "ERROR_READ_CHARACTERISTIC", t4[t4.ERROR_WRITE_CHARACTERISTIC = 23] = "ERROR_WRITE_CHARACTERISTIC", t4[t4.ERROR_AUTH_FAILED = 24] = "ERROR_AUTH_FAILED", t4[t4.ERROR_OTHER = 100] = "ERROR_OTHER", t4[t4.ERROR_EXCEPTION = 101] = "ERROR_EXCEPTION", t4[t4.ERROR_NO_BRIDGE = 102] = "ERROR_NO_BRIDGE";
}(xe || (xe = {})), function(t4) {
  t4[t4.DZIP_PRINTABLE = 0] = "DZIP_PRINTABLE", t4[t4.DZIP_ISPRINTING = 1] = "DZIP_ISPRINTING", t4[t4.DZIP_ISROTATING = 2] = "DZIP_ISROTATING", t4[t4.DZIP_NOJOB = 10] = "DZIP_NOJOB", t4[t4.DZIP_PAGENOTREADY = 11] = "DZIP_PAGENOTREADY", t4[t4.DZIP_JOBCANCELED = 12] = "DZIP_JOBCANCELED", t4[t4.DZIP_ENVNOTREADY = 20] = "DZIP_ENVNOTREADY", t4[t4.DZIP_VOLTOOLOW = 30] = "DZIP_VOLTOOLOW", t4[t4.DZIP_VOLTOOHIGH = 31] = "DZIP_VOLTOOHIGH", t4[t4.DZIP_TPHNOTFOUND = 32] = "DZIP_TPHNOTFOUND", t4[t4.DZIP_TPHTOOHOT = 33] = "DZIP_TPHTOOHOT", t4[t4.DZIP_COVEROPENED = 34] = "DZIP_COVEROPENED", t4[t4.DZIP_NO_PAPER = 35] = "DZIP_NO_PAPER", t4[t4.DZIP_RIBBONCANOPENED = 36] = "DZIP_RIBBONCANOPENED", t4[t4.DZIP_NO_RIBBON = 37] = "DZIP_NO_RIBBON", t4[t4.DZIP_UNMATCHED_RIBBON = 38] = "DZIP_UNMATCHED_RIBBON", t4[t4.DZIP_TPHTOOCOLD = 39] = "DZIP_TPHTOOCOLD", t4[t4.DZIP_USEDUP_RIBBON = 40] = "DZIP_USEDUP_RIBBON", t4[t4.DZIP_USEDUP_RIBBON2 = 41] = "DZIP_USEDUP_RIBBON2", t4[t4.DZIP_NO_LABEL = 42] = "DZIP_NO_LABEL", t4[t4.DZIP_UNMATCHED_LABEL = 43] = "DZIP_UNMATCHED_LABEL", t4[t4.DZIP_USEDUP_LABEL = 44] = "DZIP_USEDUP_LABEL", t4[t4.DZIP_NO_RIBBON2 = 45] = "DZIP_NO_RIBBON2", t4[t4.DZIP_UNMATCHED_RIBBON2 = 46] = "DZIP_UNMATCHED_RIBBON2", t4[t4.DZIP_LABELCANOPENED = 50] = "DZIP_LABELCANOPENED";
}(_e || (_e = {})), function(t4) {
  t4[t4.Unset = 255] = "Unset", t4[t4.None = 0] = "None", t4[t4.Hole = 1] = "Hole", t4[t4.Gap = 2] = "Gap", t4[t4.Black = 3] = "Black", t4[t4.Trans = 4] = "Trans";
}(Oe || (Oe = {})), function(t4) {
  t4[t4.Unset = 255] = "Unset", t4[t4.Min = 1] = "Min", t4[t4.Low = 2] = "Low", t4[t4.Normal = 3] = "Normal", t4[t4.High = 4] = "High", t4[t4.Max = 5] = "Max";
}(Te || (Te = {})), function(t4) {
  t4[t4.Unset = 255] = "Unset", t4[t4.Min = 1] = "Min", t4[t4.Low = 4] = "Low", t4[t4.Normal = 6] = "Normal", t4[t4.High = 10] = "High", t4[t4.Max = 15] = "Max";
}(Se || (Se = {}));
class Me {
  static decodeBase64(t4) {
    if (t4) {
      if (Me.decodeBase64)
        return Me.decodeBase64(t4);
      if ("function" == typeof atob) {
        const e2 = Me.atob(t4);
        let i2 = e2.length;
        const n2 = new Uint8Array(i2);
        for (; i2--; )
          n2[i2] = e2.charCodeAt(i2);
        return n2.buffer;
      }
    }
  }
  static arrayBufferToBase64(t4) {
    if (!t4 || t4.length <= 0)
      return "";
    try {
      return btoa(new TextDecoder().decode(t4));
    } catch (e2) {
      return btoa(t4.reduce((t5, e3) => t5 + String.fromCharCode(e3), ""));
    }
  }
  static arrayBufferToBase64_2(t4) {
    let e2 = 0, i2 = 0, n2 = 0;
    const s2 = t4.length;
    let r2 = "";
    for (let a2 = 0; a2 < s2; ) {
      if (e2 = t4[a2++], a2 == s2) {
        r2 += we.base64EncodeChars.charAt(e2 >> 2), r2 += we.base64EncodeChars.charAt((3 & e2) << 4), r2 += "==";
        break;
      }
      if (i2 = t4[a2++], a2 == s2) {
        r2 += we.base64EncodeChars.charAt(e2 >> 2), r2 += we.base64EncodeChars.charAt((3 & e2) << 4 | (240 & i2) >> 4), r2 += we.base64EncodeChars.charAt((15 & i2) << 2), r2 += "=";
        break;
      }
      n2 = t4[a2++], r2 += we.base64EncodeChars.charAt(e2 >> 2), r2 += we.base64EncodeChars.charAt((3 & e2) << 4 | (240 & i2) >> 4), r2 += we.base64EncodeChars.charAt((15 & i2) << 2 | (192 & n2) >> 6), r2 += we.base64EncodeChars.charAt(63 & n2);
    }
    return r2;
  }
  static base64ToArrayBuffer(t4) {
    const e2 = (t4 = t4.replace(/\s/g, "")).replace(/-/g, "+").replace(/_/g, "/");
    let i2 = 0;
    try {
      const t5 = atob(e2), i3 = new Uint8Array(t5.length);
      for (let e3 = 0; e3 < t5.length; e3++)
        i3[e3] = t5.charCodeAt(e3);
      return i3;
    } catch (e3) {
      const n2 = t4.length, s2 = [], r2 = new Uint8Array(4);
      for (let e4 = 0; e4 < n2; ) {
        for (i2 = 0; i2 < r2.length && e4 < n2; e4++)
          r2[i2] = we.base64DecodeChars[255 & t4.charCodeAt(e4)], r2[i2] >= 0 && r2[i2] <= 64 ? i2++ : 10 !== r2[i2] || l.warn(`---- 检测到无效的字符：data[${e4}] = '${t4.charAt(e4)}', charCode = 0x${t4.charCodeAt(e4).toString(16)}`);
        if (i2 > 0 && i2 < r2.length)
          return l.warn(`---- base64字符串解析失败，pos = ${i2}, i = ${e4}, data.length = ${n2}`), Uint8Array.from([]);
        if (s2.push(r2[0] << 2 | (48 & r2[1]) >> 4), r2[2] >= 64)
          break;
        r2[3] >= 64 ? s2.push((15 & r2[1]) << 4 | (60 & r2[2]) >> 2) : (s2.push((15 & r2[1]) << 4 | (60 & r2[2]) >> 2), s2.push((3 & r2[2]) << 6 | r2[3]));
      }
      return Uint8Array.from(s2);
    }
  }
  static atob(t4) {
    try {
      if (window && "function" == typeof window.atob)
        return atob(t4);
      {
        const e2 = Me.base64ToArrayBuffer(t4);
        return De.decode(new Uint8Array(e2), "utf-8");
      }
    } catch (t5) {
      return l.warn(t5), "";
    }
  }
  static concatUint8Array(t4) {
    const e2 = t4.reduce((t5, e3) => t5 + (e3 ? e3.length : 0), 0), i2 = new Uint8Array(e2);
    let n2 = 0;
    for (const e3 of t4)
      e3 && e3.length > 0 && (i2.set(e3, n2), n2 += e3.length);
    return i2;
  }
  static isSupportedService(t4) {
    if (!t4)
      return false;
    if (0 === (t4 = this.getFullUUID(t4)).indexOf("F000FFC0"))
      return false;
    const e2 = /^0000([0-9A-F]{4})-0000-1000-8000-00805F9B34FB$/i.exec(t4);
    if (e2) {
      const t5 = e2[1];
      if (t5 >= "0000" && t5 <= "2AFF")
        return false;
      if ("FF10" === t5)
        return false;
      if ("FFC0" === t5)
        return false;
    } else if (this.isMatchedUUID(t4, "E7810A71-73AE-499D-8C15-FAA9AEF0C3F2"))
      return false;
    return true;
  }
  static getFullUUID(t4) {
    return 4 === t4.length ? `0000${t4}-0000-1000-8000-00805F9B34FB`.toUpperCase() : 8 === t4.length ? `${t4}-0000-1000-8000-00805F9B34FB`.toUpperCase() : t4.toUpperCase();
  }
  static isMatchedUUID(t4, e2) {
    return !(!t4 || !e2) && (t4.length === e2.length ? t4.toUpperCase() === e2.toUpperCase() : this.getFullUUID(t4) === this.getFullUUID(e2));
  }
  static isDeviceInfoService(t4) {
    return 0 === this.getFullUUID(t4).indexOf("0000180A");
  }
  static isDeviceInfoCharacteristic(t4) {
    return 0 === this.getFullUUID(t4).indexOf("00002A24");
  }
  static sleep(t4, e2) {
    return new Promise((i2) => {
      setTimeout(() => {
        i2(e2);
      }, t4);
    });
  }
  static execAsync(t4, e2, i2) {
    return new Promise((n2) => {
      setTimeout(() => {
        t4(e2).then((t5) => {
          n2(t5);
        });
      }, i2 || 0);
    });
  }
  static getResultMessage(t4) {
    switch (t4) {
      case xe.ASYNC_WAIT:
        return "异步等待中，请稍后";
      case xe.OK:
        return "OK";
      case xe.ERROR_PARAM:
        return "参数错误！";
      case xe.ERROR_NO_PRINTER:
        return "未检测到打印机或者未指定打印机";
      case xe.ERROR_DISCONNECTED:
        return "打印机未连接";
      case xe.ERROR_CONNECT_FAILED:
        return "打印机链接失败";
      case xe.ERROR_OPEN_ADAPTER:
        return "蓝牙适配器打开失败";
      case xe.ERROR_NOTIFY_CHARACTERISTIC:
        return "特征值notify启动失败";
      case xe.ERROR_READ_CHARACTERISTIC:
        return "特征值读取失败";
      case xe.ERROR_WRITE_CHARACTERISTIC:
        return "特征值写入失败";
      case xe.ERROR_DATA_SEND_ERROR:
        return "数据发送失败";
      case xe.ERROR_DATA_RECEIVE_ERROR:
        return "数据接收异常，打印机无响应";
      case xe.ERROR_IS_PRINTING:
        return "打印机正在打印过程中不能打印其他标签";
      case xe.ERROR_RESPONSE_TIMEOUT:
        return "指令发送响应超时";
      case xe.ERROR_JOB_CREATE:
        return "打印任务创建失败";
      case xe.ERROR_JOB_CANCELED:
        return "打印任务被取消";
      case xe.ERROR_GET_IMAGE_DATA:
        return "打印数据获取失败";
      case xe.ERROR_PRINTER_NOT_AVAILABLE:
        return "打印机状态异常";
      case xe.ERROR_OTHER:
        return "其他异常";
      case xe.ERROR_EXCEPTION:
        return "捕获到代码异常！";
      default:
        return "未知异常";
    }
  }
  static successResult(t4, e2, i2) {
    return e2 && ("function" == typeof e2.success && e2.success(t4), "function" == typeof e2.complete && e2.complete(t4), "function" == typeof e2.callback && e2.callback(t4)), i2 && i2(t4), t4;
  }
  static setSuccessResult(t4, e2, i2) {
    return this.successResult(t4, e2, i2);
  }
  static failResult(t4, e2, i2) {
    const n2 = "object" == typeof t4 ? t4 : void 0;
    return n2 && "number" == typeof n2.statusCode && (n2.errMsg || (n2.errMsg = Me.getResultMessage(n2.statusCode))), e2 && ("function" == typeof e2.fail && e2.fail(t4), "function" == typeof e2.complete && e2.complete(t4), "function" == typeof e2.callback && e2.callback(t4)), i2 && i2(t4), t4;
  }
  static setFailResult(t4, e2, i2) {
    return this.failResult(t4, e2, i2);
  }
  static onResult(t4, e2, i2) {
    return t4.errMsg || (t4.errMsg = Me.getResultMessage(t4.statusCode)), e2 && (0 === t4.statusCode ? e2.success && e2.success(t4.resultInfo) : e2.fail && e2.fail(t4), "function" == typeof e2.complete && e2.complete(t4), "function" == typeof e2.callback && e2.callback(t4)), i2 && i2(t4), t4;
  }
  static success(t4, e2, i2) {
    return this.onResult({ statusCode: xe.OK, resultInfo: t4 }, e2, i2);
  }
  static fail(t4, e2, i2) {
    return this.onResult({ statusCode: xe.ERROR_OTHER, resultInfo: t4 }, e2, i2);
  }
  static complete(t4, e2, i2, n2) {
    return this.onResult({ statusCode: t4, resultInfo: e2 }, i2, n2);
  }
  static processResult(t4, e2, i2, n2) {
    return this.complete(t4, e2, i2, n2);
  }
  static getBytes(t4) {
    return this.hex16ToArrayBuffer(t4);
  }
  static hex16ToArrayBuffer(t4) {
    const e2 = [];
    let i2 = "";
    for (let n2 = 0; n2 < t4.length; n2 += 2)
      i2 = t4.substring(n2, n2 + 2), e2.push(parseInt(i2, 16));
    return Uint8Array.from(e2);
  }
  static arrayBufferToHex16(t4, e2, i2) {
    return this.arrayToHexString(Array.from(t4), e2, i2);
  }
  static toHexByteString(t4, e2) {
    return (e2 || "") + `00${t4.toString(16)}`.slice(-2);
  }
  static toHexShortString(t4, e2) {
    return (e2 || "") + `0000${t4.toString(16)}`.slice(-4);
  }
  static toHexString(t4, e2) {
    try {
      return (e2 || "") + `00000000${t4.toString(16)}`.slice(-8);
    } catch (e3) {
      return l.warn("Capture Exception from LPAUtils.toHexString:", e3), `${t4}`;
    }
  }
  static arrayToHexString(t4, e2, i2) {
    return t4.map((t5) => Me.toHexByteString(t5, i2)).join(e2 || "");
  }
  static getString(t4, e2, i2) {
    const n2 = e2 || 0;
    return i2 && i2 > 0 ? t4 = t4.slice(n2, i2) : n2 > 0 && (t4 = t4.slice(n2)), De.decode(t4, "gbk");
  }
  static isAndroid(t4) {
    return t4 ? "android" === (t4 = t4.toLowerCase()) : !!navigator && /android/i.test(navigator.userAgent || "");
  }
  static isHarmonyOS(t4) {
    return t4 ? (t4 = t4.toLowerCase()).indexOf("harmony") >= 0 || t4.indexOf("ohos") >= 0 : !(!navigator || !navigator.userAgent) && ((t4 = navigator.userAgent).indexOf("harmony") >= 0 || t4.indexOf("ohos") >= 0);
  }
  static isIOS(t4) {
    return t4 ? "ios" === (t4 = t4.toLowerCase()) || "iphone" === t4 || "ipad" === t4 || "ipod" === t4 : !!navigator && /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent || "");
  }
  static isWindows() {
    if (!navigator)
      return false;
    const t4 = (navigator.platform || "").toLowerCase(), e2 = (navigator.userAgent || "").toLowerCase();
    return -1 !== t4.indexOf("win") || (-1 !== e2.indexOf("windows") || -1 !== e2.indexOf("win"));
  }
  static isLinux() {
    if (!navigator)
      return false;
    const t4 = (navigator.platform || "").toLowerCase(), e2 = (navigator.userAgent || "").toLowerCase();
    return -1 !== t4.indexOf("linux") || (-1 !== e2.indexOf("linux") || -1 !== e2.indexOf("x11"));
  }
  static isMacOS() {
    const t4 = (navigator.platform || "").toLowerCase(), e2 = (navigator.userAgent || "").toLowerCase();
    return -1 !== t4.indexOf("mac") || (-1 !== e2.indexOf("mac") || -1 !== e2.indexOf("macos"));
  }
  static getRequestData(t4, e2) {
    if (null == e2 ? e2 = [] : "object" != typeof e2 && (e2 = [e2]), e2.length && "object" == typeof e2[0])
      return e2[0];
    const i2 = {};
    if ("string" == typeof t4 && (t4 = [t4]), t4.length < 1 || !t4[0])
      return i2;
    for (let n2 = 0; n2 < t4.length; n2++)
      i2[t4[n2]] = e2[n2];
    return i2;
  }
  static filter(t4, e2) {
    return Object.keys(t4).filter((i2) => !!e2 && e2(i2, t4[i2])).reduce((e3, i2) => (e3[i2] = t4[i2], e3), {});
  }
  static filter_NoFunc(t4) {
    return Me.filter(t4, (t5, e2) => "function" != typeof e2);
  }
  static filter_NoNone(t4) {
    return Me.filter(t4, (t5, e2) => null != e2);
  }
  static filter_NoFuncAndNone(t4) {
    return Me.filter(t4, (t5, e2) => null != e2 && "function" != typeof e2);
  }
  static filterAndAssign(t4, e2, i2) {
    const n2 = i2 || ((t5, e3) => null != e3 && "function" != typeof e3), s2 = Me.filter(t4, n2);
    return Object.assign(s2, e2);
  }
  static combineUint8Array(t4) {
    const e2 = t4.reduce((t5, e3) => t5 + e3.length, 0), i2 = new Uint8Array(e2);
    let n2 = 0;
    return t4.forEach((t5) => {
      i2.set(t5, n2), n2 += t5.length;
    }), i2;
  }
  static lowByte(t4) {
    return 255 & t4;
  }
  static highByte(t4) {
    return t4 >>> 8 & 255;
  }
  static toPromise(t4) {
    return new Promise((e2) => {
      t4(e2);
    });
  }
  static randomUUID(t4) {
    if ("object" == typeof crypto) {
      if ("function" == typeof crypto.randomUUID)
        return t4 ? crypto.randomUUID() : crypto.randomUUID().toUpperCase();
      if ("function" == typeof crypto.getRandomValues && "function" == typeof Uint8Array) {
        const e3 = "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (t5) => {
          const e4 = Number(t5);
          return (e4 ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> e4 / 4).toString(16);
        });
        return t4 ? e3.toUpperCase() : e3;
      }
    }
    let e2 = (/* @__PURE__ */ new Date()).getTime(), i2 = "undefined" != typeof performance && performance.now && 1e3 * performance.now() || 0;
    const n2 = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (t5) => {
      let n3 = 16 * Math.random();
      return e2 > 0 ? (n3 = (e2 + n3) % 16 | 0, e2 = Math.floor(e2 / 16)) : (n3 = (i2 + n3) % 16 | 0, i2 = Math.floor(i2 / 16)), ("x" === t5 ? n3 : 3 & n3 | 8).toString(16);
    });
    return t4 ? n2.toUpperCase() : n2;
  }
  static getRandomValues(t4, e2) {
    const i2 = e2 && e2 > 0 ? e2 : 256, n2 = [], s2 = t4 && t4 > 0 ? t4 : 1;
    let r2 = (/* @__PURE__ */ new Date()).getTime(), a2 = "undefined" != typeof performance && performance.now && 1e3 * performance.now() || 0;
    for (let t5 = 0; t5 < s2; t5++) {
      let e3 = Math.random() * i2;
      r2 > 0 ? (e3 = (r2 + e3) % i2 | 0, r2 = Math.floor(r2 / i2)) : (e3 = (a2 + e3) % i2 | 0, a2 = Math.floor(a2 / i2)), n2[t5] = e3;
    }
    return n2;
  }
  static getRandomStr(t4) {
    const e2 = t4 && t4 > 0 ? t4 : 8;
    if ("object" == typeof crypto && "function" == typeof crypto.getRandomValues && "function" == typeof Uint8Array) {
      const t5 = crypto.getRandomValues(new Uint8Array(e2));
      return Array.from(t5).map((t6) => (15 & t6).toString(16)).join("");
    }
    return this.getRandomValues(e2, 16).map((t5) => (15 & t5).toString(16)).join("");
  }
  static nextPageKey(t4) {
    return ++t4 >= 65535 && (t4 = 1), t4;
  }
}
class Be {
  static createEmitter(t4) {
    return new Be(t4 || "");
  }
  constructor(t4) {
    this.listeners = /* @__PURE__ */ new Map(), this.tagName = t4;
  }
  on(t4, e2) {
    const i2 = e2 || Be.EVENT_NAME;
    let n2 = this.listeners.get(i2);
    return n2 ? n2.push(t4) : (n2 = [t4], this.listeners.set(i2, n2)), t4;
  }
  off(t4, e2) {
    const i2 = e2 || Be.EVENT_NAME, n2 = this.listeners.get(i2);
    if (n2) {
      const e3 = n2.indexOf(t4);
      if (e3 >= 0)
        return n2.splice(e3, 1), t4;
    }
  }
  clear(t4) {
    const e2 = this.listeners.get(t4 || Be.EVENT_NAME);
    return e2 ? e2.splice(0) : [];
  }
  emit(t4, e2, i2) {
    var n2;
    const s2 = e2 || Be.EVENT_NAME, r2 = (null === (n2 = this.listeners.get(s2)) || void 0 === n2 ? void 0 : n2.slice(0)) || [];
    i2 ? r2.forEach((e3) => e3(t4)) : setTimeout(() => {
      r2.forEach((e3) => e3(t4));
    });
  }
  invoke(t4, e2) {
    this.emit(t4, e2, true);
  }
  beginInvoke(t4, e2) {
    this.emit(t4, e2, false);
  }
}
Be.EVENT_NAME = "_";
class Le {
  static getPackBytes(t4) {
    return t4 + (t4 >= 192 ? 5 : 4);
  }
  static toShort(t4, e2) {
    return this.toNumber(t4, e2);
  }
  static toEBV(t4, e2) {
    return e2 && e2 >= 192 ? this.toNumber(t4, -193 & e2) : 255 & t4;
  }
  static fromEBV(t4) {
    const e2 = [];
    return t4 >= 192 ? (e2.push(t4 >>> 8 | 192), e2.push(255 & t4)) : e2.push(t4), e2;
  }
  static toNumber(t4, e2, i2, n2) {
    let s2 = 0;
    return t4 && (s2 |= 255 & t4), e2 && (s2 |= (255 & e2) << 8), i2 && (s2 |= (255 & i2) << 16), n2 && (s2 |= (255 & n2) << 24), s2;
  }
  static getBytesFromNumber(t4, e2) {
    const i2 = new Uint8Array(e2);
    for (let n2 = 0; n2 < e2; n2++)
      i2[n2] = t4 >>> 8 * (e2 - 1 - n2) & 255;
    return i2;
  }
  static getBytesFromShort(t4, e2) {
    let i2 = [t4 >>> 8 & 255, 255 & t4];
    return e2 && (i2 = t4 >= 192 ? [t4 >>> 8 | 192, 255 & t4] : [255 & t4]), new Uint8Array(i2);
  }
  static getBytesFromInt32(t4) {
    return this.getBytesFromNumber(t4, 4);
  }
  static calcCRC(t4, e2, i2) {
    let n2 = 0;
    for (; e2 < i2; ++e2)
      n2 += 255 & t4[e2];
    return 255 & ~n2;
  }
  static parse(t4) {
    if (t4.length < 4 || t4[0] != Le.DEVICE_TO_HOST_DATA_START)
      return;
    const e2 = t4[1];
    let i2 = 0, n2 = 0;
    if (t4[2] >= 192) {
      if (t4.length < 5)
        return;
      i2 = Le.toShort(t4[3], t4[2]), n2 = t4[i2 + 4];
      const s2 = Le.calcCRC(t4, 1, i2 + 4);
      n2 !== Le.FIXED_PACKAGE_CRC_RESULT && n2 !== s2 && l.warn(`---- CRC检验失败：receiveCRC = ${n2}, calcCRC = ${s2}`);
      const r2 = i2 > 0 ? new Le(e2, t4.slice(4, i2 + 4)) : new Le(e2);
      return r2.setRawData(Uint8Array.from(t4)), r2;
    }
    {
      if (i2 = t4[2], t4.length < i2 + 4)
        return;
      n2 = t4[i2 + 3];
      const s2 = Le.calcCRC(t4, 1, i2 + 3);
      if (n2 === Le.FIXED_PACKAGE_CRC_RESULT || n2 === s2) {
        const n3 = i2 > 0 ? new Le(e2, t4.slice(3, i2 + 3)) : new Le(e2);
        return n3.setRawData(Uint8Array.from(t4)), n3;
      }
      l.warn(`---- CRC校验失败：receiveCrc = ${n2}, calcCrc = ${s2}`);
    }
  }
  constructor(t4, e2) {
    this.mOffset = 0, this.mCmd = t4, this.mData = e2 || [];
  }
  get cmd() {
    return this.mCmd;
  }
  get Data() {
    return this.mData;
  }
  get Length() {
    return this.mData ? this.mData.length : 0;
  }
  get Remains() {
    return this.mData.length - this.mOffset;
  }
  getRawData() {
    return this.mRawData;
  }
  setRawData(t4) {
    this.mRawData = t4;
  }
  pushByte(t4) {
    this.mData.push(255 & t4);
  }
  popByte(t4) {
    let e2 = t4 || 0;
    return this.mOffset < this.mData.length && (e2 = this.mData[this.mOffset++]), e2;
  }
  pushShort(t4, e2) {
    e2 ? t4 >= 192 ? (this.mData.push(t4 >>> 8 | 192), this.mData.push(255 & t4)) : this.mData.push(255 & t4) : (this.mData.push(t4 >>> 8 & 255), this.mData.push(t4 >>> 0 & 255));
  }
  popShort(t4) {
    let e2 = t4 || 0;
    const i2 = this.mOffset;
    return i2 <= this.mData.length - 2 ? (e2 = Le.toShort(this.mData[i2 + 1], this.mData[i2]), this.mOffset += 2) : e2 = Le.toShort(this.mData[this.mOffset++]), e2;
  }
  pushEBV(t4) {
    return t4 >= 192 ? (this.mData.push(t4 >>> 8 | 192), this.mData.push(255 & t4), this.mOffset += 2, this.mOffset) : (this.mData.push(t4), this.mOffset++, this.mOffset);
  }
  popEBV(t4) {
    const e2 = this.mOffset;
    let i2 = t4 || 0;
    return e2 < this.mData.length && (this.mData[e2] >= 192 && this.mData.length >= e2 + 2 ? (i2 = Le.toEBV(this.mData[e2 + 1], -193 & this.mData[e2]), this.mOffset += 2) : i2 = this.mData[this.mOffset++]), i2;
  }
  pushInt(t4) {
    this.mData.push(t4 >>> 24 & 255), this.mData.push(t4 >>> 16 & 255), this.mData.push(t4 >>> 8 & 255), this.mData.push(t4 >>> 0 & 255);
  }
  popInt(t4) {
    let e2 = t4 || 0;
    const i2 = this.mOffset;
    return i2 + 4 <= this.mData.length && (e2 = Le.toNumber(this.mData[i2 + 3], this.mData[i2 + 2], this.mData[i2 + 1], this.mData[i2]), this.mOffset += 4), e2;
  }
  popInteger(t4) {
    return this.popInt(t4);
  }
  popString() {
    const t4 = this.mOffset;
    if (t4 >= this.mData.length)
      return "";
    let e2 = t4;
    for (; e2 < this.mData.length && 0 !== this.mData[e2]; e2++)
      ;
    this.mOffset = e2;
    const i2 = this.mData.slice(t4, e2);
    return De.decode(Uint8Array.from(i2), "gbk");
  }
  popByteArray() {
    const t4 = this.mOffset;
    return t4 >= this.mData.length ? new Uint8Array(0) : (this.mOffset = this.mData.length, Uint8Array.from(this.Data.slice(t4)));
  }
  getBufferLength() {
    return Le.getPackBytes(this.mData.length);
  }
  getBytes() {
    const t4 = this.mData || [], e2 = t4.length, i2 = new Uint8Array(e2 + (e2 >= 192 ? 5 : 4));
    if (i2[0] = Le.DEVICE_TO_HOST_DATA_START, i2[1] = this.mCmd, e2 >= 192) {
      i2[2] = e2 >>> 8 | 192, i2[3] = 255 & e2;
      for (let n2 = 0; n2 < e2; n2++)
        i2[n2 + 4] = t4[n2];
      i2[e2 + 4] = Le.FIXED_PACKAGE_CRC_RESULT;
    } else {
      i2[2] = e2;
      for (let n2 = 0; n2 < e2; n2++)
        i2[n2 + 3] = t4[n2];
      i2[e2 + 3] = Le.FIXED_PACKAGE_CRC_RESULT;
    }
    return i2;
  }
}
Le.HOST_TO_DEVICE_DATA_START = 31, Le.DEVICE_TO_HOST_DATA_START = 31, Le.FIXED_PACKAGE_CRC_RESULT = 136;
class Ne {
  get FreeSpace() {
    return this.mBuffer.length - this.mBufLen;
  }
  get Length() {
    return this.mBufLen;
  }
  constructor(t4) {
    this.mBufLen = 0;
    const e2 = t4 && t4 > Ne.BUFFER_LENGTH_DEFAULT ? t4 : Ne.BUFFER_LENGTH_DEFAULT;
    this.mBuffer = new Uint8Array(e2);
  }
  static getBytes(t4, e2) {
    return new Le(t4, e2).getBytes();
  }
  pushPackage(t4, e2) {
    const i2 = Ne.getBytes(t4, e2);
    return this.push(i2);
  }
  pushByte(t4, e2) {
    const i2 = Ne.getBytes(t4, [255 & e2]);
    return this.push(i2);
  }
  pushShort(t4, e2, i2) {
    const n2 = Le.getBytesFromShort(e2, i2);
    return this.push(Ne.getBytes(t4, Array.from(n2)));
  }
  pushInt(t4, e2) {
    const i2 = Le.getBytesFromInt32(e2);
    return this.push(Ne.getBytes(t4, Array.from(i2)));
  }
  push(t4, e2, i2) {
    const n2 = e2 || 0, s2 = i2 || t4.length;
    if (s2 - n2 > this.mBuffer.length - this.mBufLen)
      return l.warn("---- PackageBuffer缓存不够！"), false;
    for (let e3 = n2; e3 < s2; e3++)
      this.mBuffer[this.mBufLen++] = t4[e3];
    return true;
  }
  getAllBytes() {
    return this.mBuffer.slice(0, this.mBufLen);
  }
  clearBuffer() {
    this.mBufLen = 0, this.mBuffer.fill(0);
  }
  toString() {
    return `{size: ${this.mBuffer.length}, mBufLen: ${this.mBufLen}, buffer: [${Me.arrayBufferToHex16(this.mBuffer)}]}`;
  }
}
Ne.BUFFER_LENGTH_DEFAULT = 1e3;
class je {
  constructor() {
    this.mBufferList = [];
  }
  get BufferList() {
    return this.mBufferList;
  }
  get Length() {
    return this.mBufferList.length;
  }
  reset() {
    this.mBufferList.splice(0);
  }
  toList() {
    return this.mBufferList.slice(0);
  }
  push(t4, e2, i2) {
    const n2 = e2 || 0, s2 = i2 || t4.length, r2 = s2 - n2;
    let a2 = this.mBufferList[this.mBufferList.length - 1];
    (!a2 || a2.FreeSpace < r2) && (a2 = new Ne(r2), this.mBufferList.push(a2)), a2.push(t4, n2, s2);
  }
  push2(t4, e2, i2, n2, s2, r2) {
    const a2 = new Ne();
    a2.push(t4, e2, i2), a2.push(n2, s2, r2), this.push(a2.getAllBytes());
  }
  pushPackage(t4, e2) {
    const i2 = Ne.getBytes(t4, e2);
    return this.push(i2);
  }
}
const Ue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 24, 36, 48, 120], Fe = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 41, 62, 83, 104, 125, 146, 167, 188, 209, 230, 461, 923];
class ke {
  static appendRLEC(t4, e2, i2, n2, s2) {
    for (; n2 >= 63; n2 -= 63) {
      if (e2.value + 2 > s2)
        return false;
      t4[e2.value] = 255, ++e2.value, t4[e2.value] = i2, ++e2.value;
    }
    switch (n2) {
      case 1:
        if (i2 > 192) {
          if (e2.value + 2 > s2)
            return false;
          t4[e2.value] = 193, ++e2.value, t4[e2.value] = i2, ++e2.value;
        } else {
          if (e2.value + 1 > s2)
            return false;
          t4[e2.value] = i2, ++e2.value;
        }
        break;
      case 2:
        if (e2.value + 2 > s2)
          return false;
        i2 > 192 ? (t4[e2.value] = 194, ++e2.value, t4[e2.value] = i2, ++e2.value) : (t4[e2.value] = i2, ++e2.value, t4[e2.value] = i2, ++e2.value);
        break;
      default:
        if (n2 > 0) {
          if (e2.value + 2 > s2)
            return false;
          t4[e2.value] = 192 | n2, ++e2.value, t4[e2.value] = i2, ++e2.value;
        }
    }
    return true;
  }
  static calcRLEC(t4, e2, i2, n2) {
    if (e2 <= 0)
      return 0;
    const s2 = { value: 0 };
    let r2 = t4[0], a2 = 1;
    for (let o2 = 1; o2 < e2; ++o2)
      if (t4[o2] === r2)
        ++a2;
      else {
        if (!this.appendRLEC(i2, s2, r2, a2, n2))
          return 0;
        r2 = t4[o2], a2 = 1;
      }
    return this.appendRLEC(i2, s2, r2, a2, n2) ? s2.value : 0;
  }
  static appendRLE5(t4, e2, i2, n2, s2) {
    if (n2 <= 0)
      return true;
    let r2 = Math.floor(5 * e2.value / 8), a2 = 15;
    for (; n2 > 0; )
      if (n2 >= Ue[a2]) {
        n2 -= Ue[a2];
        const o2 = a2 | (i2 ? 16 : 0);
        if (e2.value = e2.value + 1, 5 * e2.value > 8 * s2)
          return false;
        switch (7 & e2.value) {
          case 0:
            t4[r2] = t4[r2] | o2, ++r2;
            break;
          case 1:
            t4[r2] = t4[r2] | o2 << 3;
            break;
          case 2:
            t4[r2] = t4[r2] | o2 >>> 2, ++r2, t4[r2] = t4[r2] | (3 & o2) << 6;
            break;
          case 3:
            t4[r2] = t4[r2] | o2 << 1;
            break;
          case 4:
            t4[r2] = t4[r2] | o2 >>> 4, ++r2, t4[r2] = t4[r2] | (15 & o2) << 4;
            break;
          case 5:
            t4[r2] = t4[r2] | o2 >>> 1, ++r2, t4[r2] = t4[r2] | (1 & o2) << 7;
            break;
          case 6:
            t4[r2] = t4[r2] | o2 << 2;
            break;
          case 7:
            t4[r2] = t4[r2] | o2 >>> 3, ++r2, t4[r2] = t4[r2] | (7 & o2) << 5;
        }
      } else
        n2 <= 12 ? a2 = n2 - 1 : --a2;
    return true;
  }
  static calcRLE5X(t4, e2, i2, n2) {
    if (e2 <= 0)
      return 0;
    let s2 = 0, r2 = 0, a2 = false, o2 = 128;
    const h2 = { value: 0 };
    for (; ; ) {
      if (0 !== (t4[r2] & o2))
        if (a2)
          ++s2;
        else {
          if (!this.appendRLE5(i2, h2, false, s2, n2))
            return 0;
          a2 = true, s2 = 1;
        }
      else if (a2) {
        if (!this.appendRLE5(i2, h2, true, s2, n2))
          return 0;
        a2 = false, s2 = 1;
      } else
        ++s2;
      if (1 === o2) {
        if (++r2, r2 >= e2)
          break;
        o2 = 128;
      } else
        o2 >>>= 1;
    }
    return a2 && !this.appendRLE5(i2, h2, true, s2, n2) ? 0 : h2.value;
  }
  static calcRLE5D(t4, e2, i2, n2, s2, r2) {
    let a2 = 0, o2 = 0, h2 = false, c2 = 128;
    const d2 = { value: 0 }, u2 = Math.min(e2, n2);
    if (u2 > 0)
      for (; ; ) {
        if ((i2[o2] & c2) !== (t4[o2] & c2))
          if (h2)
            ++a2;
          else {
            if (!this.appendRLE5(s2, d2, false, a2, r2))
              return 0;
            h2 = true, a2 = 1;
          }
        else if (h2) {
          if (!this.appendRLE5(s2, d2, true, a2, r2))
            return 0;
          h2 = false, a2 = 1;
        } else
          ++a2;
        if (1 === c2) {
          if (++o2, o2 >= u2)
            break;
          c2 = 128;
        } else
          c2 >>>= 1;
      }
    if (e2 !== n2)
      for (e2 < n2 && (t4 = i2, e2 = n2), c2 = 128; ; ) {
        if (0 !== (t4[o2] & c2))
          if (h2)
            ++a2;
          else {
            if (!this.appendRLE5(s2, d2, false, a2, r2))
              return 0;
            h2 = true, a2 = 1;
          }
        else if (h2) {
          if (!this.appendRLE5(s2, d2, true, a2, r2))
            return 0;
          h2 = false, a2 = 1;
        } else
          ++a2;
        if (1 === c2) {
          if (++o2, o2 >= e2)
            break;
          c2 = 128;
        } else
          c2 >>>= 1;
      }
    return h2 && !this.appendRLE5(s2, d2, true, a2, r2) ? 0 : d2.value;
  }
  static appendRLE6(t4, e2, i2, n2, s2) {
    if (n2 <= 0)
      return true;
    let r2 = Math.floor(6 * e2.value / 8), a2 = 31;
    for (; n2 > 0; )
      if (n2 >= Fe[a2]) {
        n2 -= Fe[a2];
        const o2 = a2 | (i2 ? 32 : 0);
        if (e2.value = e2.value + 1, 6 * e2.value > 8 * s2)
          return false;
        switch (3 & e2.value) {
          case 0:
            t4[r2] = t4[r2] | o2, ++r2;
            break;
          case 1:
            t4[r2] = t4[r2] | o2 << 2;
            break;
          case 2:
            t4[r2] = t4[r2] | o2 >>> 4, ++r2, t4[r2] = t4[r2] | (15 & o2) << 4;
            break;
          case 3:
            t4[r2] = t4[r2] | o2 >>> 2, ++r2, t4[r2] = t4[r2] | (3 & o2) << 6;
        }
      } else
        n2 <= 20 ? a2 = n2 - 1 : --a2;
    return true;
  }
  static calcRLE6X(t4, e2, i2, n2) {
    if (e2 <= 0)
      return 0;
    let s2 = 0, r2 = 0, a2 = false, o2 = 128;
    const h2 = { value: 0 };
    for (; ; ) {
      if (0 !== (t4[r2] & o2))
        if (a2)
          ++s2;
        else {
          if (!this.appendRLE6(i2, h2, false, s2, n2))
            return 0;
          a2 = true, s2 = 1;
        }
      else if (a2) {
        if (!this.appendRLE6(i2, h2, true, s2, n2))
          return 0;
        a2 = false, s2 = 1;
      } else
        ++s2;
      if (1 === o2) {
        if (++r2, r2 >= e2)
          break;
        o2 = 128;
      } else
        o2 >>>= 1;
    }
    return a2 && !this.appendRLE6(i2, h2, true, s2, n2) ? 0 : h2.value;
  }
  static calcRLE6D(t4, e2, i2, n2, s2, r2) {
    let a2 = 0, o2 = 0, h2 = false, c2 = 128;
    const d2 = { value: 0 }, u2 = Math.min(e2, n2);
    if (u2 > 0)
      for (; ; ) {
        if ((i2[o2] & c2) !== (t4[o2] & c2))
          if (h2)
            ++a2;
          else {
            if (!this.appendRLE6(s2, d2, false, a2, r2))
              return 0;
            h2 = true, a2 = 1;
          }
        else if (h2) {
          if (!this.appendRLE6(s2, d2, true, a2, r2))
            return 0;
          h2 = false, a2 = 1;
        } else
          ++a2;
        if (1 === c2) {
          if (++o2, o2 >= u2)
            break;
          c2 = 128;
        } else
          c2 >>>= 1;
      }
    if (e2 !== n2)
      for (e2 < n2 && (t4 = i2, e2 = n2), c2 = 128; ; ) {
        if (0 !== (t4[o2] & c2))
          if (h2)
            ++a2;
          else {
            if (!this.appendRLE6(s2, d2, false, a2, r2))
              return 0;
            h2 = true, a2 = 1;
          }
        else if (h2) {
          if (!this.appendRLE6(s2, d2, true, a2, r2))
            return 0;
          h2 = false, a2 = 1;
        } else
          ++a2;
        if (1 === c2) {
          if (++o2, o2 >= e2)
            break;
          c2 = 128;
        } else
          c2 >>>= 1;
      }
    return h2 && !this.appendRLE6(s2, d2, true, a2, r2) ? 0 : d2.value;
  }
}
const $e = 1024, We = 1536, He = [12];
class Je {
  static getPrintableMessage(t4) {
    const e2 = t4;
    switch (e2) {
      case Je.DZIP_PRINTABLE:
        return "OK";
      case Je.DZIP_ISPRINTING:
        return "正在打印";
      case Je.DZIP_ISROTATING:
        return "正在转动马达";
      case Je.DZIP_NOJOB:
        return "没有打印任务";
      case Je.DZIP_PAGENOTREADY:
        return "页面数据还没有接收完全";
      case Je.DZIP_JOBCANCELED:
        return "当前打印任务被取消";
      case Je.DZIP_VOLTOOLOW:
        return "打印电压太低了";
      case Je.DZIP_VOLTOOHIGH:
        return "打印电压太高了";
      case Je.DZIP_TPHNOTFOUND:
        return "没有检测到打印头";
      case Je.DZIP_TPHTOOHOT:
        return "打印头温度太高了";
      case Je.DZIP_COVEROPENED:
        return "打印机盖子打开了";
      case Je.DZIP_NO_PAPER:
        return "未检测到纸张";
      case Je.DZIP_RIBBONCANOPENED:
        return "碳带盒未锁紧";
      case Je.DZIP_NO_RIBBON:
        return "未检测到碳带";
      case Je.DZIP_UNMATCHED_RIBBON:
        return "不匹配的碳带";
      case Je.DZIP_TPHTOOCOLD:
        return "环境温度过低";
      case Je.DZIP_USEDUP_RIBBON:
        return "用完的碳带";
      case Je.DZIP_USEDUP_RIBBON2:
        return "用完的色带";
      case Je.DZIP_LABELCANOPENED:
        return "标签盒未锁紧";
      default:
        return "未知异常:" + e2;
    }
  }
}
Je.CMD_NULL = 0, Je.CMD_IS_PRINTABLE = 112, Je.DZIP_PRINTABLE = 0, Je.DZIP_ISPRINTING = 1, Je.DZIP_ISROTATING = 2, Je.DZIP_NOJOB = 10, Je.DZIP_PAGENOTREADY = 11, Je.DZIP_JOBCANCELED = 12, Je.DZIP_ENVNOTREADY = 20, Je.DZIP_VOLTOOLOW = 30, Je.DZIP_VOLTOOHIGH = 31, Je.DZIP_TPHNOTFOUND = 32, Je.DZIP_TPHTOOHOT = 33, Je.DZIP_COVEROPENED = 34, Je.DZIP_NO_PAPER = 35, Je.DZIP_RIBBONCANOPENED = 36, Je.DZIP_NO_RIBBON = 37, Je.DZIP_UNMATCHED_RIBBON = 38, Je.DZIP_TPHTOOCOLD = 39, Je.DZIP_USEDUP_RIBBON = 40, Je.DZIP_USEDUP_RIBBON2 = 41, Je.DZIP_NO_LABEL = 42, Je.DZIP_UNMATCHED_LABEL = 43, Je.DZIP_USEDUP_LABEL = 44, Je.DZIP_NO_RIBBON2 = 45, Je.DZIP_UNMATCHED_RIBBON2 = 46, Je.DZIP_LABELCANOPENED = 50, Je.DZCT_ANDROID_APP = 0, Je.DZCT_ANDROID_BLE = 6, Je.DZCT_ANDIOS_DJGW = 12, Je.DZCT_ANDROID_USB = 16, Je.CMD_ENABLE_SETTING = 128, Je.CMD_DEVICE_TYPE = 120, Je.CMD_DEVICE_NAME = 121, Je.CMD_DEVICE_VERSION = 122, Je.CMD_SOFTWARE_VERSION = 124, Je.CMD_PRINTER_DPI = 113, Je.CMD_PRINTER_WIDTH = 114, Je.CMD_MANUFACTURER = 117, Je.CMD_BUFFER_STATE = 118, Je.CMD_BUFFER_SIZE = 119, Je.CMD_PAGE_START = 32, Je.CMD_PAGE_PRINT = 33, Je.CMD_PAGE_LINE = 34, Je.CMD_PAGE_PARAM = 37, Je.CMD_PAGE_HEIGHT = 38, Je.CMD_PAGE_WIDTH = 39, Je.CMD_PAGE_END = 40, Je.CMD_PAGE_CONTROL = 35, Je.CMD_DARKNESS = 67, Je.CMD_SPEED = 68, Je.CMD_GAP_TYPE = 66, Je.CMD_GAP_LEN = 69, Je.CMD_MOTORMODE = 71, Je.CMD_AUTOPOWEROFF = 72, Je.CMD_LANGUAGE = 73, Je.CMD_CAP_GAPTYPE = 82, Je.CMD_CAP_MOTORMODE = 87, Je.CMD_CAP_LANGUAGE = 89, Je.CMD_DEVICE_DMINFO = 125, Je.CMD_SET_GENFLAGS = 77, Je.CMD_COMMIT_PARAM = 79, Je.CMD_DEV_DISCOVERY = 90, Je.CMD_POSITIONING = 92, Je.CMD_ADDRESS_READ = 97, Je.CMD_PERIPHERALFLAGS = 131, Je.CMD_PERIPHERALTYPE_FLAGS = 1, Je.CMD_PERIPHERALTYPE_SPISPEED = 2, Je.CMD_HARDWARE_FLAGS = 132, Je.CMD_REQ_ADCVALUE = 136, Je.CMD_DEV_HANDSHAKE = 158, Je.CMD_MANU_TOOLKIT = 159, Je.CMD_MCU_GETID = 10, Je.CMD_DEBUG_BUFFER = 127, Je.CMD_PRINT_COUNTER = 115, Je.CMD_MANUSHIPTIME = 17, Je.CMD_SUB_ROM_UPGRADE = 41, Je.CMD_BITMAP_P_RLEC = 41, Je.CMD_BITMAP_PRINT = 43, Je.CMD_BITMAP_P_RLEX = 44, Je.CMD_BITMAP_P_RLED = 45, Je.CMD_BITMAP_P_RLE6X = 60, Je.CMD_BITMAP_P_RLE6D = 61, Je.CMD_BITMAP_REPEAT = 46, Je.CMD_0x40 = 64, Je.ADCEVT_POWER = 1, Je.ADCEVT_TPHTM = 2, Je.PCPDHF_UHFRFID_WRITOR = 2, Je.PCPDHF_HFRFID_WRITOR = 4, Je.PCPDHF_NFCRFID_WRITOR = 6, Je.PCPDHF_MSKRFID_WRITOR = 6, Je.PCPDHF_HAS_BEEP = 16384, Je.PCPDHF_SUPER_BITMAP = 16, Je.PCPDHF_GRAY_BITMAP = 32, Je.PCPDHF_BLUETOOTH_2 = 131072, Je.PCPDSF_NO_AUTO_OUT = 268435456, Je.PCPDSF_MOTOR_ANTIDIR = 1, Je.PCPDSF_RLE5_BITMAP = 16, Je.PCPDSF_RLE6_BITMAP = 32, Je.PCPDSF_RLEC_BITMAP = 128, Je.PCPDSF_MASK_BITMAP = 240, Je.PCPDSF_BT_HARD_FC = 256, Je.PCPDSF_PRTA_RIGHT = 0, Je.PCPDSF_PRTA_CENTER = 512, Je.PCPDSF_PRTA_LEFT = 1024, Je.PCPDSF_PRTA_MASK = 1536, Je.PCPDSF_ROTATE_180 = 16384, Je.PCPDAF_BT_HARD_FC = 1, Je.PCPDAF_STRING_GBK = 2, Je.PCPDAF_HAS_WIFI = 4096, Je.PCPDAF_RLEC_BITMAP = 128;
class Ge {
  constructor() {
    this.mThreshold = Ge.THRESHOLD_DEFAULT, this.mOrientation = 0, this.mLineAction = 0, this.mSoftwareFlags = 16, this.mHardwareFlags = 0, this.mSupportSuperBitmap = true, this.mPrinterWidth = 0, this.mLineCount = 0, this.mLineBytes = 0, this.mBufferList = new je(), this.mByteWidth = 0, this.mPrevBytes = 0, this.mSumLines = 0, this.mSumPrints = 0, this.mSumRLE5Xs = 0, this.mSumRLE5Ds = 0, this.mSumRLE6Xs = 0, this.mSumRLE6Ds = 0, this.mSumRLE_Cs = 0, this.mSumRepeats = 0, this.mRLE5XSaved = 0, this.mRLE5DSaved = 0, this.mRLE6XSaved = 0, this.mRLE6DSaved = 0, this.mRLECSaved = 0;
  }
  static encodeImageData(t4, e2) {
    this.instance || (this.instance = new Ge());
    const i2 = e2 || {}, n2 = Object.assign(Object.assign(Object.assign({}, i2), t4), { gapType: "number" == typeof t4.gapType ? t4.gapType : 255, printDarkness: "number" == typeof t4.printDarkness ? t4.printDarkness : 255, printSpeed: "number" == typeof t4.printSpeed ? t4.printSpeed : 255, gapLength: t4.gapLength || 0, printerDPI: i2.printerDPI || t4.printerDPI, printerWidth: i2.printerWidth || t4.printerWidth, softwareFlags: i2.softwareFlags || t4.softwareFlags, hardwareFlags: i2.hardwareFlags || t4.hardwareFlags }), s2 = this.instance.print(n2);
    return s2 ? s2.map((t5) => t5.getAllBytes()) : [];
  }
  static updatePageKey(t4, e2) {
    const i2 = t4[0];
    if (i2 && !(i2.length <= 0) && 31 === i2[0] && i2[1] === Je.CMD_PAGE_START && 2 === i2[2]) {
      const t5 = Le.toShort(i2[4], i2[3]);
      if (t5 !== e2) {
        const n2 = Le.getBytesFromShort(e2 || 0, false);
        i2[3] = n2[0], i2[4] = n2[1], l.log(`---- updatePageKey: from -> to [${t5}] => [${e2}]`);
      }
    }
  }
  get IsLandscape() {
    return 0 === this.mOrientation || 2 === this.mOrientation;
  }
  print(t4) {
    return this.start(t4) ? (l.info("---- start to image encode:"), this.encode(t4), l.info("---- stop to image encode:"), this.end(t4)) : null;
  }
  reset(t4) {
    const e2 = t4 || {}, i2 = e2;
    "number" != typeof e2.printSpeed && "number" == typeof i2.speed && (e2.printSpeed = i2.speed), "number" == typeof e2.printAlignment && (0 === e2.printAlignment ? e2.printAlignment = $e : 1 === e2.printAlignment ? e2.printAlignment = 512 : 2 === e2.printAlignment && (e2.printAlignment = 0)), e2.orientation = "number" == typeof e2.orientation ? e2.orientation : 0, e2.orientation >= 360 && (e2.orientation = e2.orientation % 360), e2.orientation > 3 && (e2.orientation = Math.floor(e2.orientation / 90)), this.mOrientation = e2.orientation, this.mPrinterWidth = e2.printerWidth && e2.printerWidth > 0 ? e2.printerWidth : Ge.PRINTER_WIDTH_DEFAULT, "number" == typeof e2.darkness && (e2.printDarkness = e2.darkness), "number" == typeof e2.speed && (e2.printSpeed = e2.speed), e2.threshold && e2.threshold > 0 && e2.threshold < 255 ? this.mThreshold = e2.threshold : this.mThreshold = Ge.THRESHOLD_DEFAULT, this.mBufferList.reset(), this.mSoftwareFlags = "number" == typeof e2.softwareFlags ? e2.softwareFlags : 16, this.mHardwareFlags = e2.hardwareFlags || 0, this.mSupportSuperBitmap = "boolean" != typeof e2.enableSuperBitmap || e2.enableSuperBitmap, this.mLineAction = 1, this.mByteWidth = Math.floor((this.mPrinterWidth + 7) / 8), this.mLineCount = e2.marginTop && e2.marginTop > 0 ? e2.marginTop : 0, this.mLineBytes = 0, this.mLineData = new Uint8Array(0), this.mPrevBytes = 0, this.mPrevData = new Uint8Array(0), this.mSumLines = 0, this.mSumPrints = 0, this.mSumRLE5Xs = 0, this.mSumRLE5Ds = 0, this.mSumRLE6Xs = 0, this.mSumRLE6Ds = 0, this.mSumRLE_Cs = 0, this.mSumRepeats = 0, this.mRLE5XSaved = 0, this.mRLE5DSaved = 0, this.mRLE6XSaved = 0, this.mRLE6DSaved = 0, this.mRLECSaved = 0;
  }
  start(t4) {
    const e2 = t4.pageKey, i2 = new Ne(), n2 = t4.imageData;
    if (!n2)
      return l.warn("---- PrintPackage.start --> imageData is null."), false;
    if (!n2.width || !n2.height || !n2.data)
      return l.warn("---- PrintPackage.start --> imageData is invalid:", n2), false;
    this.reset(t4), l.info(`========== startPage pageKey: ${e2} ==========`), l.info(`---- width                     : ${n2.width}`), l.info(`---- height                    : ${n2.height}`), l.info(`---- orientation               : ${this.mOrientation}`), l.info(`---- printerDPI                : ${t4.printerDPI}`), l.info(`---- printerWidth              : ${t4.printerWidth}`), l.info(`---- gapType                   : ${t4.gapType}`), l.info(`---- printDarkness             : ${t4.printDarkness}`), l.info(`---- printSpeed                : ${t4.printSpeed}`), l.info(`---- gapLength                 : ${t4.gapLength}`), l.info(`---- printAlignment            : ${t4.printAlignment}`), l.info("---- printerAlignment[0/2/4]   : " + (this.getPrintAlignment() >> 8)), l.info(`---- threshold                 : ${t4.threshold}`), l.info(`---- printable                 : ${t4.printable}`), l.info(`---- mSoftwareFlags            : ${Me.toHexString(this.mSoftwareFlags, "0x")}`), l.info(`---- mHardwareFlags            : ${Me.toHexString(this.mHardwareFlags, "0x")}`), l.info(`---- supportSuperBitmap        : ${this.mSupportSuperBitmap}`), l.info(`---- pageNo                    : ${t4.pageNo}`), l.info(`---- pageCount                 : ${t4.PageCount}`), l.info("=================================================");
    const s2 = this.IsLandscape ? n2.width : n2.height, r2 = Le.getBytesFromShort(e2 || 0, false);
    i2.pushPackage(Je.CMD_PAGE_START, Array.from(r2));
    const a2 = Le.fromEBV(Math.floor((s2 + 7) / 8));
    i2.pushPackage(Je.CMD_PAGE_WIDTH, a2);
    const o2 = "number" == typeof t4.gapType ? t4.gapType : -1;
    o2 >= Oe.None && o2 <= Oe.Trans && i2.pushPackage(Je.CMD_GAP_TYPE, [o2]);
    const h2 = "number" == typeof t4.gapLength ? t4.gapLength : 0;
    if (h2 > 0 && o2 > 0 && o2 <= 4) {
      let t5 = Math.floor(100 * h2);
      t5 > Ge.MAX_EBV_VALUE && (t5 = Ge.MAX_EBV_VALUE), i2.pushPackage(Je.CMD_GAP_LEN, Le.fromEBV(t5));
    }
    const c2 = "number" == typeof t4.printDarkness ? t4.printDarkness : -1;
    c2 >= Se.Min && c2 <= Se.Max && i2.pushPackage(Je.CMD_DARKNESS, [c2 - 1]);
    const d2 = "number" == typeof t4.printSpeed ? t4.printSpeed : -1;
    return d2 >= Te.Min && d2 <= Te.Max && i2.pushPackage(Je.CMD_SPEED, [d2 - 1]), this.mBufferList.push(i2.getAllBytes()), true;
  }
  static getImageGrayValue(t4, e2) {
    return e2 + 3 < t4.length && t4[e2 + 3] > 0 ? 0.3 * t4[e2] + 0.59 * t4[e2 + 1] + 0.11 * t4[e2 + 2] : 255;
  }
  getPrintAlignment() {
    return this.mSoftwareFlags & Je.PCPDSF_PRTA_MASK;
  }
  encode(t4) {
    const e2 = t4.imageData, i2 = e2.width, n2 = e2.height, s2 = this.IsLandscape ? Math.min(i2, this.mPrinterWidth) : Math.min(n2, this.mPrinterWidth);
    this.mByteWidth = Math.floor((s2 + 7) / 8);
    const r2 = this.mThreshold;
    let a2 = 0, o2 = 0;
    const h2 = t4.printAlignment || this.getPrintAlignment();
    let c2 = 0;
    if (1 === this.mOrientation || 3 === this.mOrientation ? n2 > s2 && (c2 = 512 === (h2 & We) ? Math.floor(0.5 * (n2 - s2)) : (h2 & We) === $e ? 0 : n2 - s2) : i2 > s2 && (c2 = 512 === (h2 & We) ? Math.floor(0.5 * (i2 - s2)) : (h2 & We) === $e ? 0 : i2 - s2), 1 === this.mOrientation)
      for (let t5 = 0; t5 < i2; ++t5) {
        const h3 = new Uint8Array(this.mByteWidth);
        let d2 = 128, u2 = 0;
        for (let l2 = 0; l2 < s2; ++l2)
          a2 = 4 * ((n2 - l2 - c2 - 1) * i2 + t5), o2 = Ge.getImageGrayValue(e2.data, a2), o2 <= r2 && (h3[u2] = h3[u2] | d2), 1 === d2 ? (d2 = 128, ++u2) : d2 >>>= 1;
        this.printRow(h3);
      }
    else if (2 === this.mOrientation)
      for (let t5 = 0; t5 < n2; ++t5) {
        const h3 = new Uint8Array(this.mByteWidth);
        let d2 = 128, u2 = 0;
        a2 = 4 * ((n2 - t5) * i2 - c2 - 1);
        for (let t6 = 0; t6 < s2; ++t6, a2 -= 4)
          o2 = Ge.getImageGrayValue(e2.data, a2), o2 <= r2 && (h3[u2] = h3[u2] | d2), 1 === d2 ? (d2 = 128, ++u2) : d2 >>>= 1;
        this.printRow(h3);
      }
    else if (3 === this.mOrientation)
      for (let t5 = 0; t5 < i2; ++t5) {
        const n3 = new Uint8Array(this.mByteWidth);
        let h3 = 128, d2 = 0;
        for (let u2 = 0; u2 < s2; ++u2)
          a2 = 4 * ((u2 + c2) * i2 + (i2 - t5 - 1)), o2 = Ge.getImageGrayValue(e2.data, a2), o2 <= r2 && (n3[d2] = n3[d2] | h3), 1 === h3 ? (h3 = 128, ++d2) : h3 >>>= 1;
        this.printRow(n3);
      }
    else
      for (let t5 = 0; t5 < n2; ++t5) {
        const n3 = new Uint8Array(this.mByteWidth);
        a2 = 4 * (i2 * t5 + c2);
        let h3 = 128, d2 = 0;
        for (let t6 = 0; t6 < s2; ++t6, a2 += 4)
          o2 = Ge.getImageGrayValue(e2.data, a2), o2 <= r2 && (n3[d2] = n3[d2] | h3), 1 === h3 ? (h3 = 128, ++d2) : h3 >>>= 1;
        this.printRow(n3);
      }
  }
  end(t4) {
    const e2 = t4.marginBottom || 0;
    switch (this.mLineAction) {
      case 1:
        this.pushLine(this.mLineCount + e2);
        break;
      case 2:
        this.pushPrint(), this.pushLine(e2);
        break;
      default:
        return null;
    }
    return this.mLineAction = 0, this.mBufferList.push(He), this.mBufferList.toList();
  }
  printRow(t4) {
    let e2 = t4.length - 1;
    for (; e2 >= 0 && 0 === t4[e2]; --e2)
      ;
    if (e2 < 0)
      return this.printLine(1);
    switch (++e2, this.mLineAction) {
      case 1:
        this.pushLine(this.mLineCount);
        break;
      case 2:
        if (this.mLineBytes === e2 && this.checkArrayEquals(this.mLineData, t4, e2))
          return this.mLineCount += 1, true;
        this.pushPrint();
        break;
      default:
        return false;
    }
    return this.mLineData = t4, this.mLineBytes = e2, this.mLineCount = 1, this.mLineAction = 2, true;
  }
  printLine(t4) {
    switch (this.mLineAction) {
      case 1:
        return this.mLineCount += t4, true;
      case 2:
        this.pushPrint();
        break;
      default:
        return false;
    }
    return this.mLineData = new Uint8Array(), this.mLineBytes = 0, this.mLineCount = t4, this.mLineAction = 1, true;
  }
  pushLine(t4) {
    if (t4 <= 0)
      return;
    this.mSumLines += t4, this.mPrevData = Uint8Array.from([]), this.mPrevBytes = 0;
    const e2 = [27, 74, 255];
    for (; t4 >= 255; t4 -= 255)
      this.mBufferList.push(e2);
    t4 > 0 && this.mBufferList.push([27, 74, t4]);
  }
  pushPrint() {
    if (this.mLineCount <= 0)
      return;
    let t4 = 0;
    for (; t4 < this.mLineBytes && 0 === this.mLineData[t4]; ++t4)
      ;
    const e2 = this.mLineBytes - t4;
    let i2 = new Uint8Array(0), n2 = new Uint8Array(0), s2 = new Uint8Array(0), r2 = new Uint8Array(0), a2 = new Uint8Array(0), o2 = 0, h2 = 0, c2 = 0, d2 = 0, u2 = 0;
    this.mSupportSuperBitmap && (128 & this.mSoftwareFlags && (i2 = new Uint8Array(this.mByteWidth + 4), o2 = ke.calcRLEC(this.mLineData, this.mLineBytes, i2, this.mByteWidth)), 16 & this.mSoftwareFlags && (n2 = new Uint8Array(this.mByteWidth + 4), h2 = ke.calcRLE5X(this.mLineData, this.mLineBytes, n2, this.mByteWidth)), 16 & this.mSoftwareFlags && this.mPrevData.length > 0 && (s2 = new Uint8Array(this.mByteWidth + 4), c2 = ke.calcRLE5D(this.mPrevData, this.mPrevBytes, this.mLineData, this.mLineBytes, s2, this.mByteWidth)), 32 & this.mSoftwareFlags && (r2 = new Uint8Array(this.mByteWidth + 4), d2 = ke.calcRLE6X(this.mLineData, this.mLineBytes, r2, this.mByteWidth)), 32 & this.mSoftwareFlags && this.mPrevData.length > 0 && (a2 = new Uint8Array(this.mByteWidth + 4), u2 = ke.calcRLE6D(this.mPrevData, this.mPrevBytes, this.mLineData, this.mLineBytes, a2, this.mByteWidth)));
    const l2 = (t4 >= 192 ? 4 : 3) + (e2 >= 192 ? 2 : 1) + e2, g2 = o2 <= 0 ? this.mByteWidth + 100 : o2 + (o2 >= 192 ? 4 : 3), p2 = h2 <= 0 ? this.mByteWidth + 100 : Math.ceil(5 * h2 / 8) + (h2 >= 192 ? 4 : 3), m2 = c2 <= 0 ? this.mByteWidth + 100 : Math.ceil(5 * c2 / 8) + (c2 >= 192 ? 4 : 3), f2 = d2 <= 0 ? this.mByteWidth + 100 : Math.ceil(6 * d2 / 8) + (d2 >= 192 ? 4 : 3), C2 = u2 <= 0 ? this.mByteWidth + 100 : Math.ceil(6 * u2 / 8) + (u2 >= 192 ? 4 : 3);
    if (m2 < l2 && m2 < g2 && m2 < p2 && m2 < f2 && m2 <= C2)
      this.mSumRLE5Ds += 1, this.mRLE5DSaved += l2 - m2, this.pushRLE5(Je.CMD_BITMAP_P_RLED, s2, c2);
    else if (C2 < l2 && C2 < g2 && C2 < p2 && C2 < f2)
      this.mSumRLE6Ds += 1, this.mRLE6DSaved += l2 - C2, this.pushRLE6(Je.CMD_BITMAP_P_RLE6D, a2, u2);
    else if (p2 < l2 && p2 < g2 && p2 <= f2)
      this.mSumRLE5Xs += 1, this.mRLE5XSaved += l2 - p2, this.pushRLE5(Je.CMD_BITMAP_P_RLEX, n2, h2);
    else if (f2 < l2 && f2 < g2)
      this.mSumRLE6Xs += 1, this.mRLE6XSaved += l2 - f2, this.pushRLE6(Je.CMD_BITMAP_P_RLE6X, r2, d2);
    else if (g2 < l2)
      this.mSumRLE_Cs += 1, this.mRLECSaved += l2 - g2, this.pushRLEC(Je.CMD_BITMAP_P_RLEC, i2, o2);
    else {
      this.mSumPrints += 1;
      const i3 = [Le.HOST_TO_DEVICE_DATA_START, Je.CMD_BITMAP_PRINT, 0, 0];
      let n3 = this.pushEBV(i3, 2, t4);
      n3 = this.pushEBV(i3, n3, e2), this.mBufferList.push2(i3, 0, n3, this.mLineData, t4, this.mLineBytes);
    }
    this.mLineCount > 1 && this.pushRepeat(this.mLineCount - 1), this.mPrevData = this.mLineData, this.mPrevBytes = this.mLineBytes;
  }
  pushRepeat(t4) {
    if (t4 <= 0)
      return;
    this.mSumRepeats += t4;
    const e2 = 16383;
    let i2 = [Le.HOST_TO_DEVICE_DATA_START, 46, 0];
    for (this.pushEBV(i2, 2, e2); t4 > e2; t4 -= 16384)
      this.mBufferList.push(i2);
    t4 > 0 && (i2 = [Le.HOST_TO_DEVICE_DATA_START, 46, 0], this.pushEBV(i2, 2, t4 - 1), this.mBufferList.push(i2));
  }
  pushEBV(t4, e2, i2) {
    return i2 >= 192 ? (t4[e2 + 0] = i2 >>> 8 | 192, t4[e2 + 1] = 255 & i2, e2 + 2) : (t4[e2 + 0] = i2, e2 + 1);
  }
  pushRLEC(t4, e2, i2) {
    if (i2 <= 0)
      return;
    const n2 = [Le.HOST_TO_DEVICE_DATA_START, t4, 0], s2 = this.pushEBV(n2, 2, i2);
    this.mBufferList.push2(n2, 0, s2, e2, 0, i2);
  }
  pushRLE5(t4, e2, i2) {
    if (i2 <= 0)
      return;
    const n2 = [Le.HOST_TO_DEVICE_DATA_START, t4, 0], s2 = this.pushEBV(n2, 2, i2), r2 = Math.ceil(5 * i2 / 8);
    this.mBufferList.push2(n2, 0, s2, e2, 0, r2);
  }
  pushRLE6(t4, e2, i2) {
    if (i2 <= 0)
      return;
    const n2 = [Le.HOST_TO_DEVICE_DATA_START, t4, 0], s2 = this.pushEBV(n2, 2, i2), r2 = Math.ceil(6 * i2 / 8);
    this.mBufferList.push2(n2, 0, s2, e2, 0, r2);
  }
  checkArrayEquals(t4, e2, i2) {
    for (let n2 = 0; n2 < i2; ++n2)
      if (t4[n2] !== e2[n2])
        return false;
    return true;
  }
}
var Ve, Ke, ze, Ze, qe;
Ge.MAX_EBV_VALUE = 16383, Ge.THRESHOLD_DEFAULT = 150, Ge.PRINTER_DPI_DEFAULT = 203, Ge.PRINTER_WIDTH_DEFAULT = 384, function(t4) {
  t4[t4.None = 0] = "None", t4[t4.Connected = 2] = "Connected", t4[t4.Checking = 3] = "Checking", t4[t4.ReadyPrint = 4] = "ReadyPrint", t4[t4.Sending = 5] = "Sending", t4[t4.Printing = 6] = "Printing", t4[t4.Paused = 7] = "Paused", t4[t4.Cancel = 8] = "Cancel";
}(Ve || (Ve = {})), function(t4) {
  t4[t4.None = 0] = "None", t4[t4.Printable = 1] = "Printable", t4[t4.PageKey = 2] = "PageKey";
}(Ke || (Ke = {}));
class Xe {
  get isFinished() {
    return !this.mTimer;
  }
  get userData() {
    return this.mUserData;
  }
  constructor(t4, e2, i2) {
    this.mContext = t4, this.mUserData = e2, this.mTimer = 0, this.mTimeout = i2 || 2e3;
  }
  dispatcher(t4) {
    throw new Error("Method not implemented.");
  }
  stop() {
    this.mTimer && (clearTimeout(this.mTimer), this.mTimer = 0);
  }
  start(t4, e2) {
    this.mResponseAction = t4, e2 && e2 > 0 && (this.mTimeout = e2), this.mTimer = setTimeout(() => {
      this.mTimer = 0, this.invoke(void 0);
    }, this.mTimeout), l.log(`RequestMessage.start ->: [TM: ${this.mTimer}, mTimeout: ${this.mTimeout}`, e2);
  }
  invoke(t4) {
    this.stop(), this.mResponseAction && this.mResponseAction(t4 ? this.userData : void 0), this.mContext.popMessage(this);
  }
}
class Ye extends Xe {
  get userData() {
    return this.mUserData;
  }
  get cmd() {
    return this.userData.cmd;
  }
  constructor(t4, e2, i2) {
    super(t4, e2, i2);
  }
  start(t4, e2) {
    super.start(t4, e2);
    const i2 = Me.toHexByteString(this.cmd);
    l.log(`RequestCmdMessage.start ->: [TM: ${this.mTimer}, cmd: 0x${i2}], timeout: ${e2}`);
  }
  dispatcher(t4) {
    return t4.cmd === this.cmd && (this.invoke(t4), true);
  }
  invoke(t4) {
    const e2 = Me.toHexByteString(this.cmd);
    l.log(`RequestCmdMessage.invoke ->: [TM: ${this.mTimer}, mTimeout: ${this.mTimeout}, cmd: 0x${e2}], value = ${t4 ? t4.Data.join(",") : "timeout"}`), t4 && (this.userData.respPkg = t4), super.invoke(t4);
  }
}
class Qe extends Xe {
  get userData() {
    return this.mUserData;
  }
  constructor(t4, e2, i2) {
    super(t4, e2, i2);
  }
  dispatcher(t4) {
    let e2 = false, i2 = false;
    const n2 = this.userData.pkgList, s2 = [], r2 = [];
    for (const a3 of n2)
      a3.sendPkg.cmd !== t4.cmd || a3.receivedPkg || e2 || (a3.receivedPkg = t4, e2 = true), a3.receivedPkg ? s2.push(Me.toHexByteString(a3.sendPkg.cmd, "0x")) : (i2 = true, r2.push(Me.toHexByteString(a3.sendPkg.cmd, "0x")));
    l.log(`---- resolvedPkg  : [${s2.join(",")}]`), l.log(`---- unresolvedPkg: [${r2.join(",")}]`);
    const a2 = t4.getRawData();
    return a2 && l.warn(`---- pkgData: [${Me.arrayBufferToHex16(a2, ",", "0x")}]`), i2 || this.invoke(t4), e2;
  }
}
class ti {
  get device() {
    return this.mDevice;
  }
  get adapter() {
    return this.mAdapter;
  }
  get deviceId() {
    return this.mDevice.deviceId;
  }
  get deviceName() {
    return this.mDevice.name;
  }
  get printerInfo() {
    return Object.assign(Object.assign({}, this.mDevice), this.mPrinterInfo);
  }
  get printable() {
    return this.mPrinterInfo.printable;
  }
  get bufferSize() {
    return this.mBufferSize;
  }
  get isConnected() {
    return this.mConnected;
  }
  get printStatus() {
    return this.mPrintStatus;
  }
  get PrintStatusChanged() {
    return this.mPrintStatusEmitter;
  }
  get clientType() {
    return this.mClientType;
  }
  get isPrinterAvailable() {
    return this.printable >= 0 && this.printable <= Je.DZIP_PAGENOTREADY;
  }
  get enableMcuId() {
    return this.mEnableMcuId;
  }
  get isPageKeyEnable() {
    return 0 !== (this.mDataSendMode & Ke.PageKey);
  }
  get isPageKeySupported() {
    return this.isPageKeyEnable && this.mIsPrPageKey >= 0;
  }
  get isPageKeyValid() {
    return this.isPageKeySupported && this.mIsPrPageKey > 0;
  }
  get printByPrintable() {
    return 0 !== (this.mDataSendMode & Ke.Printable);
  }
  constructor(t4, e2, i2) {
    this.mInitOptions = {}, this.mConnected = false, this.mRequestQueue = [], this.mPrinterInfo = { printerDPI: 0, printerWidth: 0, hardwareFlags: 0, softwareFlags: Je.PCPDSF_RLE5_BITMAP, softwareVersion: "", deviceName: "", deviceVersion: "", printable: 0, isPrPageKey: -1 }, this.mMinBufferSize = 0, this.mReadBuffer = [], this.mPackageStartRecords = [], this.mPrintJobList = [], this.mPausedPageMap = /* @__PURE__ */ new Map(), this.mPrintingMap = /* @__PURE__ */ new Map(), this.mIsPrPageKey = -1, this.mPageKey = Math.ceil(255 * Math.random()), this.mBufferSize = 0, this.mClientType = 0, this.mEnableMcuId = false, this.mDataSendMode = Ke.PageKey, this.mDeviceNameStage = 0, this.mPrintStatus = Ve.None, this.mPrintStatusEmitter = Be.createEmitter("PrintStatusChanged"), this.mIsCheckingPrintable = false, this.mCheckPrintingKeys = [], this.mDevice = t4, this.mAdapter = e2, i2 && this.setOptions(i2);
  }
  setOptions(t4) {
    t4 && (this.mInitOptions = Object.assign(Object.assign({}, this.mInitOptions), t4), "number" == typeof t4.clientType && (this.mClientType = t4.clientType), "boolean" == typeof t4.enableMcuId && (this.mEnableMcuId = t4.enableMcuId), "number" == typeof t4.minBufferSize && (this.mMinBufferSize = t4.minBufferSize), "number" == typeof t4.dataSendMode ? this.mDataSendMode = t4.dataSendMode : "boolean" == typeof t4.enablePageKey && (t4.enablePageKey ? this.mDataSendMode |= Ke.PageKey : this.mDataSendMode &= ~Ke.PageKey));
  }
  isDevicePaired(t4) {
    return "function" == typeof this.mAdapter.isDevicePaired ? this.mAdapter.isDevicePaired(t4).then((t5) => 0 == t5.statusCode ? 0 : 1) : "function" == typeof this.mAdapter.getBondedDevices ? this.mAdapter.getBondedDevices().then((e2) => {
      const i2 = 0 === e2.statusCode ? e2.resultInfo : [];
      return i2 && i2.length > 0 && i2.filter((e3) => e3.deviceId === t4.deviceId).length > 0 ? 0 : 1;
    }) : Promise.resolve(-1);
  }
  makePair(t4) {
    return "function" == typeof this.mAdapter.makePair ? this.mAdapter.makePair({ deviceId: t4 }) : Promise.resolve({ statusCode: xe.ERROR_NO_IMPLEMENT });
  }
  connect(t4) {
    return l.info(t4, `DeviceConnection.connect(${this.deviceName}[${this.deviceId}])`), this.mAdapter.connect({ deviceId: this.deviceId, name: this.deviceName }).then((t5) => (this.mConnected = 0 === t5.statusCode, this.raisePrintStatusChanged(t5.statusCode > 0 ? Ve.None : Ve.Connected), t5));
  }
  disconnect(t4) {
    return l.info(t4, `DeviceConnection.disconnect(${this.deviceName}[${this.deviceId}])`), this.adapter.disconnect({ deviceId: this.deviceId }).then((t5) => (this.mConnected = false, this.raisePrintStatusChanged(Ve.None), 0 === t5.statusCode));
  }
  notifyData(t4) {
    return this.adapter.notify({ deviceId: this.deviceId, dataReceived: (e2) => {
      "string" == typeof e2 && (e2 = Me.hex16ToArrayBuffer(e2)), t4(e2);
    } }).then((t5) => ({ statusCode: t5.statusCode, resultInfo: "object" == typeof t5.resultInfo ? t5.resultInfo : void 0 }));
  }
  writeData(t4, e2) {
    return this.adapter.write({ deviceId: this.deviceId, value: t4 });
  }
  checkPrinterInfo() {
    return t(this, void 0, void 0, function* () {
      const t4 = this.device;
      this.mReadBuffer.splice(0);
      if ((yield this.notifyData((t5) => {
        this.onDataReceived(t5);
      })).statusCode !== xe.OK)
        return l.warn("---- 数据检测启动失败！"), yield this.disconnect(t4), Me.onResult({ statusCode: xe.ERROR_NOTIFY_CHARACTERISTIC, resultInfo: "notify 特征值启动失败！" });
      this.raisePrintStatusChanged(Ve.Checking), yield Me.sleep(30);
      const e2 = yield this.loadPrinterInfo();
      return e2.statusCode !== xe.OK ? (l.error(`---- 打印机相关参数获取失败(statusCode: ${e2.statusCode})！`), this.raisePrintStatusChanged(Ve.None), yield this.disconnect(t4), Me.onResult(e2)) : (this.raisePrintStatusChanged(Ve.ReadyPrint), Me.successResult({ statusCode: xe.OK, resultInfo: Object.assign({}, this.mPrinterInfo) }));
    });
  }
  dispatcherRequest(t4) {
    for (const e2 of this.mRequestQueue)
      if (e2.dispatcher(t4))
        break;
  }
  popMessage(t4) {
    const e2 = this.mRequestQueue.indexOf(t4);
    e2 >= 0 && this.mRequestQueue.splice(e2);
  }
  pushRequestMessage(t4, e2) {
    return new Promise((i2) => {
      if (!this.isConnected)
        return Me.complete(xe.ERROR_DISCONNECTED, "设备连接异常", void 0, i2);
      const n2 = e2 || t4.userData;
      if (!n2 || n2.length <= 0)
        return Me.complete(xe.ERROR_PARAM, "未检测到发送的数据！", void 0, i2);
      this.mRequestQueue.push(t4), t4.start((t5) => {
        i2({ statusCode: t5 ? xe.OK : xe.ERROR_RESPONSE_TIMEOUT, resultInfo: t5 });
      }), this.writeData(e2).then((e3) => {
        e3.statusCode > xe.OK && (this.popMessage(t4), Me.complete(e3.statusCode, void 0, void 0, i2));
      });
    });
  }
  pushCommandRequest(t4, e2, i2) {
    const n2 = new Ye(this, { cmd: t4, sendData: e2 }, i2);
    return this.pushRequestMessage(n2, e2);
  }
  pushPackageRequest(t4, e2) {
    const i2 = new Ye(this, { cmd: t4.cmd, sendData: t4.getRawData() || t4.getBytes(), sendPkg: t4 }, e2);
    return this.pushRequestMessage(i2, t4.getBytes());
  }
  pushPackageListRequest(t4, e2) {
    if (!t4 || t4.length <= 0)
      return Promise.resolve({ statusCode: xe.ERROR_PARAM });
    const i2 = t4.map((t5) => t5.getRawData()), n2 = Me.concatUint8Array(i2), s2 = new Qe(this, { sendData: n2, pkgList: t4.map((t5) => ({ sendPkg: t5 })) }, e2);
    return this.pushRequestMessage(s2, n2);
  }
  queryCommand(e2, i2) {
    return t(this, void 0, void 0, function* () {
      if (e2 === Je.CMD_NULL && i2 && i2.length > 0) {
        const t5 = ti.parsePackageList(new Uint8Array(i2), [], []), n2 = t5.length > 0 ? t5[0] : null;
        n2 && (e2 = n2.cmd, i2 = n2.Data);
      }
      const t4 = Ne.getBytes(e2, i2);
      return this.pushCommandRequest(e2, t4);
    });
  }
  raisePrintStatusChanged(t4) {
    l.info(`◆◆◆ PrintStatusChanged: ${Ve[this.mPrintStatus]} --> ${Ve[t4]} ◆◆◆`), this.mPrintStatus = t4, this.PrintStatusChanged.emit(t4);
  }
  parseManuToolkit(t4, e2) {
    switch (e2) {
      case Je.CMD_SUB_ROM_UPGRADE:
        break;
      case Je.CMD_MANUSHIPTIME: {
        const e3 = t4.popByteArray(), i2 = De.decode(e3);
        l.info(`★★★★★★ CMD_MANU_TOOLKIT.manuShipTime: ${i2} ★★★★★★`);
        break;
      }
      case Je.CMD_MCU_GETID: {
        const e3 = t4.popByteArray(), i2 = Me.arrayBufferToHex16(e3, "").toUpperCase();
        this.mPrinterInfo.mcuId = i2, l.info(`★★★★★★ CMD_MANU_TOOLKIT.McuId: ${i2} ★★★★★★`);
        break;
      }
      case Je.CMD_ADDRESS_READ: {
        const e3 = t4.popByteArray();
        l.info(`★★★★★★ CMD_MANU_TOOLKIT.addressRead: [${Me.arrayBufferToHex16(e3)}] ★★★★★★`);
      }
    }
  }
  onReadPackage(t4) {
    switch (l.info(`========== DataPackage.onReadPackage: cmd = 【0x${Me.toHexByteString(t4.cmd)}】`), l.info(`data: [${Me.arrayToHexString(t4.Data)}]`), t4.cmd) {
      case Je.CMD_DEVICE_TYPE:
        break;
      case Je.CMD_BUFFER_SIZE: {
        const e2 = t4.popEBV();
        this.mBufferSize = 500 * (1 === e2 ? 2 : e2), l.info(`★★★ bufferSize: ${this.mBufferSize}[0x${e2.toString(16)}]`);
        break;
      }
      case Je.CMD_PRINTER_DPI:
        this.mPrinterInfo.printerDPI = t4.popShort(), l.info(`★★★ printerDPI: ${this.mPrinterInfo.printerDPI}`);
        break;
      case Je.CMD_PRINTER_WIDTH:
        if (t4.Remains >= 5) {
          const e2 = t4.popByteArray(), i2 = 255 & e2[0], n2 = 255 & e2[1];
          this.mPrinterInfo.printerWidth = (i2 << 8) + n2;
          const s2 = 255 & e2[2], r2 = 255 & e2[3];
          this.mPrinterInfo.paperWidth = Math.round(0.1 * ((s2 << 8) + r2)), this.mPrinterInfo.printerLocateArea = 255 & e2[4], l.info(`---- pagerWidth: ${this.mPrinterInfo.paperWidth}, printerLocateArea: ${this.mPrinterInfo.printerLocateArea}`);
        } else
          this.mPrinterInfo.printerWidth = t4.popShort();
        l.info(`★★★ printerWidth: ${this.mPrinterInfo.printerWidth}`);
        break;
      case Je.CMD_MANUFACTURER:
        this.mPrinterInfo.manufacturer = t4.popString(), l.info(`★★★ manufacturer: ${this.mPrinterInfo.manufacturer}`);
        break;
      case Je.CMD_DARKNESS:
        this.mPrinterInfo.printDarkness = t4.popByte(), l.info(`★★★ printDarkness: ${this.mPrinterInfo.printDarkness}`);
        break;
      case Je.CMD_SPEED:
        this.mPrinterInfo.printSpeed = t4.popByte(), l.info(`★★★ printSpeed: ${this.mPrinterInfo.printSpeed}`);
        break;
      case Je.CMD_GAP_TYPE:
        this.mPrinterInfo.gapType = t4.popByte(), l.info(`★★★ gapType: ${this.mPrinterInfo.gapType}`);
        break;
      case Je.CMD_GAP_LEN:
        this.mPrinterInfo.gapLength = t4.popEBV(), l.info(`★★★ gapLength: ${this.mPrinterInfo.gapLength}`);
        break;
      case Je.CMD_HARDWARE_FLAGS: {
        const e2 = t4.Data;
        e2.length > 20 ? this.mPrinterInfo.batteryCount = 255 & e2[20] : this.mPrinterInfo.batteryCount = 2;
        const i2 = t4.popInteger();
        this.mPrinterInfo.hardwareFlags = i2, l.info(`mHardwareFlags: [${Me.toHexString(this.mPrinterInfo.hardwareFlags, "0x")}]`), t4.Remains >= 4 ? this.mPrinterInfo.softwareFlags = t4.popInteger() : this.mPrinterInfo.softwareFlags = Je.PCPDSF_MOTOR_ANTIDIR | Je.PCPDSF_PRTA_RIGHT | i2 & Je.PCPDSF_RLE5_BITMAP, l.info(`★★★ mSoftwareFlags: [${Me.toHexString(this.mPrinterInfo.softwareFlags, "0x")}]`);
        break;
      }
      case Je.CMD_IS_PRINTABLE: {
        const e2 = t4.Data;
        if (this.mPrinterInfo.printable = e2[0], e2.length >= 6) {
          if (e2[1] === e2[2]) {
            const t6 = Le.toShort(e2[4], e2[3]), i2 = Le.toShort(e2[3], e2[4]);
            let n2 = 0;
            const s2 = [...this.mPrintingMap.keys()];
            for (const e3 of s2) {
              if (e3 === t6) {
                n2 = t6;
                break;
              }
              if (e3 === i2) {
                n2 = i2;
                break;
              }
            }
            this.mIsPrPageKey = n2 > 0 ? n2 : t6;
          } else
            this.mIsPrPageKey = 0;
          const t5 = this.mPrinterInfo.softwareVersion;
          e2.length >= 28 && t5 && t5 >= "3.1.20250908" && l.log("----------- 当前打印机支持 pageNo, pageCount, 等等更多高级功能！");
        } else
          this.mIsPrPageKey = -1;
        this.mPrinterInfo.isPrPageKey = this.mIsPrPageKey, l.info(`★★★ printable  : 0x${this.printable}, isPrPageKey: ${this.mIsPrPageKey}`);
        break;
      }
      case Je.CMD_DEVICE_NAME: {
        const e2 = t4.popString();
        1 === this.mDeviceNameStage ? (this.mPrinterInfo.deviceName = e2, l.info(`★★★ nameStage[${this.mDeviceNameStage}]: deviceName: ${e2}`)) : 2 === this.mDeviceNameStage ? (this.mPrinterInfo.seriesName = e2, l.info(`★★★ nameStage[${this.mDeviceNameStage}]: seriesName: ${e2}`)) : 3 === this.mDeviceNameStage ? (this.mPrinterInfo.devIntName = e2, l.info(`★★★ nameStage[${this.mDeviceNameStage}]: devIntName: ${e2}`)) : l.warn(`----  nameStage[${this.mDeviceNameStage}]: 未处理的设备信息 deviceName: ${e2}`), this.mDeviceNameStage++;
        break;
      }
      case Je.CMD_DEVICE_VERSION: {
        const e2 = `${Me.toHexByteString(t4.popByte())}`;
        this.mPrinterInfo.deviceVersion = e2.substring(0, 1) + "." + e2.substring(1), l.info(`★★★ deviceVersion: ${this.mPrinterInfo.deviceVersion}`);
        break;
      }
      case Je.CMD_SOFTWARE_VERSION:
        this.mPrinterInfo.softwareVersion = t4.popString(), l.info(`★★★ softwareVersion: ${this.mPrinterInfo.softwareVersion}`);
        break;
      case Je.CMD_MOTORMODE:
        this.mPrinterInfo.motorMode = t4.popByte();
        break;
      case Je.CMD_AUTOPOWEROFF:
        this.mPrinterInfo.autoPowerOffMins = t4.popEBV();
        break;
      case Je.CMD_REQ_ADCVALUE: {
        const e2 = t4.popByteArray();
        if (e2.length > 0) {
          const t5 = e2[0];
          if (t5 == Je.ADCEVT_TPHTM) {
            if (e2.length > 2) {
              let t6 = 0;
              t6 <<= 8, t6 |= 255 & e2[1], t6 <<= 8, t6 |= 255 & e2[2], this.mPrinterInfo.printerHeadTem = 0.1 * t6, l.info(`★★★ printerHeadTem: ${this.mPrinterInfo.printerHeadTem}`);
            }
          } else
            t5 == Je.ADCEVT_POWER && (e2.length > 8 && (this.mPrinterInfo.batteryVoltage = 0.01 * Le.toShort(e2[8], e2[7]), l.info(`★★★ batteryVoltage: ${this.mPrinterInfo.batteryVoltage}`)), e2.length > 10 && (this.mPrinterInfo.chargeStatus = e2[10] > 0, l.info(`★★★ chargeStatus: ${this.mPrinterInfo.chargeStatus}`)), e2.length > 12 && 0 != e2[12] && (this.mPrinterInfo.batteryLevel = e2[12], this.mPrinterInfo.batteryVoltageCount = (e2[12] >> 4) - 1, l.info(`★★★ batteryVoltageCount: ${this.mPrinterInfo.batteryVoltageCount}, batteryLevel: ${e2[12]}`)));
        }
        break;
      }
      case Je.CMD_LANGUAGE:
      case Je.CMD_CAP_GAPTYPE:
      case Je.CMD_CAP_MOTORMODE:
      case Je.CMD_CAP_LANGUAGE:
        break;
      case Je.CMD_ENABLE_SETTING:
        129 === t4.popByte() && l.info(`---- This printer supported command package start char is ${Me.toHexByteString(Le.HOST_TO_DEVICE_DATA_START, "0x")}`);
        break;
      case Je.CMD_PERIPHERALFLAGS:
        if (1 == t4.Remains)
          this.mPrinterInfo.peripheralFlags = t4.popByte();
        else if (t4.popByte() === Je.CMD_PERIPHERALTYPE_FLAGS)
          this.mPrinterInfo.peripheralFlags = t4.popShort();
        break;
      case Je.CMD_DEV_HANDSHAKE:
        break;
      case Je.CMD_MANU_TOOLKIT: {
        const e2 = t4.popByte();
        l.info(`★★★ CMD_MANU_TOOLKIT.childCmd: 【0x${Me.toHexByteString(e2)}】`), this.parseManuToolkit(t4, e2);
        break;
      }
      case Je.CMD_DEBUG_BUFFER:
        {
          const e2 = t4.popByteArray();
          l.info(`★★★ CMD_MANU_TOOLKIT.debugBuffer: [${Me.arrayBufferToHex16(e2)}]`);
        }
        break;
      case Je.CMD_PRINT_COUNTER:
        {
          const e2 = t4.popByteArray();
          l.info(`★★★ CMD_MANU_TOOLKIT.printCounter: [${Me.arrayBufferToHex16(e2)}]`);
          for (let t5 = 0; t5 < 4; ++t5) {
            const i2 = ((255 & e2[4 * t5]) << 24) + ((255 & e2[4 * t5 + 1]) << 16) + ((255 & e2[4 * t5 + 2]) << 8) + (255 & e2[4 * t5 + 3]);
            l.info(`---- printCounter.line${t5} = ${i2}`);
          }
        }
        break;
      case Je.CMD_0x40: {
        const e2 = t4.popByteArray();
        1 == e2[0] && (this.mPrinterInfo.batteryCount = e2[1], this.mPrinterInfo.batteryVoltage = 0.01 * Le.toShort(e2[3], e2[2]), this.mPrinterInfo.batteryVoltageCount = e2[4], this.mPrinterInfo.chargeStatus = e2[5] > 0, this.mPrinterInfo.printable = e2[6], l.info(`★★★★★ batteryCount: ${e2[1]}, batteryVoltage: ${this.mPrinterInfo.batteryVoltage}, batteryVoltageCount: ${e2[4]}, isCharging: ${e2[5]}, printable: ${e2[6]}`));
      }
    }
    this.dispatcherRequest(t4);
  }
  onDataReceived(t4) {
    const e2 = t4 instanceof Uint8Array ? t4 : new Uint8Array(t4);
    l.log(`#### 【onDataReceived】 [${Me.arrayBufferToHex16(e2)}]`), ti.parsePackageList(e2, this.mReadBuffer, this.mPackageStartRecords, (t5) => {
      this.onReadPackage(t5);
    });
  }
  static parsePackageList(t4, e2, i2, n2) {
    const s2 = [], r2 = [];
    for (const a2 of t4)
      if (e2.length <= 0)
        a2 === Le.DEVICE_TO_HOST_DATA_START ? e2.push(a2) : r2.push(a2);
      else if (a2 === Le.DEVICE_TO_HOST_DATA_START && i2.push(e2.length), e2.push(a2), e2.length >= 4) {
        let t5 = Le.parse(e2);
        if (!t5 && i2.length > 0)
          for (let n3 = 0; n3 < i2.length; n3++) {
            const s3 = i2[n3];
            if (e2.length - s3 >= 4 && (t5 = Le.parse(e2.slice(s3)), t5)) {
              r2.push(...e2.slice(0, s3));
              break;
            }
          }
        t5 && (s2.push(t5), n2 && n2(t5), e2.splice(0), i2.splice(0));
      }
    return r2.length > 0 && l.warn(`#### 【丢弃无效的指令】：${Me.arrayToHexString(r2)}`), e2.length > 0 && l.info(`---- 待处理数据：[${Me.arrayToHexString(e2)}]`), s2;
  }
  loadPrinterInfo() {
    return t(this, void 0, void 0, function* () {
      let t4 = yield this.queryCommand(Je.CMD_PRINTER_DPI);
      if (t4.statusCode !== xe.OK)
        return t4;
      const e2 = new Ne();
      if (e2.pushPackage(Je.CMD_PRINTER_WIDTH), e2.pushPackage(Je.CMD_IS_PRINTABLE), t4 = yield this.writeData(e2.getAllBytes()), t4.statusCode > xe.OK)
        return t4;
      if (this.mDeviceNameStage = 1, e2.clearBuffer(), e2.pushPackage(Je.CMD_SOFTWARE_VERSION), e2.pushPackage(Je.CMD_DEVICE_NAME), e2.pushPackage(Je.CMD_DEVICE_VERSION), e2.pushPackage(Je.CMD_MANUFACTURER), yield this.writeData(e2.getAllBytes()), e2.clearBuffer(), e2.pushPackage(Je.CMD_ENABLE_SETTING, [~Je.CMD_ENABLE_SETTING]), e2.pushPackage(Je.CMD_HARDWARE_FLAGS, [1]), this.mEnableMcuId && (e2.pushPackage(Je.CMD_MANU_TOOLKIT, [Je.CMD_MCU_GETID]), e2.pushPackage(Je.CMD_PERIPHERALFLAGS, [Je.CMD_PERIPHERALTYPE_FLAGS, 0]), e2.pushPackage(Je.CMD_MANU_TOOLKIT, [Je.CMD_MANUSHIPTIME]), yield this.writeData(e2.getAllBytes()), e2.clearBuffer()), e2.pushPackage(Je.CMD_REQ_ADCVALUE, [Je.ADCEVT_POWER]), e2.pushPackage(Je.CMD_REQ_ADCVALUE, [Je.ADCEVT_TPHTM]), e2.pushPackage(Je.CMD_ENABLE_SETTING, [128]), t4 = yield this.writeData(e2.getAllBytes()), t4.statusCode > xe.OK)
        return t4;
      e2.clearBuffer(), e2.pushPackage(Je.CMD_DEVICE_NAME, ["S".charCodeAt(0)]), e2.pushPackage(Je.CMD_DEVICE_NAME, ["D".charCodeAt(0)]), yield this.writeData(e2.getAllBytes()), e2.clearBuffer(), e2.pushPackage(Je.CMD_GAP_TYPE), e2.pushPackage(Je.CMD_GAP_LEN), yield this.writeData(e2.getAllBytes());
      let i2 = [13];
      return this.mClientType > 0 && (i2 = this.mClientType > 255 ? Le.getBytesFromShort(this.mClientType) : [this.mClientType]), this.queryCommand(Je.CMD_DEVICE_TYPE, Array.from(i2));
    });
  }
  waitPrintable(t4) {
    const e2 = t4 || 3e3;
    return new Promise((t5) => {
      let i2 = 0;
      const n2 = setInterval(() => {
        i2++, (!this.mIsCheckingPrintable || 10 * i2 >= e2) && (clearInterval(n2), t5(true));
      }, 10);
    });
  }
  checkPrintable(e2) {
    return t(this, void 0, void 0, function* () {
      this.mIsCheckingPrintable && (yield this.waitPrintable()), this.mIsCheckingPrintable = true, this.mPrinterInfo.printable = 255, l.info("▶▶▶▶▶-▶▶▶▶▶-▶▶▶▶▶ 【Start】 to check printable: ▶▶▶▶▶-▶▶▶▶▶-▶▶▶▶▶-->:"), l.info(`【checkPrintable】: 0xFF, bufferSize: ${this.mBufferSize}`);
      const t4 = new Ne();
      return t4.pushPackage(Je.CMD_ENABLE_SETTING, [~Je.CMD_ENABLE_SETTING]), t4.pushPackage(Je.CMD_HARDWARE_FLAGS, [1]), t4.pushPackage(Je.CMD_ENABLE_SETTING, [0]), yield this.writeData(t4.getAllBytes()), t4.clearBuffer(), t4.pushPackage(Je.CMD_IS_PRINTABLE), t4.pushPackage(Je.CMD_BUFFER_SIZE), this.pushCommandRequest(Je.CMD_BUFFER_SIZE, t4.getAllBytes(), e2 || 2e3).then((t5) => {
        0 !== t5.statusCode && (this.mPrinterInfo.printable = -1, l.warn("---- checkPrintable timeout!"));
        const e3 = t5.resultInfo, i2 = this.mPrinterInfo.printable, n2 = this.mIsPrPageKey, s2 = this.mBufferSize;
        return l.info(`:<-- printable: ${i2}, mIsPrPageKey: ${n2}, bufferSize: ${s2}`), l.info(":<--◀◀◀◀◀-◀◀◀◀◀-◀◀◀◀◀ 【End】to check printable: ◀◀◀◀◀-◀◀◀◀◀-◀◀◀◀◀"), this.updatePrintProgress(this.printable, this.mIsPrPageKey), this.mIsCheckingPrintable = false, null == e3 ? void 0 : e3.respPkg;
      });
    });
  }
  tryCheckPrintable(e2, i2) {
    return t(this, void 0, void 0, function* () {
      if (!(e2 && e2 > 0))
        return this.checkPrintable(i2);
      for (let t4 = 0; t4 < e2; t4++) {
        const n2 = yield this.checkPrintable(i2);
        if (n2)
          return n2;
        l.warn(`---- tryCheckPrintable failed of tryTimes: [${t4 + 1} - ${e2}]`);
      }
    });
  }
  checkAndSendPrintParams(e2, i2) {
    return t(this, void 0, void 0, function* () {
      if (!this.isConnected)
        return;
      this.printStatus, Ve.Sending, this.mIsCheckingPrintable && (yield this.waitPrintable()), this.mIsCheckingPrintable = true, this.mPrinterInfo.printable = 255, l.info("▶▶▶▶▶ checkAndSendPrintParams: printable = 0xFF ◀◀◀◀◀");
      const t4 = new Ne();
      let n2 = e2.printDarkness;
      return "number" == typeof n2 && n2 >= Se.Min && n2 <= Se.High && t4.pushPackage(Je.CMD_DARKNESS, [n2 - 1]), n2 = e2.printSpeed, "number" == typeof n2 && n2 >= Te.Min && n2 <= Te.Max && t4.pushPackage(Je.CMD_SPEED, [n2 - 1]), n2 = e2.gapType, "number" == typeof n2 && n2 >= Oe.None && n2 <= Oe.Trans && t4.pushPackage(Je.CMD_GAP_TYPE, [n2]), n2 = e2.gapLength, "number" == typeof n2 && n2 > 0 && n2 <= Ge.MAX_EBV_VALUE && t4.pushPackage(Je.CMD_GAP_LEN, Le.fromEBV(n2)), n2 = e2.motorMode, "number" == typeof n2 && n2 >= 0 && t4.pushPackage(Je.CMD_MOTORMODE, [n2]), n2 = e2.autoPowerOffMins, "number" == typeof n2 && n2 > 0 && t4.pushPackage(Je.CMD_AUTOPOWEROFF, Le.fromEBV(n2)), t4.pushPackage(Je.CMD_BUFFER_SIZE), yield this.writeData(t4.getAllBytes()), t4.clearBuffer(), t4.pushPackage(Je.CMD_IS_PRINTABLE), t4.pushPackage(Je.CMD_BUFFER_SIZE), this.pushCommandRequest(Je.CMD_BUFFER_SIZE, t4.getAllBytes(), i2 || 2e3).then((t5) => {
        t5 || (this.mPrinterInfo.printable = -1, l.warn("---- checkAndSendPrintParams timeout!"));
        const e3 = t5.resultInfo;
        return this.mIsCheckingPrintable = false, e3.respPkg;
      });
    });
  }
  printJob(t4) {
    return !!this.isConnected && (this.mPrintJobList.push(t4), t4.jobPushed && t4.jobPushed(), this.mPrintStatus >= Ve.ReadyPrint && !this.mPrintingJob && (this.mPausedPageMap.clear(), this.popAndSendPrintJob()), true);
  }
  continuePrintJob() {
    return this.sendPausedPages();
  }
  cancelPrintJob() {
    if (this.printStatus === Ve.Paused) {
      if (this.mPausedPageMap.size > 0) {
        const t4 = Array.from(this.mPausedPageMap.keys());
        l.log(`---- 清空暂存打印任务：${t4.join(",")}`), this.mPausedPageMap.clear();
      }
      this.mPrintingMap.clear(), this.raisePrintStatusChanged(Ve.ReadyPrint);
    } else
      this.printStatus > Ve.ReadyPrint && (this.raisePrintStatusChanged(Ve.Cancel), this.mPrintingMap.clear(), this.mPausedPageMap.clear());
  }
  backupPrintPages(...t4) {
    if (this.isPageKeySupported) {
      if (this.mPrintingMap.size > 0) {
        for (const t5 of this.mPrintingMap.values())
          this.mPausedPageMap.set(t5.pageKey, t5);
        this.mPrintingMap.clear();
      }
      if (t4.length > 0)
        for (const e3 of t4)
          this.mPausedPageMap.set(e3.pageKey, e3);
      const e2 = Array.from(this.mPausedPageMap.keys());
      l.warn(`#### #### 检测到打印机异常: printable = ${this.printable}`), l.info(`---- 打印任务已暂停，并已暂存未完成的打印任务：[${e2.join(",")}]`);
    }
  }
  updatePrintProgress(t4, e2) {
    const i2 = Array.from(this.mPrintingMap.keys()), n2 = Ve[this.mPrintStatus];
    if (l.log(`---- updatePrintProgress: printStatus = ${n2}, pageKey = ${e2}`), l.log(`---- mPrintingKeys: [${i2.join(",")}], mDataSendMode: `, this.mDataSendMode), !(this.mPrintingMap.size <= 0 || t4 >= 255) && this.mPrintStatus >= Ve.ReadyPrint) {
      if (t4 >= Je.DZIP_PAGENOTREADY && t4 < 255)
        this.raisePrintStatusChanged(Ve.Paused), this.backupPrintPages();
      else if (t4 >= 0) {
        const n3 = /* @__PURE__ */ new Map();
        if (this.isPageKeyEnable && e2 > 0)
          if (l.log("---- <<< update print progress by pageKey>>>:"), this.mPrintingMap.has(e2)) {
            const s2 = i2[0];
            if (i2.length > 0)
              for (const r2 of i2) {
                const i3 = r2 >= s2 ? r2 : r2 + 65534;
                (i3 < e2 || i3 === e2 && 1 !== t4 && 2 !== t4) && (n3.set(r2, this.mPrintingMap.get(r2)), this.mPrintingMap.delete(r2));
              }
          } else
            l.warn(`---- 检测到无效的 pageKey: ${e2}`);
        else if (this.isPageKeyEnable ? l.warn("---- <<< update print progress by printable>>>: pageKey 丢失！") : l.log("---- <<< update print progress by printable>>>:"), 1 !== t4 && 2 !== t4) {
          if (e2 > 0 && this.mPrintingMap.has(e2))
            this.mPrintingMap.has(e2) && (n3.set(e2, this.mPrintingMap.get(e2)), this.mPrintingMap.delete(e2));
          else if (e2 > 0 && l.info(`---- 检测到无效的 pageKey: ${e2}`), this.mPrintingMap.size > 0) {
            for (const t5 of this.mPrintingMap)
              n3.set(t5[0], t5[1]);
            this.mPrintingMap.clear();
          }
        }
        if (n3.size > 0) {
          for (const i4 of n3) {
            const n4 = i4[1], s2 = n4.job;
            l.info(`---- 检测到已经打印完毕的打印任务[${i4[0]}], jobId = ${s2.jobId}`), s2.onPagePrintComplete && s2.onPagePrintComplete({ statusCode: xe.OK, printable: t4, pageKey: n4.pageKey, pageKey2: e2, pageIndex: n4.pageIndex, printPages: n4.printPages, copyIndex: n4.copyIndex, printCopies: n4.printCopies }, s2);
          }
          const i3 = Array.from(this.mPrintingMap.keys());
          l.info(`---- 剩余打印页面：[${i3.join(",")}]`);
        }
        this.mPrintJobList.length <= 0 && this.mPausedPageMap.size <= 0 && (this.mPrintingMap.size <= 0 || 0 === t4) && this.raisePrintStatusChanged(Ve.ReadyPrint);
      }
    }
  }
  addPrintPage(t4) {
    if (this.isPageKeySupported || this.printByPrintable) {
      this.mPrintingMap.set(t4.pageKey, t4);
      const e2 = Array.from(this.mPrintingMap.keys());
      l.info(`---- addPrintPage[${t4}]: keys = [${e2.join(", ")}]`);
    }
  }
  sendPausedPages() {
    return t(this, void 0, void 0, function* () {
      if (this.mPausedPageMap.size <= 0)
        return xe.OK;
      let t4 = xe.OK;
      const e2 = Array.from(this.mPausedPageMap.keys());
      l.info(`#### #### sendPausedPages: 继续打印暂存的打印任务: [${e2.join(",")}]`);
      const i2 = Array.from(this.mPausedPageMap.values());
      for (this.mPausedPageMap.clear(); i2.length > 0; ) {
        const e3 = i2.shift();
        if (e3) {
          if (this.printStatus >= Ve.Cancel) {
            l.log("---- 取消打印正在进行的暂存任务！"), t4 = xe.ERROR_JOB_CANCELED, this.raisePrintStatusChanged(Ve.ReadyPrint);
            break;
          }
          const n2 = `J${e3.job.jobId}-P${e3.pageIndex}-C${e3.copyIndex}`;
          if (Ge.updatePageKey(e3.dataList, e3.pageKey), t4 = yield this.sendPrintPage(e3.dataList, e3.pageKey, e3.job, n2), t4 === xe.ERROR_PRINTER_NOT_AVAILABLE) {
            this.backupPrintPages(e3, ...i2), e3.job.onPageSendComplete && e3.job.onPageSendComplete(Object.assign(Object.assign({}, e3), { statusCode: t4, printable: this.printable }));
            break;
          }
          if (t4 !== xe.OK) {
            const i3 = e3.job;
            this.raisePrintStatusChanged(Ve.Cancel), i3.onPageSendComplete && i3.onPageSendComplete(Object.assign(Object.assign({}, e3), { statusCode: t4, printable: this.printable })), i3.onPagePrintComplete && i3.onPagePrintComplete(Object.assign(Object.assign({}, e3), { statusCode: t4, printable: this.printable }), i3);
            break;
          }
          e3.job.onPageSendComplete && e3.job.onPageSendComplete(Object.assign(Object.assign({}, e3), { statusCode: t4, printable: this.printable })), e3.copyIndex + 1 >= e3.printCopies && e3.job.onJobSendComplete && e3.job.onJobSendComplete(t4), this.raisePrintStatusChanged(Ve.Printing), this.addPrintPage(e3);
        }
      }
      if (t4 !== xe.OK && t4 !== xe.ERROR_PRINTER_NOT_AVAILABLE) {
        let e3 = -1;
        for (const i3 of this.mPausedPageMap.values())
          i3.job.jobId !== e3 && (i3.job.onPagePrintComplete && i3.job.onPagePrintComplete(Object.assign(Object.assign({}, i3), { statusCode: t4, printable: this.printable }), i3.job), e3 = i3.job.jobId);
        this.mPausedPageMap.clear();
      }
      return (this.isPageKeySupported || this.printByPrintable) && this.checkPrintProgress(this.mPageKey), t4;
    });
  }
  popAndSendPrintJob() {
    return t(this, void 0, void 0, function* () {
      let t4 = xe.OK;
      const e2 = this.mPrintJobList.shift();
      if (this.mPrintingJob = e2, !e2)
        return this.isPageKeySupported || this.printByPrintable ? (this.raisePrintStatusChanged(Ve.Printing), yield this.checkPrintProgress(this.mPageKey, true), this.raisePrintStatusChanged(Ve.ReadyPrint)) : this.raisePrintStatusChanged(Ve.ReadyPrint), xe.OK;
      const i2 = e2.jobOptions.imageDataArray || [], n2 = e2.jobOptions.rawData || [], s2 = n2.length > 0, r2 = n2.length > 0 ? n2.length : i2.length;
      let a2 = e2.jobOptions.printCopies || e2.jobOptions.copies;
      a2 = "number" == typeof a2 && a2 > 1 ? a2 : 1, this.printStatus >= Ve.Paused && this.raisePrintStatusChanged(Ve.ReadyPrint);
      for (let o2 = 0; o2 < r2; o2++) {
        const h2 = { pageKey: this.mPageKey, statusCode: t4, printable: this.printable, pageIndex: o2, printPages: r2, copyIndex: 0, printCopies: a2 };
        l.info(`【${e2.jobId}】 - 开始生成打印数据 page: [${o2 + 1} - ${r2}]!`);
        const c2 = s2 ? n2[o2] : Ge.encodeImageData(Object.assign(Object.assign({}, e2.jobOptions), { imageData: i2[o2], pageKey: this.mPageKey }), this.printerInfo);
        if (c2.length <= 0) {
          t4 = xe.ERROR_PARAM, e2.onPageSendComplete && e2.onPageSendComplete(h2);
          break;
        }
        for (let i3 = 0; i3 < a2; i3++) {
          h2.copyIndex = i3, h2.pageKey = this.mPageKey, h2.printable = this.printable, this.printStatus >= Ve.Cancel && (t4 = xe.ERROR_JOB_CANCELED);
          const n3 = `J${e2.jobId}-P${o2}-C${i3}`;
          if (t4 === xe.OK && (i3 > 0 && Ge.updatePageKey(c2, this.mPageKey), l.info(`【${e2.jobId}】 - 准备发送第[${i3 + 1} / ${a2}] 份打印数据!`), t4 = yield this.sendPrintPage(c2, this.mPageKey, e2, n3)), t4 === xe.OK)
            this.raisePrintStatusChanged(Ve.Printing);
          else if (t4 !== xe.ERROR_PRINTER_NOT_AVAILABLE) {
            e2.onPageSendComplete && e2.onPageSendComplete(Object.assign(Object.assign({}, h2), { printable: this.printable, statusCode: t4 })), this.raisePrintStatusChanged(Ve.Cancel);
            break;
          }
          h2.printable = this.printable;
          const s3 = Object.assign(Object.assign({}, h2), { pageKey: this.mPageKey, job: e2, dataList: c2 });
          if (t4 === xe.ERROR_PRINTER_NOT_AVAILABLE ? (this.backupPrintPages(s3), l.info(`---------- 暂存打印数据：${n3}, pageKey: ${this.mPageKey}`)) : t4 === xe.OK && this.addPrintPage(s3), e2.onPageSendComplete && e2.onPageSendComplete(Object.assign(Object.assign({}, h2), { printable: this.printable, statusCode: t4 })), this.mPageKey = Me.nextPageKey(this.mPageKey), t4 !== xe.OK && t4 !== xe.ERROR_PRINTER_NOT_AVAILABLE)
            break;
        }
        if (t4 !== xe.OK)
          break;
      }
      return l.info(`【${e2.jobId}】 - 当前打印任务处理完毕, statusCode = ${t4}！`), e2.onJobSendComplete && e2.onJobSendComplete(t4), t4 !== xe.OK ? (this.mPrintJobList.splice(0), this.raisePrintStatusChanged(Ve.ReadyPrint), this.mPrintingJob = void 0, t4) : this.popAndSendPrintJob();
    });
  }
  sendPrintPage(e2, i2, n2, s2) {
    return t(this, void 0, void 0, function* () {
      if (!this.isConnected)
        return xe.ERROR_DISCONNECTED;
      const t4 = yield this.checkPrintProgress(i2);
      if (t4 > 0)
        return t4;
      l.info(`=====>【${s2 || n2.jobId} - ${i2}】 - 打印机可用，开始正式发送打印数据!`), this.raisePrintStatusChanged(Ve.Sending);
      const r2 = e2;
      let a2 = 0, o2 = 0, h2 = this.mBufferSize;
      for (; o2 < r2.length; ) {
        const t5 = r2[o2];
        if (this.printStatus >= Ve.Cancel)
          return l.warn(`    [${i2}] - 打印任务已取消，当前打印进度：[${o2 + 1} / ${r2.length}]！`), xe.ERROR_JOB_CANCELED;
        if (l.log(`    **** [${i2}] - 数据发送进度: [${o2 + 1} / ${r2.length}]`), l.log(`    ---- [${i2}] - dataLen: ${t5.length}, bufferSize: ${h2}`), a2 = this.mMinBufferSize > t5.length ? this.mMinBufferSize : t5.length, h2 < a2) {
          if (l.info("    ==== 打印机缓存不够，重新检查缓存大小：minBufferSize", a2), yield Me.sleep(300), !(yield this.tryCheckPrintable(3, 3e3)))
            return l.warn(`    ==== [${i2}] - 缓存检查失败，bufferSize: ${h2}`), l.warn(`    ==== [${i2}] - 数据接收异常，停止发送！`), xe.ERROR_DATA_SEND_ERROR;
          if (this.isPrinterAvailable)
            h2 = this.mBufferSize, l.log(`    ==== [${i2}] - bufferSize: ${h2}`);
          else {
            if (this.printable !== Je.DZIP_TPHTOOHOT)
              return l.warn(`    ==== [${i2}] - 打印机异常，printable: ${this.printable}`), xe.ERROR_PRINTER_NOT_AVAILABLE;
            l.warn(`    ==== [${i2}] - 打印头温度过高！`), yield Me.sleep(1e3);
          }
        } else
          yield this.writeData(t5, o2), o2++, h2 -= t5.length;
      }
      return yield Me.sleep(50), xe.OK;
    });
  }
  checkPrintProgress(e2, i2) {
    return t(this, void 0, void 0, function* () {
      this.mCheckPrintingKeys.push(e2);
      const t4 = this.mCheckPrintingKeys.join(",");
      let n2 = true;
      if (l.log(`#### checkPrintProgress[${e2}](isEndPage: ${i2}, printable: ${this.printable});`), l.log(`@---- checkKeys: [${t4}], isPageKeyValid:${this.isPageKeyValid}`), this.mCheckPrintingKeys.length > 1) {
        for (l.log("@@1---- 【NEW】 检测到上一个打印页面正在检测打印进度，正在等待上一个检测任务，请稍后..."); ; )
          if (yield Me.sleep(10), this.mCheckPrintingKeys.length <= 1) {
            l.log("@@3---- 【NEW】 上一个正在检测的打印进度已结束，开始重新检测打印进度！");
            break;
          }
        n2 = false;
      }
      if (n2) {
        if (!(yield this.tryCheckPrintable(3, 3e3)))
          return l.warn("【DeviceConnection】checkPrintProgress: 打印机异常，数据发送失败！"), xe.ERROR_DATA_SEND_ERROR;
      }
      let s2 = xe.OK;
      for (; ; ) {
        const t5 = this.printable;
        if (!this.isPrinterAvailable) {
          s2 = this.printable === Je.DZIP_JOBCANCELED ? xe.ERROR_PRINTER_CANCELED : xe.ERROR_PRINTER_NOT_AVAILABLE;
          break;
        }
        if (this.mCheckPrintingKeys.length > 1) {
          l.log("@@2----【OLD】 检测到新的打印状态检测任务，已停止当前打印状态的检测！");
          break;
        }
        if (this.mPrintingMap.size <= 0)
          break;
        if (this.printByPrintable) {
          if (t5 !== Je.DZIP_ISPRINTING && t5 !== Je.DZIP_ISROTATING)
            break;
        } else {
          if (!this.isPageKeySupported)
            break;
          if (this.isPageKeyValid && !i2) {
            if ((e2 > this.mIsPrPageKey ? e2 : e2 + 65534) - this.mIsPrPageKey <= 1)
              break;
          } else if (t5 !== Je.DZIP_ISPRINTING && t5 !== Je.DZIP_ISROTATING)
            break;
        }
        yield Me.sleep(300);
        if (!(yield this.tryCheckPrintable(3, 3e3))) {
          s2 = xe.ERROR_DATA_SEND_ERROR;
          break;
        }
      }
      return this.mCheckPrintingKeys.shift(), s2;
    });
  }
}
!function(t4) {
  t4[t4.Binary = 1] = "Binary", t4[t4.Hex16 = 2] = "Hex16", t4[t4.Base64 = 3] = "Base64";
}(ze || (ze = {}));
class ei {
  static getModelName(t4) {
    const e2 = (t4 || "").lastIndexOf("-");
    return e2 > 0 ? [t4.substring(0, e2), t4.substring(e2 + 1)] : [];
  }
  get Models() {
    return this.models;
  }
  constructor(t4) {
    this.includeModels = /* @__PURE__ */ new Set(), this.excludeModels = /* @__PURE__ */ new Set(), this.models = t4 || "";
    const e2 = this.models.split(";");
    let i2 = "";
    for (const t5 of e2)
      switch (t5[0]) {
        case "+":
          i2 = t5.substring(1), i2 && this.includeModels.add(i2.toUpperCase());
          break;
        case "-":
          i2 = t5.substring(1), i2 && this.excludeModels.add(i2.toUpperCase());
          break;
        default:
          t5 && this.includeModels.add(t5.toUpperCase());
      }
  }
  isSupport(t4) {
    if (!t4)
      return false;
    if (this.includeModels.size <= 0 && this.excludeModels.size <= 0)
      return true;
    if (ei.patternSuperD.exec(t4))
      return true;
    if (ei.patternSuperO.exec(t4))
      return true;
    const e2 = ei.getModelName(t4), i2 = e2[0] ? e2[0].toUpperCase() : "";
    if (this.excludeModels.has(i2))
      return false;
    if (this.includeModels.size > 0) {
      if (this.includeModels.has(i2))
        return true;
      return void 0 !== Array.from(this.includeModels).find((e3) => t4 === e3 || t4.match(new RegExp(e3)));
    }
    return true;
  }
}
ei.patternSuperD = /^(.*)-(D[0-9]{4,5}[0-9A-Z]{2,5}[0-9]{2})$/, ei.patternSuperO = /^(.*)-(O[0-9]{4,5}[0-9A-Z]{2,5}[0-9]{2})$/;
class ii {
  static cancelCloseTimer() {
    this.closeTimer && this.closeTimer > 0 && (clearTimeout(this.closeTimer), this.closeTimer = 0, this.closeAction && this.closeAction(false));
  }
  static getPrinterNameInfo(t4) {
    t4 = t4 || "";
    const e2 = ii.patternGeneral.exec(t4);
    if (!e2)
      return;
    let i2 = e2[2];
    const n2 = /^\d+$/.exec(i2);
    let s2 = "", r2 = 0;
    if (i2[1] < "0" || i2[1] > "9" ? (s2 = i2.substring(0, 2), i2 = i2.substring(2), r2 += 11 * s2.charCodeAt(0), r2 += 13 * s2.charCodeAt(1)) : (i2[0] < "0" || i2[0] > "9") && (s2 = i2.substring(0, 1), i2 = i2.substring(1), r2 += 17 * s2.charCodeAt(0)), !(i2.length < 8)) {
      if (!n2 || i2.length >= 9 || i2.charCodeAt(3) != P.num_0) {
        if (n2) {
          r2 += 2 * parseInt(i2.charAt(0)), r2 += 3 * parseInt(i2.charAt(1)), r2 += 5 * parseInt(i2.charAt(2));
          for (var a2 = 4; a2 < i2.length; ++a2)
            r2 += parseInt(i2.charAt(a2)) * (1 & a2 ? 9 : 7);
        } else {
          r2 += 2 * Number(i2.charAt(0)), r2 += 3 * Number(i2.charAt(1)), r2 += 5 * Number(i2.charAt(2));
          for (a2 = 4; a2 < i2.length; ++a2)
            r2 += i2.charCodeAt(a2) * (1 & a2 ? 9 : 7);
        }
        var o2 = r2 % 10;
        if (ii.sDeTongCheckSum.charAt(o2) != i2.charAt(3))
          return;
      }
      return { model: e2[0], serials: i2, trade: s2, checkSum: r2 };
    }
  }
  static isSupperTrade(t4, e2) {
    if (!t4)
      return false;
    return ["D", "O", ...e2 && e2.length > 0 ? e2 : []].indexOf(t4) >= 0;
  }
  static setSupportModels(t4) {
    const e2 = Array.isArray(t4) ? t4.join(";") : t4 || "";
    ii._models !== e2 && (ii._models = e2, ii.matcher = e2 ? new ei(e2) : void 0);
  }
  static isTradeSupported(t4, e2) {
    return !e2 || e2.length <= 0 || !!t4 && (!!ii.isSupperTrade(t4) || e2.indexOf(t4) >= 0);
  }
  static filterSupperTrades(t4) {
    return t4.filter((t5) => t5 && "#" === t5[0]).map((t5) => t5.substring(1));
  }
  static filterNormalTrades(t4) {
    return t4.filter((t5) => t5 && "#" !== t5[0]);
  }
  static isSupportedDevice(t4, e2, i2) {
    const n2 = ii.getPrinterNameInfo(t4);
    if (!n2)
      return false;
    if (!i2 || !e2) {
      const t5 = ii.trades ? ii.trades.split(";") : [];
      i2 || (i2 = ii.filterSupperTrades(t5)), e2 || (e2 = ii.filterNormalTrades(t5));
    }
    return !!ii.isSupperTrade(n2.trade, i2) || (e2.length > 0 && !ii.isTradeSupported(n2.trade, e2) ? (l.info(`---- ----: 不支持的 [TRADE]: ${t4}`), false) : !(ii.matcher && !ii.matcher.isSupport(t4)) || (l.info(`---- ----: 不支持的 [MODEL]: ${t4}`), false));
  }
  static isSupperDevice(t4) {
    const e2 = ii.getPrinterNameInfo(t4);
    if (!e2 || !e2.trade)
      return false;
    const i2 = ii.trades ? ii.trades.split(";") : [], n2 = ii.filterSupperTrades(i2);
    return ii.isSupperTrade(e2.trade, n2);
  }
  static test() {
  }
  constructor(t4) {
    this.mJobId = 0, this.mInitOptions = {}, this.mConnMap = /* @__PURE__ */ new Map(), this.mDeviceMap = /* @__PURE__ */ new Map(), this.mManager = t4;
  }
  get Manager() {
    return this.mManager;
  }
  set Manager(t4) {
    t4 && t4 !== this.mManager && (this.mManager = t4);
  }
  get PrinterDPI() {
    var t4;
    const e2 = (null === (t4 = this.mConnection) || void 0 === t4 ? void 0 : t4.printerInfo) || {};
    return e2.printerDPI && e2.printerDPI > 0 ? e2.printerDPI : Ge.PRINTER_DPI_DEFAULT;
  }
  get PrinterWidth() {
    var t4;
    const e2 = (null === (t4 = this.mConnection) || void 0 === t4 ? void 0 : t4.printerInfo) || {};
    return e2.printerWidth && e2.printerWidth > 0 ? e2.printerWidth : Ge.PRINTER_WIDTH_DEFAULT;
  }
  get Printable() {
    return this.mConnection ? this.mConnection.printerInfo.printable : 0;
  }
  get PrintStatus() {
    return this.mConnection ? this.mConnection.printStatus : Ve.None;
  }
  get IsConnected() {
    return this.mConnection && this.mConnection.isConnected && this.PrintStatus > Ve.Checking;
  }
  setInitOptions(t4) {
    t4 && (Object.assign(this.mInitOptions, t4), this.mConnection && this.mConnection.setOptions(t4));
  }
  quit() {
    return this.Manager.quit();
  }
  parsePositioningPackage(t4) {
    if (t4.cmd !== Je.CMD_POSITIONING)
      return Me.complete(xe.ERROR_PARAM, "指令错误，无法解析！");
    const e2 = t4.Data[0], i2 = t4.Data[2], n2 = Me.getString(Uint8Array.from(t4.Data), 3);
    if (l.warn(`subCmd = ${e2}, deviceState = ${i2}, positionStr = ${n2}`), 1 === e2) {
      const t5 = n2.split(","), e3 = t5[3], i3 = t5[4], s2 = { mode: t5[0] ? parseInt(t5[0]) : 0, signalType: t5[1], satellites: t5[2] ? parseInt(t5[2]) : 0, utcDate: e3, utcTime: i3, ew: t5[5], longitude: t5[6], ns: t5[7], latitude: t5[8], height: t5[9] ? parseFloat(t5[9]) : 0, heightAnomaly: t5[10] ? parseFloat(t5[10]) : void 0 };
      if (e3 && i3) {
        const t6 = parseInt(e3.substring(0, 2)), n3 = parseInt(e3.substring(2, 4)), r2 = parseInt(`20${e3.substring(4, 6)}`), a2 = parseInt(i3.substring(0, 2)), o2 = parseInt(i3.substring(2, 4)), h2 = parseInt(i3.substring(4, 6)), c2 = Date.UTC(r2, n3 - 1, t6, a2, o2, h2);
        s2.dateTime = new Date(c2);
      }
      return 0 === s2.mode && l.warn("---- 定位不可用或定位无效！"), Me.success(s2);
    }
    return Me.complete(xe.ERROR_PARAM, "不支持的子命令！");
  }
  static trimDeviceName(t4) {
    return t4.replace(/[\ufffd\u007f\u0000-\u001f]/g, "");
  }
  updateDeviceList(t4, e2, i2, n2) {
    const s2 = [];
    if (!i2 || !n2) {
      const t5 = ii.trades ? ii.trades.split(";") : [];
      n2 || (n2 = ii.filterSupperTrades(t5)), i2 || (i2 = ii.filterNormalTrades(t5));
    }
    if (t4 && t4.length > 0) {
      for (const r2 of t4)
        if (r2.name && r2.deviceId && (r2.name = ii.trimDeviceName(r2.name || r2.localName || ""), ii.isSupportedDevice(r2.name, i2, n2))) {
          const t5 = r2;
          t5.advertisData && "string" == typeof t5.advertisData && (t5.advertisData = Me.hex16ToArrayBuffer(t5.advertisData)), e2 && this.mDeviceMap.set(r2.deviceId, r2), s2.push(r2);
        }
    }
    return s2;
  }
  getPrinters() {
    return Array.from(this.mDeviceMap.values()).sort((t4, e2) => t4.RSSI && e2.RSSI ? e2.RSSI - t4.RSSI : e2.RSSI ? 1 : t4.RSSI ? -1 : 0);
  }
  startDiscovery(e2) {
    return t(this, void 0, void 0, function* () {
      const t4 = e2 || {};
      t4.trades && (ii.trades = t4.trades), t4.models && ii.setSupportModels(t4.models);
      const i2 = ii.trades ? ii.trades.split(";") : [], n2 = ii.filterSupperTrades(i2), s2 = ii.filterNormalTrades(i2);
      return this.Manager.getConnectedDevices().then((i3) => {
        let r2 = "", a2 = "", o2 = "", h2 = [];
        const c2 = "number" == typeof t4.timeout ? t4.timeout : void 0;
        this.mDiscovering = true, this.mDeviceMap.clear();
        const d2 = i3.statusCode === xe.OK ? i3.resultInfo : [];
        return d2 && d2.length > 0 && this.updateDeviceList(d2, true, s2, n2), this.Manager.startDiscovery(Object.assign(Object.assign({}, t4), { deviceFound: (e3) => {
          if (this.updateDeviceList(e3, true, s2, n2), h2 = this.getPrinters(), a2 = h2.map((t5) => t5.deviceId).join(";"), o2 = h2.map((t5) => t5.name).join(";"), a2 !== r2) {
            l.info(`---- ---- 检测到新设备：【${o2}】`), r2 = a2;
            try {
              t4.deviceFound && t4.deviceFound(h2);
            } catch (t5) {
              l.warn("---- capture exception from opt.deviceFound", t5);
            }
            "number" == typeof c2 && c2 <= 0 && (l.info(`---- 检测到打印机，自动停止搜索(timeout: ${c2})！`), this.stopDiscovery());
          }
        }, adapterStateChange: (e3) => {
          this.mDiscovering = e3.discovering, t4.adapterStateChange && t4.adapterStateChange(e3);
        }, complete: (i4) => {
          if (0 === i4.statusCode && (c2 && c2 > 0 && (l.info("---- 启动蓝牙搜索定时器："), ii.scanTimer = setTimeout(() => {
            l.info(`---- 蓝牙搜索超时时间到：[timeout = ${c2}]`), ii.scanTimer = 0, this.stopDiscovery();
          }, c2)), this.mConnection && this.mConnection.isConnected)) {
            const e3 = this.mConnection.device;
            e3 && (l.info(`---- 检测到已连接设备：${e3.name}`), this.updateDeviceList([e3], true, s2, n2), h2 = this.getPrinters(), h2.length > 0 && t4.deviceFound && t4.deviceFound(h2));
          }
          0 === i4.statusCode && l.log("---- 蓝牙搜索启动成功！"), Me.onResult(i4, e2);
        } }));
      });
    });
  }
  stopDiscovery() {
    return t(this, void 0, void 0, function* () {
      return ii.scanTimer && ii.scanTimer > 0 && (l.info("---- 停止扫描超时定时器："), clearTimeout(ii.scanTimer), ii.scanTimer = 0), this.Manager.stopDiscovery();
    });
  }
  getFoundDevices(t4) {
    return this.Manager.getFoundDevices().then((e2) => {
      if (0 === e2.statusCode) {
        const i2 = e2.resultInfo;
        if (i2 && i2.length > 0) {
          this.updateDeviceList(i2, false);
          const e3 = this.getPrinters();
          return Me.successResult(e3, t4);
        }
        return Me.successResult([], t4);
      }
      return Me.successResult([], t4);
    });
  }
  searchPrinter(e2) {
    return t(this, void 0, void 0, function* () {
      const t4 = e2 || {};
      return new Promise((e3) => {
        let i2 = false;
        this.startDiscovery({ timeout: t4.timeout || 0, models: t4.models, deviceFound: (n2) => {
          if ((null == n2 ? void 0 : n2.length) > 0) {
            let s2;
            for (const e4 of n2) {
              if (!t4.name && !t4.deviceId) {
                s2 = e4;
                break;
              }
              if (t4.name && t4.name === e4.name) {
                s2 = e4;
                break;
              }
              if (t4.deviceId && t4.deviceId === e4.deviceId) {
                s2 = e4;
                break;
              }
            }
            s2 && (i2 = true, e3(s2), this.stopDiscovery());
          }
        }, adapterStateChange: (t5) => {
          t5.discovering || i2 || (i2 = true, e3(void 0));
        } }).then((t5) => {
          0 !== t5.statusCode && e3(void 0);
        });
      });
    });
  }
  openPrinter(e2) {
    return t(this, void 0, void 0, function* () {
      const t4 = e2 || {};
      ii.cancelCloseTimer();
      const i2 = yield this.Manager.getConnectedDevices(), n2 = this.updateDeviceList(0 === i2.statusCode && i2.resultInfo || [], true), s2 = this.getPrinters();
      let r2;
      if (t4.name || t4.deviceId)
        for (const e3 of s2) {
          if (e3.deviceId === t4.deviceId || e3.name === t4.name) {
            r2 = e3;
            break;
          }
          if (t4.name && (e3.name.startsWith(t4.name.toUpperCase()) || t4.name === e3.deviceName || t4.name === e3.printerName)) {
            r2 = e3;
            break;
          }
        }
      else if (this.IsConnected)
        return Me.onResult({ statusCode: xe.OK }, t4);
      if (!r2)
        if (t4.name && t4.deviceId)
          if (ii.isSupportedDevice(t4.name))
            r2 = Object.assign(Object.assign({}, t4), { callback: void 0 });
          else {
            if ("boolean" != typeof t4.checkDeviceName || t4.checkDeviceName)
              return Me.onResult({ statusCode: xe.ERROR_UN_SUPPORTED, errMsg: `不支持的打印机设备:[${t4.name}]！` }, t4);
            r2 = Object.assign(Object.assign({}, t4), { callback: void 0 });
          }
        else
          t4.name || t4.deviceId ? "boolean" != typeof t4.checkDeviceName || t4.checkDeviceName || (r2 = Object.assign(Object.assign({}, t4), { callback: void 0 })) : n2.length > 0 && (r2 = n2[0]);
      if (!r2) {
        if ("boolean" != typeof t4.autoScan && (t4.autoScan = true), !t4.autoScan)
          return Me.onResult({ statusCode: xe.ERROR_NO_PRINTER, errMsg: "未指定目标打印机" }, t4);
        if (l.info(`#### 未检测到缓存的蓝牙设备，正在进行重新搜索：{ name: ${t4.name}, deviceId: ${t4.deviceId} }`), r2 = yield this.searchPrinter({ name: t4.name, deviceId: t4.deviceId, models: t4.models, timeout: 5e3 }), !r2)
          return l.warn("#### 未检测到匹配的蓝牙设备！"), Me.onResult({ statusCode: xe.ERROR_NO_PRINTER, errMsg: "未搜索到到打印机设备！" }, t4);
      }
      l.info(`#### 正在链接打印机设备：{ name: ${r2.name}, deviceId: ${r2.deviceId} }...`), this.mDiscovering && (yield this.stopDiscovery()), t4.clientType && this.setInitOptions({ clientType: t4.clientType });
      const a2 = yield this.connect({ device: r2, timeout: t4.timeout, connectionStateChange: t4.connectionStateChange, tryTimes: t4.tryTimes, delayTime: t4.delayTime });
      return a2.statusCode === xe.OK ? (l.info("★★★★★★ 打印机链接成功！★★★★★★"), Me.onResult(a2, t4)) : (l.info(`★★★★★★ 打印机链接失败[${a2.statusCode}]！★★★★★★`), Me.onResult(a2, t4));
    });
  }
  closePrinter(e2) {
    return t(this, void 0, void 0, function* () {
      const t4 = e2 || {};
      return ii.cancelCloseTimer(), t4.force ? this.disconnect(void 0, true) : new Promise((e3) => {
        ii.closeAction = (i2) => {
          t4.callback && t4.callback(i2), ii.closeAction = void 0, e3(i2);
        }, ii.closeTimer = setTimeout(() => {
          ii.closeTimer = 0, ii.closeAction = void 0, this.disconnect().then((i2) => {
            t4.callback && t4.callback(i2), e3(i2);
          });
        }, t4.delay);
      });
    });
  }
  getPrinterInfo() {
    return this.mConnection && this.PrintStatus > Ve.Checking ? this.mConnection.printerInfo : {};
  }
  createConnection(e2) {
    return t(this, void 0, void 0, function* () {
      const t4 = e2.device || {}, i2 = this.Manager.createConnection(Object.assign(Object.assign({}, this.mInitOptions), { device: t4 })), n2 = yield i2.connect(Object.assign(Object.assign({}, e2), { connectionStateChange: (t5) => {
        t5.connected || this.disconnect({ deviceId: t5.deviceId, name: "" }), e2.connectionStateChange && e2.connectionStateChange(t5);
      } }));
      if (0 !== n2.statusCode)
        return Me.onResult({ statusCode: n2.statusCode, resultInfo: "打印机链接失败！" });
      const s2 = yield i2.checkPrinterInfo();
      if (s2.statusCode !== xe.OK)
        return l.error(`---- 打印机相关参数获取失败(statusCode: ${s2.statusCode})！`), yield this.disconnect(t4), Me.onResult(s2);
      this.mConnMap.set(t4.deviceId, i2), this.mConnection = i2;
      const r2 = i2.printerInfo;
      return l.info(`========== deviceInfo: ${t4.name} ==========`, r2), l.info(`---- deviceName                     : ${t4.name}`), l.info(`---- deviceId                       : ${t4.deviceId}`), l.info(`---- printerDPI                     : ${r2.printerDPI}`), l.info(`---- printerWidth                   : ${r2.printerWidth}`), l.info(`---- hardwareFlags                  : ${Me.toHexString(r2.hardwareFlags, "0x")}`), l.info(`---- softwareFlags                  : ${Me.toHexString(r2.softwareFlags, "0x")}`), l.info(`---- softwareVersion                : ${r2.softwareVersion}`), l.info("---- printerAlignment[R0/C2/L4]     : " + ((1536 & r2.softwareFlags) >> 8)), l.info(`---- mIsPrPageKey[ >= 0 is ok]      : ${r2.isPrPageKey}`), "number" == typeof this.mInitOptions.clientType && l.info(`---- clientType                     : ${this.mInitOptions.clientType}`), "boolean" == typeof this.mInitOptions.enableMcuId && l.info(`---- enableMcuId                    : ${this.mInitOptions.enableMcuId}`), this.mInitOptions.requestMTUs && l.info(`---- requestMTUs                    : ${this.mInitOptions.requestMTUs}`), this.mInitOptions.writeWaits && l.info(`---- writeWaits                     : ${this.mInitOptions.writeWaits}`), this.mInitOptions.minBufferSize && l.info(`---- minBufferSize                  : ${this.mInitOptions.minBufferSize}`), "number" == typeof this.mInitOptions.dataSendMode && l.info(`---- dataSendMode                   : ${this.mInitOptions.dataSendMode}`), "boolean" == typeof this.mInitOptions.enablePageKey && l.info(`---- enablePageKey                  : ${this.mInitOptions.enablePageKey}`), l.info("================================================"), Me.successResult({ statusCode: xe.OK, resultInfo: this.getPrinterInfo() });
    });
  }
  isDeviceConnected(t4) {
    return !!this.mConnection && (this.PrintStatus >= Ve.ReadyPrint && this.mConnection.deviceId === t4);
  }
  getConnection(t4) {
    for (const e2 of this.mConnMap) {
      if (t4.deviceId && t4.deviceId === e2[0])
        return e2[1];
      if (t4.name && t4.name === e2[1].deviceName)
        return e2[1];
    }
    return null;
  }
  connect(e2) {
    return t(this, void 0, void 0, function* () {
      const t4 = e2.device || {}, i2 = t4.deviceId;
      if (l.log(`---- DzPrinter.connect(${i2}), mPrintStatus: ${this.PrintStatus}`), !i2)
        return { statusCode: xe.ERROR_PARAM, errMsg: "未指定设备ID！" };
      const n2 = this.getConnection(t4);
      if (n2)
        if (n2.isConnected) {
          if (this.PrintStatus > Ve.Checking)
            return l.info(`---- 打印机已连接：${i2}`), { statusCode: xe.OK, errMsg: "设备已连接！", resultInfo: this.getPrinterInfo() };
          if (this.PrintStatus > Ve.Connected)
            return l.info("---- 正在链接，请稍后..."), new Promise((t5) => {
              const e3 = n2.PrintStatusChanged.on((i3) => {
                i3 === Ve.ReadyPrint ? (n2.PrintStatusChanged.off(e3), t5({ statusCode: xe.OK, resultInfo: this.getPrinterInfo() })) : i3 === Ve.None && (n2.PrintStatusChanged.off(e3), t5({ statusCode: xe.ERROR_CONNECT_FAILED }));
              });
            });
        } else
          yield this.disconnect();
      else
        this.mConnection && (yield this.disconnect());
      return yield this.createConnection(e2);
    });
  }
  disconnect(e2, i2) {
    return t(this, void 0, void 0, function* () {
      const t4 = e2 ? this.getConnection(e2) : this.mConnection;
      if (!t4)
        return true;
      if (e2) {
        if (e2.deviceId) {
          if (e2.deviceId !== t4.deviceId)
            return l.log(`---- 目标设备 ${e2.name}[${e2.deviceId}] 未连接，不需要执行断开操作！`), true;
        } else if (e2.name && e2.name !== t4.deviceName)
          return l.log(`---- 目标设备 ${e2.name} 未连接，不需要执行断开操作！`), true;
      }
      const n2 = t4.deviceName, s2 = t4.deviceId;
      return l.info(`【DzPrinter】disconnect(${n2}[${s2}]) mPrintStatus: ${Ve[this.PrintStatus]}`), this.PrintStatus !== Ve.Printing || i2 || (yield new Promise((e3) => {
        const i3 = t4.PrintStatusChanged.on((n3) => {
          (n3 === Ve.ReadyPrint || n3 > Ve.Printing) && (t4.PrintStatusChanged.off(i3), e3(i3));
        });
      })), this.mConnMap.has(t4.deviceId) && this.mConnMap.delete(t4.deviceId), this.mConnection === t4 && (this.mConnection = void 0), t4.disconnect();
    });
  }
  setPrinterParam(t4) {
    !this.mConnection || this.PrintStatus < Ve.ReadyPrint || this.PrintStatus === Ve.Sending || this.mConnection.checkAndSendPrintParams(t4);
  }
  pushPrintJob(t4) {
    return !!this.mConnection && (l.info(`<<<--- ❤️❤️❤️ ■#■#■ pushImageData[${this.mJobId + 1}]  ■#■#■ ❤️❤️❤️ --->>>`), this.mConnection.printJob(t4));
  }
  stopPrint() {
    this.mConnection && this.mConnection.cancelPrintJob();
  }
  continuePrint() {
    return this.mConnection && this.mConnection.isConnected ? this.mConnection.continuePrintJob() : Promise.resolve(xe.ERROR_DISCONNECTED);
  }
  encodeImageData(t4) {
    t4.data && t4.width && t4.height && ("string" == typeof t4.data && (t4.data = Me.hex16ToArrayBuffer(t4.data)), t4.imageData = { width: t4.width, height: t4.height, data: t4.data, colorSpace: "srgb" });
    const e2 = Ge.encodeImageData(t4), i2 = { valueType: t4.valueType || ze.Binary, values: e2 };
    return i2.valueType === ze.Hex16 ? i2.values = e2.map((t5) => Me.arrayBufferToHex16(t5)) : i2.valueType === ze.Base64 && (i2.values = e2.map((t5) => Me.arrayBufferToBase64(t5))), i2;
  }
  pushImageData(t4) {
    const e2 = { statusCode: xe.OK };
    this.PrintStatus === Ve.Paused && this.stopPrint(), t4.data && t4.width && t4.height && ("string" == typeof t4.data && (t4.data = Me.hex16ToArrayBuffer(t4.data)), t4.imageData = { width: t4.width, height: t4.height, data: t4.data, colorSpace: "srgb" });
    const i2 = t4.imageDataArray || [];
    if (i2.length <= 0 && t4.imageData && i2.push(t4.imageData), !i2 || i2.length <= 0)
      return e2.statusCode = xe.ERROR_PARAM, e2.status = e2.statusCode, t4.onJobComplete && t4.onJobComplete(e2), e2;
    if (this.PrintStatus < Ve.ReadyPrint)
      return e2.statusCode = xe.ERROR_DISCONNECTED, e2.status = e2.statusCode, t4.onJobComplete && t4.onJobComplete(e2), e2;
    {
      const n2 = this.mJobId++;
      return t4.imageDataArray = i2, this.pushPrintJob({ jobId: n2, jobOptions: t4, jobPushed: () => {
        l.info(`======== 打印任务 [${n2}] 添加成功!`), t4.jobPushed && t4.jobPushed(n2);
      }, onPageSendComplete: (e3) => {
        const i3 = e3.pageKey || 0;
        l.log(`---- 打印页面 [${n2} - ${i3}(0x${i3.toString(16)})] 数据发送结束: { result: ${e3.statusCode}, page: [${e3.pageIndex + 1} / ${e3.printPages}], copy: [${e3.copyIndex + 1} / ${e3.printCopies}]}`), e3.status = e3.statusCode, t4.onPageComplete && t4.onPageComplete(e3);
      }, onPagePrintComplete: (i3, s2) => {
        const r2 = i3.pageKey || 0;
        l.log(`---- 打印页面 [${n2} - ${r2}(0x${r2.toString(16)})] 打印结束: { result: ${i3.statusCode}, page: [${i3.pageIndex + 1} / ${i3.printPages}], copy: [${i3.copyIndex + 1} / ${i3.printCopies}]}`), t4.onPagePrintComplete && t4.onPagePrintComplete(i3), e2.statusCode = i3.statusCode, e2.printable = i3.printable, i3.statusCode !== xe.OK ? t4.onJobPrintComplete && t4.onJobPrintComplete(e2) : i3.pageIndex + 1 === i3.printPages && i3.copyIndex + 1 === i3.printCopies && (l.info(`★★★★★ 打印任务【${s2.jobId}】 打印完毕全部打印完毕！ ★★★★★`), t4.onJobPrintComplete && t4.onJobPrintComplete(e2));
      }, onJobSendComplete: (i3) => {
        l.info(`======== 打印任务 [${n2}] 处理完毕!`), Object.assign(e2, { statusCode: i3, status: i3, printable: this.Printable }), t4.onJobComplete && t4.onJobComplete(e2);
      } }), e2;
    }
  }
  pushRawData(t4) {
    const e2 = { statusCode: xe.OK };
    this.PrintStatus === Ve.Paused && this.stopPrint();
    const i2 = t4.rawData;
    if (!i2 || i2.length <= 0)
      return e2.statusCode = xe.ERROR_PARAM, e2.status = e2.statusCode, t4.onJobComplete && t4.onJobComplete(e2), e2;
    if (this.PrintStatus < Ve.ReadyPrint)
      return e2.statusCode = xe.ERROR_DISCONNECTED, e2.status = e2.statusCode, t4.onJobComplete && t4.onJobComplete(e2), e2;
    {
      const n2 = this.mJobId++;
      return t4.rawData = i2, this.pushPrintJob({ jobId: n2, jobOptions: t4, jobPushed: () => {
        l.info(`======== 打印任务 [${n2}] 添加成功!`), t4.jobPushed && t4.jobPushed(n2);
      }, onPageSendComplete: (e3) => {
        const i3 = e3.pageKey || 0;
        l.log(`---- 打印页面 [${n2} - ${i3}(0x${i3.toString(16)})] 数据发送结束: { result: ${e3.statusCode}, page: [${e3.pageIndex + 1} / ${e3.printPages}], copy: [${e3.copyIndex + 1} / ${e3.printCopies}]}`), e3.status = e3.statusCode, t4.onPageComplete && t4.onPageComplete(e3);
      }, onPagePrintComplete: (i3, s2) => {
        const r2 = i3.pageKey || 0;
        l.log(`---- 打印页面 [${n2} - ${r2}(0x${r2.toString(16)})] 打印结束: { result: ${i3.statusCode}, page: [${i3.pageIndex + 1} / ${i3.printPages}], copy: [${i3.copyIndex + 1} / ${i3.printCopies}]}`), t4.onPagePrintComplete && t4.onPagePrintComplete(i3), e2.statusCode = i3.statusCode, e2.printable = i3.printable, i3.statusCode !== xe.OK ? t4.onJobPrintComplete && t4.onJobPrintComplete(e2) : i3.pageIndex + 1 === i3.printPages && i3.copyIndex + 1 === i3.printCopies && (l.info(`★★★★★ 打印任务【${s2.jobId}】 打印完毕全部打印完毕！ ★★★★★`), t4.onJobPrintComplete && t4.onJobPrintComplete(e2));
      }, onJobSendComplete: (i3) => {
        l.info(`======== 打印任务 [${n2}] 处理完毕!`), Object.assign(e2, { statusCode: i3, status: i3, printable: this.Printable }), t4.onJobComplete && t4.onJobComplete(e2);
      } }), e2;
    }
  }
  printImageData(t4) {
    return new Promise((e2) => {
      this.pushImageData(Object.assign(Object.assign({}, t4), { onJobComplete: (i2) => {
        t4.onJobComplete && t4.onJobComplete(i2), e2(i2);
      } }));
    });
  }
  printRawData(t4) {
    return new Promise((e2) => {
      this.pushRawData(Object.assign(Object.assign({}, t4), { onJobComplete: (i2) => {
        t4.onJobComplete && t4.onJobComplete(i2), e2(i2);
      } }));
    });
  }
  queryCommand(e2, i2) {
    return t(this, void 0, void 0, function* () {
      return this.mConnection ? this.mConnection.queryCommand(e2, i2) : Me.complete(xe.ERROR_DISCONNECTED, void 0);
    });
  }
  writeCommands(e2) {
    return t(this, void 0, void 0, function* () {
      if (!this.mConnection || !this.IsConnected)
        return Me.complete(xe.ERROR_DISCONNECTED, "设备未连接！", e2);
      const t4 = ti.parsePackageList(e2.value, [], []);
      return !t4 || t4.length <= 0 ? Me.complete(xe.ERROR_PARAM, `无效的指令：${Me.arrayBufferToHex16(e2.value)}`, e2) : this.mConnection.pushPackageListRequest(t4, e2.timeout).then((t5) => {
        if (0 !== t5.statusCode)
          return Me.complete(t5.statusCode, t5.resultInfo, e2);
        const i2 = t5.resultInfo, n2 = i2.pkgList.map((t6) => {
          var e3;
          return null === (e3 = t6.receivedPkg) || void 0 === e3 ? void 0 : e3.getRawData();
        });
        return Me.complete(t5.statusCode, Object.assign(Object.assign({}, i2), { sendData: i2.sendData, data: Me.concatUint8Array(n2) }), e2);
      });
    });
  }
  requestPositioningInfo(e2) {
    return t(this, void 0, void 0, function* () {
      var t4;
      const e3 = this.mConnection;
      if (!e3 || !e3.isConnected)
        return Me.complete(xe.ERROR_DISCONNECTED, "打印机未连接");
      const i2 = e3.printerInfo.hardwareFlags || 0;
      if (!(8 & i2))
        return l.warn(`---- 当前打印机不支持北斗定位功能，hardwareFlags = ${Me.toHexString(i2, "0x")}`), Me.complete(xe.ERROR_UN_SUPPORTED, "当前设备不支持北斗定位功能！");
      const n2 = yield this.queryCommand(Je.CMD_POSITIONING, [1]), s2 = null === (t4 = n2.resultInfo) || void 0 === t4 ? void 0 : t4.respPkg;
      return 0 == n2.statusCode && s2 ? this.parsePositioningPackage(s2) : Me.complete(n2.statusCode, n2.errMsg || "");
    });
  }
}
ii.trades = "", ii.sDeTongCheckSum = "5682904137", ii.patternGeneral = /^(.*)-([A-Z]{0,2}[0-9]{4,5}[0-9A-Z]{2,5}[0-9]{2})$/;
class ni {
  static createInstance(t4) {
    if (t4 && !(t4.length < 14))
      return 53 === t4[0] && 51 === t4[1] ? new ni(t4) : void 0;
  }
  static uuidToString(t4, e2) {
    if (!t4)
      return "";
    const i2 = [];
    e2 && i2.push("0x");
    for (let e3 = t4.length - 1; e3 >= 0; --e3)
      i2.push(Me.toHexByteString(t4[e3]));
    return i2.join("");
  }
  get deviceMainType() {
    return this.data[2];
  }
  get suggestedMtuI() {
    return 20 * this.data[3];
  }
  get suggestedWaitI() {
    return this.data[4];
  }
  get suggestedMtuA() {
    return 20 * this.data[5];
  }
  get suggestedWaitA() {
    return this.data[6];
  }
  get suggestedUUID() {
    return ni.uuidToString(this.data.slice(7, 11));
  }
  get locateArea() {
    const t4 = this.data[11];
    return t4 >= P.A && t4 <= P.Z ? String.fromCharCode(t4) : "";
  }
  get deviceFlags() {
    return Le.toShort(this.data[12], this.data[13]);
  }
  constructor(t4) {
    this.data = t4;
  }
  toString() {
    return `[${Me.arrayBufferToHex16(this.data, ",")}]`;
  }
}
!function(t4) {
  t4[t4.BROADCAST = 1] = "BROADCAST", t4[t4.READ = 2] = "READ", t4[t4.WRITE_NO_RESPONSE = 4] = "WRITE_NO_RESPONSE", t4[t4.WRITE = 8] = "WRITE", t4[t4.NOTIFY = 16] = "NOTIFY", t4[t4.INDICATE = 32] = "INDICATE";
}(Ze || (Ze = {}));
class si extends ti {
  get device() {
    return this.mDevice;
  }
  get adapter() {
    return this.mAdapter;
  }
  get isConnected() {
    return this.mConnected;
  }
  get requestMTUs() {
    return this.mRequestMTUs;
  }
  get writeWaitMSs() {
    return this.mWriteWaitMSs;
  }
  get printerInfo() {
    var t4, e2;
    return Object.assign(Object.assign(Object.assign({}, this.device), this.mPrinterInfo), { writeCharacteristicId: null === (t4 = this.mWriteCharacteristic) || void 0 === t4 ? void 0 : t4.uuid, notifyCharacteristicId: null === (e2 = this.mNotifyCharacteristic) || void 0 === e2 ? void 0 : e2.uuid });
  }
  constructor(t4, e2, i2) {
    if (super(t4, e2, i2), this.mRequestMTUs = 0, this.mWriteWaitMSs = 0, this.mWriteExtendWaits = 0, this.mUserWriteWaits = 0, this.mUserRequestMTUs = 0, this.mDFType = "", e2 && "function" == typeof e2.getDeviceInfo && (this.mDeviceInfo = e2.getDeviceInfo()), i2) {
      "number" == typeof i2.writeWaits && (this.mUserWriteWaits = i2.writeWaits), "number" == typeof i2.requestMTUs && (this.mUserRequestMTUs = i2.requestMTUs);
      const t5 = i2.writeExtendWaits;
      "number" == typeof t5 && t5 >= 0 && t5 <= 30 && (this.mWriteExtendWaits = t5);
    }
  }
  parseMTUInfo(t4, e2) {
    var i2, n2;
    const s2 = Me.isIOS(null === (i2 = this.mDeviceInfo) || void 0 === i2 ? void 0 : i2.platform), r2 = Me.isHarmonyOS(null === (n2 = this.mDeviceInfo) || void 0 === n2 ? void 0 : n2.platform);
    if (this.mRequestMTUs = 123, this.mWriteWaitMSs = s2 ? 20 : 10, this.mDFType = "", e2) {
      const t5 = e2 instanceof Uint8Array ? e2 : new Uint8Array(e2), i3 = new Le(Je.CMD_NULL, Array.from(t5)).popString().toUpperCase();
      l.info(`---- prepareRequestMTU: ${i3}, isIOS = ${s2}`);
      const n3 = i3.lastIndexOf("-");
      this.mDFType = n3 >= 0 ? i3.substring(n3 + 1) : "";
    }
    if (t4)
      return l.info("---- get mtu info from factory info!"), s2 ? (this.mRequestMTUs = t4.suggestedMtuI + 3, this.mWriteWaitMSs = t4.suggestedWaitI) : (this.mRequestMTUs = t4.suggestedMtuA + 3, this.mWriteWaitMSs = t4.suggestedWaitA), true;
    if (this.mDFType) {
      if ("MT_DF1" === this.mDFType)
        this.mRequestMTUs = 123, this.mWriteWaitMSs = s2 ? 18 : 15;
      else {
        const t5 = /^DF(\d+)$/.exec(this.mDFType);
        if (t5) {
          const e3 = parseInt(t5[1]);
          5 & ~e3 ? 4 & e3 ? (this.mRequestMTUs = 183, this.mWriteWaitMSs = s2 ? 10 : r2 ? 5 : 3) : 2 & e3 ? (this.mRequestMTUs = 123, this.mWriteWaitMSs = s2 ? 20 : 10) : 1 & e3 && (this.mRequestMTUs = 183, this.mWriteWaitMSs = s2 ? 18 : r2 ? 10 : 15) : (this.mRequestMTUs = 503, this.mWriteWaitMSs = 7);
        }
      }
      return this.mUserWriteWaits > 0 && (this.mWriteWaitMSs = this.mUserWriteWaits), true;
    }
    {
      this.mUserRequestMTUs >= 23 && (this.mRequestMTUs = this.mUserRequestMTUs), this.mUserWriteWaits > 0 && (this.mWriteWaitMSs = this.mUserWriteWaits);
      const t5 = e2 ? Me.arrayBufferToHex16(e2, "") : "undefined";
      return l.warn(`---- prepareRequestMTU : DF信息获取失败, buffer = [${t5}]`), l.info(`---- mRequestMTUs      : ${this.mRequestMTUs}`), l.info(`---- mWriteWaitMSs     : ${this.mWriteWaitMSs}`), l.info(`---- mUserRequestMTUs  : ${this.mUserRequestMTUs}`), l.info(`---- mUserWriteWaits   : ${this.mUserWriteWaits}`), l.info(`---- mWriteExtendWaits : ${this.mWriteExtendWaits}`), false;
    }
  }
  getGATTServices(e2) {
    return t(this, void 0, void 0, function* () {
      const t4 = [];
      if (!this.isConnected)
        return l.warn("---- 打印机链接已断开！"), t4;
      for (let i2 = 0; i2 < 5 && this.mConnected; i2++) {
        const n2 = yield this.adapter.getGATTServices({ deviceId: e2 });
        if (n2 && n2.length > 0) {
          l.info(`---- 【getGATTServices】: 第 [${i2 + 1} / 5] 获取成功！`), t4.push(...n2);
          break;
        }
        l.warn(`---- 【getGATTServices】: 第 [${i2 + 1} / 5] 获取失败！`), yield Me.sleep(300);
      }
      return t4;
    });
  }
  setBleMtu(t4) {
    const e2 = "MT_DF1" === this.mDFType || "DF1" === this.mDFType || "DF2" === this.mDFType;
    return this.adapter.setBleMtu({ deviceId: t4, mtu: this.mRequestMTUs, waits: this.mWriteWaitMSs, chipType: this.mDFType, required: e2 }).then((t5) => {
      var i2;
      return "number" == typeof t5.waits && t5.waits > 0 && (this.mWriteWaitMSs = t5.waits), t5.status > 0 ? this.mDFType && e2 && (this.mRequestMTUs = 23) : "number" == typeof t5.mtu && (this.mRequestMTUs = t5.mtu > 23 ? t5.mtu : 23), l.info(`---- setBleMtu.resp.status        : ${t5.status}`), l.info(`---- requestMTU.mDFType           : ${this.mDFType}`), l.info(`---- requestMTU.mRequestMTUs      : ${this.mRequestMTUs}`), l.info(`---- requestMTU.mWriteWaitMSs     : ${this.mWriteWaitMSs}`), l.info(`---- requestMTU.mWriteExtendWaits : ${this.mWriteExtendWaits}`), l.info(`-----platform                     : ${null === (i2 = this.mDeviceInfo) || void 0 === i2 ? void 0 : i2.platform}`), 0 !== t5.status || Me.sleep(100, true);
    });
  }
  readMTUInfo(t4, e2) {
    const i2 = e2.find((t5) => Me.isMatchedUUID(t5, "180A"));
    return i2 ? this.adapter.getGATTCharacteristics({ deviceId: t4, serviceId: i2 }).then((e3) => {
      var n2;
      const s2 = null === (n2 = e3.find((t5) => Me.isMatchedUUID(t5.uuid, "2A24"))) || void 0 === n2 ? void 0 : n2.uuid;
      if (s2)
        return Me.sleep(20).then(() => this.adapter.read({ deviceId: t4, serviceId: i2, characteristicId: s2 }).then((t5) => 0 === t5.statusCode && "string" == typeof t5.resultInfo ? Me.hex16ToArrayBuffer(t5.resultInfo) : t5.resultInfo));
    }) : Promise.resolve(void 0);
  }
  getValidateCharacteristic(e2, i2) {
    return t(this, void 0, void 0, function* () {
      const t4 = yield this.adapter.getGATTCharacteristics({ deviceId: e2, serviceId: i2 }), n2 = [];
      for (const e3 of t4)
        if (16 & e3.properties && !(32 & e3.properties) && (n2[0] || Me.isMatchedUUID(e3.uuid, "FF03") || (n2[0] = e3, l.log(`---- 检测到 notify 通道： {uuid: ${e3.uuid}, properties:${e3.properties}}`))), (8 & e3.properties || 4 & e3.properties) && (n2[1] || (Me.isMatchedUUID(i2, "FFE0") ? Me.isMatchedUUID(e3.uuid, "FFE1") && (n2[1] = e3) : n2[1] = e3, n2[1] && l.log(`---- 检测到 write 通道： {uuid: ${e3.uuid}, properties:${e3.properties}}`))), n2[0] && n2[1])
          break;
      return n2[0] && !n2[0].serviceId && (n2[0].serviceId = i2), n2[1] && !n2[1].serviceId && (n2[1].serviceId = i2), n2;
    });
  }
  getPrintCharacteristics(e2, i2, n2) {
    return t(this, void 0, void 0, function* () {
      let t4, s2;
      if (l.log(`---- suggestedService = ${n2}`), n2 && i2.length > 0 && (n2 = n2.toUpperCase(), n2 = i2.find((t5) => Me.getFullUUID(t5).startsWith(n2)) || ""), n2) {
        const t5 = yield this.getValidateCharacteristic(e2, n2);
        if (t5[0] && t5[1])
          return l.info(`---- 通过推荐的服务[${n2}] 检测到了有效的读写通道！`), { notifyId: t5[0], writeId: t5[1] };
        l.warn(`---- 通过推荐的服务[${n2}] 未检测到有效的读写通道！`);
      }
      for (const n3 of i2)
        if (Me.isSupportedService(n3)) {
          l.log(`---- 检测到可用 service: ${n3}`);
          const i3 = yield this.getValidateCharacteristic(e2, n3);
          if (!t4 && i3[0] && (t4 = i3[0]), !s2 && i3[1] && (s2 = i3[1]), t4 && s2)
            return { notifyId: t4, writeId: s2 };
          l.log(`---- service ${n3} 读写特征值不全！`);
        } else
          l.log(`---- 不可用 serviceId: ${n3}`);
      return l.warn("---- 未检测到有效的打印通道！"), {};
    });
  }
  connect(e2) {
    return t(this, void 0, void 0, function* () {
      l.info(`---- BleConnection.connect(${this.deviceName}[${this.deviceId}])`);
      const t4 = this.device, i2 = "number" == typeof e2.tryTimes && e2.tryTimes > 0 ? e2.tryTimes : 5;
      let n2 = 0;
      const s2 = { value: false }, r2 = e2.timeout || 5e3;
      if (setTimeout(() => {
        s2.value = true;
      }, r2), e2.autoPair) {
        (yield this.isDevicePaired(t4)) > 0 && (yield this.makePair(t4.deviceId));
      }
      this.mConnected = false;
      for (let a2 = 0; a2 < i2; a2++) {
        a2 > 0 && (yield Me.sleep(100));
        if (n2 = (yield this.adapter.connect({ deviceId: t4.deviceId, timeout: r2, connectionStateChange: (t5) => {
          t5.deviceId !== this.deviceId || t5.connected || (this.disconnect(), e2.connectionStateChange && e2.connectionStateChange(t5));
        } })).statusCode, n2 <= 0) {
          this.mConnected = true, l.info(`---- 【createBleConnection】: 第 [${a2 + 1} / ${i2}] 次链接成功！`);
          break;
        }
        {
          const t5 = s2.value ? "超时" : "失败";
          if (l.warn(`---- 【createBleConnection】: 第 [${a2 + 1} / ${i2}] 次链接${t5}！`), s2.value)
            break;
          if (n2 === xe.ERROR_NO_BRIDGE)
            break;
        }
      }
      return n2 > 0 ? (this.raisePrintStatusChanged(Ve.None), Me.failResult({ statusCode: n2 > xe.ERROR_OTHER ? n2 : xe.ERROR_CONNECT_FAILED, resultInfo: "打印机链接失败！" })) : (this.raisePrintStatusChanged(Ve.Connected), { statusCode: 0, resultInfo: "OK" });
    });
  }
  disconnect() {
    return t(this, void 0, void 0, function* () {
      const t4 = this.deviceName, e2 = this.deviceId;
      return l.info(`---- BleConnection.disconnect(${e2}), mConnected = ${this.mConnected}`), !this.mConnected || (this.mNotifyCharacteristic && (yield this.adapter.notify({ deviceId: e2, serviceId: this.mNotifyCharacteristic.serviceId, characteristicId: this.mNotifyCharacteristic.uuid, state: false })), yield this.adapter.disconnect({ name: t4, deviceId: e2 || "" }), this.mConnected = false, this.mWriteCharacteristic = void 0, this.mNotifyCharacteristic = void 0, this.raisePrintStatusChanged(Ve.None), l.info("---- 打印机断开成功！"), true);
    });
  }
  notifyData(e2) {
    return t(this, void 0, void 0, function* () {
      l.info("---- BleConnection.notifyData:");
      const t4 = this.device || {}, i2 = t4.deviceId;
      this.mFactoryInfo = ni.createInstance(t4.advertisData), this.mFactoryInfo && l.info(`---- factoryInfo: ${this.mFactoryInfo ? this.mFactoryInfo.toString() : "[-]"}`), yield Me.sleep(100);
      const n2 = this.mFactoryInfo ? this.mFactoryInfo.suggestedUUID : "";
      return this.getGATTServices(i2).then((t5) => {
        const e3 = t5.map((t6) => "string" == typeof t6 ? t6 : (null == t6 ? void 0 : t6.uuid) || "");
        return Me.sleep(20, e3);
      }).then((t5) => (l.info(`---- serviceList.length: ${null == t5 ? void 0 : t5.length}`), t5.length <= 0 && !n2 ? (l.warn("---- 打印机服务列表获取失败！"), { statusCode: xe.ERROR_GET_SERVICE }) : this.getPrintCharacteristics(i2, t5 || [], n2).then((n3) => {
        const s2 = n3.notifyId, r2 = n3.writeId;
        return s2 && r2 ? (l.info(`---- notifyId [${s2.serviceId}]: ${s2.uuid}`), l.info(`---- writeId  [${r2.serviceId}]: ${r2.uuid}`), this.readMTUInfo(i2, t5 || []).then((t6) => (this.parseMTUInfo(this.mFactoryInfo, t6), l.info(`---- ---- requestMtu: ${this.mRequestMTUs} (byte)`), l.info(`---- ---- writeWaits: ${this.mWriteWaitMSs} (ms)`), this.setBleMtu(i2).then(() => (this.mWriteCharacteristic = r2, this.mNotifyCharacteristic = s2, this.adapter.notify({ deviceId: i2, serviceId: s2.serviceId, characteristicId: s2.uuid, state: true, dataReceived: (t7) => {
          "string" == typeof t7 && (t7 = Me.hex16ToArrayBuffer(t7)), e2(t7);
        } }).then((t7) => Me.sleep(50, { statusCode: t7.statusCode, resultInfo: { dfType: this.mDFType, requestMTUs: this.mRequestMTUs, writeWaits: this.mWriteWaitMSs } }))))))) : (l.warn("---- 未检测到有效的服务！"), { statusCode: xe.ERROR_GET_CHARACTERISTIC });
      })));
    });
  }
  writeData(e2, i2) {
    return t(this, void 0, void 0, function* () {
      var t4, n2;
      const s2 = this.mRequestMTUs - 3, r2 = e2.length, a2 = this.mWriteWaitMSs + this.mWriteExtendWaits;
      let o2, h2 = { statusCode: xe.OK };
      for (let c2 = 0, d2 = 0, u2 = 0; c2 < r2; )
        if (h2 = { statusCode: xe.ASYNC_WAIT }, o2 = c2 + s2 < e2.length ? e2.slice(c2, c2 + s2) : e2.slice(c2), this.adapter.write({ deviceId: this.deviceId || "", serviceId: (null === (t4 = this.mWriteCharacteristic) || void 0 === t4 ? void 0 : t4.serviceId) || "", characteristicId: (null === (n2 = this.mWriteCharacteristic) || void 0 === n2 ? void 0 : n2.uuid) || "", value: o2, pkgIndex: i2, subPkgIndex: u2, writeWaits: a2, complete: (t5) => {
          h2 = t5;
        } }), yield Me.sleep(a2 > 0 ? a2 : 1), h2.statusCode > xe.OK) {
          if (d2++, l.warn(`---- 打印数据发送失败，正在重新发送打印数据, tryTimes = [${d2} / 5]`), l.warn(`---- DFType: ${this.mDFType}, waitTimes: ${a2}`), d2 >= 5)
            break;
        } else
          h2.statusCode, xe.OK, d2 = 0, c2 += s2, u2++;
      return h2;
    });
  }
}
class ri {
  static getInstance() {
    return !this._instance && this.isEnabled() && (this._instance = new ri()), this._instance;
  }
  static isEnabled() {
    return !!(null === navigator || void 0 === navigator ? void 0 : navigator.bluetooth);
  }
  constructor() {
    this.mShowWriteLog = false, navigator && "bluetooth" in navigator ? (this.mBluetooth = navigator.bluetooth, window && window.addEventListener("error", (t4) => {
      l.warn(t4.message + " (Your browser may not support this feature.)", t4), t4.preventDefault();
    })) : l.warn("---- 当前环境不支持 WebBluetooth API 接口！");
  }
  authorize(t4) {
    return new Promise((e2) => {
      Me.success("OK", t4, e2);
    });
  }
  openAdapter(t4) {
    const e2 = t4 || {};
    return new Promise((t5) => {
      if (!this.mBluetooth) {
        const i2 = "当前环境不支持 WebBluetooth 功能！";
        return l.warn(`---- ${i2}`), Me.complete(xe.ERROR_UN_SUPPORTED, i2, e2, t5);
      }
      Me.success(true, e2);
    });
  }
  closeAdapter() {
    return Promise.resolve({ statusCode: 0 });
  }
  startDiscovery(e2) {
    return t(this, void 0, void 0, function* () {
      const i2 = e2 || {};
      if (this.mBluetooth) {
        const e3 = i2.models ? i2.models.split(/[;]/).filter((t4) => !!t4) : [];
        return e3.length <= 0 && (e3.push("DT"), e3.push("DP"), e3.push("P")), this.mBluetooth.requestDevice({ optionalServices: ["49535343-fe7d-4ae5-8fa9-9fafd205e455", "0000180a-0000-1000-8000-00805f9b34fb", "0000ff00-0000-1000-8000-00805f9b34fb", "0000ff10-0000-1000-8000-00805f9b34fb"], filters: e3.map((t4) => ({ namePrefix: t4 })) }).then((e4) => t(this, void 0, void 0, function* () {
          l.info("---- 【Response】startBleDiscovery.success:", e4), this.mDevice && this.mDevice.id !== e4.id && (yield this.disconnect({ deviceId: this.mDevice.id, name: this.mDevice.name })), this.mDevice = e4;
          const t4 = [{ name: e4.name || "", deviceId: e4.id }];
          return i2.deviceFound && i2.deviceFound(t4), Me.success(e4, i2);
        })).catch((t4) => {
          this.mDevice = void 0, l.warn("---- 【Response】startBleDiscovery.fail:", t4);
          const e4 = { statusCode: 1, resultInfo: t4 };
          return Me.onResult(e4, i2);
        });
      }
      {
        const t4 = "当前环境不支持 WebBluetooth 功能！";
        return l.warn(`---- ${t4}`), Me.onResult({ statusCode: -1, resultInfo: t4 }, i2);
      }
    });
  }
  stopDiscovery(t4) {
    return new Promise((e2) => {
      Me.success(true, t4, e2);
    });
  }
  connect(e2) {
    return t(this, void 0, void 0, function* () {
      const t4 = e2 || {}, i2 = this.mDevice;
      if (!i2)
        return Me.complete(xe.ERROR_NO_PRINTER, xe.ERROR_NO_PRINTER, t4);
      if (t4.deviceId && t4.deviceId !== i2.id)
        return l.warn(`---- 给定的设备ID[${t4.deviceId}] 与实际的设备ID[${i2.id}] 不匹配！`, e2), Me.complete(xe.ERROR_PARAM, xe.ERROR_PARAM, t4);
      if (!i2.gatt)
        return l.warn("---- 未检测到 gattDevice.gatt 对象！", e2), Me.complete(xe.ERROR_PARAM, xe.ERROR_PARAM, t4);
      if (i2.gatt.connected)
        return l.info("---- 打印机已连接 ----"), Me.success("OK", t4);
      try {
        return l.info("### 【Request】 device.gatt.connect()"), i2.gatt.connect().then((e3) => {
          if (l.info(`---- 【Response】device.gatt.connect.success[${e3.connected}]:`, e3), e3.connected) {
            this.mGattServer = e3;
            let n2 = true;
            this.mConnectionStateChange && (i2.removeEventListener("gattserverdisconnected", this.mConnectionStateChange), this.mConnectionStateChange = void 0);
            const s2 = (e4) => {
              var s3, r2;
              l.warn("---- gattDevice.gattserverdisconnected: 打印机链接已断开！"), l.warn(`---- gattDevice.connected = ${null === (s3 = i2.gatt) || void 0 === s3 ? void 0 : s3.connected}, connecting = ${n2}`), "function" != typeof t4.connectionStateChange || n2 || t4.connectionStateChange({ deviceId: i2.id, connected: (null === (r2 = i2.gatt) || void 0 === r2 ? void 0 : r2.connected) || false });
            };
            return this.mConnectionStateChange = s2, i2.addEventListener("gattserverdisconnected", s2), new Promise((e4) => {
              setTimeout(() => {
                var s3;
                n2 = false, (null === (s3 = i2.gatt) || void 0 === s3 ? void 0 : s3.connected) ? Me.success("OK", t4, e4) : Me.complete(xe.ERROR_CONNECT_FAILED, "打印机链接失败！", t4, e4);
              }, 150);
            });
          }
          return this.mGattServer = void 0, Me.complete(xe.ERROR_CONNECT_FAILED, "", t4);
        }).catch((e3) => (l.warn("---- 【Response】 device.gatt.connect.catch:", e3), Me.complete(xe.ERROR_CONNECT_FAILED, "", t4)));
      } catch (e3) {
        return l.warn("----- try catch: device.gatt.connect:", e3), Promise.resolve(Me.complete(xe.ERROR_CONNECT_FAILED, "", t4));
      }
    });
  }
  disconnect(e2) {
    return t(this, void 0, void 0, function* () {
      var t4;
      const i2 = e2 || {}, n2 = this.mDevice;
      if (l.log(`---- WebBleAdapter.disconnect: gattDevice = ${n2 ? n2.name : "-"}`, e2), !n2 || !this.mGattServer)
        return l.log(`---- WebBleAdapter.disconnect: 蓝牙设备[${n2 ? n2.name : "-"}]已断开！`), Me.success(0, i2);
      if (i2.deviceId && i2.deviceId !== n2.id)
        return l.info(`#### WebBleAdapter.disconnect Failed! {current: ${n2.id}, target: ${i2.deviceId}}`), Me.complete(xe.ERROR_PARAM, "", i2);
      if (!(null === (t4 = n2.gatt) || void 0 === t4 ? void 0 : t4.connected))
        return Me.success(0, i2);
      this.mNotifyCharacter && (l.info("---- 关闭通知功能"), this.mNotifyCharacter.stopNotifications(), this.mNotifyCharacter = void 0, this.mWriteCharacter = void 0), l.log("---- 【Request】mGattServer.disconnect():");
      try {
        n2.gatt.disconnect(), l.info("#### WebBleAdapter.disconnect success!");
      } catch (t5) {
        l.warn("#### WebBleAdapter.disconnect catch!", t5);
      }
      return this.mGattServer = void 0, l.info("---- 一切正常，game over !!!"), Me.success(0, i2);
    });
  }
  getConnectedBleDevices() {
    return Promise.resolve([]);
  }
  setBleMtu(e2) {
    return t(this, void 0, void 0, function* () {
      let t4 = e2.mtu || 0;
      return t4 > ri.MTU_MAX && (t4 = ri.MTU_MAX), Me.isIOS() ? { status: -1 } : e2.chipType && !e2.required ? { status: -1, waits: e2.waits ? e2.waits + 5 : e2.waits } : { status: -1, waits: e2.waits ? e2.waits + 3 : e2.waits };
    });
  }
  isDeviceConnected(t4) {
    return !(!this.mGattServer || !this.mGattServer.connected) && this.mGattServer.device.id === t4;
  }
  getGATTServices(e2) {
    return t(this, void 0, void 0, function* () {
      const t4 = [];
      return l.info(`---- 【Request】getPrimaryServices(server: ${this.mGattServer ? this.mGattServer.device.name : "undefined"})`), new Promise((i2) => {
        this.mGattServer && this.mGattServer.connected ? this.mGattServer.getPrimaryServices().then((n2) => {
          for (const e3 of n2)
            l.log(`---- service uuid: ${e3.uuid}`), t4.push(e3);
          e2.complete && e2.complete(t4), i2(t4);
        }).catch((t5) => {
          l.warn("---- 【Response】 gattServer.getPrimaryServices.catch:", t5), e2.complete && e2.complete([]), i2([]);
        }) : (l.warn("---- 打印机未链接！", this.mGattServer), e2.complete && e2.complete([]), i2([]));
      });
    });
  }
  getGATTCharacteristics(e2) {
    return t(this, void 0, void 0, function* () {
      const t4 = e2 || {}, i2 = [];
      return l.info("---- 【Request】getBleGATTCharacteristics"), new Promise((n2) => this.mGattServer ? t4.serviceId ? void this.mGattServer.getPrimaryService(t4.serviceId).then((s2) => {
        s2 ? s2.getCharacteristics().then((e3) => {
          if (!e3 || e3.length <= 0)
            l.warn("---- 未检测到任何特征值！"), t4.complete && t4.complete(i2), n2(i2);
          else {
            for (const n3 of e3) {
              let e4 = 0;
              l.log(`---- characteristic uuid: ${n3.uuid}`), n3.properties.read && (e4 |= Ze.READ), n3.properties.writeWithoutResponse && (e4 |= Ze.WRITE_NO_RESPONSE), n3.properties.write && (e4 |= Ze.WRITE), n3.properties.notify && (e4 |= Ze.NOTIFY), i2.push({ serviceId: t4.serviceId, uuid: n3.uuid, properties: e4 });
            }
            t4.complete && t4.complete(i2), n2(i2);
          }
        }) : (l.warn(`---- 服务实例[${t4.serviceId}] 获取失败！`), e2.complete && e2.complete(i2), n2(i2));
      }) : (l.warn("---- 参数错误，未指定 serviceId 或者 characteristicId！"), e2.complete && e2.complete(i2), n2(i2), i2) : (l.warn("---- 打印机未链接！"), e2.complete && e2.complete(i2), void n2(i2)));
    });
  }
  read(e2) {
    return t(this, void 0, void 0, function* () {
      if (!this.mGattServer || !e2.serviceId || !e2.characteristicId)
        return Me.complete(xe.ERROR_PARAM, "参数异常", e2);
      const t4 = Me.getFullUUID(e2.serviceId), i2 = Me.getFullUUID(e2.characteristicId), n2 = yield this.mGattServer.getPrimaryService(t4.toLowerCase());
      if (!n2)
        return Me.complete(xe.ERROR_GET_SERVICE, "蓝牙服务获取失败", e2);
      const s2 = yield n2.getCharacteristic(i2.toLowerCase());
      if (!s2)
        return Me.complete(xe.ERROR_GET_CHARACTERISTIC, "蓝牙特征值获取失败", e2);
      l.info("---- readCharacteristicValue:");
      const r2 = yield s2.readValue();
      return l.info(r2), Me.complete(0, new Uint8Array(r2.buffer), e2);
    });
  }
  notify(e2) {
    return t(this, void 0, void 0, function* () {
      if (l.info(`---- 【Request】startNotifications, state: ${e2.state}`), !e2.state)
        return Me.success("OK", e2);
      if (!this.mDevice || !this.mGattServer || !this.mGattServer.connected)
        return l.warn("---- 打印机未链接！"), Me.complete(xe.ERROR_DISCONNECTED, "打印机未连接", e2);
      if (!e2.serviceId || !e2.characteristicId)
        return l.warn("---- 参数错误！"), Me.complete(xe.ERROR_PARAM, "未检测到 serviceId 或者 characteristicId", e2);
      const t4 = yield this.mGattServer.getPrimaryService(e2.serviceId);
      if (!t4)
        return l.warn(`---- 服务实例[${e2.serviceId}] 获取失败！`), Me.complete(xe.ERROR_PARAM, "获取服务列表失败", e2);
      const i2 = yield t4.getCharacteristic(e2.characteristicId);
      if (!i2)
        return l.warn(`---- notify特征值实例 [${e2.characteristicId}] 获取失败！`), Me.complete(xe.ERROR_CONNECT_FAILED, "特征值获取失败", e2);
      i2.oncharacteristicvaluechanged = (t5) => {
        const i3 = t5.target;
        if (i3.value) {
          const t6 = new Uint8Array(i3.value.buffer);
          e2.dataReceived && e2.dataReceived(t6);
        }
      };
      return (yield i2.startNotifications()) ? (this.mNotifyCharacter = i2, Me.success("OK", e2)) : (l.warn("---- #### startNotifications 失败！"), Me.complete(xe.ERROR_CONNECT_FAILED, "startNotifications 失败", e2));
    });
  }
  write(e2) {
    return t(this, void 0, void 0, function* () {
      const t4 = e2.value || e2.data;
      if (!this.mGattServer)
        return Me.onResult({ statusCode: 1, resultInfo: "打印机未连接" }, e2);
      if (!this.mWriteCharacter) {
        const t5 = yield this.mGattServer.getPrimaryService(e2.serviceId);
        if (!t5)
          return l.warn(`---- 服务实例[${e2.serviceId}] 获取失败！`), Me.onResult({ statusCode: 2, resultInfo: "获取服务失败！" }, e2);
        const i2 = yield t5.getCharacteristic(e2.characteristicId);
        if (!i2)
          return l.warn(`---- write特征值实例 [${e2.characteristicId}] 获取失败！`), Me.onResult({ statusCode: 3, resultInfo: "特征值获取失败" }, e2);
        this.mWriteCharacter = i2;
      }
      if (this.mWriteCharacter && t4) {
        const i2 = `[P ${e2.pkgIndex} - SUP ${e2.subPkgIndex}]`;
        return this.mShowWriteLog && l.log(`#### 【Request】writeBLECharacteristicValue[${e2.value.length}]: ${i2}`), this.mWriteCharacter.writeValueWithoutResponse(new Uint8Array(t4.buffer)).then((t5) => (this.mShowWriteLog && l.log(`#### 【Response.success】writeBLECharacteristicValue: ${i2}`, t5), this.mShowWriteLog = false, Me.success(t5, e2))).catch((t5) => (l.warn(`###【Response.catch】writeBLECharacteristicValue: ${i2}`, t5), this.mShowWriteLog = true, Me.complete(xe.ERROR_WRITE_CHARACTERISTIC, t5, e2)));
      }
      return Me.complete(xe.ERROR_PARAM, "参数错误", e2);
    });
  }
}
ri.MTU_MAX = 512, function(t4) {
  t4.text = "text";
}(qe || (qe = {}));
class ai {
  static createDomParser() {
    try {
      return window.DOMParser ? new DOMParser() : void 0;
    } catch (t4) {
      return void l.warn(t4);
    }
  }
  static parseXmlDocument(t4, e2) {
    if (t4)
      try {
        const i2 = e2 || new DOMParser();
        return t4 ? i2.parseFromString(t4, "text/xml") : void 0;
      } catch (t5) {
        l.warn("xml parse error:"), l.warn(t5);
      }
  }
  static splitEqual(t4, e2) {
    const i2 = (t4 || "").split(";");
    for (const t5 of i2)
      if (t5 === e2)
        return true;
    return false;
  }
  static getElementsByTagName(t4, e2, i2, n2) {
    if (!t4 || !e2 || t4.childElementCount <= 0)
      return [];
    if (i2) {
      const i3 = [], s2 = t4.children || t4.childNodes;
      let r2 = "";
      for (let t5 = 0; t5 < s2.length && (r2 = s2[t5].tagName || s2[t5].nodeName, r2.toLowerCase() !== e2.toLocaleLowerCase() || (i3.push(s2[t5]), !n2)); t5++)
        ;
      return i3;
    }
    return t4.getElementsByTagName(e2);
  }
  static getElementByTagName(t4, e2, i2) {
    return this.getElementsByTagName(t4, e2, i2, true)[0];
  }
  static getElementValue(t4) {
    try {
      return t4.childNodes[0].nodeValue || "";
    } catch (t5) {
      return "";
    }
  }
  static getElementValueByTagName(t4, e2) {
    if (!e2)
      return "";
    const i2 = e2.split(";");
    for (let e3 = 0; e3 < i2.length; e3++) {
      const n2 = i2[e3];
      if (!n2)
        continue;
      const s2 = this.getElementsByTagName(t4, n2, true, true);
      if (s2.length > 0)
        return this.getElementValue(s2[0]);
    }
    return "";
  }
  static isNumberString(t4, e2) {
    return !!t4 && (!!(t4 = t4.trim()).match(/^[-+]?[0-9]*\.?[0-9]+$/) || !(!e2 || !t4.match(/^(0x)?[0-9a-f]+$/i)));
  }
  static isHexString(t4) {
    return !!t4 && !!t4.match(/^(0x)?[0-9a-f]+$/i);
  }
  static optNumber(t4, e2) {
    return "number" == typeof t4 ? t4 : (t4 = (t4 || "").trim(), this.isNumberString(t4) ? Number(t4) : this.isHexString(t4) ? parseInt(t4, 16) : e2 || 0);
  }
  static isBooleanString(t4) {
    return !!t4 && !!(t4 = t4.trim()).match(/^(yes)|(no)|(true)|(false)$/i);
  }
  static optBoolean(t4, e2) {
    return !!(t4 = (t4 || "").trim()).match(/^(yes)|(true)$/i) || !t4.match(/^(no)|(false)$/i) && ("boolean" == typeof e2 && e2);
  }
  static decodeBase64File(t4, e2) {
    const i2 = Me.decodeBase64(t4);
    if (i2) {
      try {
        return new File([i2], e2);
      } catch (t5) {
        l.warn(t5);
      }
      try {
        return new Blob([i2]);
      } catch (t5) {
        l.warn(t5);
      }
    }
  }
  static parseEmbeddedImg(t4, e2) {
    if (!t4)
      return t4;
    const i2 = t4.indexOf(ai.EmbeddedSeparator);
    if (i2 < 0)
      return t4;
    let n2 = t4.substring(0, i2).trim().toLowerCase();
    return "." === n2[0] && (n2 = n2.substring(1)), "svg" === n2 && (n2 = "svg+xml"), t4 = t4.substring(i2 + ai.EmbeddedSeparator.length), e2 && e2(n2, t4), `data:image/${n2};base64,${t4}`;
  }
  static parseEmbeddedFile(t4) {
    if (!(t4 = (t4 || "").trim()))
      return;
    const e2 = t4.indexOf(ai.EmbeddedSeparator);
    let i2;
    if (e2 >= 0) {
      const n2 = t4.substring(0, e2), s2 = t4.substring(e2 + ai.EmbeddedSeparator.length);
      i2 = ai.decodeBase64File(s2, n2);
    } else
      i2 = ai.decodeBase64File(t4, "");
    return i2;
  }
}
ai.EmbeddedSeparator = "*****";
class oi {
  static isWdfxJob(t4) {
    const e2 = t4 || {};
    return !(!e2.layerClass || !e2.templateID) && ("LPAPI" === e2.layerClass.toUpperCase() && (e2.Page || e2.page || []).length > 0);
  }
  static getDefaultBarcodeContent(t4, e2) {
    return e2 && "string" == typeof e2.defaultBarcodeContent ? e2.defaultBarcodeContent : t4 === R.EAN13 ? "690123456789" : t4 === R.EAN8 ? "6901234" : t4 === R.UPC_A ? "69012345678" : t4 === R.UPC_E ? "0123456" : t4 === R.ISBN ? "978012345678" : "12345678";
  }
  static getDefaultQrcodeContent(t4) {
    return "string" == typeof t4.defaultQrcodeContent ? t4.defaultQrcodeContent : "http://detonger.com/wdbq";
  }
  static getDefaultTextContent(t4) {
    return "string" == typeof t4.defaultTextContent ? t4.defaultTextContent : "";
  }
  static getContentText(t4, e2, i2) {
    const n2 = "number" == typeof e2.contentType ? e2.contentType : 0, s2 = e2.content || e2.text, r2 = i2 || {};
    if (t4 = t4.toLowerCase(), 2 === n2) {
      if (!s2) {
        if (t4 === Ie.barcode) {
          const t5 = ai.optNumber(e2.barcodeType);
          return oi.getDefaultBarcodeContent(t5, r2);
        }
        if (t4 === Ie.qrcode)
          return oi.getDefaultQrcodeContent(r2);
      }
      return s2;
    }
    if (n2 > 0 || s2)
      return s2;
    if (t4 === Ie.text)
      return s2 || oi.getDefaultTextContent(r2);
    if (t4 === Ie.qrcode)
      return s2 || oi.getDefaultQrcodeContent(r2);
    if (t4 === Ie.barcode) {
      const t5 = ai.optNumber(e2.barcodeType);
      return oi.getDefaultBarcodeContent(t5, r2);
    }
    return s2;
  }
  static rotateRect(t4, e2) {
    (e2 = (e2 + 360) % 360) > 3 && (e2 = Math.floor(e2 / 90));
    const i2 = t4.x || 0, n2 = t4.y || 0, s2 = t4.width || 0, r2 = t4.height || 0, a2 = i2 + 0.5 * s2, o2 = n2 + 0.5 * r2;
    return 1 !== e2 && 3 !== e2 || (t4.x = a2 - 0.5 * r2, t4.y = o2 - 0.5 * s2, t4.width = r2, t4.height = s2), t4;
  }
  static getDateTime(t4) {
    const i2 = t4.dateFormat || "", n2 = t4.timeFormat || "", s2 = t4.dateOffset || t4.dateDiff || 0, r2 = t4.hourOffset || t4.hourDiff || 0, a2 = t4.minuteOffset || t4.minuteDiff || 0, o2 = t4.secondOffset || t4.secondDiff || 0, h2 = /* @__PURE__ */ new Date();
    if (s2 || r2 || a2 || o2) {
      let t5 = h2.getTime();
      s2 && (t5 += 864e5 * s2), r2 && (t5 += 36e5 * r2), a2 && (t5 += 6e4 * a2), o2 && (t5 += 1e3 * o2), h2.setTime(t5);
    }
    return i2 && n2 ? e.formatDate(`${i2} ${n2}`) : i2 || n2 ? e.formatDate(i2 || n2, h2) : e.formatDate("yyyy年MM月dd日");
  }
  static parseWdxNode(t4, e2, i2) {
    if (t4.children && t4.children.length > 0) {
      const n2 = {}, s2 = [];
      for (let r2 = 0; r2 < t4.children.length; r2++) {
        const a2 = t4.children[r2], o2 = "function" == typeof e2 && e2(a2, t4), h2 = this.parseWdxNode(a2, e2, o2);
        i2 ? ("object" != typeof h2 || Array.isArray(h2) || (h2.layerClass = a2.tagName), s2.push(h2)) : n2[a2.tagName] = h2;
      }
      return i2 ? s2 : n2;
    }
    if (t4.childNodes && t4.childNodes.length > 1) {
      const n2 = {}, s2 = [];
      for (let r2 = 0; r2 < t4.childNodes.length; r2++) {
        const a2 = t4.childNodes[r2];
        if (a2.nodeName === oi.NODE_NAME_TEXT)
          continue;
        const o2 = "function" == typeof e2 && e2(a2, t4), h2 = this.parseWdxNode(a2, e2, o2);
        i2 ? ("object" != typeof h2 || Array.isArray(h2) || (h2.layerClass = a2.nodeName), s2.push(h2)) : n2[a2.nodeName] = h2;
      }
      return i2 ? s2 : n2;
    }
    return t4.childNodes && t4.childNodes.length > 0 && t4.childNodes[0].nodeValue || "";
  }
  static getAutoValue(t4) {
    const e2 = t4 ? t4.toLowerCase() : "";
    return "true" === e2 || "yes" === e2 || "false" !== e2 && "no" !== e2 && (ai.isNumberString(e2) ? Number(e2) : t4);
  }
  static loadWdfxContent(t4, e2) {
    const i2 = ai.parseXmlDocument(t4 || "", e2), n2 = i2 ? i2.getElementsByTagName("LPAPI") : void 0, s2 = n2 && n2.length > 0 ? n2[0] : void 0;
    if (!s2)
      return;
    const r2 = this.parseWdxNode(s2, (t5, e3) => {
      const i3 = (t5.tagName || t5.nodeName || "").toLowerCase(), n3 = (e3.tagName || e3.nodeName || "").toLowerCase();
      return e3 === s2 && "page" === i3 || "table" === n3 && "cells" === i3;
    });
    return "string" == typeof r2 || Array.isArray(r2) ? void 0 : (r2.layerClass = s2.tagName, r2);
  }
  static updateWdfOptions(t4, i2, n2) {
    const s2 = t4, r2 = t4;
    for (const t5 of Object.keys(r2)) {
      let e2 = r2[t5];
      "drawColorHex" !== t5 ? ("string" == typeof e2 && (r2[t5] = e2 = oi.getAutoValue(e2)), "labelWidth" === t5 ? (s2.jobWidth = e2, delete r2[t5]) : "labelHeight" === t5 ? (s2.jobHeight = e2, delete r2[t5]) : "labelName" === t5 ? (s2.jobName = e2, delete r2[t5]) : "printOrientation" === t5 && (s2.orientation = e2, delete r2[t5])) : e2 && "0" !== e2 && (s2.drawColor = e2);
    }
    s2.jobWidth || s2.width || (s2.jobWidth = 40), s2.jobHeight || s2.height || (s2.jobHeight = 30), "string" == typeof s2.background && (s2.background = ai.parseEmbeddedImg(s2.background));
    let a2 = [];
    if (t4.Page ? (a2 = t4.Page, delete t4.Page) : t4.page && (a2 = t4.page, delete t4.page), s2.border && "string" == typeof s2.border)
      try {
        const t5 = ai.parseEmbeddedImg(s2.border, (t6, n3) => {
          if (s2.borderType = t6, i2 || "undefined" == typeof DOMParser || (i2 = new DOMParser()), "svg+xml" === t6 && i2) {
            "number" != typeof s2.borderScale && (s2.borderScale = 1);
            try {
              const t7 = i2.parseFromString(Me.atob(n3), "image/svg+xml"), r3 = t7 ? t7.getElementsByTagName("svg") : void 0, a3 = r3 && r3.length > 0 ? r3[0] : void 0;
              if (a3 && (s2.svgElement = a3, a3.width && (s2.svgWidth = a3.width.baseVal.value), a3.height && (s2.svgHeight = a3.height.baseVal.value), a3.viewBox && (s2.svgViewBox = a3.viewBox.baseVal), !s2.svgViewBox && a3.attributes && a3.attributes.length > 0))
                for (let t8 = 0; t8 < a3.attributes.length; t8++) {
                  const i3 = a3.attributes[t8], n4 = i3.name || i3.nodeName || i3.localName;
                  if ("width" === n4) {
                    const t9 = i3.value || i3.nodeValue || "";
                    !s2.svgWidth && ai.isNumberString(t9) && (s2.svgWidth = ai.optNumber(t9));
                  } else if ("height" === n4) {
                    const t9 = i3.value || i3.nodeValue || "";
                    !s2.svgHeight && ai.isNumberString(t9) && (s2.svgHeight = ai.optNumber(t9));
                  } else if ("viewBox" === n4) {
                    const t9 = i3.value || i3.nodeValue || "";
                    !s2.svgViewBox && t9 && (s2.svgViewBox = e.parseRect(t9));
                  }
                }
            } catch (t7) {
              l.warn(t7);
            }
          }
        });
        s2.border = t5;
      } catch (t5) {
        l.warn(t5);
      }
    const h2 = [];
    if (a2 && a2.length > 0)
      for (const t5 of a2) {
        const e2 = t5, i3 = e2.layerClass ? e2.layerClass.toLowerCase() : "";
        for (const t6 of Object.keys(e2)) {
          const i4 = e2[t6];
          "content" !== t6 && "lineSpace" !== t6 && "columnName" !== t6 && ("drawColorHex" !== t6 ? "dataColumnName" === t6 && void 0 !== e2.dataColumnName && void 0 === e2.columnName ? e2.columnName = e2.dataColumnName : "string" == typeof i4 && (e2[t6] = oi.getAutoValue(i4)) : i4 && "0" !== i4 && (e2.color = i4));
        }
        if (void 0 === e2.horizontalAlignment && "number" == typeof e2.horAlignment && (e2.horizontalAlignment = e2.horAlignment), void 0 === e2.verticalAlignment && "number" == typeof e2.verAlignment && (e2.verticalAlignment = e2.verAlignment), i3 === Ie.line) {
          const t6 = e2.x1 || 0, i4 = e2.y1 || 0, n3 = e2.x2 || 0, s3 = e2.y2 || 0;
          "number" == typeof e2.x1 && delete e2.x1, "number" == typeof e2.y1 && delete e2.y1, "number" == typeof e2.x2 && delete e2.x2, "number" == typeof e2.y2 && delete e2.y2, e2.x = Math.min(t6, n3), e2.y = Math.min(i4, s3), e2.width = Math.abs(t6 - n3), e2.height = Math.abs(i4 - s3);
        }
        if (e2.width && e2.height && e2.orientation && oi.rotateRect(e2, -e2.orientation), i3 === Ie.text)
          e2.text = oi.getContentText(i3, e2, n2), h2.push(Object.assign(Object.assign({}, e2), { lineSpaceMode: g.getLineMode(e2.lineSpace), lineSpace: g.valueOf(e2.lineSpace, e2.fontHeight || 2.5), type: Ie.text, rotateMode: o.RotateCanvas }));
        else if ("time" === i3 || "date" === i3)
          e2.text = oi.getDateTime(e2), h2.push(Object.assign(Object.assign({}, e2), { type: Ie.text, rotateMode: o.RotateCanvas }));
        else if ("arctext" === i3)
          e2.text || (e2.text = oi.getContentText(Ie.text, e2, n2)), h2.push(Object.assign(Object.assign({}, e2), { lineWidth: "number" == typeof e2.lineWidth ? e2.lineWidth : 0.5, type: Ie.arcText }));
        else if (i3 === Ie.barcode)
          e2.text = oi.getContentText(i3, e2, n2), "number" != typeof e2.horizontalAlignment && (e2.horizontalAlignment = 1), h2.push(Object.assign(Object.assign({}, e2), { barcodeType: "number" == typeof e2.type ? e2.type : e2.barcodeType, type: Ie.barcode }));
        else if (i3 === Ie.qrcode)
          e2.text = oi.getContentText(i3, e2, n2), "number" != typeof e2.horizontalAlignment && (e2.horizontalAlignment = 1), "number" != typeof e2.verticalAlignment && (e2.verticalAlignment = 1), h2.push(Object.assign(Object.assign({}, e2), { type: Ie.qrcode, barcodeType: e2.type }));
        else if ("image" === i3 || "logo" === i3) {
          const t6 = e2.content || e2.text;
          e2.content && delete e2.content, e2.text && delete e2.text, h2.push(Object.assign(Object.assign({}, e2), { image: ai.parseEmbeddedImg(t6), alignment: e2.tile ? 3 : 1, type: Ie.image }));
        } else if ("rectangle" === i3 || "rect" === i3) {
          let t6 = Ie.rect;
          "boolean" == typeof e2.filled && e2.filled && (e2.fill = true, delete e2.filled), ("number" != typeof e2.lineWidth || e2.lineWidth <= 0) && (e2.lineWidth = 0.5), 1 === e2.type ? ("number" != typeof e2.cornerWidth || e2.cornerWidth <= 0) && (e2.cornerWidth = 1) : 2 === e2.type ? t6 = Ie.ellipse : 3 === e2.type ? t6 = Ie.circle : e2.cornerWidth && delete e2.cornerWidth, h2.push(Object.assign(Object.assign({}, e2), { type: t6 }));
        } else if (i3 === Ie.line) {
          const t6 = "number" == typeof e2.type ? e2.type : 0, i4 = "number" == typeof e2.dashGap && e2.dashGap > 0 ? e2.dashGap : 1;
          1 === t6 && (e2.dashLens = [i4]), e2.dashGap && delete e2.dashGap, h2.push(Object.assign(Object.assign({}, e2), { type: Ie.line }));
        } else if (i3 === Ie.table) {
          const t6 = e2.Cells || e2.cells || [];
          if (e2.Cells && delete e2.Cells, Array.isArray(t6) && t6.length > 0)
            for (const e3 of t6)
              for (const t7 of Object.keys(e3)) {
                const i4 = e3[t7];
                "content" !== t7 && "lineSpace" !== t7 && "dataColumnName" !== t7 && "columnName" !== t7 && ("string" == typeof i4 && (e3[t7] = oi.getAutoValue(e3[t7])));
              }
          h2.push(Object.assign(Object.assign({}, e2), { rowCount: e2.rows, columnCount: e2.cols, cells: t6, type: Ie.table }));
        } else
          i3 ? h2.push(Object.assign(Object.assign({}, e2), { type: i3 })) : "string" == typeof e2.type && h2.push(e2);
      }
    return { jobInfo: t4, jobPage: h2 };
  }
  static parseWdfx(t4, e2) {
    let i2;
    i2 = "object" == typeof t4 ? t4 : { content: t4, domParser: e2 };
    const n2 = oi.loadWdfxContent(i2.content, i2.domParser);
    return n2 && oi.isWdfxJob(n2) ? oi.updateWdfOptions(n2, i2.domParser) : void 0;
  }
}
oi.NODE_NAME_TEXT = "#text";
class hi {
  static create(t4) {
    return new hi(t4);
  }
  get adapter() {
    return this.mAdapter;
  }
  constructor(t4) {
    this.mAdapter = t4;
  }
  authorize(t4) {
    return "function" == typeof this.adapter.authorize ? this.adapter.authorize(t4) : Promise.resolve({ statusCode: xe.OK, resultInfo: "暂不支持该操作" });
  }
  createConnection(t4) {
    return new ti(t4.device, this.adapter, t4);
  }
  openAdapter(t4) {
    return this.adapter.openAdapter(t4);
  }
  closeAdapter() {
    return this.adapter.closeAdapter();
  }
  startDiscovery(t4) {
    return "function" == typeof this.adapter.startDiscovery ? this.adapter.startDiscovery(t4) : "function" == typeof this.adapter.startBluetoothDiscovery ? this.adapter.startBluetoothDiscovery(t4) : Promise.resolve(Me.onResult({ statusCode: xe.ERROR_NO_IMPLEMENT }));
  }
  stopDiscovery() {
    return "function" == typeof this.adapter.stopDiscovery ? this.adapter.stopDiscovery() : "function" == typeof this.adapter.stopBluetoothDiscovery ? this.adapter.stopBluetoothDiscovery() : Promise.resolve(Me.onResult({ statusCode: xe.ERROR_NO_IMPLEMENT }));
  }
  getFoundDevices(t4) {
    return "function" == typeof this.adapter.getFoundDevices ? this.adapter.getFoundDevices(t4) : "function" == typeof this.adapter.getBluetoothDevices ? this.adapter.getBluetoothDevices(t4) : Promise.resolve(Me.complete(xe.ERROR_NO_IMPLEMENT, [], t4));
  }
  getConnectedDevices(t4) {
    return "function" == typeof this.adapter.getConnectedDevices ? this.adapter.getConnectedDevices(t4) : Promise.resolve(Me.complete(xe.ERROR_NO_IMPLEMENT, [], t4));
  }
  getBondedDevices(t4) {
    return "function" == typeof this.adapter.getBondedDevices ? this.adapter.getBondedDevices(t4) : Promise.resolve(Me.complete(xe.ERROR_NO_IMPLEMENT, [], t4));
  }
  quit() {
  }
}
class ci extends hi {
  static create(t4) {
    return new ci(t4);
  }
  get adapter() {
    return this.mAdapter;
  }
  constructor(t4) {
    super(t4);
  }
  createConnection(t4) {
    return new si(t4.device, this.adapter, t4);
  }
  quit() {
  }
}
class di {
  static getInstance(t4) {
    const e2 = t4 || {};
    return this.sInstance ? t4 && this.sInstance.setOptions(t4) : this.sInstance = new di(e2), this.sInstance;
  }
  static create(t4) {
    return new di(t4);
  }
  static isPreviewJobName(t4) {
    return !!t4 && Ae.isPreviewJobName(t4);
  }
  static isTransPrevJob(t4) {
    return !!t4 && Ae.isTransPrevJob(t4);
  }
  static isWhitePrevJob(t4) {
    return !!t4 && Ae.isWhitePrevJob(t4);
  }
  static registerBarcode1DEncoder(t4, e2) {
    Mt.registerBarcodeCreator(t4, e2);
  }
  static registerBarcode2DEncoder(t4) {
    be.getInstance().register(t4);
  }
  static loadImageSrc(t4) {
    return Ae.loadImageSrc(t4);
  }
  static loadHtmlImage(t4) {
    return Ae.html2Image(t4);
  }
  static getRawData(t4) {
    return Ge.encodeImageData({ imageData: t4, printerDPI: 203, printerWidth: 384 });
  }
  static setLogLevel(t4) {
    "number" == typeof t4 ? l.setLevel(t4) : "boolean" == typeof t4 && l.setLevel(t4 ? 3 : 0);
  }
  static getResultMessage(t4) {
    return Me.getResultMessage(t4);
  }
  static getPrintableMessage(t4) {
    return Je.getPrintableMessage(t4);
  }
  static test() {
  }
  constructor(t4) {
    this.mJsonMode = false, this.mLineHeight = 0, this.mCurrPosY = 0, this.mJobPage = [], this.mTotalPages = 1, this.mPageIndex = 0, this.mPageList = [];
    const e2 = t4 || {};
    this.mInitInfo = e2, e2.manager || e2.adapter || (e2.adapter = ri.getInstance()), this.setOptions(t4);
  }
  authorize(t4) {
    return this.mPrinter.Manager.authorize(t4);
  }
  init(t4) {
    return this.mPrinter.Manager.authorize(t4);
  }
  setOptions(t4) {
    const e2 = t4 || {}, i2 = this.mPrinter ? this.mPrinter.Manager : void 0;
    e2.manager ? e2.manager !== i2 && (this.DeviceManager = e2.manager) : e2.adapter && !i2 && (this.DeviceManager = ci.create(e2.adapter)), this.mInitInfo = Object.assign(this.mInitInfo, e2), e2.context && this.setDrawContext(e2.context), e2.models && this.setSupportPrefixes(e2.models), this.mJobPrintOptions && e2.resetJob && this.abortJob(), this.mPrinter.setInitOptions(e2), di.setLogLevel("number" == typeof e2.logLevel ? e2.logLevel : e2.showLog);
  }
  getBarcode2DEncoder(t4) {
    return t4 ? be.getEncoder(t4) : void 0;
  }
  setBarcode2DEncoder(t4) {
    return "object" == typeof t4 && be.setEncoder(t4.barcodeType, t4);
  }
  isPreviewMode(t4, e2) {
    if (e2 && e2 > 0) {
      if (1 & e2 || 4096 & e2)
        return false;
      if (2 === e2 || 130 === e2)
        return true;
    }
    const i2 = !!t4.jobName && Ae.isPreviewJobName(t4.jobName);
    return this.Context.isPreviewMode(t4, i2);
  }
  get DeviceManager() {
    return this.mPrinter.Manager;
  }
  set DeviceManager(t4) {
    this.mPrinter ? this.mPrinter.Manager = t4 : this.mPrinter = new ii(t4);
  }
  getContext() {
    if (!this.mContext) {
      let t4 = this.mInitInfo.createContext ? this.mInitInfo.createContext({}) : void 0;
      t4 || (t4 = new Ae({ adjustFontSize: this.mInitInfo.adjustFontSize })), this.setDrawContext(t4);
    }
    return this.mContext;
  }
  get Context() {
    return this.getContext();
  }
  get Printer() {
    return this.mPrinter;
  }
  requestPositioningInfo(t4) {
    return this.mPrinter.requestPositioningInfo(t4);
  }
  setDrawContext(t4) {
    t4 && (this._abortJob(), t4.IsApiMode = true, this.mContext = t4, t4.resetCanvas({ jobWidth: this.mInitInfo.jobWidth, jobHeight: this.mInitInfo.jobHeight }));
  }
  createDrawContext(t4) {
    return this.mInitInfo.createContext ? this.mInitInfo.createContext(t4) : new Ae(Object.assign({ apiMode: true, willReadFrequently: true, adjustFontSize: this.mInitInfo.adjustFontSize }, t4));
  }
  loadImage(t4, e2) {
    return this.Context.loadImage(t4).then((t5) => (e2 && e2(t5), t5));
  }
  loadHtml(t4) {
    return this.Context.loadHtml("string" == typeof t4 ? t4 : t4 ? t4.innerHTML : "");
  }
  setSupportPrefixes(t4) {
    ii.setSupportModels(t4);
  }
  setSupportTrades(t4) {
    ii.trades = Array.isArray(t4) ? t4.join(";") : t4 || "", ii.trades && (ii.trades = ii.trades.toUpperCase());
  }
  openAdapter(t4) {
    return this.mPrinter.Manager.openAdapter(t4);
  }
  startBleDiscovery(e2) {
    return t(this, void 0, void 0, function* () {
      const t4 = e2 || {};
      return l.log(t4, "【LPAPI.startBleDiscovery】options:"), this.mPrinter.startDiscovery(t4);
    });
  }
  startDiscovery(e2) {
    return t(this, void 0, void 0, function* () {
      const t4 = e2 || {};
      return l.log(t4, "【LPAPI.startDiscovery】 options:"), this.mPrinter.startDiscovery(t4);
    });
  }
  stopBleDiscovery() {
    return t(this, void 0, void 0, function* () {
      return this.mPrinter.stopDiscovery();
    });
  }
  stopDiscovery() {
    return t(this, void 0, void 0, function* () {
      return this.mPrinter.stopDiscovery();
    });
  }
  searchPrinter(e2) {
    return t(this, void 0, void 0, function* () {
      const t4 = e2 || {};
      return new Promise((e3) => {
        let i2 = false;
        this.startDiscovery({ timeout: t4.timeout || 0, models: t4.models, deviceFound: (n2) => {
          if ((null == n2 ? void 0 : n2.length) > 0) {
            let s2;
            for (const e4 of n2) {
              if (!t4.name && !t4.deviceId) {
                s2 = e4;
                break;
              }
              if (t4.name && t4.name === e4.name) {
                s2 = e4;
                break;
              }
              if (t4.deviceId && t4.deviceId === e4.deviceId) {
                s2 = e4;
                break;
              }
            }
            s2 && (i2 = true, e3(s2), this.stopDiscovery());
          }
        }, adapterStateChange: (t5) => {
          t5.discovering || i2 || (i2 = true, e3(void 0));
        } }).then((t5) => {
          0 !== t5.statusCode && e3(void 0);
        });
      });
    });
  }
  getPrinters() {
    return this.mPrinter.getPrinters();
  }
  getFoundDevices(t4) {
    return this.mPrinter.getFoundDevices(t4);
  }
  getPrinterInfo() {
    return this.mPrinter.getPrinterInfo();
  }
  getPrinterWidthMM() {
    const t4 = this.mPrinter.getPrinterInfo();
    return t4 && t4.printerWidth > 0 && t4.printerDPI > 0 ? t4.printerWidth / t4.printerDPI * 25.4 : 48;
  }
  isPrinterOpened() {
    return this.mPrinter.IsConnected || false;
  }
  isConnected() {
    return this.mPrinter.IsConnected || false;
  }
  isJobPaused() {
    return this.mPrinter.PrintStatus === Ve.Paused;
  }
  openPrinter(e2) {
    return t(this, void 0, void 0, function* () {
      l.log(e2, "#### 【LPAPI.openPrinter】options:");
      const t4 = "function" == typeof e2 ? e2 : void 0, i2 = "string" == typeof e2 ? e2 : void 0, n2 = !!i2 && ii.isSupportedDevice(i2), s2 = "object" == typeof e2 ? e2 : { name: n2 ? i2 : "", deviceId: n2 ? "" : i2, complete: t4 };
      return !s2.deviceId && s2.id && (s2.deviceId = s2.id), this.mPrinter.openPrinter(s2);
    });
  }
  closePrinter(e2, i2) {
    return t(this, void 0, void 0, function* () {
      const t4 = "number" == typeof e2 ? { delay: e2, callback: i2 } : e2 || {};
      return this.mPrinter.closePrinter(t4);
    });
  }
  stopPrint() {
    this.mPrinter.stopPrint(), this.mPausedPrintInfo && (this.mPausedPrintInfo = void 0);
  }
  isPrintJob() {
    return this.Context.isPrintJob;
  }
  startJob(t4) {
    if (t4 || (t4 = {}), "number" != typeof t4.width && (t4.width = 0), "number" != typeof t4.height && (t4.height = 0), l.log("#### 【startJob】:", t4), t4.context && t4.context !== this.mContext && this.setDrawContext(t4.context), !this.Context)
      return void l.warn("---- 未检测到绘制上下文！");
    if (this.mJobPrintOptions) {
      if (!t4.resetJob || !t4.autoAbort)
        return void l.warn("---- 有未完成的打印任务！");
      this.abortJob();
    }
    if (this.isPrinterOpened()) {
      const e3 = this.mPrinter.getPrinterInfo();
      t4.dpi = e3.printerDPI, t4.printerDpi = e3.printerDPI, t4.printerWidth = e3.printerWidth;
    } else
      t4.dpi || (t4.dpi = this.mPrinter.PrinterDPI), t4.printerDpi || (t4.printerDpi = t4.dpi), t4.printerWidth || (t4.printerWidth = this.mPrinter.PrinterWidth);
    const e2 = t4.action || 0;
    "boolean" != typeof t4.isPreview && (t4.isPreview = this.isPreviewMode(t4, e2)), t4.jobName || (t4.isPreview ? t4.jobName = 130 === e2 ? di.JOB_NAME_TRANS : di.JOB_NAME_PREV : t4.jobName = 1 === e2 ? di.JOB_NAME_RAW_DATA : di.JOB_NAME_PRINT);
    const i2 = "object" == typeof t4.printerInfo ? t4.printerInfo : {};
    i2.name || (i2.name = t4.deviceName || t4.printerName), i2.deviceId || (i2.deviceId = t4.deviceId), i2.printerDPI || (i2.printerDPI = t4.printerDpi), i2.printerWidth || (i2.printerWidth = t4.printerWidth), "boolean" != typeof t4.jsonMode && (t4.height <= 0 ? t4.jsonMode = true : t4.isPreview || this.isPrinterOpened() || !i2.name && !i2.deviceId || t4.action && 1 === t4.action || (t4.jsonMode = true)), this.mJsonMode = "boolean" == typeof t4.jsonMode && t4.jsonMode;
    const n2 = Ae.getMargins(t4);
    return this.mLineHeight = "number" == typeof t4.lineHeight ? t4.lineHeight : 0, this.mLineHeight < 0 && (this.mLineHeight = 0), this.mJobPrintOptions = { jobInfo: Object.assign(Object.assign({}, t4), { jobWidth: t4.width, jobHeight: t4.height }), printerInfo: i2, jobPages: [], jobArguments: t4.jobArguments, onJobCreated: t4.onJobCreated }, this.mJobPage.splice(0), this.mJsonMode ? this.mCurrPosY = n2[0] > 0 ? n2[0] : 0 : (t4.width <= 0 && (t4.width = this.getPrinterWidthMM()), this.mPageList.splice(0), this.mTotalPages = t4.printPages || 0, this.mPageIndex = 0, this.mPageInfo = void 0), this.startPage();
  }
  startPrintJob(e2, i2) {
    return t(this, void 0, void 0, function* () {
      if ("function" == typeof e2.callback && (i2 = e2.callback), "boolean" != typeof e2.isPreview && (e2.isPreview = this.isPreviewMode(e2)), !e2.isPreview) {
        const t5 = yield this.openPrinter({ name: e2.printerName || e2.deviceName, deviceId: e2.deviceId, autoScan: false });
        if (t5.statusCode !== xe.OK)
          return i2 && i2(t5), t5;
      }
      const t4 = this.startJob(e2), n2 = { statusCode: t4 ? xe.OK : xe.ERROR_JOB_CREATE, resultInfo: t4 };
      return i2 && i2(n2), n2;
    });
  }
  _abortJob() {
    this.mPageInfo = void 0, this.mJobPrintOptions = void 0;
  }
  abortJob() {
    l.log("#### 【abortJob】"), this._abortJob();
  }
  toDataURL() {
    return this.Context.CanvasElement.toDataURL();
  }
  nextLine(t4) {
    "number" == typeof t4 && (this.mLineHeight = t4), this.mCurrPosY += this.mLineHeight;
  }
  getPosY() {
    return this.mCurrPosY;
  }
  getCommandDatas() {
  }
  commitJob(e2, i2) {
    return t(this, void 0, void 0, function* () {
      const t4 = "function" == typeof e2 ? { onJobComplete: e2 } : e2 || {};
      "function" != typeof t4.onJobComplete && "function" == typeof i2 && (t4.onJobComplete = i2), l.log("#### 【commitJob - start】options:", t4);
      const n2 = t4.onPageComplete || t4.pageComplete, s2 = t4.onPagePrintComplete || t4.pagePrintComplete, r2 = t4.onJobComplete || t4.jobComplete, a2 = t4.onJobPrintComplete || t4.jobPrintComplete;
      return this.endPage(Object.assign(Object.assign({}, t4), { onPageComplete: (t5) => {
        n2 && n2(t5), r2 && r2(t5);
      }, onPagePrintComplete: (t5) => {
        s2 && s2(t5), a2 && a2(t5);
      } })).then((i3) => {
        const n3 = this.mJobPrintOptions;
        if (this.mJobPrintOptions = void 0, l.log(`$$$$ 【commitJob - end】 statusCode: ${i3.statusCode}`), i3.statusCode === xe.OK) {
          if (this.mJsonMode) {
            if (n3 && n3.jobPages && n3.jobPages.length > 0) {
              const e3 = n3.jobInfo || {};
              let i4;
              const s4 = t4;
              for (const t5 of Object.keys(s4))
                i4 = s4[t5], "function" == typeof i4 ? n3[t5] = i4 : null != i4 && (e3[t5] = i4);
              const r4 = t4.jobArguments ? t4.jobArguments : n3.jobArguments;
              return this.print(Object.assign(Object.assign({}, n3), { jobArguments: r4 }));
            }
            return Me.failResult({ statusCode: xe.ERROR_PARAM, resultInfo: "接口调用错误，未检测到有效的打印参数" });
          }
          const s3 = this.mPageList.map((t5) => t5.printData).filter((t5) => void 0 !== t5), r3 = di.getJobPrintResult(i3, this.mPageList, i3, s3.length > 0 ? s3 : void 0);
          return t4.onJobComplete && t4.onJobComplete(r3), Me.successResult(r3, e2);
        }
        return t4.onJobComplete && t4.onJobComplete(i3), Me.onResult(i3, e2);
      }).catch((i3) => (l.warn("$$$$ 【commitJob - exception】"), t4.onJobComplete && t4.onJobComplete({ statusCode: xe.ERROR_EXCEPTION, resultInfo: i3 }), Me.complete(xe.ERROR_EXCEPTION, i3, e2)));
    });
  }
  startPage() {
    var t4;
    if (l.log("#### 【startPage】"), this.mJsonMode)
      return this.mJobPage.length > 0 && this.endPage({}), {};
    const e2 = null === (t4 = this.mJobPrintOptions) || void 0 === t4 ? void 0 : t4.jobInfo;
    if (!e2)
      return void l.warn("---- 未检测到打印任务相关信息！");
    if (this.mPageInfo)
      return this.mPageInfo;
    const i2 = this.Context, n2 = i2.startJob(Object.assign({}, e2));
    return n2 ? (this.mInitInfo.fontName && i2.setFontName(this.mInitInfo.fontName), this.mInitInfo.fontHeight && i2.setFontHeight(this.mInitInfo.fontHeight), this.mInitInfo.lineWidth && i2.setLineWidth(this.mInitInfo.lineWidth), this.mTotalPages <= this.mPageIndex && (this.mTotalPages = this.mPageIndex + 1), this.mPageResult = void 0, this.mPageInfo = n2) : (e2.onJobComplete && e2.onJobComplete({ statusCode: xe.ERROR_JOB_CANCELED }), e2.onPagePrintComplete && e2.onPagePrintComplete({ statusCode: xe.ERROR_PARAM }), void l.warn(`---- 打印任务创建失败: {width: ${e2.width}, height: ${e2.height}}`));
  }
  endPage(e2) {
    return t(this, void 0, void 0, function* () {
      var t4;
      const i2 = "function" == typeof e2 ? { onPageComplete: e2 } : e2 || {}, n2 = !this.isPrintJob(), s2 = this.mPageInfo, r2 = null === (t4 = this.mJobPrintOptions) || void 0 === t4 ? void 0 : t4.jobInfo;
      l.log(`#### 【endPage】isPreview: ${null == r2 ? void 0 : r2.isPreview}, jsonMode: ${this.mJsonMode}`);
      const a2 = { statusCode: xe.OK, printPages: this.mTotalPages, pageIndex: this.mPageIndex };
      if (this.mJsonMode) {
        const t5 = this.mJobPage || [];
        if (this.mJobPrintOptions && t5.length > 0) {
          const e3 = this.mJobPrintOptions.jobPages || [];
          this.mJobPrintOptions.jobPages || (this.mJobPrintOptions.jobPages = e3), e3.push([...t5]), t5.splice(0);
        } else
          a2.statusCode = xe.ERROR_PARAM;
        return a2;
      }
      if (!s2)
        return this.mJobPrintOptions && this.mPageResult ? Me.successResult(this.mPageResult) : (a2.statusCode = xe.ERROR_OTHER, a2);
      if (!r2)
        return a2.statusCode = xe.ERROR_OTHER, a2;
      i2.orientation || (i2.orientation = this.Context.Orientation);
      const o2 = this.Context.JobInfo;
      return o2 && ("boolean" == typeof i2.antiColor && (o2.antiColor = i2.antiColor), "boolean" == typeof i2.horizontalFlip && (o2.horizontalFlip = i2.horizontalFlip)), this.Context.commitJob().then((t5) => {
        if (this.mPageInfo = void 0, this.mPageIndex++, !t5)
          return a2.statusCode = xe.ERROR_OTHER, a2;
        if (Object.assign(a2, t5), n2)
          return l.info("---- 预览任务处理完毕！"), a2.statusCode = xe.OK, a2;
        {
          const e3 = (r2.jobName || "").toLowerCase(), n3 = t5.imageData;
          if (n3) {
            if (1 === r2.action || e3.startsWith("#!#raw")) {
              const t6 = this.mPrinter.encodeImageData(Object.assign(Object.assign({}, r2), { imageData: n3 }));
              return a2.printData = t6.values, a2;
            }
            {
              if (!this.mPrinter.IsConnected)
                return a2.statusCode = xe.ERROR_DISCONNECTED, a2;
              l.info("---- 开始打印......");
              const t6 = Me.filter(Object.assign(Object.assign({}, r2), i2), (t7, e5) => "function" != typeof e5), e4 = i2.onPageComplete || i2.pageComplete, s3 = i2.onPagePrintComplete || i2.pagePrintComplete;
              return this.printImageData(Object.assign(Object.assign({}, t6), { imageData: n3, onPageComplete: (t7) => {
                t7.errMsg || (t7.errMsg = Me.getResultMessage(t7.statusCode)), e4 && e4(t7);
              }, onPagePrintComplete: (t7) => {
                t7.errMsg || (t7.errMsg = Me.getResultMessage(t7.statusCode)), s3 && s3(t7);
              } })).then((t7) => (a2.statusCode = t7.statusCode, t7.errMsg || (t7.errMsg = Me.getResultMessage(t7.statusCode)), t7.statusCode === xe.OK && t7.printData && (a2.printData = t7.printData[0]), a2));
            }
          }
          return l.warn("---- imageData获取失败！"), a2.statusCode = xe.ERROR_GET_IMAGE_DATA, a2;
        }
      }).then((t5) => (this.mPageInfo = void 0, this.mPageResult = t5, this.mPageList.push(t5), t5));
    });
  }
  setItemHorizontalAlignment(t4) {
    this.Context.setItemHorizontalAlignment(t4);
  }
  setItemVerticalAlignment(t4) {
    this.Context.setItemVerticalAlignment(t4);
  }
  setItemOrientation(t4) {
    this.Context.setItemOrientation(t4);
  }
  drawText(t4) {
    if (l.log(t4, "#### 【drawText】options:"), void 0 === t4.y && (t4.y = this.mCurrPosY), !this.mJsonMode)
      return this.Context.drawText(t4);
    this.mJobPage.push(Object.assign(Object.assign({}, t4), { type: Ie.text }));
  }
  splitText(t4) {
    return l.log("#### 【splitText】:", t4), this.Context ? this.Context.splitText(t4) : (l.warn("---- 未检测到绘制上下文，无法进行文本拆分！"), []);
  }
  measureText(t4) {
    return l.log("#### 【measureText】:", t4), this.Context ? this.Context.measureText(t4) : (l.warn("---- 未检测到绘制上下文，无法进行文本拆分！"), {});
  }
  drawBarcode(t4) {
    return "string" == typeof t4.barcodeType ? this.draw2DBarcode(t4) : this.draw1DBarcode(t4);
  }
  draw1DBarcode(t4) {
    return l.log(t4, `#### 【draw1DBarcode】type[${t4.barcodeType}], options:`), void 0 === t4.y && (t4.y = this.mCurrPosY), this.mJsonMode ? ("number" == typeof t4.type && "number" != typeof t4.barcodeType && (t4.barcodeType = t4.type), this.mJobPage.push(Object.assign(Object.assign({}, t4), { type: Ie.barcode })), true) : this.Context.draw1DBarcode(t4);
  }
  draw2DBarcode(t4) {
    return l.log(t4, `#### 【draw2DBarcode】type[${t4.barcodeType}], options:`), void 0 === t4.y && (t4.y = this.mCurrPosY), this.mJsonMode ? (this.mJobPage.push(Object.assign(Object.assign({}, t4), { type: Ie.qrcode })), true) : this.Context.draw2DBarcode(t4);
  }
  drawQRCode(t4) {
    if (l.log(t4, "#### 【drawQRCode】options:"), void 0 === t4.y && (t4.y = this.mCurrPosY), !this.mJsonMode)
      return this.Context.drawQRCode(t4);
    this.mJobPage.push(Object.assign(Object.assign({}, t4), { type: Ie.qrcode }));
  }
  draw2DQRCode(t4) {
    return this.drawQRCode(t4);
  }
  drawPDF417(t4) {
    if (l.log(t4, "#### 【drawPDF417】options:"), void 0 === t4.y && (t4.y = this.mCurrPosY), !this.mJsonMode)
      return this.Context.drawPDF417(t4);
    this.mJobPage.push(Object.assign(Object.assign({}, t4), { type: Ie.pdf417 }));
  }
  draw2DPdf417(t4) {
    return this.drawPDF417(t4);
  }
  drawDataMatrix(t4) {
    return l.log(t4, "#### 【drawDataMatrix】options:"), void 0 === t4.y && (t4.y = this.mCurrPosY), this.mJsonMode ? (this.mJobPage.push(Object.assign(Object.assign({}, t4), { type: Ie.dataMatrix })), true) : this.Context.drawDataMatrix(t4);
  }
  draw2DDataMatrix(t4) {
    return this.drawDataMatrix(t4);
  }
  drawRectangle(t4) {
    return l.log(t4, "#### 【drawRectangle】options:"), void 0 === t4.y && (t4.y = this.mCurrPosY), this.mJsonMode ? (this.mJobPage.push(Object.assign(Object.assign({}, t4), { type: Ie.rect })), true) : t4.cornerWidth || t4.cornerHeight ? this.Context.drawRoundRect(t4) : this.Context.drawRect(t4);
  }
  drawRect(t4) {
    return this.drawRectangle(t4);
  }
  drawEllipse(t4) {
    if (l.log(t4, "#### 【drawEllipse】options:"), void 0 === t4.y && (t4.y = this.mCurrPosY), !this.mJsonMode)
      return this.Context.drawEllipse(t4);
    this.mJobPage.push(Object.assign(Object.assign({}, t4), { type: Ie.ellipse }));
  }
  drawCircle(t4) {
    if (l.log(t4, "#### 【drawCircle】options:"), void 0 === t4.y && (t4.y = this.mCurrPosY), !this.mJsonMode)
      return this.Context.drawCircle(t4);
    this.mJobPage.push(Object.assign(Object.assign({}, t4), { type: Ie.circle }));
  }
  drawLine(t4) {
    if (l.log(t4, "#### 【drawLine】options:"), "number" != typeof t4.y1 && "number" != typeof t4.y2 && (t4.y1 = t4.y2 = this.mCurrPosY), !this.mJsonMode)
      return this.Context.drawLine(t4);
    this.mJobPage.push(Object.assign(Object.assign({}, t4), { type: Ie.line }));
  }
  drawImage(t4) {
    return l.log(t4, "#### 【drawImage】options:"), void 0 === t4.y && (t4.y = this.mCurrPosY), this.mJsonMode ? (this.mJobPage.push(Object.assign(Object.assign({}, t4), { type: Ie.image })), true) : this.Context.drawImage(t4);
  }
  drawImageAsync(e2) {
    return t(this, void 0, void 0, function* () {
      if (this.mJsonMode || "string" != typeof e2.image)
        return this.drawImage(e2);
      {
        const t4 = "number" == typeof e2.y ? e2.y : this.mCurrPosY;
        return this.Context.loadImage(Object.assign(Object.assign({}, e2), { src: e2.image })).then((i2) => this.drawImage(Object.assign(Object.assign({}, e2), { y: t4, image: i2 })));
      }
    });
  }
  drawImagePath(t4) {
    const e2 = t4;
    return "string" == typeof e2.src && (e2.image = e2.src), this.drawImageAsync(t4);
  }
  drawTable(t4) {
    l.log(t4, "#### 【drawTable】options:"), void 0 === t4.y && (t4.y = this.mCurrPosY);
    const e2 = t4;
    if (("number" == typeof t4.height && t4.height > 0 ? t4.height : 0) <= 0) {
      const i2 = t4.columnCount || t4.columns || e2.cols || 0;
      if (!t4.tableRows) {
        if (Array.isArray(t4.rows))
          t4.tableRows = t4.rows;
        else if (t4.cells && i2 > 0) {
          t4.tableRows = [];
          for (let e3 = 0; e3 < t4.cells.length; e3 += i2)
            t4.tableRows.push(t4.cells.slice(e3, e3 + i2));
        }
      }
      if (t4.tableRows) {
        let i3 = t4.rowCount || ("number" == typeof t4.rows ? t4.rows : 0);
        if (("number" != typeof i3 || i3 <= 0) && (i3 = t4.tableRows.length), t4.rowHeights && Array.isArray(t4.rowHeights) || ("number" == typeof t4.rowHeights && t4.rowHeights > 0 ? t4.rowHeights = [t4.rowHeights] : "number" == typeof e2.rowHeight && e2.rowHeight > 0 && (t4.rowHeights = [e2.rowHeight])), t4.rowHeights && Array.isArray(t4.rowHeights) && t4.rowHeights.length > 0) {
          const e3 = t4.rowHeights.length;
          if (e3 < i3) {
            const n2 = t4.rowHeights[e3 - 1];
            t4.rowHeights = t4.rowHeights.concat(Array(i3 - e3).fill(n2));
          }
          t4.height = t4.rowHeights.reduce((t5, e4) => t5 + e4, 0);
        }
      }
    }
    return this.mJsonMode ? (this.mJobPage.push(Object.assign(Object.assign({}, t4), { type: Ie.table })), true) : this.Context.drawTable(t4);
  }
  printImage(t4) {
    return this.openPrinter({ name: t4.printerName || t4.deviceName || t4.name, deviceId: t4.deviceId, autoScan: t4.autoScan }).then((e2) => e2.statusCode !== xe.OK ? e2 : ("string" == typeof t4.image && (t4.src = t4.image, t4.image = void 0), Promise.resolve(t4.image || this.Context.loadImage(Object.assign(Object.assign({}, t4), { src: t4.src || "" }))).then((e3) => {
      if (!e3)
        return Me.setFailResult({ statusCode: xe.ERROR_PARAM });
      const i2 = !(t4.width && t4.height), n2 = i2 ? e3.width : t4.width, s2 = i2 ? e3.height : t4.height;
      if (!n2 && !s2)
        return Me.setFailResult({ statusCode: xe.ERROR_PARAM });
      const r2 = this.startJob({ width: n2, height: s2, orientation: t4.orientation, scaleUnit: i2 ? u.Pix : u.MM });
      return r2 ? Promise.resolve("function" != typeof t4.onJobCreated || t4.onJobCreated(r2)).then(() => (this.drawImage({ image: e3, width: n2, height: s2, sx: t4.sx, sy: t4.sy, swidth: t4.swidth, sheight: t4.sheight }), this.commitJob(Me.filter_NoFuncAndNone(t4)))) : Me.setFailResult({ statusCode: xe.ERROR_JOB_CREATE });
    }))).then((e2) => e2.statusCode !== xe.OK ? Me.setFailResult(e2, t4) : Me.setSuccessResult(e2, t4));
  }
  pushImageData(t4) {
    const e2 = t4 || {};
    return t4.imageData || t4.data ? ("boolean" != typeof e2.enableSuperBitmap && (this.mInitInfo.enableSuperBitmap, 1) && (e2.enableSuperBitmap = this.mInitInfo.enableSuperBitmap), this.mPrinter.pushImageData(Object.assign(Object.assign({}, e2), { onJobComplete: (e3) => {
      e3.statusCode === xe.OK ? Me.setSuccessResult(e3, t4) : Me.setFailResult(e3, t4);
    } }))) : { statusCode: xe.ERROR_PARAM };
  }
  printImageData(t4) {
    l.log("#### 【printImageData】options:");
    const e2 = t4 || {};
    return "boolean" != typeof e2.enableSuperBitmap && "boolean" == typeof this.mInitInfo.enableSuperBitmap && (e2.enableSuperBitmap = this.mInitInfo.enableSuperBitmap), this.mPrinter.printImageData(e2).then((e3) => e3.statusCode === xe.OK ? (l.info("#### 【printImageData.resp】打印成功！ "), Me.successResult(e3, t4)) : (l.warn(`#### 【printImageData.resp】打印失败, statusCode: ${e3.statusCode}, printable: ${this.mPrinter.Printable}`), Me.failResult(e3, t4)));
  }
  printRawData(t4) {
    l.log("#### 【printRawData】options:");
    const e2 = t4 || {};
    if ((!e2.rawData || e2.rawData.length <= 0) && e2.data && e2.data.length > 0) {
      let i2 = e2.data.filter((t5) => Array.isArray(t5));
      const n2 = e2.data.filter((t5) => "string" == typeof t5 || t5 instanceof Uint8Array);
      if (i2.length <= 0 && n2.length > 0 && (i2 = [n2]), i2.length > 0) {
        const n3 = [];
        for (const t5 of i2) {
          const i3 = t5.map((t6) => "string" == typeof t6 ? "base64" === e2.dataType ? Me.base64ToArrayBuffer(t6) : Me.hex16ToArrayBuffer(t6) : t6 instanceof Uint8Array ? t6 : null), s2 = i3.filter((t6) => t6 && t6.length > 0);
          n3.push(s2);
        }
        n3.length > 0 && (t4.rawData = n3);
      }
    }
    return e2.rawData && e2.rawData.length > 0 && e2.rawData.filter((t5) => Array.isArray(t5)).length <= 0 && e2.rawData.filter((t5) => t5 instanceof Uint8Array).length > 0 && (e2.rawData = [e2.rawData]), this.mPrinter.printRawData(e2).then((e3) => e3.statusCode === xe.OK ? (l.info("#### 【printImageData.resp】打印成功！ "), Me.successResult(e3, t4)) : (l.warn(`#### 【printRawData.resp】打印失败, statusCode: ${e3.statusCode}, printable: ${this.mPrinter.Printable}`), Me.failResult(e3, t4)));
  }
  writeCommands(t4) {
    return this.mPrinter.writeCommands(t4);
  }
  encodeImageData(t4) {
    return this.mPrinter.encodeImageData(t4);
  }
  static getJobPrintResult(t4, e2, i2, n2) {
    const s2 = e2.map((t5) => t5.dataUrl || ""), r2 = Object.assign(Object.assign({}, i2), { statusCode: t4.statusCode, errMsg: t4.errMsg || Me.getResultMessage(t4.statusCode), printable: t4.printable, previewData: s2, pages: e2.slice(0), printData: n2, pageKey: t4.pageKey });
    return r2.resultInfo = r2, r2;
  }
  validateJsonPrintOptions(t4) {
    const e2 = t4.parser;
    if (t4.content && e2 && "function" == typeof e2.isSupported && e2.isSupported(t4.content)) {
      const i3 = e2.parse(t4.content);
      i3 && i3.jobInfo && (i3.jobPage || i3.jobPages) && delete (t4 = Object.assign(Object.assign({}, i3), t4)).content;
    }
    let i2;
    if (t4.jobPages && t4.jobPages.length > 0 ? Array.isArray(t4.jobPages[0]) || (t4.jobPages = [t4.jobPages]) : t4.jobPage && t4.jobPage.length > 0 && Array.isArray(t4.jobPage[0]) && (t4.jobPages = t4.jobPage, delete t4.jobPage), t4.content)
      try {
        t4.content = t4.content.replace(/[\r\n\t]/g, "");
        const e3 = JSON.parse(t4.content);
        oi.isWdfxJob(e3) ? t4.wdfData = e3 : "object" != typeof e3 || Array.isArray(e3) || (i2 = e3), delete t4.content;
      } catch (t5) {
        l.warn("---- content 格式异常，解析失败！"), l.warn(t5);
      }
    return t4.wdfData && (i2 = oi.updateWdfOptions(t4.wdfData, t4.domParser, t4.wdfConfig), delete t4.wdfData), i2 && ("object" == typeof i2.jobInfo && (t4.jobInfo = Object.assign(Object.assign({}, i2.jobInfo), t4.jobInfo || {})), i2.jobPages && i2.jobPages.length > 0 ? Array.isArray(i2.jobPages[0]) || (i2.jobPages = [i2.jobPages]) : i2.jobPage && i2.jobPage.length > 0 && Array.isArray(i2.jobPage[0]) && (i2.jobPages = i2.jobPage, delete i2.jobPage), i2.jobPages && i2.jobPages.length > 0 ? t4.jobPages && t4.jobPages.length > 0 ? t4.jobPages = [...i2.jobPages, ...t4.jobPages] : t4.jobPage && t4.jobPage.length > 0 ? (t4.jobPages = [...i2.jobPages, t4.jobPage], delete t4.jobPage) : t4.jobPages = [...i2.jobPages] : i2.jobPage && i2.jobPage.length > 0 && (t4.jobPages && t4.jobPages.length > 0 ? t4.jobPages = [i2.jobPage, ...t4.jobPages] : t4.jobPage && t4.jobPage.length > 0 ? (t4.jobPages = [[...i2.jobPage, ...t4.jobPage]], delete t4.jobPage) : t4.jobPages = [i2.jobPage]), !t4.jobArguments && i2.jobArguments && (t4.jobArguments = i2.jobArguments)), t4.jobPage && t4.jobPage.length > 0 && (!t4.jobPages || t4.jobPages.length <= 0) && (t4.jobPages = [t4.jobPage], delete t4.jobPage), t4;
  }
  print(e2) {
    return t(this, void 0, void 0, function* () {
      const t4 = "function" == typeof e2 ? e2() : e2;
      l.log(t4, "#### 【print】options:");
      const i2 = t4.printerInfo || {};
      this.mPausedPrintInfo && (t4.continueJob || this.mPrinter.PrintStatus !== Ve.Paused || this.mPrinter.stopPrint(), this.mPausedPrintInfo = void 0), this.validateJsonPrintOptions(t4);
      const n2 = t4.jobPages || [];
      if (!t4.jobInfo || n2.length <= 0) {
        const e3 = Me.getResultMessage(xe.ERROR_PARAM), i3 = { statusCode: xe.ERROR_PARAM, resultInfo: e3, errMsg: e3 };
        return t4.onJobComplete && t4.onJobComplete(i3), Me.failResult(i3);
      }
      const s2 = t4.jobInfo, r2 = t4.action || 0;
      "boolean" != typeof s2.isPreview && (s2.isPreview = this.isPreviewMode(t4.jobInfo, r2));
      const a2 = s2.isPreview;
      1 & r2 ? s2.jobName = di.JOB_NAME_RAW_DATA : 4096 & r2 ? s2.jobName || (s2.jobName = di.JOB_NAME_PRINT) : 2 === r2 ? s2.jobName = di.JOB_NAME_PREV : 130 === r2 && (s2.jobName = di.JOB_NAME_TRANS), yield this.Context.autoLoadImage(t4);
      const o2 = t4.jobInfo;
      if (s2.jobWidth || ("number" == typeof o2.width && o2.width > 0 ? s2.jobWidth = o2.width : o2.labelWidth && (s2.jobWidth = 1 * o2.labelWidth)), s2.jobHeight || ("number" == typeof o2.height && o2.height > 0 ? s2.jobHeight = o2.height : o2.labelHeight && (s2.jobHeight = 1 * o2.labelHeight)), "number" != typeof s2.orientation && ("number" == typeof o2.printOrientation ? s2.orientation = o2.printOrientation : o2.printOrientation && (s2.orientation = 1 * o2.printOrientation)), !a2) {
        const e3 = yield this.openPrinter(Object.assign(Object.assign({}, i2), { name: i2.name || i2.printerName, autoScan: false }));
        if (e3.statusCode !== xe.OK)
          return t4.onJobComplete && t4.onJobComplete(e3), Me.failResult(e3);
        i2.printerDPI = this.mPrinter.PrinterDPI, i2.printerWidth = this.mPrinter.PrinterWidth;
      }
      s2.context && s2.context !== this.mContext && this.setDrawContext(s2.context);
      const h2 = t4.onJobCreated || t4.jobCreated || t4.jobStarted;
      if (h2) {
        if ("number" != typeof s2.jobHeight || s2.jobHeight <= 0) {
          const e4 = t4.jobPages || [], i3 = Ae.getMargins(s2);
          s2.jobHeight = Ae.calcPageHeight(e4[0], i3[2]);
        }
        const e3 = this.startJob({ width: s2.jobWidth || 0, height: s2.jobHeight, orientation: s2.orientation, jobName: s2.jobName });
        if (this.abortJob(), !e3) {
          const e4 = { statusCode: xe.ERROR_JOB_CREATE };
          return t4.onJobComplete && t4.onJobComplete(e4), Me.failResult(e4);
        }
        yield Promise.resolve(h2(e3, t4));
      }
      return new Promise((e3) => {
        const i3 = [], n3 = [];
        t4.syncMode ? this.Context.drawJob(Me.filterAndAssign(t4, { onPageComplete: (o3) => {
          l.log(`#### drawJob.onPageComplete: pages = [${o3.pageIndex + 1} / ${o3.printPages}], copies = [${o3.copyIndex + 1} / ${o3.printCopies}]`);
          let h3 = o3.copyIndex;
          const c2 = t4.onPageCreated || t4.pageCreated, d2 = t4.onPageComplete || t4.pageComplete, u2 = t4.onJobComplete || t4.jobComplete, g2 = t4.onPagePrintComplete || t4.pagePrintComplete, p2 = t4.onJobPrintComplete || t4.jobPrintComplete;
          if ("function" == typeof c2 && c2(o3), 1 === r2) {
            const t5 = o3.imageData;
            if (t5) {
              delete o3.imageData;
              const e4 = this.mPrinter.encodeImageData(Object.assign(Object.assign({}, s2), { imageData: t5 }));
              n3.push(e4.values);
            }
            if (d2 && d2(Object.assign(Object.assign({}, o3), { statusCode: xe.OK, pageKey: 0 })), o3.isEndCopy && o3.isEndPage) {
              const t6 = di.getJobPrintResult({ statusCode: xe.OK }, i3, o3);
              u2 && u2(t6), e3(t6);
            }
            return xe.OK;
          }
          if (a2) {
            if (i3.push(o3), d2 && d2(Object.assign(Object.assign({}, o3), { statusCode: xe.OK, pageKey: 0 })), o3.isEndCopy && o3.isEndPage) {
              const t5 = di.getJobPrintResult({ statusCode: xe.OK }, i3, o3);
              u2 && u2(t5), e3(t5);
            }
            return xe.OK;
          }
          return this.pushImageData(Object.assign(Object.assign({}, s2), { printCopies: s2.autoPage ? 0 : s2.printCopies, imageData: o3.imageData, onPageComplete: (t5) => {
            h3 = s2.autoPage ? o3.copyIndex : t5.copyIndex;
            const e4 = Object.assign(Object.assign({}, o3), { pageKey: t5.pageKey, statusCode: t5.statusCode, errMsg: t5.errMsg || Me.getResultMessage(t5.statusCode), printable: t5.printable, copyIndex: h3, isEndCopy: s2.autoPage ? o3.isEndCopy : h3 + 1 >= o3.printCopies });
            i3.push(e4), d2 && d2(e4);
          }, onPagePrintComplete: (t5) => {
            h3 = s2.autoPage ? o3.copyIndex : t5.copyIndex, g2 && g2(Object.assign(Object.assign({}, o3), { pageKey: t5.pageKey, statusCode: t5.statusCode, errMsg: t5.errMsg || Me.getResultMessage(t5.statusCode), printable: t5.printable, copyIndex: h3, isEndCopy: s2.autoPage ? o3.isEndCopy : h3 + 1 >= o3.printCopies }));
            const e4 = o3.isEndCopy && o3.isEndPage && h3 + 1 >= o3.printCopies;
            (t5.statusCode !== xe.OK || e4) && p2 && p2(Object.assign(Object.assign({}, t5), { statusCode: xe.OK, errMsg: t5.errMsg || Me.getResultMessage(t5.statusCode), printable: t5.printable }));
          }, onJobComplete: (s3) => {
            if (s3.statusCode !== xe.OK) {
              if (s3.statusCode === xe.ERROR_PRINTER_NOT_AVAILABLE) {
                const e4 = t4.jobInfo || {};
                this.mPausedPrintInfo = { printInfo: t4, autoPage: e4.autoPage, printPages: o3.printPages, printCopies: o3.printCopies, pageIndex: o3.pageIndex, copyIndex: o3.copyIndex }, l.warn(`打印机异常 [printable = ${s3.printable}] at drawJob.onJobComplete`);
              }
              const n4 = di.getJobPrintResult(s3, i3, o3);
              u2 && u2(n4), e3(n4);
            } else {
              const t5 = di.getJobPrintResult(s3, i3, o3, n3);
              o3.isEndCopy && o3.isEndPage && (h3 + 1 >= o3.printCopies && u2 && u2(t5), e3(t5));
            }
          } })).statusCode;
        } })) : this.Context.drawAsyncJob(Me.filterAndAssign(t4, { onPageComplete: (o3) => {
          let h3 = o3.copyIndex;
          l.log(`#### drawAsyncJob.onPageComplete: pages = [${o3.pageIndex + 1} / ${o3.printPages}], copies = [${o3.copyIndex + 1} / ${o3.printCopies}]`);
          const c2 = t4.onPageCreated || t4.pageCreated, d2 = t4.onPageComplete || t4.pageComplete, u2 = t4.onJobComplete || t4.jobComplete, g2 = t4.onPagePrintComplete || t4.pagePrintComplete, p2 = t4.onJobPrintComplete || t4.jobPrintComplete;
          if ("function" == typeof c2 && c2(o3), 1 === r2) {
            const t5 = o3.imageData;
            if (t5) {
              const e4 = this.mPrinter.encodeImageData(Object.assign(Object.assign({}, s2), { imageData: t5, valueType: ze.Hex16 }));
              n3.push(e4.values);
            }
            if (d2 && d2(Object.assign(Object.assign({}, o3), { statusCode: xe.OK, pageKey: 0 })), o3.isEndCopy && o3.isEndPage) {
              const t6 = di.getJobPrintResult({ statusCode: xe.OK }, i3, o3);
              u2 && u2(t6), e3(t6);
            }
            return xe.OK;
          }
          if (a2) {
            if (i3.push(o3), d2 && d2(Object.assign(Object.assign({}, o3), { statusCode: xe.OK, pageKey: 0 })), o3.isEndCopy && o3.isEndPage) {
              const t5 = di.getJobPrintResult({ statusCode: xe.OK }, i3, o3);
              u2 && u2(t5), e3(t5);
            }
            return xe.OK;
          }
          {
            const r3 = o3.imageData;
            return o3.imageData = void 0, this.printImageData(Object.assign(Object.assign({}, s2), { printCopies: s2.autoPage ? 0 : o3.printCopies, imageData: r3, onPageComplete: (t5) => {
              h3 = s2.autoPage ? o3.copyIndex : t5.copyIndex;
              const e4 = Object.assign(Object.assign({}, o3), { statusCode: t5.statusCode, errMsg: t5.errMsg || Me.getResultMessage(t5.statusCode), printable: t5.printable, pageKey: t5.pageKey, copyIndex: h3, isEndCopy: s2.autoPage ? o3.isEndCopy : h3 + 1 >= o3.printCopies });
              i3.push(e4), d2 && d2(e4);
            }, onPagePrintComplete: (t5) => {
              h3 = s2.autoPage ? o3.copyIndex : t5.copyIndex, g2 && g2(Object.assign(Object.assign({}, o3), { statusCode: t5.statusCode, errMsg: t5.errMsg || Me.getResultMessage(t5.statusCode), printable: t5.printable, pageKey: t5.pageKey, copyIndex: h3, isEndCopy: s2.autoPage ? o3.isEndCopy : h3 + 1 >= o3.printCopies }));
              const e4 = o3.isEndCopy && o3.isEndPage && h3 + 1 >= o3.printCopies;
              (t5.statusCode !== xe.OK || e4) && p2 && p2(Object.assign(Object.assign({}, t5), { statusCode: t5.statusCode, errMsg: t5.errMsg || Me.getResultMessage(t5.statusCode), printable: t5.printable }));
            }, onJobComplete: (s3) => {
              if (s3.statusCode !== xe.OK) {
                if (s3.statusCode === xe.ERROR_PRINTER_NOT_AVAILABLE) {
                  const e4 = t4.jobInfo || {};
                  this.mPausedPrintInfo = { printInfo: t4, autoPage: e4.autoPage, printPages: o3.printPages, printCopies: o3.printCopies, pageIndex: o3.pageIndex, copyIndex: o3.copyIndex }, l.warn(`打印机异常 [printable = ${s3.printable}] at drawAsyncJob.onJobComplete`);
                }
                const n4 = di.getJobPrintResult(s3, i3, o3);
                u2 && u2(n4), e3(n4);
              } else {
                const t5 = di.getJobPrintResult(s3, i3, o3, n3);
                o3.isEndCopy && o3.isEndPage && (h3 + 1 >= o3.printCopies && u2 && u2(t5), e3(t5));
              }
            } })).then((t5) => t5.statusCode);
          }
        } }));
      });
    });
  }
  continuePrint() {
    return t(this, void 0, void 0, function* () {
      const t4 = this.mPausedPrintInfo;
      if (yield this.mPrinter.continuePrint(), !t4 || !t4.printInfo.jobInfo)
        return true;
      const e2 = t4.printInfo, i2 = e2.jobInfo, n2 = t4.pageIndex, s2 = t4.copyIndex, r2 = t4.printPages, a2 = t4.printCopies, o2 = a2 - s2 - 1;
      if (t4.autoPage) {
        const t5 = r2 - n2 - 1;
        if (t5 > 0 && t5 < r2) {
          if ((yield this.print(Object.assign(Object.assign({}, e2), { continueJob: true, jobInfo: Object.assign(Object.assign({}, i2), { autoPage: true, startCopy: s2, printCopies: 1, remainCopies: o2, startPage: n2 + 1, printPages: t5 }) }))).statusCode !== xe.OK)
            return false;
        }
        if (a2 > s2 + 1) {
          return (yield this.print(Object.assign(Object.assign({}, e2), { continueJob: true, jobInfo: Object.assign(Object.assign({}, i2), { autoPage: true, startCopy: s2 + 1, printCopies: o2, remainCopies: 0, startPage: 0, printPages: r2 }) }))).statusCode === xe.OK;
        }
      } else if (r2 > n2 + 1) {
        return (yield this.print(Object.assign(Object.assign({}, e2), { continueJob: true, jobInfo: Object.assign(Object.assign({}, i2), { printCopies: a2, startPage: n2 + 1, printPages: r2 - n2 - 1 }) }))).statusCode === xe.OK;
      }
      return true;
    });
  }
  printWdfx(e2) {
    return t(this, void 0, void 0, function* () {
      if (l.log("#### 【printWdfx】options:"), !e2.content || "string" != typeof e2.content)
        return l.warn("---- 未检测到 wdfx 字符串！"), l.warn(e2.content), Me.failResult({ statusCode: xe.ERROR_PARAM });
      const t4 = oi.loadWdfxContent(e2.content, e2.domParser);
      return t4 ? this.print(Object.assign(Object.assign({}, e2), { wdfData: t4, content: void 0 })) : (l.warn("---- wdfx内容解析错误, content:"), l.warn(e2.content.length > 200 ? `${e2.content.substring(0, 200)}...` : e2.content), Me.failResult({ statusCode: xe.ERROR_DATA_PARSE }));
    });
  }
  loadWdfxInfo(t4) {
    const e2 = "string" == typeof t4 ? { content: t4 } : t4, i2 = "string" == typeof e2.content ? e2.content : "";
    let n2 = "object" == typeof e2.wdfData ? e2.wdfData : void 0;
    if (e2.content || n2)
      return !n2 && i2 && (n2 = oi.loadWdfxContent(i2, e2.domParser)), n2 ? this.validateJsonPrintOptions(Object.assign(Object.assign({}, e2), { content: void 0, wdfData: n2 })) : (l.warn("---- wdfx内容解析错误, content:"), void l.warn(i2.length > 200 ? `${i2.substring(0, 200)}...` : i2));
    l.warn("---- 未检测到 wdfx 字符串！", t4);
  }
  renderToElement(t4) {
    try {
      const e2 = "string" == typeof t4.element ? document.getElementById(t4.element) : t4.element;
      if (!e2)
        return void l.warn("---- 未检测到标签渲染的目标位置");
      this.validateJsonPrintOptions(t4);
      const i2 = t4.jobPages || [];
      if (!t4.jobInfo || i2.length <= 0)
        return void l.warn("---- 参数异常：", t4);
      const n2 = new Ee({ data: t4, radius: 0.8, margin: [] });
      return n2.attachTo({ element: e2, position: "absolute", styles: t4.styles, adjustFontSize: this.mInitInfo.adjustFontSize }), n2;
    } catch (t5) {
      return void l.warn("【Exception】renderToElement: ", t5);
    }
  }
  renderWdfxToElement(t4) {
    l.log("#### 【renderWdfxToElement】options:");
    const e2 = "string" == typeof t4.content ? t4.content : "";
    if (t4.content || t4.wdfData)
      return !t4.wdfData && e2 && (t4.wdfData = oi.loadWdfxContent(e2, t4.domParser)), t4.wdfData ? this.renderToElement(Object.assign(Object.assign({}, t4), { wdfData: t4.wdfData, content: void 0 })) : (l.warn("---- wdfx内容解析错误, content:"), void l.warn(e2.length > 200 ? `${e2.substring(0, 200)}...` : t4.content));
    l.warn("---- 未检测到 wdfx 字符串！", t4);
  }
  quit() {
    return this.closePrinter().then(() => (this.mInitInfo.onQuit && this.mInitInfo.onQuit(), this.stopPrint(), this.abortJob(), this.mPausedPrintInfo = void 0, this.mContext = void 0, this.mPrinter.quit(), true));
  }
}
di.JOB_NAME_TRANS = "#!#transparent#!#", di.JOB_NAME_PREV = "#!#preview#!#", di.JOB_NAME_PRINT = "LPAPI", di.JOB_NAME_RAW_DATA = "#!#RawData#!#", di.COLOR_WHITE = "#fff";
class BleAdapter {
  static getInstance() {
    return this._instance || (this._instance = new BleAdapter());
  }
  constructor(options) {
    this.mConnectStatusMap = /* @__PURE__ */ new Map();
    this.mBleCharacterValueChangedMap = /* @__PURE__ */ new Map();
    this.mBleConnectionStateChangeMap = /* @__PURE__ */ new Map();
    this.mContext = options || {};
    l.log(`==== 【BleAdapter】constructor(options) ====`, this.mContext);
    this.mContext.isWeiXin = true;
    if (typeof common_vendor.index.getDeviceInfo === "function") {
      this.mDeviceInfo = common_vendor.index.getDeviceInfo();
      l.log(`---- deviceInfo:`, this.mDeviceInfo);
    }
    if (typeof common_vendor.index.getSystemInfo === "function") {
      common_vendor.index.getSystemInfo({
        success: (res) => {
          this.mSystemInfo = res;
          l.log(`---- mSystemInfo: `, res);
        }
      });
    }
  }
  get isH5() {
    return this.mContext.isH5;
  }
  get Context() {
    return this.mContext;
  }
  get platform() {
    var _a, _b, _c;
    return ((_a = this.mDeviceInfo) === null || _a === void 0 ? void 0 : _a.platform) || ((_b = this.mSystemInfo) === null || _b === void 0 ? void 0 : _b.osName) || ((_c = this.mSystemInfo) === null || _c === void 0 ? void 0 : _c.platform) || "";
  }
  isAndroid() {
    return this.platform.toLowerCase() === "android";
  }
  isHarmonyOS() {
    const osName = this.platform;
    return osName === "ohos" || osName.toLowerCase().indexOf("harmony") >= 0;
  }
  getDeviceInfo() {
    return this.mDeviceInfo;
  }
  androidAPILevel() {
    if (this.isAndroid() && this.mContext.isAppPlus) {
      const apiLevel = this.mSystemInfo ? this.mSystemInfo.osAndroidAPILevel : 0;
      if (typeof apiLevel === "number" && apiLevel > 0) {
        return apiLevel;
      } else {
        const Build = plus.android.importClass("android.os.Build");
        const version = Build ? Build.VERSION.SDK_INT : 0;
        return typeof version === "number" ? version : 0;
      }
    } else {
      return 0;
    }
  }
  requestPermissions() {
    return new Promise((resolve) => {
      const sdkVersion = this.androidAPILevel();
      if (sdkVersion >= 23) {
        const permissions = [];
        if (sdkVersion >= 31) {
          permissions.push("android.permission.BLUETOOTH_SCAN");
          permissions.push("android.permission.BLUETOOTH_CONNECT");
        }
        if (sdkVersion >= 29) {
          permissions.push("android.permission.ACCESS_FINE_LOCATION");
        } else {
          permissions.push("android.permission.ACCESS_COARSE_LOCATION");
        }
        l.log(`#### 【Request】plus.android.requestPermissions, sdkVersion = ${sdkVersion}`);
        plus.android.requestPermissions(permissions, (res) => {
          l.log(res, `#### 【Response.success】plus.android.requestPermissions:`);
          resolve(true);
        }, (res) => {
          l.warn(res, `#### 【Response.error】plus.android.requestPermissions:`);
          resolve(false);
        });
      } else {
        resolve(true);
      }
    });
  }
  /**
   * 蓝牙授权认证。
   */
  authorize(options) {
    l.log(`【BleAdapter】authorize(options)`, options, this.mContext);
    if (this.mContext.isAppPlus) {
      return this.requestPermissions().then((result) => {
        if (result) {
          return Me.success(true, options);
        } else {
          return Me.complete(xe.ERROR_AUTH_FAILED, "蓝牙权限申请失败！", options, void 0);
        }
      });
    } else if (this.mContext.isH5) {
      return Promise.resolve(Me.success(true, options));
    } else if (this.mContext.isAlipay) {
      return Promise.resolve(Me.success(true, options));
    }
    return new Promise((resolve) => {
      try {
        if (typeof common_vendor.index.getSetting !== "function" || typeof common_vendor.index.authorize !== "function") {
          Me.success("不支持蓝牙认证相关接口！", options, resolve);
          return;
        }
        l.info("####【Request】getSetting");
        common_vendor.index.getSetting({
          success: (res) => {
            l.info(`####【Response.success】getSetting`, JSON.stringify(res));
            const authSetting = res.authSetting;
            if (authSetting["scope.bluetooth"] || authSetting["bluetooth"]) {
              Me.success("蓝牙权限已授权", options, resolve);
            } else {
              l.info(`【Request】authorize:`);
              common_vendor.index.authorize({
                scope: "scope.bluetooth",
                success: (res2) => {
                  l.info(`#### 【Response.success】authorize：蓝牙权限授权成功！`, res2);
                  Me.success("蓝牙权限授权成功！", options, resolve);
                },
                fail: (res2) => {
                  l.warn(`#### 【Response.fail】authorize：蓝牙权限授权失败！`, JSON.stringify(res2));
                  common_vendor.index.showModal({
                    title: "蓝牙权限未授权",
                    content: "请前往设置界面开启蓝牙权限",
                    confirmText: "去设置",
                    cancelText: "取消",
                    showCancel: true,
                    success: (modalRes) => {
                      if (modalRes.confirm) {
                        l.info(`#### 【Response.success】用户点击了去设置按钮！`, modalRes);
                        common_vendor.index.openSetting({
                          success: (settingRes) => {
                            if (settingRes.authSetting["scope.bluetooth"]) {
                              l.info(`#### 【Response.success】蓝牙权限已授权！`, settingRes);
                              Me.success("蓝牙权限已授权", options, resolve);
                            } else {
                              l.warn(`#### 【Response.success】蓝牙权限仍未授权！`, settingRes);
                              Me.complete(xe.ERROR_AUTH_FAILED, "蓝牙权限仍未授权", options, resolve);
                            }
                          },
                          fail: (settingRes) => {
                            l.warn(`#### 【Response.fail】openSetting, 权限设置界面打开失败！`, settingRes);
                            Me.complete(xe.ERROR_AUTH_FAILED, "权限设置界面打开失败", options, resolve);
                          }
                        });
                      } else {
                        l.warn(`---- 用户点击了取消按钮！`, modalRes);
                        Me.complete(xe.ERROR_AUTH_FAILED, "用户取消了蓝牙权限设置", options, resolve);
                      }
                    },
                    fail: (modalRes) => {
                      l.warn(`#### 【Response.fail】showModal:`, modalRes);
                      Me.complete(xe.ERROR_AUTH_FAILED, "蓝牙权限设置弹窗打开失败", options, resolve);
                    }
                  });
                }
              });
            }
          },
          fail: (res) => {
            l.warn(`#### 【Response.fail】蓝牙权限获取失败！`, res);
            Me.complete(xe.ERROR_AUTH_FAILED, res, options, resolve);
          }
        });
      } catch (error) {
        l.warn(`#### 【Response.error】蓝牙权限获取异常！`, error);
        Me.complete(xe.ERROR_AUTH_FAILED, "获取蓝牙权限异常，请检查网络连接或小程序设置。", options, resolve);
      }
    });
  }
  openAdapter(options) {
    const opts = options || {};
    const isOpened = this.mIsAdapterOpened;
    l.log(`【BleAdapter】openAdapter(isAdapterOpened: ${isOpened}, force: ${opts.force})`, options);
    return new Promise((resolve) => {
      if (this.mIsAdapterOpened && !opts.force) {
        l.log(`---- 蓝牙适配器已经打开！`);
        Me.success("蓝牙适配器已打开！", options, resolve);
      } else if (this.mContext.isH5) {
        Me.complete(xe.ERROR_UN_SUPPORTED, "H5环境中不支持蓝牙操作！", options, resolve);
      } else {
        this.authorize({
          complete: () => {
            try {
              l.info("#### 【Request】openBluetoothAdapter:", options);
              common_vendor.index.openBluetoothAdapter({
                success: (openRes) => {
                  this.mIsAdapterOpened = true;
                  l.info(`#### 【Response.success】openBluetoothAdapter!`, openRes);
                  const adapterStateChangeCallback = (res) => {
                    l.info("==== onBluetoothAdapterStateChange: ====");
                    l.info(JSON.stringify(res));
                    if (typeof res.available === "string") {
                      res.available = res.available === "true";
                    }
                    if (res.available === false) {
                      this.mConnectionStateChange && this.mConnectionStateChange({
                        deviceId: this.mDeviceId || "",
                        connected: false
                      });
                    }
                    this.mBleAdapterStateChange && this.mBleAdapterStateChange(res);
                  };
                  const adapter = this.Context.bleAdapter;
                  if (adapter && typeof adapter.onBluetoothAdapterStateChange === "function") {
                    adapter.onBluetoothAdapterStateChange(adapterStateChangeCallback);
                  } else {
                    common_vendor.index.onBluetoothAdapterStateChange(adapterStateChangeCallback);
                  }
                  Me.success(openRes, options, resolve);
                },
                fail: (res) => {
                  const errCode = res.errCode || res.code || 0;
                  if (errCode <= 0) {
                    l.info(`#### 【Response.fail】蓝牙适配器已打开，errCode = ${errCode}`, res);
                    Me.success(res, options, resolve);
                  } else {
                    l.warn("#### 【Response.fail】openBluetoothAdapter:", res);
                    if (res.errCode === 3 || res.errno === 3) {
                      Me.complete(xe.ERROR_OPEN_ADAPTER, "请在系统的应用设置里面找到HBuilder，打开权限管理，检查蓝牙、附近设备等权限是否已打开。如果已经打开，可以尝试先拒绝，然后重新允许。", options, resolve);
                    } else {
                      Me.complete(xe.ERROR_OPEN_ADAPTER, res, options, resolve);
                    }
                  }
                }
              });
            } catch (error) {
              l.warn("####【Exception】openBluetoothAdapter:", error);
              Me.complete(xe.ERROR_OPEN_ADAPTER, error, options, resolve);
            }
          },
          fail: (res) => {
            Me.onResult(res, options, resolve);
          }
        });
      }
    });
  }
  closeAdapter() {
    return new Promise((resolve) => {
      if (typeof common_vendor.index.offBluetoothDeviceFound === "function") {
        l.info(`#### uni.offBluetoothDeviceFound:`);
        common_vendor.index.offBluetoothDeviceFound();
      }
      if (typeof common_vendor.index.offBluetoothAdapterStateChange === "function") {
        l.info(`#### uni.offBluetoothAdapterStateChange:`);
        common_vendor.index.offBluetoothAdapterStateChange();
      }
      if (this.mBleCharacteristicValueChangeListener) {
        this.mBleCharacterValueChangedMap.clear();
        this.mBleCharacteristicValueChangeListener = void 0;
      }
      if (typeof common_vendor.index.offBLECharacteristicValueChange === "function") {
        common_vendor.index.offBLECharacteristicValueChange();
      }
      l.info("### 【Request】: closeBluetoothAdapter: ");
      common_vendor.index.closeBluetoothAdapter({
        fail: (res) => {
          l.warn(res, `#### 【Response.fail】closeBluetoothAdapter:`, res);
        },
        complete: (res) => {
          this.mIsAdapterOpened = false;
          this.mConnectionStateChange && this.mConnectionStateChange({
            deviceId: this.mDeviceId || "",
            connected: false
          });
          resolve({ statusCode: xe.OK, resultInfo: res });
        }
      });
    });
  }
  resetAdapter(callback) {
    return this.closeAdapter().then(() => {
      return this.openAdapter().then((res) => {
        callback && callback(res.statusCode === xe.OK);
        return res;
      });
    });
  }
  startDiscovery(options) {
    const opts = options || {};
    const onSuccessCallback = (result) => {
      if (result.statusCode === xe.OK) {
        return new Promise((resolve) => {
          l.info("### 【Request】startBluetoothDevicesDiscovery: ", options);
          common_vendor.index.startBluetoothDevicesDiscovery({
            interval: opts.interval || 200,
            allowDuplicatesKey: true,
            success: (scanRes) => {
              this.mDeviceFoundAction = opts.deviceFound;
              this.mBleAdapterStateChange = opts.adapterStateChange;
              l.info(`#### 【Response.success】: startBluetoothDevicesDiscovery:`, scanRes);
              const adapter = this.Context.bleAdapter;
              const deviceFoundCallback = (res) => {
                const devices = !res.devices && Array.isArray(res) ? res : res.devices || [];
                const filters = devices.filter((v2) => !!(v2.name || v2.localName));
                if (filters.length > 0) {
                  this.mDeviceFoundAction && this.mDeviceFoundAction(filters);
                }
              };
              if (adapter && typeof adapter.onBluetoothDeviceFound === "function") {
                adapter.onBluetoothDeviceFound(deviceFoundCallback);
              } else {
                common_vendor.index.onBluetoothDeviceFound(deviceFoundCallback);
              }
              if (typeof common_vendor.index.getBluetoothDevices === "function") {
                common_vendor.index.getBluetoothDevices({
                  success: (res) => {
                    const devices = !res.devices && Array.isArray(res) ? res : res.devices || [];
                    const filters = devices.filter((v2) => !!(v2.name || v2.localName));
                    if (filters.length > 0) {
                      this.mDeviceFoundAction && this.mDeviceFoundAction(filters);
                    }
                  }
                });
              }
              Me.success(scanRes, options, resolve);
            },
            fail: (res) => {
              l.warn(`#### 【Response.fail】: startBluetoothDevicesDiscovery:`, JSON.stringify(res));
              Me.fail(res, options, resolve);
            }
          });
        });
      } else {
        l.warn("========== 蓝牙适配器打开失败！ ==========");
        return Me.onResult(result, options);
      }
    };
    if (opts.resetAdapter) {
      return this.resetAdapter().then(onSuccessCallback);
    } else {
      return this.openAdapter().then(onSuccessCallback);
    }
  }
  stopDiscovery(options) {
    return new Promise((resolve) => {
      l.info(`###【Request】stopBluetoothDevicesDiscovery:`);
      common_vendor.index.stopBluetoothDevicesDiscovery({
        success: (res) => {
          l.info(`###【Response.success】stopBluetoothDevicesDiscovery:`);
          Me.success(res, options, resolve);
          if (typeof common_vendor.index.offBluetoothDeviceFound === "function") {
            l.info(`#### offBluetoothDeviceFound:`);
            common_vendor.index.offBluetoothDeviceFound();
          }
          this.mDeviceFoundAction = void 0;
          this.mBleAdapterStateChange && this.mBleAdapterStateChange({ discovering: false });
          this.mBleAdapterStateChange = void 0;
        },
        fail: (res) => {
          l.warn(`###【Response.fail】stopBluetoothDevicesDiscovery:`, JSON.stringify(res));
          Me.fail(res, options, resolve);
        }
      });
    });
  }
  getFoundDevices(options) {
    return new Promise((resolve) => {
      l.info("####【Request】getBluetoothDevices:", options);
      common_vendor.index.getBluetoothDevices({
        success: (res) => {
          l.info("####【Response.success】getBluetoothDevices:", res);
          const devices = !res.devices && Array.isArray(res) ? res : res.devices || [];
          const filters = devices.filter((v2) => !!(v2.name || v2.localName));
          Me.success(filters, options, resolve);
        },
        fail: (res) => {
          l.warn("####【Response.fail】getBluetoothDevices:", res);
          Me.fail([], options, resolve);
        }
      });
    });
  }
  connect(options) {
    const deviceId = options.deviceId || this.mDeviceId || "";
    return new Promise((resolve) => {
      try {
        l.info(`####【Request】createBleConnection:`, options);
        const connectOptions = {
          deviceId,
          success: (res) => {
            l.info(`---- 【Response.success】 createBLEConnection:`);
            this.mDeviceId = deviceId;
            this.mConnectStatusMap.set(deviceId, true);
            this.mConnectionStateChange = options.connectionStateChange;
            const connectStateChangeAction = (resp) => {
              l.info(`========== onBLEConnectionStateChange ==========`);
              l.info(JSON.stringify(resp));
              this.mConnectStatusMap.set(resp.deviceId, resp.connected);
              if (resp.deviceId === deviceId) {
                this.mConnectionStateChange && this.mConnectionStateChange(resp);
              }
            };
            common_vendor.index.onBLEConnectionStateChange(connectStateChangeAction);
            this.mBleConnectionStateChangeMap.set(deviceId, connectStateChangeAction);
            let awaitTimes = 200;
            if (this.mContext.isAppPlus) {
              common_vendor.index.__f__("log", "at uni_modules/dothan-lpapi-ble/js_sdk/index.js:500", "============== APP-PLUS ============");
              if (this.isAndroid()) {
                awaitTimes = 1e3;
              } else {
                awaitTimes = 300;
              }
            }
            setTimeout(() => {
              Me.success(res, options, resolve);
            }, awaitTimes);
          },
          fail: (res) => {
            l.warn(`---- 【Response.fail】 createBLEConnection:`, JSON.stringify(res));
            let errCode = res.errCode || res.code;
            if (errCode === 10010) {
              errCode = -1;
            }
            if (typeof errCode === "number" && errCode <= 0) {
              this.mConnectStatusMap.set(deviceId, true);
              Me.success(res, options, resolve);
            } else {
              Me.complete(xe.ERROR_CONNECT_FAILED, res, options, resolve);
            }
          }
        };
        if (!this.mContext.isAlipay && typeof options.timeout === "number") {
          connectOptions.timeout = options.timeout;
        }
        if (this.mContext.isAlipay) {
          my.connectBLEDevice(connectOptions);
        } else {
          common_vendor.index.createBLEConnection(connectOptions);
        }
      } catch (error) {
        l.warn("---- 【Exception】 createBLEConnection:", error);
        Me.complete(xe.ERROR_CONNECT_FAILED, error, options, resolve);
      }
    });
  }
  disconnect(options) {
    const opts = options || {};
    const deviceId = opts.deviceId || this.mDeviceId || "";
    return new Promise((resolve) => {
      const api = common_vendor.index;
      const stateChangeCallback = this.mBleConnectionStateChangeMap.get(deviceId);
      if (stateChangeCallback) {
        this.mBleConnectionStateChangeMap.delete(deviceId);
        if (typeof common_vendor.index.offBLEConnectionStateChange === "function") {
          l.info(`---- offBLEConnectionStateChange:`);
          common_vendor.index.offBLEConnectionStateChange(stateChangeCallback);
        } else if (typeof api.offBLEConnectionStateChanged === "function") {
          l.info(`---- offBLEConnectionStateChanged:`);
          api.offBLEConnectionStateChanged(stateChangeCallback);
        }
      }
      l.info(`###【Request】closeBleConnection:`, deviceId);
      if (deviceId) {
        const connected = this.mConnectStatusMap.get(deviceId);
        if (!this.mIsAdapterOpened || !connected) {
          l.info(`#### 设备未连接！`);
          Me.success("设备未连接", options, resolve);
        } else {
          const closeOptions = {
            deviceId,
            success: (res) => {
              l.log(`####【Response.success】closeConnection:`, res);
              Me.success(res, options, resolve);
            },
            fail: (res) => {
              l.warn(`####【Response.fail】closeConnection:`, res);
              Me.fail(res, options, resolve);
            }
          };
          this.mConnectStatusMap.delete(deviceId);
          if (this.mContext.isAlipay) {
            my.disconnectBLEDevice(closeOptions).catch((error) => {
              l.warn(`#### 【Response.Exception】closeConnection:`, error);
              return Me.complete(xe.ERROR_EXCEPTION, error, options);
            });
          } else {
            common_vendor.index.closeBLEConnection(closeOptions);
          }
        }
      } else {
        l.warn(`---- 【参数错误】- closeConnection: deviceId = ${deviceId}`);
        Me.complete(xe.ERROR_PARAM, "参数错误", options, resolve);
      }
    });
  }
  getConnectedBleDevices() {
    return new Promise((resolve) => {
      if (typeof common_vendor.index.getConnectedBluetoothDevices === "function") {
        this.openAdapter().then(() => {
          l.info(`###【Request】getConnectedBluetoothDevices:`);
          let devices = void 0;
          common_vendor.index.getConnectedBluetoothDevices({
            services: [],
            success: (res) => {
              l.info(res, `#### 【Response.success】: getConnectedBluetoothDevices`);
              devices = res ? res.devices : [];
              resolve(devices);
            },
            fail: (res) => {
              l.info(res, `#### 【Response.fail】: getConnectedBluetoothDevices`);
              devices = [];
              resolve([]);
            }
          });
          setTimeout(() => {
            if (!devices) {
              resolve([]);
            }
          }, 100);
        });
      } else {
        resolve([]);
      }
    });
  }
  setBleMtu(options) {
    const deviceId = options.deviceId || this.mDeviceId || "";
    return new Promise((resolve) => {
      const platform = this.platform;
      l.info(`【BleAdapter】setBleMtu: platform: ${platform}`);
      if (Me.isAndroid(platform)) {
        const writeWaits = options.waits || 0;
        let delayTime = 0;
        if (this.mContext.isAppPlus) {
          if (options.chipType === "DF5" || options.mtu >= 500) {
            delayTime = 0;
          } else {
            delayTime = 5;
          }
        }
        let supportMtu = true;
        if (this.mContext.isAlipay) {
          supportMtu = my && typeof my.setBLEMTU === "function";
        } else {
          supportMtu = typeof common_vendor.index.setBLEMTU === "function";
        }
        if (supportMtu) {
          l.info(`#### 【Request】setMTU: { deviceId: ${deviceId}, mtu: ${options.mtu}}`);
          common_vendor.index.setBLEMTU({
            deviceId,
            mtu: options.mtu,
            success: (resp) => {
              l.info(`#### 【Response.success】: setBleMTU`);
              resolve({
                status: 0,
                mtu: resp.mtu || options.mtu,
                waits: writeWaits + delayTime
              });
            },
            fail: (resp) => {
              if (options.chipType && !options.required) {
                resolve({ status: -1, waits: writeWaits + delayTime });
              } else {
                l.warn(`#### 【Response.fail】 setBLEMtu: MTU协商失败！`, resp);
                common_vendor.index.getBLEMTU({
                  deviceId,
                  success: (getRes) => {
                    l.info(`#### 【Response.success】: getBLEMTU`, getRes);
                    if (getRes.mtu && getRes.mtu > options.mtu) {
                      resolve({
                        status: 0,
                        mtu: resp.mtu || options.mtu,
                        waits: writeWaits + delayTime
                      });
                    } else {
                      resolve({ status: 2, waits: writeWaits + delayTime });
                    }
                  },
                  fail: (getRes) => {
                    l.warn(`#### 【Response.fail】: getBLEMTU`, getRes);
                    resolve({ status: 2, waits: writeWaits + delayTime });
                  }
                });
              }
            }
          });
        } else {
          l.warn(`【BleAdapter】setBleMtu: 当前环境不支持MTU协商操作，chipType = ${options.chipType}`);
          if (options.chipType && !options.required) {
            resolve({ status: -1, waits: writeWaits + delayTime });
          } else {
            resolve({ status: 1, waits: writeWaits + delayTime });
          }
        }
      } else if (Me.isHarmonyOS(platform)) {
        l.info(`#### 【Request】setMTU: { deviceId: ${deviceId}, mtu: ${options.mtu}}`);
        common_vendor.index.setBLEMTU({
          deviceId,
          mtu: options.mtu,
          success: (res) => {
            l.info(`#### 【Response.success】: setBleMTU`, JSON.stringify(res));
            resolve({ status: 0, mtu: res.mtu || options.mtu });
          },
          fail: (resp) => {
            l.warn(`#### 【Response.fail】 setBLEMtu: MTU协商失败，正在尝试读取当前mtu大小`, resp);
            common_vendor.index.getBLEMTU({
              deviceId,
              success: (getRes) => {
                l.info(`#### 【Response.success】: getBLEMTU`, getRes);
                if (getRes.mtu && getRes.mtu > options.mtu) {
                  resolve({ status: 0, mtu: resp.mtu || options.mtu });
                } else {
                  resolve({ status: 2 });
                }
              },
              fail: (getRes) => {
                l.warn(`#### 【Response.fail】: getBLEMTU`, getRes);
                resolve({ status: 2 });
              }
            });
          }
        });
      } else {
        resolve({ status: -1 });
      }
    });
  }
  getGATTServices(options) {
    const deviceId = options.deviceId || this.mDeviceId || "";
    return new Promise((resolve) => {
      l.info(`#### 【Request】getGattService: ${deviceId}`);
      common_vendor.index.getBLEDeviceServices({
        deviceId,
        success: (resp) => {
          l.info(`#### 【Response.success】getGattService: ${deviceId}`);
          const services = (resp.services || []).map((v2) => {
            return Object.assign(v2, { uuid: v2.uuid || v2.serviceId || "" });
          });
          if (services.length <= 0) {
            l.warn(`---- 服务列表为空：${JSON.stringify(resp)}`);
          }
          Me.successResult(services, options, resolve);
        },
        fail: (resp) => {
          l.warn(`#### 【Response.fail】getGattService: ${deviceId}`);
          l.warn(JSON.stringify(resp));
          Me.failResult([], options, resolve);
        }
      });
    });
  }
  getGATTCharacteristics(options) {
    const deviceId = options.deviceId || this.mDeviceId || "";
    return new Promise((resolve) => {
      l.info(`#### 【Request】getCharacteristicList(${options.serviceId})`);
      common_vendor.index.getBLEDeviceCharacteristics({
        deviceId,
        serviceId: options.serviceId || "",
        success: (res) => {
          l.info(`#### 【Response.success】getCharacteristicList(${options.serviceId})`);
          const characterList = res.characteristics || [];
          if (characterList.length <= 0) {
            l.warn(`---- 特征值列表为空：${JSON.stringify(res)}`);
          }
          const list = characterList.map((v2) => {
            const prop = v2.properties || {};
            let propValue = 0;
            if (prop.read)
              propValue |= Ze.READ;
            if (prop.write) {
              if (prop.writeNoResponse)
                propValue |= Ze.WRITE_NO_RESPONSE;
              else
                propValue |= Ze.WRITE;
            }
            if (prop.notify)
              propValue |= Ze.NOTIFY;
            if (prop.indicate)
              propValue |= Ze.INDICATE;
            return Object.assign(v2, {
              serviceId: options.serviceId,
              uuid: v2.uuid || v2.characteristicId || "",
              properties: propValue
            });
          });
          Me.successResult(list, options, resolve);
        },
        fail: (res) => {
          l.warn(`#### 【Response.fail】getCharacteristicList(${options.serviceId})`, res);
          Me.failResult([], options, resolve);
        }
      });
    });
  }
  onBLECharacteristicValueChange(characterId, callback) {
    this.mBleCharacterValueChangedMap.set(characterId, callback);
    const adapter = this.Context.bleAdapter;
    if (typeof common_vendor.index.offBLECharacteristicValueChange === "undefined") {
      l.log(`#### 【Register】mBleCharacterValueChangedMap.set(${characterId})`);
      if (!this.mBleCharacteristicValueChangeListener) {
        l.log(`#### ====== create characteristic value change listener!`);
        this.mBleCharacteristicValueChangeListener = (resp) => {
          for (const item of this.mBleCharacterValueChangedMap) {
            if (item[0] === resp.characteristicId) {
              item[1](resp);
              break;
            }
          }
        };
        if (adapter && typeof adapter.onBLECharacteristicValueChange === "function") {
          adapter.onBLECharacteristicValueChange(this.mBleCharacteristicValueChangeListener);
        } else {
          common_vendor.index.onBLECharacteristicValueChange(this.mBleCharacteristicValueChangeListener);
        }
      }
    } else {
      l.log(`#### 【Register】uni.onBLECharacteristicValueChange: [${characterId}]`);
      if (adapter && typeof adapter.onBLECharacteristicValueChange === "function") {
        adapter.onBLECharacteristicValueChange(callback);
      } else {
        common_vendor.index.onBLECharacteristicValueChange(callback);
      }
    }
  }
  offBLECharacteristicValueChange(cid) {
    if (!cid)
      return;
    this.mBleCharacterValueChangedMap.delete(cid);
    if (typeof common_vendor.index.offBLECharacteristicValueChange === "function") {
      l.log(`#### 【Unregister】uni.offBLECharacteristicValueChange: [${cid}]`);
      common_vendor.index.offBLECharacteristicValueChange();
    } else {
      l.log(`#### 【Unregister】mBleCharacterValueChangedMap.delete(${cid}):`);
    }
  }
  read(options) {
    return new Promise((resolve) => {
      const deviceId = options.deviceId || this.mDeviceId || "";
      const cid = options.characteristicId || "";
      l.info(`#### 【Request】readCharacteristic(uuid: ${cid})`);
      if (deviceId && options.serviceId && cid) {
        if (this.mContext.isAppPlus || this.mContext.isWeiXin) {
          this.onBLECharacteristicValueChange(cid, (res) => {
            l.info(`#### 【Response】onReadCharacteristicValueChange: [${res.value}]`);
            if (res.characteristicId == cid) {
              Me.success(res.value, options, resolve);
              this.offBLECharacteristicValueChange(cid);
            }
          });
        }
        common_vendor.index.readBLECharacteristicValue({
          deviceId,
          serviceId: options.serviceId,
          characteristicId: cid,
          success: (resp) => {
            const res = resp;
            l.info(`#### 【Response.success】readBLECharacteristicValue: [${cid}]:`, resp);
            l.log(JSON.stringify(res));
            if (!(this.mContext.isAppPlus || this.mContext.isWeiXin)) {
              const result = res.characteristic || {};
              Me.success(result.value || "", options, resolve);
            }
          },
          fail: (res) => {
            l.warn(`#### 【Response.fail】readBLECharacteristicValue: [${cid}]:`, res);
            Me.complete(xe.ERROR_READ_CHARACTERISTIC, "", options, resolve);
          }
        });
      } else {
        l.warn(`---- 【参数错误】: readCharacteristic`, options);
        Me.complete(xe.ERROR_PARAM, "参数错误", options, resolve);
      }
    });
  }
  notify(options) {
    const deviceId = options.deviceId || this.mDeviceId;
    return new Promise((resolve) => {
      const state = typeof options.state === "boolean" ? options.state : true;
      if (state) {
        l.info(`#### 【Request.start】 - notifyCharacteristic:`);
      } else {
        if (typeof common_vendor.index.offBLECharacteristicValueChange === "function") {
          l.info(`#### offBLECharacteristicValueChange:`);
          this.offBLECharacteristicValueChange(options.characteristicId);
        }
        l.info(`#### 【Request.stop 】 - notifyCharacteristic:`);
      }
      const connected = deviceId ? this.mConnectStatusMap.get(deviceId) : false;
      if (connected && deviceId && options.serviceId && options.characteristicId) {
        const res = common_vendor.index.notifyBLECharacteristicValueChange({
          deviceId,
          serviceId: options.serviceId,
          characteristicId: options.characteristicId,
          state,
          success: (notifyRes) => {
            if (state) {
              l.info(`####【Response.success】notifyBLECharacteristicValueChange:`, notifyRes);
              l.info(`####【Request】onBLECharacteristicValueChange`);
              this.onBLECharacteristicValueChange(options.characteristicId, (result) => {
                if (options.characteristicId === result.characteristicId) {
                  options.dataReceived && options.dataReceived(result.value);
                }
              });
            }
            l.info(`#### 【Response.success】: notifyBLECharacteristicValueChange:`, notifyRes);
            Me.success(notifyRes, options, resolve);
          },
          fail: (res2) => {
            l.warn(`#### 【Response.fail】: notifyBLECharacteristicValueChange:`, res2);
            Me.complete(xe.ERROR_NOTIFY_CHARACTERISTIC, res2, options, resolve);
          }
        });
        Promise.resolve(res).catch((error) => {
          l.warn(`#### 【Response.Exception】: notifyBLECharacteristicValueChange: `, error);
          return Me.complete(xe.ERROR_EXCEPTION, error, options);
        });
      } else {
        if (!connected) {
          l.warn(`#### 【设备链接已断开】: notifyCharacteristic`);
          Me.complete(xe.ERROR_DISCONNECTED, "设备连接已断开", options, resolve);
        } else {
          l.warn(`#### 【参数错误】: notifyCharacteristic`, options);
          Me.complete(xe.ERROR_PARAM, "参数错误", options, resolve);
        }
      }
    });
  }
  write(options) {
    const deviceId = options.deviceId || this.mDeviceId || "";
    const serviceId = options.serviceId || "";
    const characteristicId = options.characteristicId || "";
    const data = options.value || options.data;
    const writeValue = this.mContext.isAlipay ? Me.arrayBufferToHex16(data, "") : data.buffer;
    const pkgName = `[P ${options.pkgIndex} - SUP ${options.subPkgIndex}]`;
    return new Promise((resolve) => {
      if (this.mShowWriteLog) {
        l.log(`#### 【Request】writeBLECharacteristicValue: ${pkgName}`);
      }
      if (deviceId && serviceId && characteristicId && data) {
        common_vendor.index.writeBLECharacteristicValue({
          deviceId,
          serviceId,
          characteristicId,
          value: writeValue,
          success: (res) => {
            if (this.mShowWriteLog) {
              l.log(`#### 【Response.success】writeBLECharacteristicValue: ${pkgName}`, res);
            }
            Me.success(res, options, resolve);
            this.mShowWriteLog = false;
          },
          fail: (res) => {
            l.warn(`#### 【Response.fail】writeBLECharacteristicValue: ${pkgName}, writeWaits: ${options.writeWaits}`, res);
            Me.complete(xe.ERROR_WRITE_CHARACTERISTIC, res, options, resolve);
            this.mShowWriteLog = true;
          }
        });
      } else {
        l.warn(`---- 【参数错误】: deviceId: ${deviceId}, serviceId: ${serviceId}`);
        l.warn(`---- 【参数错误】: characteristicId: ${characteristicId}`, options);
        Me.complete(xe.ERROR_PARAM, "参数错误", options, resolve);
      }
    });
  }
}
class UniCanvas {
  get width() {
    return this._width;
  }
  set width(v2) {
    this._width = v2;
  }
  get height() {
    return this._height;
  }
  set height(v2) {
    this._height = v2;
  }
  get canvasId() {
    return this.mContext.canvasId;
  }
  constructor(context) {
    this._width = 0;
    this._height = 0;
    this.mContext = context;
  }
  getContext(options) {
    if (!this.mCanvasContext) {
      this.mCanvasContext = common_vendor.index.createCanvasContext(this.mContext.canvasId || "", this.mContext.componentInstance);
    }
    return this.mCanvasContext;
  }
  toDataURL(type, quality) {
    return this.mDataUrl || "";
  }
  getImageData() {
    return new Promise((resolve) => {
      if (this.mContext.isAlipay && this.mCanvasContext) {
        l.info(`---- drawContext.getImageData:`);
        if (this.mContext.canvas) {
          resolve(void 0);
        } else {
          if (typeof this.mCanvasContext.getImageData === "function") {
            this.mCanvasContext.getImageData({
              x: 0,
              y: 0,
              width: this.width,
              height: this.height,
              success: (res) => {
                l.info(`---- drawContext.getImageData.success:`);
                resolve(res);
              },
              fail: (resp) => {
                l.warn(resp, `---- drawContext.getImageData.fail:`);
                resolve(void 0);
              }
            });
          } else {
            l.warn(`---- 不支持的方法：mCanvasContext.getImageData:`);
            resolve(void 0);
          }
        }
      } else if (typeof common_vendor.index.canvasGetImageData === "function") {
        l.info(`#### 【Request】 uni.canvasGetImageData:`);
        common_vendor.index.canvasGetImageData({
          x: 0,
          y: 0,
          width: this.width,
          height: this.height,
          canvasId: this.mContext.canvasId || "",
          success: (res) => {
            l.info(`#### 【Response.success】 uni.canvasGetImageData:`);
            resolve(res);
          },
          fail: (res) => {
            l.error(`#### 【Response.fail】uni.canvasGetImageData:`);
            l.error(JSON.stringify(res));
            resolve(void 0);
          }
        }, this.mContext.componentInstance);
      } else {
        resolve(void 0);
      }
    });
  }
  static getTempFilePath(options, callback) {
    l.info(`#### 【Request】uni.canvasToTempFilePath:`);
    common_vendor.index.canvasToTempFilePath({
      // 保存canvas为图片
      canvasId: options.canvasId || "",
      canvas: options.canvas,
      quality: 1,
      success: (res) => {
        l.info(res, `#### 【Response.success】uni.canvasToTempFilePath:`);
        callback(res.tempFilePath || res.filePath);
      },
      fail: (res) => {
        l.warn(res, `#### 【Response.fail】uni.canvasToTempFilePath:`);
        callback("");
      }
    }, options.componentInstance);
  }
  start(options) {
    this.mDataUrl = "";
  }
  draw(context, apiMode, reserve) {
    return new Promise((resolve) => {
      if (!context) {
        resolve("");
        return;
      }
      const getTempPathAction = () => {
        UniCanvas.getTempFilePath(this.mContext, (tempPath) => {
          this.mDataUrl = tempPath;
          resolve(tempPath);
        });
      };
      if (this.mContext.isAlipay) {
        if (typeof context.draw === "function") {
          context.draw(reserve);
        }
        if (!apiMode) {
          resolve("");
        } else {
          setTimeout(() => {
            getTempPathAction();
          }, this.mContext.drawTimeout || 100);
        }
      } else if (typeof context.draw === "function") {
        let hasDraw = false;
        context.draw(reserve, () => {
          hasDraw = true;
          if (apiMode) {
            setTimeout(getTempPathAction, this.mContext.drawTimeout || 100);
          } else {
            resolve("");
          }
        });
        setTimeout(() => {
          if (!hasDraw) {
            l.warn(`---- Canvas.draw 函数长时间未响应，请检查目标 Canvas 是否已经销毁。`);
            resolve("");
          }
        }, 3e3);
      } else if (this.mContext.canvas && apiMode) {
        setTimeout(() => {
          getTempPathAction();
        }, 10);
      } else {
        resolve("");
      }
    });
  }
  saveBase64Image(dataUrl, callback) {
    const groups = /^data:(\S+)\/(\S+);base64,.*/.exec(dataUrl || "");
    if (groups && plus && plus.nativeObj.Bitmap) {
      if (groups[2] === "svg+xml") {
        callback && callback(dataUrl);
      } else {
        const fileName = `border.${groups[2]}`;
        const bitmap = new plus.nativeObj.Bitmap(`bitmap${Date.now()}`);
        try {
          bitmap.loadBase64Data(dataUrl, () => {
            const filePath = `_doc/temp/${fileName}`;
            bitmap.save(filePath, { overwrite: true }, (res) => {
              bitmap.clear();
              callback && callback(res);
            }, (res) => {
              bitmap.clear();
              l.warn(`---- 图片保存失败！`);
              l.warn(res);
              callback && callback(dataUrl);
            });
          }, (res) => {
            bitmap.clear();
            l.warn(`---- base64 字符串加载失败：`);
            l.warn(res);
            callback && callback(dataUrl);
          });
        } catch (error) {
          l.warn(`---- base64 字符串load 异常！`);
          l.warn(error);
          bitmap.clear();
          callback && callback(dataUrl);
        }
      }
    } else {
      callback && callback(dataUrl);
    }
  }
  loadImage(options) {
    const opts = typeof options === "string" ? { src: options } : options;
    l.log(`UniCanvas.loadImage: ${opts.src.length > 100 ? opts.src.substring(0, 100) : opts.src}`);
    return new Promise((resolve) => {
      if (opts.src.startsWith("http")) {
        common_vendor.index.getImageInfo({
          src: opts.src,
          success: (res) => {
            l.log(`res, 【Response.success】uni.getImageInfo:`);
            resolve({
              width: res.width,
              height: res.height,
              dzSrc: res.path
            });
          },
          fail: (res) => {
            l.warn(res, `【Response.fail】uni.getImageInfo:`);
            resolve("");
          }
        });
      } else if (opts.src.startsWith("data:")) {
        if (opts.withSize) {
          this.saveBase64Image(opts.src, (result) => {
            if (result && typeof result !== "string" && result.width && result.height) {
              resolve({
                width: result.width,
                height: result.height,
                dzSrc: result.target
              });
            } else {
              resolve(opts.src);
            }
          });
        } else {
          resolve(opts.src);
        }
      } else {
        resolve(opts.src);
      }
    });
  }
}
class UniContext extends Ae {
  static createInstance(options, prevContext) {
    const opts = options || {};
    if (prevContext) {
      const prevCanvas = prevContext.CanvasElement;
      if (options.canvas && options.canvas === prevCanvas) {
        return prevContext;
      } else if (options.canvasId && prevCanvas instanceof UniCanvas && options.canvasId === prevCanvas.canvasId) {
        return prevContext;
      }
    }
    return opts.canvas || opts.canvasId ? new UniContext(opts) : void 0;
  }
  constructor(context) {
    super(Object.assign({ apiMode: true }, context || {}));
    this.init(context || {});
    l.log(`==== 【UniContext】constructor() ====`, this.mOptions);
  }
  init(options) {
    const opts = options || {};
    opts.isWeiXin = true;
    this.mOptions = opts;
  }
  createCanvas() {
    const context = this.mOptions;
    if (!this.mCanvas) {
      l.info(`【UniContext】createCanvas():`);
      if (document && typeof document.createElement === "function") {
        l.log('【UniContext】createCanvas by document.createElement("canvas")!');
        this.mCanvas = document.createElement("canvas");
      } else if (context.canvas && typeof context.canvas.getContext === "function") {
        l.log("【UniContext】createCanvas by options.canvas!");
        this.mCanvas = context.canvas;
      } else if (context.canvasId) {
        l.log("【UniContext】createCanvas by canvasId!");
        this.mCanvas = new UniCanvas(this.mOptions);
      } else {
        l.log("【UniContext】createCanvas by uni.createOffscreenCanvas!");
        if (typeof common_vendor.index.createOffscreenCanvas === "function") {
          this.mCanvas = common_vendor.index.createOffscreenCanvas({ type: "2d" });
        }
        if (!this.mCanvas) {
          if (context.isWeiXin) {
            l.warn("================================");
            l.warn("==== 真机调试请使用 2.0 模式 ====");
            l.warn("================================");
          } else {
            l.warn("=======================================");
            l.warn("==== 当前环境不支持 OffscreenCanvas ====");
            l.warn("=======================================");
          }
        } else {
          l.info("==================================");
          l.info("==== OffscreenCanvas创建成功！ ====");
          l.info("==================================");
        }
      }
    }
    return this.mCanvas;
  }
  /**
   * 通过 canvas 来创建 Image 对象。
   */
  createImage(canvas, src, timeout) {
    return new Promise((resolve) => {
      const imgSrc = src.startsWith("http") ? `${src}?${(/* @__PURE__ */ new Date()).getTime()}${Math.random()}` : src;
      const image = canvas.createImage();
      const subImagePath = imgSrc.length > 100 ? `${imgSrc.substring(0, 100)}...` : imgSrc;
      let processed = false;
      l.info(`---- canvas.createImage: ${subImagePath}`);
      image.onload = () => {
        l.info(`---- image.onload`);
        if (processed) {
          l.warn(`图片加载时间太长了，已经进行超时处理了！`);
        } else {
          processed = true;
          resolve(image);
        }
      };
      image.onerror = (res) => {
        l.warn(res, `---- image.onerror：${subImagePath}`);
        processed = true;
        resolve(imgSrc);
      };
      setTimeout(() => {
        if (!processed) {
          l.warn(`---- 图片加载超时：`);
          processed = true;
          resolve(image);
        }
      }, timeout || 3e3);
      image.src = imgSrc;
    });
  }
  loadImage(options) {
    const _super = Object.create(null, {
      loadImage: { get: () => super.loadImage }
    });
    return __awaiter(this, void 0, void 0, function* () {
      l.log(`---- UniContext.loadImage:`);
      const opts = typeof options === "string" ? { src: options } : options;
      if (!opts || !opts.src) {
        return null;
      }
      const canvas = this.createCanvas();
      if (canvas instanceof UniCanvas) {
        return canvas.loadImage(opts);
      } else if (document && typeof document.createElement === "function") {
        return _super.loadImage.call(this, opts.src);
      } else if (canvas && canvas === this.mOptions.canvas) {
        return this.createImage(canvas, opts.src, 0);
      } else if (typeof common_vendor.index.createOffscreenCanvas === "function") {
        return this.createImage(canvas, opts.src, 0);
      } else {
        return _super.loadImage.call(this, opts.src);
      }
    });
  }
  startJob(options) {
    l.log(`#### UniContext.startJob:`);
    const res = super.startJob(options);
    if (!res)
      return res;
    if (this.mCanvas && this.mCanvas instanceof UniCanvas) {
      this.mCanvas.start(res);
    }
    return Object.assign(Object.assign({}, res), { canvas: this.mCanvas });
  }
  onCanvasClear(canvas, context) {
  }
  commitJob() {
    return super.commitJob().then((res) => {
      if (!res)
        return res;
      l.info(`---- [UniContext] DrawContext.commitJob.completed:`);
      const canvas = this.mCanvas;
      const jobInfo = this.jobOptions || {};
      if (canvas && canvas instanceof UniCanvas) {
        const context = canvas.getContext();
        return canvas.draw(context, res.apiMode).then((v2) => {
          if (!res.dataUrl)
            res.dataUrl = v2;
          res.tempFilePath = v2;
          if (!res.isPreview || jobInfo.withImageData) {
            return canvas.getImageData().then((data) => {
              res.imageData = data;
              return res;
            });
          } else {
            return res;
          }
        });
      }
      return res;
    });
  }
}
class LPAPIFactory {
  /**
   * 获取LPAPI接口实例。
   */
  static getInstance(options) {
    if (!LPAPIFactory.api) {
      LPAPIFactory.api = LPAPIFactory.createInstance(options);
    } else if (options) {
      const prevContext = LPAPIFactory.api.Context;
      const context = UniContext.createInstance(options, prevContext);
      if (context && context !== prevContext) {
        LPAPIFactory.api.setDrawContext(context);
      }
      LPAPIFactory.api.setOptions(options);
    }
    return LPAPIFactory.api;
  }
  static initApi(options) {
    return __awaiter(this, void 0, void 0, function* () {
      const opts = typeof Option === "function" ? { callback: options } : options || {};
      const api = this.getInstance(options);
      const res = yield api.DeviceManager.openAdapter({ force: true });
      if (typeof opts.callback === "function") {
        opts.callback(api, res);
      }
      return api;
    });
  }
  static createInstance(options) {
    const opts = options || {};
    di.setLogLevel(typeof opts.logLevel === "number" ? opts.logLevel : opts.showLog);
    l.info(`======== LPAPIFactory.createInstance() ========`, options);
    const adapter = new BleAdapter(options);
    return di.create(Object.assign(Object.assign({}, opts), { adapter, context: adapter.isH5 ? void 0 : UniContext.createInstance(opts), createContext: (args) => {
      return adapter.isH5 ? void 0 : new UniContext(args);
    }, onQuit: () => {
      LPAPIFactory.api = void 0;
    } }));
  }
}
exports.LPAPIFactory = LPAPIFactory;
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/uni_modules/dothan-lpapi-ble/js_sdk/index.js.map
