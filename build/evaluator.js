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
        if (this.isLiteral(component)) {
            return this.evalLiteral(component);
        }
        switch (component.type) {
            case 'Identifier':
                var symbol = component.name;
                return scope.lookup(symbol);
            case 'LetStatement':
                return this.evalDeclaration(component, scope);
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
                console.warn('This syntax tree component is unrecognised');
                console.log('Syntax Error');
                throw 'Syntax Error';
        }
    };
    Evaluator.prototype.isTailRecursion = function (returnValueComponent) {
        if (returnValueComponent.type !== 'CallExpression') {
            return false;
        }
        else {
            var funcName = returnValueComponent.base.name;
            return funcName.endsWith('_tailrec');
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
    Evaluator.prototype.evalFunctionDeclaration = function (component, scope) {
        if (scope !== this.globalScope) {
            var errorMsg = 'Syntax Error: Functions can only be declared in the global scope';
            console.log(errorMsg);
            throw errorMsg;
        }
        var funcSymbol = component.identifier.name;
        var funcParams = component.parameters.map(function (p) { return p.name; });
        var funcBody = component.body;
        var value = { params: funcParams, body: funcBody };
        scope.symbolTable[funcSymbol] = value;
    };
    Evaluator.prototype.evalDeclaration = function (component, scope) {
        var symbol = component.variables[0].name;
        var value = this.evalComponent(component.init[0], scope);
        if (symbol in scope.symbolTable) {
            var errorMsg = "Syntax Error: " + symbol + " has already been declared";
            console.log(errorMsg);
            throw errorMsg;
        }
        else {
            scope.symbolTable[symbol] = value;
        }
    };
    Evaluator.prototype.evalAssignment = function (component, scope) {
        var symbol = component.variables[0].name;
        var value = this.evalComponent(component.init[0], scope);
        scope.assign(symbol, value);
    };
    Evaluator.prototype.isArray = function (component) {
        for (var _i = 0, _a = component.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            if (field.type === 'TableKeyString') {
                return false;
            }
        }
        return true;
    };
    Evaluator.prototype.isTable = function (component) {
        for (var _i = 0, _a = component.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            if (field.type === 'TableValue') {
                return false;
            }
        }
        return true;
    };
    Evaluator.prototype.evalContainer = function (component, scope) {
        var _this = this;
        if (this.isArray(component)) {
            var arr = component.fields.map(function (field) { return _this.evalComponent(field.value, scope); });
            return arr;
        }
        else if (this.isTable(component)) {
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
    Evaluator.prototype.hasElseClause = function (component) {
        var lastClause = component.clauses[component.clauses.length - 1];
        return lastClause.type === 'ElseClause';
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
    Evaluator.prototype.evalIfStatement = function (component, scope) {
        var res = this.evalNonElseClauses(component, scope);
        if (res === false) {
            return this.evalElseClause(component, scope);
        }
        else {
            return res;
        }
    };
    Evaluator.prototype.evalCallExpression = function (component, scope) {
        var _this = this;
        var funcName = component.base.name;
        var argsComponent = component.arguments;
        var args = argsComponent.map(function (c) { return _this.evalComponent(c, scope); });
        if (funcName === 'print') {
            console.log(args[0]);
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
            if (funcName.endsWith('_tailrec')) {
                return this.callSelfDefinedFunctionTailRec(funcName, args);
            }
            else {
                return this.callSelfDefinedFunction(funcName, args);
            }
        }
    };
    Evaluator.prototype.callSelfDefinedFunctionTailRec = function (funcName, args) {
        if (!(funcName in this.globalScope.symbolTable)) {
            var errorMsg = "Syntax Error: " + funcName + " is not defined";
            console.log(errorMsg);
            throw errorMsg;
        }
        var functionScope = new scope_1.Scope(null);
        var params = this.globalScope.symbolTable[funcName].params;
        functionScope.storeArguments(params, args);
        var funcBody = this.globalScope.symbolTable[funcName].body;
        for (var i = 0; i < funcBody.length; i++) {
            var c = funcBody[i];
            var evaluatedC = this.evalComponent(c, functionScope);
            if (evaluatedC instanceof return_1.Return) {
                return evaluatedC.returnValue;
            }
            if (evaluatedC instanceof tail_recursion_1.TailRecursion) {
                var newArgs = evaluatedC.args;
                functionScope.storeArguments(params, newArgs);
                i = -1; // restarts the loop. i++ would kick in immediately after this line, so this would effectively mean i = 0
            }
        }
    };
    Evaluator.prototype.callSelfDefinedFunction = function (funcName, args) {
        if (!(funcName in this.globalScope.symbolTable)) {
            var errorMsg = "Syntax Error: " + funcName + " is not defined";
            console.log(errorMsg);
            throw errorMsg;
        }
        var functionScope = new scope_1.Scope(null);
        var params = this.globalScope.symbolTable[funcName].params;
        functionScope.storeArguments(params, args);
        var funcBody = this.globalScope.symbolTable[funcName].body;
        for (var _i = 0, funcBody_1 = funcBody; _i < funcBody_1.length; _i++) {
            var c = funcBody_1[_i];
            var evaluatedC = this.evalComponent(c, functionScope);
            if (evaluatedC instanceof return_1.Return) {
                return evaluatedC.returnValue;
            }
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
    Evaluator.prototype.evalWhileLoop = function (component, scope) {
        var whileLoopScope = new scope_1.Scope(scope);
        var condition = this.evalComponent(component.condition, scope);
        while (condition === true) {
            for (var _i = 0, _a = component.body; _i < _a.length; _i++) {
                var c = _a[_i];
                var evaluatedC = this.evalComponent(c, whileLoopScope);
                condition = this.evalComponent(component.condition, scope); // while loop body might modify while loop condition
                if (evaluatedC instanceof break_1.Break || evaluatedC instanceof return_1.Return) {
                    return evaluatedC;
                }
            }
        }
    };
    Evaluator.prototype.evalGenericForLoop = function (component, scope) {
        if (component.iterators.length !== 1) {
            var errorMsg = 'Syntax Error: Generic For Loop can only iterate through 1 container';
            console.log(errorMsg);
            throw errorMsg;
        }
        if (component.iterators[0].type !== 'Identifier') {
            var errorMsg = 'Syntax Error: Container referenced must be a symbol, not a literal';
            console.log(errorMsg);
            throw errorMsg;
        }
        var container = this.evalComponent(component.iterators[0], scope);
        if (Array.isArray(container)) {
            return this.evalGenericForLoopThroughArray(component, scope);
        }
        else {
            return this.evalGenericForLoopThroughTable(component, scope);
        }
    };
    Evaluator.prototype.evalGenericForLoopThroughArray = function (component, scope) {
        if (component.variables.length !== 1) {
            var errorMsg = 'Syntax Error: There should only be 1 loop variable';
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
                if (evaluatedC instanceof break_1.Break || evaluatedC instanceof return_1.Return) {
                    return evaluatedC;
                }
            }
        }
    };
    Evaluator.prototype.evalGenericForLoopThroughTable = function (component, scope) {
        if (component.variables.length !== 2) {
            var errorMsg = 'Syntax Error: There should be 2 loop variables, first variable for key and second variable for value';
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
                if (evaluatedC instanceof break_1.Break || evaluatedC instanceof return_1.Return) {
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
                if (evaluatedC instanceof break_1.Break || evaluatedC instanceof return_1.Return) {
                    return evaluatedC;
                }
            }
        }
    };
    Evaluator.prototype.isLiteral = function (component) {
        return component.type === 'StringLiteral'
            || component.type === 'NumericLiteral'
            || component.type === 'BooleanLiteral';
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
        else if (component.operator === '+' && bothSidesAreNumbers) {
            return left + right;
        }
        else if (component.operator === '-' && bothSidesAreNumbers) {
            return left - right;
        }
        else if (component.operator === '+' && bothSidesAreStrings) {
            return left + right; // string concat
        }
        else if (component.operator === '==' && bothSidesAreStrings) {
            return left === right;
        }
        else if (component.operator === '==' && bothSidesAreNumbers) {
            return left === right;
        }
        else if (component.operator === '~=' && bothSidesAreStrings) {
            return left !== right;
        }
        else if (component.operator === '~=' && bothSidesAreNumbers) {
            return left !== right;
        }
        else if (component.operator === '>' && bothSidesAreStrings) {
            return left > right;
        }
        else if (component.operator === '>' && bothSidesAreNumbers) {
            return left > right;
        }
        else if (component.operator === '>=' && bothSidesAreStrings) {
            return left >= right;
        }
        else if (component.operator === '>=' && bothSidesAreNumbers) {
            return left >= right;
        }
        else if (component.operator === '<' && bothSidesAreStrings) {
            return left < right;
        }
        else if (component.operator === '<' && bothSidesAreNumbers) {
            return left < right;
        }
        else if (component.operator === '<=' && bothSidesAreStrings) {
            return left <= right;
        }
        else if (component.operator === '<=' && bothSidesAreNumbers) {
            return left <= right;
        }
        else {
            var errorMsg = 'Type Error: No such binary operation';
            console.log(errorMsg);
            throw errorMsg;
        }
    };
    return Evaluator;
}());
exports.Evaluator = Evaluator;
