"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Clock = /** @class */ (function () {
    function Clock(canvas, options) {
        if (options === void 0) { options = {}; }
        /**默认选项 */
        this.options = {
            size: 300,
            padding: 5,
            borderWidth: 15,
            borderColor: "black",
            scaleType: "arabic",
            scaleColor: "#666",
            hourColor: "#666",
            backgroundColor: "white",
            secondHandColor: "red",
            minuteHandColor: "#666",
            hourHandColor: "black",
            backgroundMode: "full",
            showShadow: true,
            backgroundAlpha: 0.5,
        };
        this.interval = null;
        this.hours = []; //小时数字
        this.largeScale = 0; //大刻度长度
        this.smallScale = 0; //小刻度长度
        this.hourFontSize = 0; //小时数字字体大小
        this.headLen = 0; //针头长度
        this.secondHandLen = 0; //秒针长度
        this.minuteHandLen = 0; //分针长度
        this.hourHandLen = 0; //时针长度
        this.borderPattern = null;
        /**画布大小的一半 */
        this.halfSize = 0;
        /**外面传过来的要显示的canvas */
        this.container = null;
        this.ctx = null;
        /**表盘 */
        this.dialCanvas = document.createElement("canvas");
        this.dialCtx = this.dialCanvas.getContext("2d");
        this.options = __assign({}, this.options, options);
        if (!canvas) {
            throw new Error("请传入canvas参数！");
        }
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw new Error("传入的canvas参数不是一个HTMLCanvasElement对象！");
        }
        this.init(canvas);
    }
    Clock.prototype.init = function (container) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, size, borderWidth, borderImage, padding, _b, scaleType, backgroundImage, onload, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this.options, size = _a.size, borderWidth = _a.borderWidth, borderImage = _a.borderImage, padding = _a.padding, _b = _a.scaleType, scaleType = _b === void 0 ? "arabic" : _b, backgroundImage = _a.backgroundImage, onload = _a.onload;
                        this.halfSize = size * 0.5;
                        this.container = container;
                        this.ctx = container.getContext("2d");
                        this.dialCanvas.width = this.container.width = size;
                        this.dialCanvas.height = this.container.height = size;
                        //大刻度线的长度为内圈半径的十二分之一
                        this.largeScale = (this.halfSize - padding - borderWidth) / 12;
                        //小刻度线的长度为大刻度线的一半
                        this.smallScale = this.largeScale * 0.5;
                        this.hourFontSize = this.largeScale * 1.2;
                        this.headLen = this.smallScale * 1.5;
                        this.secondHandLen = this.headLen * 12;
                        this.minuteHandLen = this.headLen * 10;
                        this.hourHandLen = this.headLen * 7;
                        if ("roman" == scaleType) {
                            this.hours = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
                        }
                        else if ("arabic" == scaleType) {
                            this.hours = ["12", "1", "2", "3", "4", "5", "6", "7", '8', "9", "10", "11"];
                        }
                        if (!borderImage) return [3 /*break*/, 2];
                        _c = this;
                        return [4 /*yield*/, this.createPattern(this.dialCtx, borderImage, "repeat")];
                    case 1:
                        _c.borderPattern = _e.sent();
                        _e.label = 2;
                    case 2:
                        if (!backgroundImage) return [3 /*break*/, 4];
                        _d = this;
                        return [4 /*yield*/, this.createImage(backgroundImage)];
                    case 3:
                        _d.backgroundImage = _e.sent();
                        _e.label = 4;
                    case 4:
                        this.drawDial(this.dialCtx);
                        if (onload instanceof Function) {
                            onload(this);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**角度转弧度 */
    Clock.prototype.angle2radian = function (angle) {
        return (Math.PI / 180) * angle;
    };
    /**
     * 极坐标转画布坐标（ps:此极坐标极轴水平向上，角度正方向顺时针）
     * @param r 当前点到中心点的长度
     * @param radian 弧度
     */
    Clock.prototype.polarCoordinates2canvasCoordinates = function (r, radian) {
        //极轴水平向上极坐标转极轴水平向右极坐标
        radian -= Math.PI * 0.5; //角度向右旋转90度即可
        //极轴水平向右极坐标转直角坐标（x轴水平向右，y轴竖直向下）
        var x = r * Math.cos(radian);
        var y = r * Math.sin(radian);
        //直角坐标转画布坐标
        var halfSize = this.halfSize;
        x = x + halfSize;
        y = y + halfSize;
        return { x: x, y: y };
    };
    /**绘制小时的文字 */
    Clock.prototype.drawHours = function (ctx, i, hour, end) {
        ctx.save();
        ctx.fillStyle = this.options.hourColor;
        ctx.font = this.hourFontSize + "px \u5FAE\u8F6F\u96C5\u9ED1";
        var w = ctx.measureText(hour).width;
        var h = this.hourFontSize;
        var x = end.x, y = end.y;
        //i为 0-11 对应1-12个小时数字（12开始，11结束）
        var padding = 5;
        switch (i) {
            case 0: //12
                x -= w * 0.5;
                y += h;
                break;
            case 1:
                x -= w;
                y += h;
                break;
            case 2:
                x -= w + padding;
                y += h - padding;
                break;
            case 3:
                x -= w + padding;
                y += h * 0.5;
                break;
            case 4:
                x -= w + padding;
                break;
            case 5:
                x -= w;
                break;
            case 6:
                x -= w * 0.5;
                y -= padding;
                break;
            case 8:
                x += padding;
                break;
            case 9:
                x += padding;
                y += h * 0.5;
                break;
            case 10:
                x += padding;
                y += h - padding;
                break;
            case 11:
                y += h;
                break;
        }
        ctx.fillText(hour, x, y);
        ctx.restore();
    };
    Clock.prototype.createImage = function (src) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function () {
                reject(new Error("图片加载出错!"));
                _this.stop(); //停止
            };
            img.src = src;
        });
    };
    Clock.prototype.createPattern = function (ctx, src, repetition) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.onload = function () {
                resolve(ctx.createPattern(img, repetition));
            };
            img.onerror = function () {
                reject(new Error("图片加载出错!"));
                _this.stop(); //停止
            };
            img.src = src;
        });
    };
    /**绘制表盘 */
    Clock.prototype.drawDial = function (ctx) {
        var _a = this.options, padding = _a.padding, borderWidth = _a.borderWidth, borderColor = _a.borderColor, borderImage = _a.borderImage, scaleColor = _a.scaleColor, backgroundColor = _a.backgroundColor, backgroundImage = _a.backgroundImage, backgroundMode = _a.backgroundMode, backgroundAlpha = _a.backgroundAlpha, showShadow = _a.showShadow;
        var hours = this.hours;
        var halfSize = this.halfSize;
        var shadowBlur = 10;
        var shadowOffset = 5;
        //--------外圈
        ctx.save();
        var x = halfSize;
        var y = halfSize;
        var outsideR = halfSize - padding - (showShadow ? shadowBlur + shadowOffset : 0);
        ctx.arc(x, y, outsideR, 0, 2 * Math.PI, true);
        if (borderImage && this.borderPattern) { //边框背景图
            ctx.fillStyle = this.borderPattern;
        }
        else { //边框颜色
            ctx.fillStyle = borderColor;
        }
        //--------内圈 利用相反缠绕可形成内阴影
        var insideR = outsideR - borderWidth;
        ctx.arc(x, y, insideR, 0, 2 * Math.PI, false);
        if (showShadow) {
            ctx.shadowBlur = shadowBlur;
            ctx.shadowColor = "#666";
            ctx.shadowOffsetX = shadowOffset;
            ctx.shadowOffsetY = shadowOffset;
        }
        ctx.fill();
        ctx.restore();
        //--------内圈的背景图或背景色
        ctx.beginPath();
        ctx.save();
        if (backgroundImage && this.backgroundImage) { //背景图
            var _b = this.backgroundImage, width = _b.width, height = _b.height;
            var r = "full" == backgroundMode ? insideR : insideR - this.largeScale - this.hourFontSize - 15;
            ctx.globalAlpha = backgroundAlpha;
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.clip(); //按内圈区域裁剪图片
            //最小的一边要刚好能显示完全 ,r * 2直径
            var scale = r * 2 / Math.min(width, height);
            ctx.drawImage(this.backgroundImage, halfSize - r, halfSize - r, width * scale, height * scale);
        }
        else if ("white" != backgroundColor) { //背景色，若背景色是白色，就不必填充，因为原本就是白色，并且不填充可以渲染出内阴影效果
            ctx.arc(x, y, insideR, 0, 2 * Math.PI);
            ctx.fillStyle = backgroundColor;
            ctx.fill();
        }
        ctx.restore();
        //--------刻度
        var step = 360 / 60; //中心点转动的角度
        //顺时针，0度(12点)递增到 360度(也是12点)
        var hourStep = 0;
        for (var angle = 0; angle < 360; angle += step) {
            var radian = this.angle2radian(angle);
            var start = this.polarCoordinates2canvasCoordinates(insideR, radian);
            var len = 0 == angle % 5 ? this.largeScale : this.smallScale;
            var end = this.polarCoordinates2canvasCoordinates(insideR - len, radian);
            ctx.beginPath();
            ctx.save();
            if (0 == angle % 5) {
                ctx.lineWidth = 3;
                if (hours && hours.length == 12) {
                    this.drawHours(ctx, hourStep, hours[hourStep++], end);
                }
            }
            else {
                ctx.lineWidth = 1;
            }
            ctx.strokeStyle = scaleColor;
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
            ctx.restore();
        }
    };
    /**绘制时针 */
    Clock.prototype.drawHand = function (ctx, time) {
        if (time === void 0) { time = new Date(); }
        var _a = this.options, secondHandColor = _a.secondHandColor, minuteHandColor = _a.minuteHandColor, hourHandColor = _a.hourHandColor;
        /*
        * 一圈被分、秒成分了60份，每一份的度数为:360/60=6度
        * 一圈被时成了12份，每一份的度数为:360/12=30度
        * 分针每走完一圈，时针就会慢慢过度到一个大刻度，
        * 那么分针每走一个小刻度，时针在每个大刻度(大刻度之间的度数为30度)之间过度的角度为：30/60 = 0.5度
        */
        this.drawNeedle(ctx, time.getHours() * 30 + time.getMinutes() * 0.5, hourHandColor, this.hourHandLen);
        this.drawNeedle(ctx, time.getMinutes() * 6, minuteHandColor, this.minuteHandLen);
        this.drawNeedle(ctx, time.getSeconds() * 6, secondHandColor, this.secondHandLen);
    };
    Clock.prototype.drawNeedle = function (ctx, angle, color, len) {
        var radian = this.angle2radian(angle);
        var start = this.polarCoordinates2canvasCoordinates(-this.headLen, radian);
        var end = this.polarCoordinates2canvasCoordinates(len, radian);
        ctx.beginPath();
        ctx.save();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.strokeStyle = color;
        if (len == this.hourHandLen) {
            ctx.lineWidth = 3;
        }
        else if (len == this.minuteHandLen) {
            ctx.lineWidth = 2;
        }
        ctx.stroke();
        if (len == this.secondHandLen) {
            ctx.beginPath();
            ctx.fillStyle = color;
            //表盘中心圆点
            ctx.arc(this.halfSize, this.halfSize, 3, 0, 2 * Math.PI);
            ctx.fill();
            ctx.beginPath();
            //时针针尾圆点
            var _a = this.polarCoordinates2canvasCoordinates(len - 10, radian), x = _a.x, y = _a.y;
            ctx.arc(x, y, 2, 0, 2 * Math.PI);
            ctx.fill();
        }
        ctx.restore();
    };
    /**
     * 显示一个时间
     * @param time 默认值当前时间
     */
    Clock.prototype.show = function (time) {
        var _a = this.options, size = _a.size, borderImage = _a.borderImage, backgroundImage = _a.backgroundImage;
        var _b = this, ctx = _b.ctx, hourFontSize = _b.hourFontSize;
        this.ctx.clearRect(0, 0, size, size);
        if ((borderImage && !this.borderPattern) || (backgroundImage && !this.backgroundImage)) {
            ctx.save();
            ctx.font = hourFontSize + "px \u5FAE\u8F6F\u96C5\u9ED1";
            ctx.fillText("loading...", this.halfSize, this.halfSize);
            ctx.stroke();
            return;
        }
        //表盘
        ctx.drawImage(this.dialCanvas, 0, 0);
        if ("string" == typeof time) {
            if (!/^\d{1,2}(:\d{1,2}){2}$/.test(time)) {
                throw new Error("参数格式：HH:mm:ss");
            }
            var _c = time.split(":").map(function (o) { return parseInt(o); }), h = _c[0], m = _c[1], s = _c[2];
            time = new Date();
            time.setHours(h);
            time.setMinutes(m);
            time.setSeconds(s);
        }
        //时针
        this.drawHand(ctx, time);
        return this;
    };
    /**运行模拟时钟 */
    Clock.prototype.run = function () {
        var _this = this;
        this.show();
        if (!this.interval) {
            this.interval = setInterval(function () {
                _this.show();
            }, 1000);
        }
        return this;
    };
    /**停止模拟时钟 */
    Clock.prototype.stop = function () {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    };
    return Clock;
}());
