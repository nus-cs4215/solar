"use strict";
exports.__esModule = true;
exports.StringLibrary = void 0;
var StringLibrary = /** @class */ (function () {
    function StringLibrary() {
    }
    StringLibrary.prototype.callLibraryFunction = function (funcName, args) {
        // TODO: run time type check
        switch (funcName) {
            case 'str_len':
                return args[0].length;
            case 'str_reverse':
                return this.reverseString(args[0]);
            case 'str_split':
                return args[0].split(args[1]);
            case 'str_substring':
                return args[0].substring(args[1], args[2]);
            default:
                var errorMsg = 'Syntax Error: No such function in String Library';
                console.log(errorMsg);
                throw errorMsg;
        }
    };
    StringLibrary.prototype.reverseString = function (str) {
        return str.split('').reverse().join('');
    };
    return StringLibrary;
}());
exports.StringLibrary = StringLibrary;