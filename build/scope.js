"use strict";
exports.__esModule = true;
exports.Scope = void 0;
/*
    Every scope has its own symbol table.
    It also has a link to its parent scope.
*/
var Scope = /** @class */ (function () {
    function Scope(parent) {
        this.symbolTable = {};
        this.parent = parent;
    }
    Scope.prototype.lookup = function (symbol) {
        if (symbol in this.symbolTable) {
            return this.symbolTable[symbol];
        }
        else {
            if (this.parent === null) {
                throw 'symbol not defined';
            }
            else {
                return this.parent.lookup(symbol);
            }
        }
    };
    Scope.prototype.assign = function (symbol, value) {
        if (symbol in this.symbolTable) {
            this.symbolTable[symbol] = value;
        }
        else {
            if (this.parent === null) {
                throw 'symbol not defined';
            }
            else {
                this.parent.assign(symbol, value);
            }
        }
    };
    // this method is only called by function scopes
    Scope.prototype.storeArguments = function (params, args) {
        if (params.length != args.length) {
            throw 'Number of params should be equals to number of args';
        }
        var n = params.length;
        for (var i = 0; i < n; ++i) {
            var symbol = params[i];
            var value = args[i];
            this.symbolTable[symbol] = value;
        }
    };
    return Scope;
}());
exports.Scope = Scope;
