"use strict";
exports.__esModule = true;
exports.TableLibrary = void 0;
var TableLibrary = /** @class */ (function () {
    function TableLibrary() {
    }
    TableLibrary.prototype.callLibraryFunction = function (funcName, args) {
        this.typeCheckArgs(funcName, args);
        var tbl = args[0];
        switch (funcName) {
            case 'tbl_len':
                return Object.keys(tbl).length;
            case 'tbl_contains':
                return args[1] in tbl;
            case 'tbl_remove': {
                var k = args[1];
                delete tbl[k];
                return tbl;
            }
            case 'tbl_get': {
                var k = args[1];
                return tbl[k];
            }
            case 'tbl_put': {
                var k = args[1];
                tbl[k] = args[2];
                return tbl;
            }
        }
    };
    TableLibrary.prototype.typeCheckArgs = function (funcName, args) {
        switch (funcName) {
            case 'tbl_len':
                if (this.exprIsTable(args[0])) {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "({T})";
                    console.log(errorMsg);
                    throw errorMsg;
                }
            case 'tbl_contains':
            case 'tbl_remove':
            case 'tbl_get':
                if (this.exprIsTable(args[0]) && typeof args[1] === 'string') {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "({T}, string)";
                    console.log(errorMsg);
                    throw errorMsg;
                }
            case 'tbl_put':
                if (this.exprIsTable(args[0]) && typeof args[1] === 'string' && !this.exprIsFunc(args[2])) {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "({T}, string, T)";
                    console.log(errorMsg);
                    throw errorMsg;
                }
        }
    };
    TableLibrary.prototype.exprIsTable = function (expr) {
        return (expr instanceof Object) && !this.exprIsArray(expr) && !this.exprIsFunc(expr);
    };
    TableLibrary.prototype.exprIsArray = function (expr) {
        return Array.isArray(expr);
    };
    TableLibrary.prototype.exprIsFunc = function (expr) {
        return expr.isFunc === true;
    };
    return TableLibrary;
}());
exports.TableLibrary = TableLibrary;
