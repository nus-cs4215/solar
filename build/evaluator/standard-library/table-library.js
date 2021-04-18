"use strict";
exports.__esModule = true;
exports.TableLibrary = void 0;
var TableLibrary = /** @class */ (function () {
    function TableLibrary() {
    }
    TableLibrary.prototype.callLibraryFunction = function (funcName, args) {
        // TODO: run time type check
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
    return TableLibrary;
}());
exports.TableLibrary = TableLibrary;
