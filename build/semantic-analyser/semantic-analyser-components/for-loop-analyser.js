"use strict";
exports.__esModule = true;
exports.ForLoopAnalyser = void 0;
var ForLoopAnalyser = /** @class */ (function () {
    function ForLoopAnalyser() {
    }
    // entry point. ast is the syntax tree of the entire program.
    ForLoopAnalyser.prototype.analyse = function (ast) {
        for (var _i = 0, _a = ast.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c);
        }
    };
    ForLoopAnalyser.prototype.analyseComponent = function (component) {
        switch (component.type) {
            case 'IfStatement':
                return this.analyseIfStatement(component);
            case 'WhileStatement':
            case 'FunctionDeclaration':
                return this.analyseBlock(component);
            case 'ForNumericStatement':
                return this.analyseNumericForLoop(component);
            case 'ForGenericStatement':
                return this.analyseGenericForLoop(component);
        }
    };
    ForLoopAnalyser.prototype.analyseIfStatement = function (component) {
        for (var _i = 0, _a = component.clauses; _i < _a.length; _i++) {
            var clause = _a[_i];
            this.analyseBlock(clause);
        }
    };
    ForLoopAnalyser.prototype.analyseBlock = function (component) {
        for (var _i = 0, _a = component.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c);
        }
    };
    ForLoopAnalyser.prototype.analyseNumericForLoop = function (component) {
        if (component.step === null) {
            var errorMsg = 'Syntax Error: Numeric For Loop requires a step size';
            console.log(errorMsg);
            throw errorMsg;
        }
        this.analyseBlock(component);
    };
    ForLoopAnalyser.prototype.analyseGenericForLoop = function (component) {
        if (component.iterators[0].type !== 'Identifier') {
            var errorMsg = 'Syntax Error: Container referenced must be a symbol, not a literal';
            console.log(errorMsg);
            throw errorMsg;
        }
        if (component.iterators.length !== 1) {
            var errorMsg = 'Syntax Error: Generic For Loop can only iterate through 1 container';
            console.log(errorMsg);
            throw errorMsg;
        }
        this.analyseBlock(component);
    };
    return ForLoopAnalyser;
}());
exports.ForLoopAnalyser = ForLoopAnalyser;
