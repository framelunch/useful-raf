"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var defaultOptions = {
    fps: 60,
};
var RequestAnimationFrameFps = (function () {
    function RequestAnimationFrameFps(animation, options) {
        this.id = null;
        this.options = options;
        this.animation = this.getAnimation(animation);
    }
    RequestAnimationFrameFps.prototype.getAnimation = function (animation) {
        var _this = this;
        var startTime = performance.now();
        var lastFrame = 0;
        return function () {
            var timeDiff = performance.now() - startTime;
            var frame = Math.ceil(timeDiff / (1000 / _this.options.fps));
            if (lastFrame < frame) {
                animation();
                lastFrame = frame;
            }
            _this.id = requestAnimationFrame(_this.animation);
        };
    };
    RequestAnimationFrameFps.prototype.start = function () {
        if (this.id) {
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
