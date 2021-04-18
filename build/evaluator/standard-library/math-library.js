"use strict";
exports.__esModule = true;
exports.MathLibrary = void 0;
var MathLibrary = /** @class */ (function () {
    function MathLibrary() {
    }
    MathLibrary.prototype.callLibraryFunction = function (funcName, args) {
        // TODO: run time type check
        switch (funcName) {
            case 'math_abs':
                return Math.abs(args[0]);
            case 'math_ceil':
                return Math.ceil(args[0]);
            case 'math_floor':
                return Math.floor(args[0]);
            case 'math_sqrt':
                return Math.sqrt(args[0]);
            case 'math_max':
                return this.max(args);
            case 'math_min':
                return this.min(args);
        }
    };
    MathLibrary.prototype.max = function (args) {
        var max = args[0];
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var arg = args_1[_i];
            if (arg > max) {
                max = arg;
            }
        }
        return max;
    };
    MathLibrary.prototype.min = function (args) {
        var min = args[0];
        for (var _i = 0, args_2 = args; _i < args_2.length; _i++) {
            var arg = args_2[_i];
            if (arg < min) {
                min = arg;
            }
        }
        return min;
    };
    return MathLibrary;
}());
exports.MathLibrary = MathLibrary;
