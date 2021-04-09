"use strict";
exports.__esModule = true;
exports.Error = void 0;
var Error = /** @class */ (function () {
    function Error(type, message, returnValue) {
        if (returnValue === void 0) { returnValue = 'Nope'; }
        this.type = type;
        this.message = message;
        this.returnValue = returnValue;
    }
    return Error;
}());
exports.Error = Error;
