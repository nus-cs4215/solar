"use strict";
exports.__esModule = true;
exports.ArrayLibrary = void 0;
var ArrayLibrary = /** @class */ (function () {
    function ArrayLibrary() {
    }
    ArrayLibrary.prototype.callLibraryFunction = function (funcName, args) {
        this.typeCheckArgs(funcName, args);
        var arr = args[0];
        switch (funcName) {
            case 'arr_len':
                return arr.length;
            case 'arr_reverse':
                arr.reverse();
                return arr;
            case 'arr_sort':
                arr.sort();
                return arr;
            case 'arr_pop':
                arr.pop();
                return arr;
            case 'arr_push':
                arr.push(args[1]);
                return arr;
            case 'arr_get': {
                var idx = args[1];
                return arr[idx];
            }
            case 'arr_set': {
                var idx = args[1];
                arr[idx] = args[2];
                return arr;
            }
        }
    };
    ArrayLibrary.prototype.typeCheckArgs = function (funcName, args) {
        switch (funcName) {
            case 'arr_len':
            case 'arr_reverse':
            case 'arr_sort':
            case 'arr_pop':
                if (this.exprIsArray(args[0])) {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "([T])";
                    console.log(errorMsg);
                    throw errorMsg;
                }
            case 'arr_push':
                if (this.exprIsArray(args[0]) && !this.exprIsFunc(args[1])) {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "([T], T)";
                    console.log(errorMsg);
                    throw errorMsg;
                }
            case 'arr_get':
                if (this.exprIsArray(args[0]) && typeof args[1] === 'number') {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "([T], number)";
                    console.log(errorMsg);
                    throw errorMsg;
                }
            case 'arr_set':
                if (this.exprIsArray(args[0]) && typeof args[1] === 'number' && !this.exprIsFunc(args[2])) {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "([T], number, T)";
                    console.log(errorMsg);
                    throw errorMsg;
                }
        }
    };
    ArrayLibrary.prototype.exprIsArray = function (expr) {
        return Array.isArray(expr);
    };
    ArrayLibrary.prototype.exprIsFunc = function (expr) {
        return expr.isFunc === true;
    };
    return ArrayLibrary;
}());
exports.ArrayLibrary = ArrayLibrary;
