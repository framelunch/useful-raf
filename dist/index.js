"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var defaultOptions = {
    fps: 60,
};
if (!window.requestAnimationFrame) {
    var lastAnimatedTime_1 = 0;
    window.requestAnimationFrame =
        window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            (function (callback) {
                var currentTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currentTime - lastAnimatedTime_1));
                var id = setTimeout(function () { return callback(currentTime + timeToCall); }, timeToCall);
                lastAnimatedTime_1 = currentTime + timeToCall;
                return id;
            });
}
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame =
        window.webkitCancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.msCancelAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            window.oCancelAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            (function (id) { return clearTimeout(id); });
}
var RequestAnimationFrameFps = (function () {
    function RequestAnimationFrameFps(animation, options) {
        this.id = null;
        this.options = options;
        this.animation = this.getAnimation(animation);
    }
    RequestAnimationFrameFps.prototype.getAnimation = function (animation) {
        var _this = this;
        var startTime = performance.now();
        var frameMillisecond = 1000 / this.options.fps;
        var lastAnimatedTime = startTime;
        return function () {
            var currentTime = performance.now();
            if (currentTime - lastAnimatedTime >= frameMillisecond) {
                animation();
                lastAnimatedTime = currentTime;
            }
            _this.id = requestAnimationFrame(_this.animation);
        };
    };
    RequestAnimationFrameFps.prototype.isRunning = function () {
        return this.id != null;
    };
    RequestAnimationFrameFps.prototype.start = function () {
        if (this.isRunning()) {
            throw new Error("Animation still running! ID[" + this.id + "]");
        }
        this.id = requestAnimationFrame(this.animation);
    };
    RequestAnimationFrameFps.prototype.stop = function () {
        if (!this.id) {
            throw new Error("Animation not running! ID[" + this.id + "]");
        }
        cancelAnimationFrame(this.id);
        this.id = null;
    };
    return RequestAnimationFrameFps;
}());
function create(animation, options) {
    if (options === void 0) { options = defaultOptions; }
    return new RequestAnimationFrameFps(animation, tslib_1.__assign({}, defaultOptions, options));
}
exports.create = create;
