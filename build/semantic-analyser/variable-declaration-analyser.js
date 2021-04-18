"use strict";
exports.__esModule = true;
exports.VariableDeclarationAnalyser = void 0;
var VariableDeclarationAnalyser = /** @class */ (function () {
    function VariableDeclarationAnalyser() {
    }
    // entry point. ast is the syntax tree of the entire program.
    VariableDeclarationAnalyser.prototype.analyse = function (ast) {
        for (var _i = 0, _a = ast.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c);
        }
    };
    VariableDeclarationAnalyser.prototype.analyseComponent = function (component) {
        switch (component.type) {
            case 'IfStatement':
                return this.analyseIfStatement(component);
            case 'WhileStatement':
            case 'ForNumericStatement':
            case 'ForGenericStatement':
            case 'FunctionDeclaration':
                return this.analyseBlock(component);
            case 'LetStatement':
                return this.analyseVariableDeclaration(component);
        }
    };
    VariableDeclarationAnalyser.prototype.analyseIfStatement = function (component) {
        for (var _i = 0, _a = component.clauses; _i < _a.length; _i++) {
            var clause = _a[_i];
            this.analyseBlock(clause);
        }
    };
    VariableDeclarationAnalyser.prototype.analyseBlock = function (component) {
        for (var _i = 0, _a = component.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c);
        }
    };
    VariableDeclarationAnalyser.prototype.analyseVariableDeclaration = function (component) {
        if (component.variables.length !== 1 || component.init.length !== 1) {
            var errorMsg = 'Syntax Error: Variable declaration should have 1 symbol on the left and 1 value on the right. Eg. let x = 1';
            console.log(errorMsg);
            throw errorMsg;
        }
    };
    return VariableDeclarationAnalyser;
}());
exports.VariableDeclarationAnalyser = VariableDeclarationAnalyser;
