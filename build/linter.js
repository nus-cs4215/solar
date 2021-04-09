"use strict";
exports.__esModule = true;
exports.Linter = void 0;
var Linter = /** @class */ (function () {
    function Linter() {
    }
    Linter.prototype.analyse = function (ast) {
        for (var _i = 0, _a = ast.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c, false);
        }
    };
    Linter.prototype.analyseComponent = function (component, insideFunction) {
        switch (component.type) {
            case 'IfStatement':
                return this.analyseIfStatement(component, insideFunction);
            case 'WhileStatement':
                return this.analyseWhileLoop(component, insideFunction);
            case 'ForNumericStatement':
                return this.analyseNumericForLoop(component, insideFunction);
            case 'ForGenericStatement':
                return this.analyseGenericForLoop(component, insideFunction);
            case 'ReturnStatement':
                if (!insideFunction) {
                    var errorMsg = 'Syntax Error: return cannot be used outside a function';
                    console.log(errorMsg);
                    throw errorMsg;
                }
            default:
                console.debug("This component is a " + component.type + ", no need to analyse.");
        }
    };
    Linter.prototype.analyseIfStatement = function (component, insideFunction) {
        for (var _i = 0, _a = component.clauses; _i < _a.length; _i++) {
            var clause = _a[_i];
            for (var _b = 0, _c = clause.body; _b < _c.length; _b++) {
                var c = _c[_b];
                this.analyseComponent(c, insideFunction);
            }
        }
    };
    Linter.prototype.analyseWhileLoop = function (component, insideFunction) {
        for (var _i = 0, _a = component.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c, insideFunction);
        }
    };
    Linter.prototype.analyseNumericForLoop = function (component, insideFunction) {
        for (var _i = 0, _a = component.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c, insideFunction);
        }
    };
    Linter.prototype.analyseGenericForLoop = function (component, insideFunction) {
        for (var _i = 0, _a = component.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c, insideFunction);
        }
    };
    return Linter;
}());
exports.Linter = Linter;
