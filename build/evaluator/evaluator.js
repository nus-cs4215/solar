"use strict";
exports.__esModule = true;
exports.Evaluator = void 0;
var scope_1 = require("./scope");
var break_1 = require("./instructions/break");
var return_1 = require("./instructions/return");
var tail_recursion_1 = require("./instructions/tail-recursion");
var math_library_1 = require("./standard-library/math-library");
var string_library_1 = require("./standard-library/string-library");
var array_library_1 = require("./standard-library/array-library");
var table_library_1 = require("./standard-library/table-library");
var Evaluator = /** @class */ (function () {
    function Evaluator() {
        this.globalScope = new scope_1.Scope(null);
    }
    // entry point. ast is the syntax tree of the entire program.
    Evaluator.prototype.evaluate = function (ast) {
        for (var _i = 0, _a = ast.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.evalComponent(c, this.globalScope);
        }
    };
    Evaluator.prototype.evalComponent = function (component, scope) {
        switch (component.type) {
            case 'StringLiteral':
            case 'NumericLiteral':
            case 'BooleanLiteral':
                return this.evalLiteral(component);
            case 'Identifier':
                return this.evalSymbol(component, scope);
            case 'LetStatement':
                return this.evalVariableDeclaration(component, scope);
            case 'AssignmentStatement':
                return this.evalAssignment(component, scope);
            case 'UnaryExpression':
                return this.evalUnaryExpression(component, scope);
            case 'BinaryExpression':
                return this.evalBinaryExpression(component, scope);
            case 'LogicalExpression':
                return this.evalLogicalExpression(component, scope);
            case 'IfStatement':
                return this.evalIfStatement(component, scope);
            case 'WhileStatement':
                return this.evalWhileLoop(component, scope);
            case 'ForNumericStatement':
                return this.evalNumericForLoop(component, scope);
            case 'ForGenericStatement':
                return this.evalGenericForLoop(component, scope);
            case 'BreakStatement':
                return new break_1.Break();
            case 'FunctionDeclaration':
                return this.evalFunctionDeclaration(component, scope);
            case 'CallStatement':
                return this.evalCallExpression(component.expression, scope);
            case 'CallExpression':
                return this.evalCallExpression(component, scope);
            case 'ReturnStatement':
                return this.evalReturnStatement(component, scope);
            case 'ContainerConstructorExpression':
                return this.evalContainer(component, scope);
            default:
                console.log('Syntax Error');
                throw 'Syntax Error';
        }
    };
    Evaluator.prototype.evalLiteral = function (component) {
        if (component.type === 'StringLiteral') {
            var strLiteral = component.raw.slice(1, -1); // remove the outermost quotes
            return strLiteral;
        }
        else {
            return component.value;
        }
    };
    Evaluator.prototype.evalSymbol = function (component, scope) {
        var symbol = component.name;
        return scope.lookup(symbol);
    };
    Evaluator.prototype.evalVariableDeclaration = function (component, scope) {
        var symbol = component.variables[0].name;
        var value = this.evalComponent(component.init[0], scope);
        scope.declare(symbol, value);
    };
    Evaluator.prototype.evalAssignment = function (component, scope) {
        var symbol = component.variables[0].name;
        var value = this.evalComponent(component.init[0], scope);
        scope.assign(symbol, value);
    };
    Evaluator.prototype.evalUnaryExpression = function (component, scope) {
        var argument = this.evalComponent(component.argument, scope);
        if (component.operator === 'not' && typeof argument === 'boolean') {
            return !argument;
        }
        else if (component.operator === '-' && typeof argument === 'number') {
            return -argument;
        }
        else {
            var errorMsg = 'Type Error: No such unary operation';
            console.log(errorMsg);
            throw errorMsg;
        }
    };
    Evaluator.prototype.evalBinaryExpression = function (component, scope) {
        var left = this.evalComponent(component.left, scope);
        var right = this.evalComponent(component.right, scope);
        var bothSidesAreNumbers = typeof left === 'number' && typeof right === 'number';
        var bothSidesAreStrings = typeof left === 'string' && typeof right === 'string';
        if (component.operator === '^' && bothSidesAreNumbers) {
            return Math.pow(left, right);
        }
        else if (component.operator === '%' && bothSidesAreNumbers) {
            return left % right;
        }
        else if (component.operator === '//' && bothSidesAreNumbers) {
            return Math.floor(left / right);
        }
        else if (component.operator === '*' && bothSidesAreNumbers) {
            return left * right;
        }
        else if (component.operator === '/' && bothSidesAreNumbers) {
            return left / right;
        }
        else if (component.operator === '-' && bothSidesAreNumbers) {
            return left - right;
        }
        else if (component.operator === '+' && bothSidesAreNumbers) {
            return left + right;
        }
        else if (component.operator === '+' && bothSidesAreStrings) {
            return left + right; // string concat
        }
        else if (component.operator === '==' && bothSidesAreNumbers) {
            return left === right;
        }
        else if (component.operator === '==' && bothSidesAreStrings) {
            return left === right;
        }
        else if (component.operator === '~=' && bothSidesAreNumbers) {
            return left !== right;
        }
        else if (component.operator === '~=' && bothSidesAreStrings) {
            return left !== right;
        }
        else if (component.operator === '>' && bothSidesAreNumbers) {
            return left > right;
        }
        else if (component.operator === '>' && bothSidesAreStrings) {
            return left > right;
        }
        else if (component.operator === '>=' && bothSidesAreNumbers) {
            return left >= right;
        }
        else if (component.operator === '>=' && bothSidesAreStrings) {
            return left >= right;
        }
        else if (component.operator === '<' && bothSidesAreNumbers) {
            return left < right;
        }
        else if (component.operator === '<' && bothSidesAreStrings) {
            return left < right;
        }
        else if (component.operator === '<=' && bothSidesAreNumbers) {
            return left <= right;
        }
        else if (component.operator === '<=' && bothSidesAreStrings) {
            return left <= right;
        }
        else {
            var errorMsg = 'Type Error: No such binary operation';
            console.log(errorMsg);
            throw errorMsg;
        }
    };
    Evaluator.prototype.evalLogicalExpression = function (component, scope) {
        var left = this.evalComponent(component.left, scope);
        var right = this.evalComponent(component.right, scope);
        if (component.operator === 'and' && typeof left === 'boolean' && typeof right === 'boolean') {
            return left && right;
        }
        else if (component.operator === 'or' && typeof left === 'boolean' && typeof right === 'boolean') {
            return left || right;
        }
        else {
            var errorMsg = 'Type Error: No such logical operation';
            console.log(errorMsg);
            throw errorMsg;
        }
    };
    Evaluator.prototype.evalIfStatement = function (component, scope) {
        var res = this.evalNonElseClauses(component, scope);
        if (res === false) {
            return this.evalElseClause(component, scope);
        }
        else {
            return res;
        }
    };
    Evaluator.prototype.evalNonElseClauses = function (component, scope) {
        for (var _i = 0, _a = component.clauses; _i < _a.length; _i++) {
            var clause = _a[_i];
            if (clause.type === 'ElseClause')
                return false;
            // we only evaluate the non-else clauses, and short circuit if necessary
            var condition = this.evalComponent(clause.condition, scope);
            if (condition === true) {
                var clauseScope = new scope_1.Scope(scope);
                for (var _b = 0, _c = clause.body; _b < _c.length; _b++) {
                    var c = _c[_b];
                    var evaluatedC = this.evalComponent(c, clauseScope);
                    if (evaluatedC instanceof break_1.Break || evaluatedC instanceof return_1.Return || evaluatedC instanceof tail_recursion_1.TailRecursion) {
                        return evaluatedC;
                    }
                }
                return;
            }
        }
    };
    Evaluator.prototype.hasElseClause = function (component) {
        var lastClause = component.clauses[component.clauses.length - 1];
        return lastClause.type === 'ElseClause';
    };
    Evaluator.prototype.evalElseClause = function (component, scope) {
        if (this.hasElseClause(component)) {
            var elseClause = component.clauses[component.clauses.length - 1]; // last clause
            var elseClauseScope = new scope_1.Scope(scope);
            for (var _i = 0, _a = elseClause.body; _i < _a.length; _i++) {
                var c = _a[_i];
                var evaluatedC = this.evalComponent(c, elseClauseScope);
                if (evaluatedC instanceof break_1.Break || evaluatedC instanceof return_1.Return || evaluatedC instanceof tail_recursion_1.TailRecursion) {
                    return evaluatedC;
                }
            }
        }
    };
    Evaluator.prototype.evalWhileLoop = function (component, scope) {
        var whileLoopScope = new scope_1.Scope(scope);
        var condition = this.evalComponent(component.condition, scope);
        while (condition === true) {
            for (var _i = 0, _a = component.body; _i < _a.length; _i++) {
                var c = _a[_i];
                var evaluatedC = this.evalComponent(c, whileLoopScope);
                condition = this.evalComponent(component.condition, scope); // while loop body might modify while loop condition
                if (evaluatedC instanceof break_1.Break || evaluatedC instanceof return_1.Return || evaluatedC instanceof tail_recursion_1.TailRecursion) {
                    return evaluatedC;
                }
            }
        }
    };
    Evaluator.prototype.evalNumericForLoop = function (component, scope) {
        var forLoopScope = new scope_1.Scope(scope);
        var loopControlVariable = component.variable.name;
        var start = this.evalComponent(component.start, scope);
        var end = this.evalComponent(component.end, scope);
        var step = this.evalComponent(component.step, scope);
        for (var i = start; i < end; i += step) {
            forLoopScope.symbolTable[loopControlVariable] = i;
            for (var _i = 0, _a = component.body; _i < _a.length; _i++) {
                var c = _a[_i];
                var evaluatedC = this.evalComponent(c, forLoopScope);
                if (evaluatedC instanceof break_1.Break || evaluatedC instanceof return_1.Return || evaluatedC instanceof tail_recursion_1.TailRecursion) {
                    return evaluatedC;
                }
            }
        }
    };
    Evaluator.prototype.evalGenericForLoop = function (component, scope) {
        var expr = this.evalComponent(component.iterators[0], scope);
        if (this.exprIsArray(expr)) {
            return this.evalGenericForLoopThroughArray(component, scope);
        }
        else if (this.exprIsTable(expr)) {
            return this.evalGenericForLoopThroughTable(component, scope);
        }
        else {
            var errorMsg = "Type Error: " + component.iterators[0].name + " is neither an array nor table";
            console.log(errorMsg);
            throw errorMsg;
        }
    };
    Evaluator.prototype.exprIsArray = function (expr) {
        return Array.isArray(expr);
    };
    Evaluator.prototype.exprIsTable = function (expr) {
        return (expr instanceof Object) && !this.exprIsArray(expr) && !this.exprIsFunc(expr);
    };
    Evaluator.prototype.exprIsFunc = function (expr) {
        return expr.isFunc === true;
    };
    Evaluator.prototype.evalGenericForLoopThroughArray = function (component, scope) {
        if (component.variables.length !== 1) {
            var errorMsg = 'Syntax Error: Generic For Loop through array takes 1 loop variable';
            console.log(errorMsg);
            throw errorMsg;
        }
        var forLoopScope = new scope_1.Scope(scope);
        var itemSymbol = component.variables[0].name;
        var container = this.evalComponent(component.iterators[0], scope);
        for (var _i = 0, container_1 = container; _i < container_1.length; _i++) {
            var item = container_1[_i];
            forLoopScope.symbolTable[itemSymbol] = item;
            for (var _a = 0, _b = component.body; _a < _b.length; _a++) {
                var c = _b[_a];
                var evaluatedC = this.evalComponent(c, forLoopScope);
                if (evaluatedC instanceof break_1.Break || evaluatedC instanceof return_1.Return || evaluatedC instanceof tail_recursion_1.TailRecursion) {
                    return evaluatedC;
                }
            }
        }
    };
    Evaluator.prototype.evalGenericForLoopThroughTable = function (component, scope) {
        if (component.variables.length !== 2) {
            var errorMsg = 'Syntax Error: Generic For Loop through table takes 2 loop variables';
            console.log(errorMsg);
            throw errorMsg;
        }
        var forLoopScope = new scope_1.Scope(scope);
        var keySymbol = component.variables[0].name;
        var valueSymbol = component.variables[1].name;
        var container = this.evalComponent(component.iterators[0], scope);
        for (var _i = 0, _a = Object.entries(container); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            forLoopScope.symbolTable[keySymbol] = key;
            forLoopScope.symbolTable[valueSymbol] = value;
            for (var _c = 0, _d = component.body; _c < _d.length; _c++) {
                var c = _d[_c];
                var evaluatedC = this.evalComponent(c, forLoopScope);
                if (evaluatedC instanceof break_1.Break || evaluatedC instanceof return_1.Return || evaluatedC instanceof tail_recursion_1.TailRecursion) {
                    return evaluatedC;
                }
            }
        }
    };
    Evaluator.prototype.evalFunctionDeclaration = function (component, scope) {
        if (scope !== this.globalScope) {
            var errorMsg = 'Syntax Error: Functions can only be declared in the global scope';
            console.log(errorMsg);
            throw errorMsg;
        }
        var funcSymbol = component.identifier.name;
        var funcParams = component.parameters.map(function (p) { return p.name; });
        var funcBody = component.body;
        var funcValue = { params: funcParams, body: funcBody, isFunc: true };
        scope.declare(funcSymbol, funcValue);
    };
    Evaluator.prototype.evalCallExpression = function (component, scope) {
        var _this = this;
        var funcName = component.base.name;
        var argsComponent = component.arguments;
        var args = argsComponent.map(function (c) { return _this.evalComponent(c, scope); });
        if (funcName === 'print') {
            this.printToConsole(args[0]);
        }
        else if (this.inMathLibrary(funcName)) {
            var mathLibrary = new math_library_1.MathLibrary();
            return mathLibrary.callLibraryFunction(funcName, args);
        }
        else if (this.inStringLibrary(funcName)) {
            var stringLibrary = new string_library_1.StringLibrary();
            return stringLibrary.callLibraryFunction(funcName, args);
        }
        else if (this.inArrayLibrary(funcName)) {
            var arrayLibrary = new array_library_1.ArrayLibrary();
            return arrayLibrary.callLibraryFunction(funcName, args);
        }
        else if (this.inTableLibrary(funcName)) {
            var tableLibray = new table_library_1.TableLibrary();
            return tableLibray.callLibraryFunction(funcName, args);
        }
        else {
            return this.callSelfDefinedFunction(funcName, args);
        }
    };
    Evaluator.prototype.printToConsole = function (arg) {
        if (this.exprIsFunc(arg)) {
            console.log('<function>');
        }
        else {
            console.log(arg);
        }
    };
    Evaluator.prototype.inMathLibrary = function (funcName) {
        return funcName === 'math_abs'
            || funcName === 'math_ceil'
            || funcName === 'math_floor'
            || funcName === 'math_sqrt'
            || funcName === 'math_max'
            || funcName === 'math_min';
    };
    Evaluator.prototype.inStringLibrary = function (funcName) {
        return funcName === 'str_len'
            || funcName === 'str_reverse'
            || funcName === 'str_split'
            || funcName === 'str_substring';
    };
    Evaluator.prototype.inArrayLibrary = function (funcName) {
        return funcName === 'arr_len'
            || funcName === 'arr_reverse'
            || funcName === 'arr_sort'
            || funcName === 'arr_pop'
            || funcName === 'arr_push'
            || funcName === 'arr_get'
            || funcName === 'arr_set';
    };
    Evaluator.prototype.inTableLibrary = function (funcName) {
        return funcName === 'tbl_len'
            || funcName === 'tbl_contains'
            || funcName === 'tbl_remove'
            || funcName === 'tbl_get'
            || funcName === 'tbl_put';
    };
    Evaluator.prototype.callSelfDefinedFunction = function (funcName, args) {
        var func = this.globalScope.lookup(funcName);
        var funcBody = func.body;
        var params = func.params;
        this.callerName = funcName;
        var funcScope = new scope_1.Scope(null);
        funcScope.storeArguments(params, args);
        for (var i = 0; i < funcBody.length; i++) {
            var c = funcBody[i];
            var evaluatedC = this.evalComponent(c, funcScope);
            if (evaluatedC instanceof return_1.Return) {
                return evaluatedC.returnValue;
            }
            if (evaluatedC instanceof tail_recursion_1.TailRecursion) {
                var newArgs = evaluatedC.args;
                funcScope.storeArguments(params, newArgs);
                i = -1; // restarts the loop. i++ would kick in immediately after this line, so this would effectively mean i = 0
            }
        }
    };
    Evaluator.prototype.evalReturnStatement = function (component, scope) {
        var _this = this;
        var returnValueComponent = component.arguments[0];
        if (this.isTailRecursion(returnValueComponent)) {
            var argsComponent = returnValueComponent.arguments;
            var args = argsComponent.map(function (c) { return _this.evalComponent(c, scope); });
            return new tail_recursion_1.TailRecursion(args);
        }
        else {
            var returnValue = this.evalComponent(component.arguments[0], scope);
            return new return_1.Return(returnValue);
        }
    };
    Evaluator.prototype.isTailRecursion = function (returnValueComponent) {
        if (returnValueComponent.type !== 'CallExpression') {
            return false;
        }
        else {
            var calleeName = returnValueComponent.base.name;
            return this.callerName === calleeName;
        }
    };
    Evaluator.prototype.evalContainer = function (component, scope) {
        var _this = this;
        if (this.componentIsArray(component)) {
            var arr = component.fields.map(function (field) { return _this.evalComponent(field.value, scope); });
            return arr;
        }
        else if (this.componentIsTable(component)) {
            var tbl = {};
            for (var _i = 0, _a = component.fields; _i < _a.length; _i++) {
                var field = _a[_i];
                var k = field.key.name;
                var v = this.evalComponent(field.value, scope);
                tbl[k] = v;
            }
            return tbl;
        }
        else {
            var errorMsg = 'Type Error: Container is neither an array nor table';
            console.log(errorMsg);
            throw errorMsg;
        }
    };
    Evaluator.prototype.componentIsArray = function (component) {
        for (var _i = 0, _a = component.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            if (field.type === 'TableKeyString') {
                return false;
            }
        }
        return true;
    };
    Evaluator.prototype.componentIsTable = function (component) {
        for (var _i = 0, _a = component.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            if (field.type === 'TableValue') {
                return false;
            }
        }
        return true;
    };
    return Evaluator;
}());
exports.Evaluator = Evaluator;
