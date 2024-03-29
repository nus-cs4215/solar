"use strict";
exports.__esModule = true;
exports.ArgsLengthAnalyser = void 0;
// Scans for any library function call with the incorrect number of arguments
var ArgsLengthAnalyser = /** @class */ (function () {
    function ArgsLengthAnalyser() {
    }
    // entry point. ast is the syntax tree of the entire program.
    ArgsLengthAnalyser.prototype.analyse = function (ast) {
        for (var _i = 0, _a = ast.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c);
        }
    };
    ArgsLengthAnalyser.prototype.analyseComponent = function (component) {
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
            case 'CallStatement':
                return this.analyseCallExpression(component.expression);
            case 'CallExpression':
                return this.analyseCallExpression(component);
        }
    };
    ArgsLengthAnalyser.prototype.analyseIfStatement = function (component) {
        for (var _i = 0, _a = component.clauses; _i < _a.length; _i++) {
            var clause = _a[_i];
            this.analyseBlock(clause);
        }
    };
    ArgsLengthAnalyser.prototype.analyseBlock = function (component) {
        for (var _i = 0, _a = component.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c);
        }
    };
    ArgsLengthAnalyser.prototype.analyseVariableDeclaration = function (component) {
        this.analyseComponent(component.init[0]);
    };
    ArgsLengthAnalyser.prototype.analyseCallExpression = function (component) {
        var funcName = component.base.name;
        var argsLength = component.arguments.length;
        this.argsLengthCheck(funcName, argsLength);
        this.analyseArgs(component);
    };
    ArgsLengthAnalyser.prototype.analyseArgs = function (component) {
        for (var _i = 0, _a = component.arguments; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c);
        }
    };
    ArgsLengthAnalyser.prototype.argsLengthCheck = function (funcName, argsLen) {
        switch (funcName) {
            case 'print':
            case 'math_abs':
            case 'math_ceil':
            case 'math_floor':
            case 'math_sqrt':
            case 'str_len':
            case 'str_reverse':
            case 'arr_len':
            case 'arr_reverse':
            case 'arr_sort':
            case 'arr_pop':
            case 'tbl_len':
                if (argsLen !== 1) {
                    var errorMsg = "Syntax Error: " + funcName + "() takes 1 parameter";
                    console.log(errorMsg);
                    throw errorMsg;
                }
                else {
                    return;
                }
            case 'str_split':
            case 'arr_push':
            case 'arr_get':
            case 'tbl_contains':
            case 'tbl_remove':
            case 'tbl_get':
                if (argsLen !== 2) {
                    var errorMsg = "Syntax Error: " + funcName + "() takes 2 parameters";
                    console.log(errorMsg);
                    throw errorMsg;
                }
                else {
                    return;
                }
            case 'str_substring':
            case 'arr_set':
            case 'tbl_put':
                if (argsLen !== 3) {
                    var errorMsg = "Syntax Error: " + funcName + "() takes 3 parameters";
                    console.log(errorMsg);
                    throw errorMsg;
                }
                else {
                    return;
                }
            case 'math_max':
            case 'math_min':
                if (argsLen < 2) {
                    var errorMsg = "Syntax Error: " + funcName + "() takes 2 or more parameters";
                    console.log(errorMsg);
                    throw errorMsg;
                }
                else {
                    return;
                }
        }
    };
    return ArgsLengthAnalyser;
}());
exports.ArgsLengthAnalyser = ArgsLengthAnalyser;
