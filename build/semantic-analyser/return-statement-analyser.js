"use strict";
exports.__esModule = true;
exports.ReturnStatementAnalyser = void 0;
// Scans an if block or loop block to see if it illegally contains a return statement
var ReturnStatementAnalyser = /** @class */ (function () {
    function ReturnStatementAnalyser() {
    }
    // entry point. ast is the syntax tree of the entire program.
    ReturnStatementAnalyser.prototype.analyse = function (ast) {
        for (var _i = 0, _a = ast.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c);
        }
    };
    ReturnStatementAnalyser.prototype.analyseComponent = function (component) {
        switch (component.type) {
            case 'IfStatement':
                return this.analyseIfStatement(component);
            case 'WhileStatement':
                return this.analyseWhileLoop(component);
            case 'ForNumericStatement':
                return this.analyseNumericForLoop(component);
            case 'ForGenericStatement':
                return this.analyseGenericForLoop(component);
            case 'ReturnStatement':
                var errorMsg = 'Syntax Error: return cannot be used outside a function';
                console.log(errorMsg);
                throw errorMsg;
            default:
                console.error("ReturnStatementAnalyser: This component is a " + component.type + ", no need to analyse.");
        }
    };
    ReturnStatementAnalyser.prototype.analyseIfStatement = function (component) {
        for (var _i = 0, _a = component.clauses; _i < _a.length; _i++) {
            var clause = _a[_i];
            for (var _b = 0, _c = clause.body; _b < _c.length; _b++) {
                var c = _c[_b];
                this.analyseComponent(c);
            }
        }
    };
    ReturnStatementAnalyser.prototype.analyseWhileLoop = function (component) {
        for (var _i = 0, _a = component.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c);
        }
    };
    ReturnStatementAnalyser.prototype.analyseNumericForLoop = function (component) {
        for (var _i = 0, _a = component.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c);
        }
    };
    ReturnStatementAnalyser.prototype.analyseGenericForLoop = function (component) {
        for (var _i = 0, _a = component.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c);
        }
    };
    return ReturnStatementAnalyser;
}());
exports.ReturnStatementAnalyser = ReturnStatementAnalyser;
