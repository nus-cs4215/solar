"use strict";
exports.__esModule = true;
exports.Scope = void 0;
/*
    Every scope has its own symbol table.
    It also has a link to its parent scope.
*/
var Scope = /** @class */ (function () {
    function Scope(symbolTable, parent) {
        this.symbolTable = symbolTable;
        this.parent = parent;
    }
    Scope.prototype.lookup = function (symbol) {
        if (symbol in this.symbolTable) {
            return this.symbolTable[symbol];
        }
        else {
            if (this.isGlobalScope()) {
                throw 'symbol not defined';
            }
            else {
                return this.parent.lookup(symbol);
            }
        }
    };
    Scope.prototype.isGlobalScope = function () {
        return this.parent === null;
    };
    return Scope;
}());
exports.Scope = Scope;
