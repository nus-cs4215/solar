"use strict";
exports.__esModule = true;
exports.ArrayLibrary = void 0;
var ArrayLibrary = /** @class */ (function () {
    function ArrayLibrary() {
    }
    ArrayLibrary.prototype.callLibraryFunction = function (funcName, args) {
        // TODO: run time type check
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
            default:
                var errorMsg = 'Syntax Error: No such function in Array Library';
                console.log(errorMsg);
                throw errorMsg;
        }
    };
    return ArrayLibrary;
}());
exports.ArrayLibrary = ArrayLibrary;
