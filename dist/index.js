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
        this.currentFps = 0;
        this.options = options;
        this.animation = this.getAnimation(animation);
    }
    RequestAnimationFrameFps.prototype.getAnimation = function (animation) {
        var _this = this;
        var frameMillisecond = 1000 / this.options.fps;
        var lastAnimatedTime = performance.now();
        return function () {
            var currentTime = performance.now();
            var timeDiff = currentTime - lastAnimatedTime;
            if (_this.options.fps === defaultOptions.fps || timeDiff >= frameMillisecond) {
                animation();
                lastAnimatedTime = currentTime;
                _this.currentFps = 1000 / timeDiff;
            }
            _this.id = requestAnimationFrame(_this.animation);
        };
    };
    RequestAnimationFrameFps.prototype.isRunning = function () {
        return this.id != null;
    };
    RequestAnimationFrameFps.prototype.start = function () {
        if (this.isRunning()) {
            throw new Error("Animation is still running! ID[" + this.id + "]");
        }
        this.id = requestAnimationFrame(this.animation);
    };
    RequestAnimationFrameFps.prototype.stop = function () {
        if (!this.id) {
            throw new Error('Animation is not running!');
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
