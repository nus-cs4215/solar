(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./instructions/break":2,"./instructions/return":3,"./instructions/tail-recursion":4,"./scope":5,"./standard-library/array-library":6,"./standard-library/math-library":7,"./standard-library/string-library":8,"./standard-library/table-library":9}],2:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Break = void 0;
var Break = /** @class */ (function () {
    function Break() {
    }
    return Break;
}());
exports.Break = Break;

},{}],3:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Return = void 0;
var Return = /** @class */ (function () {
    function Return(returnValue) {
        this.returnValue = returnValue;
    }
    return Return;
}());
exports.Return = Return;

},{}],4:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.TailRecursion = void 0;
var TailRecursion = /** @class */ (function () {
    function TailRecursion(args) {
        this.args = args;
    }
    return TailRecursion;
}());
exports.TailRecursion = TailRecursion;

},{}],5:[function(require,module,exports){
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
    Scope.prototype.declare = function (symbol, value) {
        if (symbol in this.symbolTable) {
            var errorMsg = "Syntax Error: " + symbol + " has already been declared";
            console.log(errorMsg);
            throw errorMsg;
        }
        else {
            this.symbolTable[symbol] = value;
        }
    };
    Scope.prototype.lookup = function (symbol) {
        if (symbol in this.symbolTable) {
            return this.symbolTable[symbol];
        }
        else {
            if (this.parent === null) {
                var errorMsg = "Name Error: " + symbol + " is not defined";
                console.log(errorMsg);
                throw errorMsg;
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
                var errorMsg = "Name Error: " + symbol + " is not defined";
                console.log(errorMsg);
                throw errorMsg;
            }
            else {
                this.parent.assign(symbol, value);
            }
        }
    };
    // this method is only called by function scopes
    Scope.prototype.storeArguments = function (params, args) {
        if (params.length != args.length) {
            var errorMsg = 'Syntax Error: Number of parameters not equal to number of arguments';
            console.log(errorMsg);
            throw errorMsg;
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

},{}],6:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.ArrayLibrary = void 0;
var ArrayLibrary = /** @class */ (function () {
    function ArrayLibrary() {
    }
    ArrayLibrary.prototype.callLibraryFunction = function (funcName, args) {
        this.typeCheckArgs(funcName, args);
        var arr = args[0];
        switch (funcName) {
            case 'arr_len':
                return arr.length;
            case 'arr_reverse':
                arr.reverse();
                return arr;
            case 'arr_sort':
                arr.sort();
                return arr;
            case 'arr_pop':
                arr.pop();
                return arr;
            case 'arr_push':
                arr.push(args[1]);
                return arr;
            case 'arr_get': {
                var idx = args[1];
                return arr[idx];
            }
            case 'arr_set': {
                var idx = args[1];
                arr[idx] = args[2];
                return arr;
            }
        }
    };
    ArrayLibrary.prototype.typeCheckArgs = function (funcName, args) {
        switch (funcName) {
            case 'arr_len':
            case 'arr_reverse':
            case 'arr_sort':
            case 'arr_pop':
                if (this.exprIsArray(args[0])) {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "([T])";
                    console.log(errorMsg);
                    throw errorMsg;
                }
            case 'arr_push':
                if (this.exprIsArray(args[0]) && !this.exprIsFunc(args[1])) {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "([T], T)";
                    console.log(errorMsg);
                    throw errorMsg;
                }
            case 'arr_get':
                if (this.exprIsArray(args[0]) && typeof args[1] === 'number') {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "([T], number)";
                    console.log(errorMsg);
                    throw errorMsg;
                }
            case 'arr_set':
                if (this.exprIsArray(args[0]) && typeof args[1] === 'number' && !this.exprIsFunc(args[2])) {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "([T], number, T)";
                    console.log(errorMsg);
                    throw errorMsg;
                }
        }
    };
    ArrayLibrary.prototype.exprIsArray = function (expr) {
        return Array.isArray(expr);
    };
    ArrayLibrary.prototype.exprIsFunc = function (expr) {
        return expr.isFunc === true;
    };
    return ArrayLibrary;
}());
exports.ArrayLibrary = ArrayLibrary;

},{}],7:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.MathLibrary = void 0;
var MathLibrary = /** @class */ (function () {
    function MathLibrary() {
    }
    MathLibrary.prototype.callLibraryFunction = function (funcName, args) {
        this.typeCheckArgs(funcName, args);
        switch (funcName) {
            case 'math_abs':
                return Math.abs(args[0]);
            case 'math_ceil':
                return Math.ceil(args[0]);
            case 'math_floor':
                return Math.floor(args[0]);
            case 'math_sqrt':
                return Math.sqrt(args[0]);
            case 'math_max':
                return this.max(args);
            case 'math_min':
                return this.min(args);
        }
    };
    MathLibrary.prototype.max = function (args) {
        var max = args[0];
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var arg = args_1[_i];
            if (arg > max) {
                max = arg;
            }
        }
        return max;
    };
    MathLibrary.prototype.min = function (args) {
        var min = args[0];
        for (var _i = 0, args_2 = args; _i < args_2.length; _i++) {
            var arg = args_2[_i];
            if (arg < min) {
                min = arg;
            }
        }
        return min;
    };
    MathLibrary.prototype.typeCheckArgs = function (funcName, args) {
        switch (funcName) {
            case 'math_abs':
            case 'math_ceil':
            case 'math_floor':
            case 'math_sqrt':
                if (typeof args[0] === 'number') {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "(number)";
                    console.log(errorMsg);
                    throw errorMsg;
                }
            case 'math_max':
            case 'math_min':
                for (var _i = 0, args_3 = args; _i < args_3.length; _i++) {
                    var arg = args_3[_i];
                    if (typeof arg !== 'number') {
                        var errorMsg = "Type Error: Args types should be as follows - " + funcName + "(number, ... , number)";
                        console.log(errorMsg);
                        throw errorMsg;
                    }
                }
                return;
        }
    };
    return MathLibrary;
}());
exports.MathLibrary = MathLibrary;

},{}],8:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.StringLibrary = void 0;
var StringLibrary = /** @class */ (function () {
    function StringLibrary() {
    }
    StringLibrary.prototype.callLibraryFunction = function (funcName, args) {
        this.typeCheckArgs(funcName, args);
        switch (funcName) {
            case 'str_len':
                return args[0].length;
            case 'str_reverse':
                return this.reverseString(args[0]);
            case 'str_split':
                return args[0].split(args[1]);
            case 'str_substring':
                return args[0].substring(args[1], args[2]);
        }
    };
    StringLibrary.prototype.reverseString = function (str) {
        return str.split('').reverse().join('');
    };
    StringLibrary.prototype.typeCheckArgs = function (funcName, args) {
        switch (funcName) {
            case 'str_len':
            case 'str_reverse':
                if (typeof args[0] === 'string') {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "(string)";
                    console.log(errorMsg);
                    throw errorMsg;
                }
            case 'str_split':
                if (typeof args[0] === 'string' && typeof args[1] === 'string') {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "(string, string)";
                    console.log(errorMsg);
                    throw errorMsg;
                }
            case 'str_substring':
                if (typeof args[0] === 'string' && typeof args[1] === 'number' && typeof args[2] === 'number') {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "(string, number, number)";
                    console.log(errorMsg);
                    throw errorMsg;
                }
        }
    };
    return StringLibrary;
}());
exports.StringLibrary = StringLibrary;

},{}],9:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.TableLibrary = void 0;
var TableLibrary = /** @class */ (function () {
    function TableLibrary() {
    }
    TableLibrary.prototype.callLibraryFunction = function (funcName, args) {
        this.typeCheckArgs(funcName, args);
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
    TableLibrary.prototype.typeCheckArgs = function (funcName, args) {
        switch (funcName) {
            case 'tbl_len':
                if (this.exprIsTable(args[0])) {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "({T})";
                    console.log(errorMsg);
                    throw errorMsg;
                }
            case 'tbl_contains':
            case 'tbl_remove':
            case 'tbl_get':
                if (this.exprIsTable(args[0]) && typeof args[1] === 'string') {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "({T}, string)";
                    console.log(errorMsg);
                    throw errorMsg;
                }
            case 'tbl_put':
                if (this.exprIsTable(args[0]) && typeof args[1] === 'string' && !this.exprIsFunc(args[2])) {
                    return;
                }
                else {
                    var errorMsg = "Type Error: Args types should be as follows - " + funcName + "({T}, string, T)";
                    console.log(errorMsg);
                    throw errorMsg;
                }
        }
    };
    TableLibrary.prototype.exprIsTable = function (expr) {
        return (expr instanceof Object) && !this.exprIsArray(expr) && !this.exprIsFunc(expr);
    };
    TableLibrary.prototype.exprIsArray = function (expr) {
        return Array.isArray(expr);
    };
    TableLibrary.prototype.exprIsFunc = function (expr) {
        return expr.isFunc === true;
    };
    return TableLibrary;
}());
exports.TableLibrary = TableLibrary;

},{}],10:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.interpret = void 0;
var parser_1 = require("./parser/parser");
var semantic_analyser_1 = require("./semantic-analyser/semantic-analyser");
var evaluator_1 = require("./evaluator/evaluator");
// To run this file - npm start
function interpret(program) {
    var p = new parser_1.Parser();
    var ast = p.parseIntoAst(program);
    var s = new semantic_analyser_1.SemanticAnalyser();
    s.analyse(ast);
    var e = new evaluator_1.Evaluator();
    e.evaluate(ast);
}
exports.interpret = interpret;
window.interpret = interpret;
var userProgram = "\n\nprint('Hello from Solar!')\n\n";
interpret(userProgram);

},{"./evaluator/evaluator":1,"./parser/parser":11,"./semantic-analyser/semantic-analyser":16}],11:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.Parser = void 0;
var parser = require('luaparse');
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.prototype.parseIntoAst = function (program) {
        var prog = program.replace(/let/g, 'local').replace(/!=/g, '~=');
        var defaultAST = parser.parse(prog, { luaVersion: '5.3' });
        var ast = this.modifyDefaultAST(defaultAST);
        return ast;
    };
    Parser.prototype.modifyDefaultAST = function (defaultAST) {
        var defaultASTstring = JSON.stringify(defaultAST);
        var modifiedASTstring = defaultASTstring.replace(/LocalStatement/g, 'LetStatement')
            .replace(/TableConstructorExpression/g, 'ContainerConstructorExpression');
        var modifiedAST = JSON.parse(modifiedASTstring);
        return modifiedAST;
    };
    return Parser;
}());
exports.Parser = Parser;

},{"luaparse":17}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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
            case 'ForNumericStatement':
            case 'ForGenericStatement':
                return this.analyseBlock(component);
            case 'ReturnStatement':
                var errorMsg = 'Syntax Error: return cannot be used outside a function';
                console.log(errorMsg);
                throw errorMsg;
        }
    };
    ReturnStatementAnalyser.prototype.analyseIfStatement = function (component) {
        for (var _i = 0, _a = component.clauses; _i < _a.length; _i++) {
            var clause = _a[_i];
            this.analyseBlock(clause);
        }
    };
    ReturnStatementAnalyser.prototype.analyseBlock = function (component) {
        for (var _i = 0, _a = component.body; _i < _a.length; _i++) {
            var c = _a[_i];
            this.analyseComponent(c);
        }
    };
    return ReturnStatementAnalyser;
}());
exports.ReturnStatementAnalyser = ReturnStatementAnalyser;

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
"use strict";
exports.__esModule = true;
exports.SemanticAnalyser = void 0;
var variable_declaration_analyser_1 = require("./semantic-analyser-components/variable-declaration-analyser");
var return_statement_analyser_1 = require("./semantic-analyser-components/return-statement-analyser");
var for_loop_analyser_1 = require("./semantic-analyser-components/for-loop-analyser");
var args_length_analyser_1 = require("./semantic-analyser-components/args-length-analyser");
var SemanticAnalyser = /** @class */ (function () {
    function SemanticAnalyser() {
        this.variableDeclarationAnalyser = new variable_declaration_analyser_1.VariableDeclarationAnalyser();
        this.returnStatementAnalyser = new return_statement_analyser_1.ReturnStatementAnalyser();
        this.forLoopAnalyser = new for_loop_analyser_1.ForLoopAnalyser();
        this.argsLengthAnalyser = new args_length_analyser_1.ArgsLengthAnalyser();
    }
    SemanticAnalyser.prototype.analyse = function (ast) {
        this.variableDeclarationAnalyser.analyse(ast);
        this.returnStatementAnalyser.analyse(ast);
        this.forLoopAnalyser.analyse(ast);
        this.argsLengthAnalyser.analyse(ast);
    };
    return SemanticAnalyser;
}());
exports.SemanticAnalyser = SemanticAnalyser;

},{"./semantic-analyser-components/args-length-analyser":12,"./semantic-analyser-components/for-loop-analyser":13,"./semantic-analyser-components/return-statement-analyser":14,"./semantic-analyser-components/variable-declaration-analyser":15}],17:[function(require,module,exports){
(function (global){(function (){
/* global exports:true, module:true, require:true, define:true, global:true */

(function (root, name, factory) {
  'use strict';

  // Used to determine if values are of the language type `Object`
  var objectTypes = {
        'function': true
      , 'object': true
    }
    // Detect free variable `exports`
    , freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports
    // Detect free variable `module`
    , freeModule = objectTypes[typeof module] && module && !module.nodeType && module
    // Detect free variable `global`, from Node.js or Browserified code, and
    // use it as `window`
    , freeGlobal = freeExports && freeModule && typeof global === 'object' && global
    // Detect the popular CommonJS extension `module.exports`
    , moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /* istanbul ignore else */
  if (freeGlobal && (freeGlobal.global === freeGlobal ||
                     /* istanbul ignore next */ freeGlobal.window === freeGlobal ||
                     /* istanbul ignore next */ freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  // Some AMD build optimizers, like r.js, check for specific condition
  // patterns like the following:
  /* istanbul ignore if */
  if (typeof define === 'function' &&
      /* istanbul ignore next */ typeof define.amd === 'object' &&
      /* istanbul ignore next */ define.amd) {
    // defined as an anonymous module.
    define(['exports'], factory);
    // In case the source has been processed and wrapped in a define module use
    // the supplied `exports` object.
    if (freeExports && moduleExports) factory(freeModule.exports);
  }
  // check for `exports` after `define` in case a build optimizer adds an
  // `exports` object
  else /* istanbul ignore else */ if (freeExports && freeModule) {
    // in Node.js or RingoJS v0.8.0+
    /* istanbul ignore else */
    if (moduleExports) factory(freeModule.exports);
    // in RingoJS v0.7.0-
    else factory(freeExports);
  }
  // in a browser or Rhino
  else {
    factory((root[name] = {}));
  }
}(this, 'luaparse', function (exports) {
  'use strict';

  exports.version = '0.2.1';

  var input, options, length, features, encodingMode;

  // Options can be set either globally on the parser object through
  // defaultOptions, or during the parse call.
  var defaultOptions = exports.defaultOptions = {
    // Explicitly tell the parser when the input ends.
      wait: false
    // Store comments as an array in the chunk object.
    , comments: true
    // Track identifier scopes by adding an isLocal attribute to each
    // identifier-node.
    , scope: false
    // Store location information on each syntax node as
    // `loc: { start: { line, column }, end: { line, column } }`.
    , locations: false
    // Store the start and end character locations on each syntax node as
    // `range: [start, end]`.
    , ranges: false
    // A callback which will be invoked when a syntax node has been completed.
    // The node which has been created will be passed as the only parameter.
    , onCreateNode: null
    // A callback which will be invoked when a new scope is created.
    , onCreateScope: null
    // A callback which will be invoked when the current scope is destroyed.
    , onDestroyScope: null
    // A callback which will be invoked when a local variable is declared in the current scope.
    // The variable's name will be passed as the only parameter
    , onLocalDeclaration: null
    // The version of Lua targeted by the parser (string; allowed values are
    // '5.1', '5.2', '5.3').
    , luaVersion: '5.1'
    // Encoding mode: how to interpret code units higher than U+007F in input
    , encodingMode: 'none'
  };

  function encodeUTF8(codepoint, highMask) {
    highMask = highMask || 0;

    if (codepoint < 0x80) {
      return String.fromCharCode(codepoint);
    } else if (codepoint < 0x800) {
      return String.fromCharCode(
        highMask | 0xc0 |  (codepoint >>  6)        ,
        highMask | 0x80 | ( codepoint        & 0x3f)
      );
    } else if (codepoint < 0x10000) {
      return String.fromCharCode(
        highMask | 0xe0 |  (codepoint >> 12)        ,
        highMask | 0x80 | ((codepoint >>  6) & 0x3f),
        highMask | 0x80 | ( codepoint        & 0x3f)
      );
    } else /* istanbul ignore else */ if (codepoint < 0x110000) {
      return String.fromCharCode(
        highMask | 0xf0 |  (codepoint >> 18)        ,
        highMask | 0x80 | ((codepoint >> 12) & 0x3f),
        highMask | 0x80 | ((codepoint >>  6) & 0x3f),
        highMask | 0x80 | ( codepoint        & 0x3f)
      );
    } else {
      // TODO: Lua 5.4 allows up to six-byte sequences, as in UTF-8:1993
      return null;
    }
  }

  function toHex(num, digits) {
    var result = num.toString(16);
    while (result.length < digits)
      result = '0' + result;
    return result;
  }

  function checkChars(rx) {
    return function (s) {
      var m = rx.exec(s);
      if (!m)
        return s;
      raise(null, errors.invalidCodeUnit, toHex(m[0].charCodeAt(0), 4).toUpperCase());
    };
  }

  var encodingModes = {
    // `pseudo-latin1` encoding mode: assume the input was decoded with the latin1 encoding
    // WARNING: latin1 does **NOT** mean cp1252 here like in the bone-headed WHATWG standard;
    // it means true ISO/IEC 8859-1 identity-mapped to Basic Latin and Latin-1 Supplement blocks
    'pseudo-latin1': {
      fixup: checkChars(/[^\x00-\xff]/),
      encodeByte: function (value) {
        if (value === null)
          return '';
        return String.fromCharCode(value);
      },
      encodeUTF8: function (codepoint) {
        return encodeUTF8(codepoint);
      },
    },

    // `x-user-defined` encoding mode: assume the input was decoded with the WHATWG `x-user-defined` encoding
    'x-user-defined': {
      fixup: checkChars(/[^\x00-\x7f\uf780-\uf7ff]/),
      encodeByte: function (value) {
        if (value === null)
          return '';
        if (value >= 0x80)
          return String.fromCharCode(value | 0xf700);
        return String.fromCharCode(value);
      },
      encodeUTF8: function (codepoint) {
        return encodeUTF8(codepoint, 0xf700);
      }
    },

    // `none` encoding mode: disregard intrepretation of string literals, leave identifiers as-is
    'none': {
      discardStrings: true,
      fixup: function (s) {
        return s;
      },
      encodeByte: function (value) {
        return '';
      },
      encodeUTF8: function (codepoint) {
        return '';
      }
    }
  };

  // The available tokens expressed as enum flags so they can be checked with
  // bitwise operations.

  var EOF = 1, StringLiteral = 2, Keyword = 4, Identifier = 8
    , NumericLiteral = 16, Punctuator = 32, BooleanLiteral = 64
    , NilLiteral = 128, VarargLiteral = 256;

  exports.tokenTypes = { EOF: EOF, StringLiteral: StringLiteral
    , Keyword: Keyword, Identifier: Identifier, NumericLiteral: NumericLiteral
    , Punctuator: Punctuator, BooleanLiteral: BooleanLiteral
    , NilLiteral: NilLiteral, VarargLiteral: VarargLiteral
  };

  // As this parser is a bit different from luas own, the error messages
  // will be different in some situations.

  var errors = exports.errors = {
      unexpected: 'unexpected %1 \'%2\' near \'%3\''
    , unexpectedEOF: 'unexpected symbol near \'<eof>\''
    , expected: '\'%1\' expected near \'%2\''
    , expectedToken: '%1 expected near \'%2\''
    , unfinishedString: 'unfinished string near \'%1\''
    , malformedNumber: 'malformed number near \'%1\''
    , decimalEscapeTooLarge: 'decimal escape too large near \'%1\''
    , invalidEscape: 'invalid escape sequence near \'%1\''
    , hexadecimalDigitExpected: 'hexadecimal digit expected near \'%1\''
    , braceExpected: 'missing \'%1\' near \'%2\''
    , tooLargeCodepoint: 'UTF-8 value too large near \'%1\''
    , unfinishedLongString: 'unfinished long string (starting at line %1) near \'%2\''
    , unfinishedLongComment: 'unfinished long comment (starting at line %1) near \'%2\''
    , ambiguousSyntax: 'ambiguous syntax (function call x new statement) near \'%1\''
    , noLoopToBreak: 'no loop to break near \'%1\''
    , labelAlreadyDefined: 'label \'%1\' already defined on line %2'
    , labelNotVisible: 'no visible label \'%1\' for <goto>'
    , gotoJumpInLocalScope: '<goto %1> jumps into the scope of local \'%2\''
    , cannotUseVararg: 'cannot use \'...\' outside a vararg function near \'%1\''
    , invalidCodeUnit: 'code unit U+%1 is not allowed in the current encoding mode'
  };

  // ### Abstract Syntax Tree
  //
  // The default AST structure is inspired by the Mozilla Parser API but can
  // easily be customized by overriding these functions.

  var ast = exports.ast = {
      labelStatement: function(label) {
      return {
          type: 'LabelStatement'
        , label: label
      };
    }

    , breakStatement: function() {
      return {
          type: 'BreakStatement'
      };
    }

    , gotoStatement: function(label) {
      return {
          type: 'GotoStatement'
        , label: label
      };
    }

    , returnStatement: function(args) {
      return {
          type: 'ReturnStatement'
        , 'arguments': args
      };
    }

    , ifStatement: function(clauses) {
      return {
          type: 'IfStatement'
        , clauses: clauses
      };
    }
    , ifClause: function(condition, body) {
      return {
          type: 'IfClause'
        , condition: condition
        , body: body
      };
    }
    , elseifClause: function(condition, body) {
      return {
          type: 'ElseifClause'
        , condition: condition
        , body: body
      };
    }
    , elseClause: function(body) {
      return {
          type: 'ElseClause'
        , body: body
      };
    }

    , whileStatement: function(condition, body) {
      return {
          type: 'WhileStatement'
        , condition: condition
        , body: body
      };
    }

    , doStatement: function(body) {
      return {
          type: 'DoStatement'
        , body: body
      };
    }

    , repeatStatement: function(condition, body) {
      return {
          type: 'RepeatStatement'
        , condition: condition
        , body: body
      };
    }

    , localStatement: function(variables, init) {
      return {
          type: 'LocalStatement'
        , variables: variables
        , init: init
      };
    }

    , assignmentStatement: function(variables, init) {
      return {
          type: 'AssignmentStatement'
        , variables: variables
        , init: init
      };
    }

    , callStatement: function(expression) {
      return {
          type: 'CallStatement'
        , expression: expression
      };
    }

    , functionStatement: function(identifier, parameters, isLocal, body) {
      return {
          type: 'FunctionDeclaration'
        , identifier: identifier
        , isLocal: isLocal
        , parameters: parameters
        , body: body
      };
    }

    , forNumericStatement: function(variable, start, end, step, body) {
      return {
          type: 'ForNumericStatement'
        , variable: variable
        , start: start
        , end: end
        , step: step
        , body: body
      };
    }

    , forGenericStatement: function(variables, iterators, body) {
      return {
          type: 'ForGenericStatement'
        , variables: variables
        , iterators: iterators
        , body: body
      };
    }

    , chunk: function(body) {
      return {
          type: 'Chunk'
        , body: body
      };
    }

    , identifier: function(name) {
      return {
          type: 'Identifier'
        , name: name
      };
    }

    , literal: function(type, value, raw) {
      type = (type === StringLiteral) ? 'StringLiteral'
        : (type === NumericLiteral) ? 'NumericLiteral'
        : (type === BooleanLiteral) ? 'BooleanLiteral'
        : (type === NilLiteral) ? 'NilLiteral'
        : 'VarargLiteral';

      return {
          type: type
        , value: value
        , raw: raw
      };
    }

    , tableKey: function(key, value) {
      return {
          type: 'TableKey'
        , key: key
        , value: value
      };
    }
    , tableKeyString: function(key, value) {
      return {
          type: 'TableKeyString'
        , key: key
        , value: value
      };
    }
    , tableValue: function(value) {
      return {
          type: 'TableValue'
        , value: value
      };
    }


    , tableConstructorExpression: function(fields) {
      return {
          type: 'TableConstructorExpression'
        , fields: fields
      };
    }
    , binaryExpression: function(operator, left, right) {
      var type = ('and' === operator || 'or' === operator) ?
        'LogicalExpression' :
        'BinaryExpression';

      return {
          type: type
        , operator: operator
        , left: left
        , right: right
      };
    }
    , unaryExpression: function(operator, argument) {
      return {
          type: 'UnaryExpression'
        , operator: operator
        , argument: argument
      };
    }
    , memberExpression: function(base, indexer, identifier) {
      return {
          type: 'MemberExpression'
        , indexer: indexer
        , identifier: identifier
        , base: base
      };
    }

    , indexExpression: function(base, index) {
      return {
          type: 'IndexExpression'
        , base: base
        , index: index
      };
    }

    , callExpression: function(base, args) {
      return {
          type: 'CallExpression'
        , base: base
        , 'arguments': args
      };
    }

    , tableCallExpression: function(base, args) {
      return {
          type: 'TableCallExpression'
        , base: base
        , 'arguments': args
      };
    }

    , stringCallExpression: function(base, argument) {
      return {
          type: 'StringCallExpression'
        , base: base
        , argument: argument
      };
    }

    , comment: function(value, raw) {
      return {
          type: 'Comment'
        , value: value
        , raw: raw
      };
    }
  };

  // Wrap up the node object.

  function finishNode(node) {
    // Pop a `Marker` off the location-array and attach its location data.
    if (trackLocations) {
      var location = locations.pop();
      location.complete();
      location.bless(node);
    }
    if (options.onCreateNode) options.onCreateNode(node);
    return node;
  }


  // Helpers
  // -------

  var slice = Array.prototype.slice
    , toString = Object.prototype.toString
    ;

  var indexOf = /* istanbul ignore next */ function (array, element) {
    for (var i = 0, length = array.length; i < length; ++i) {
      if (array[i] === element) return i;
    }
    return -1;
  };

  /* istanbul ignore else */
  if (Array.prototype.indexOf)
    indexOf = function (array, element) {
      return array.indexOf(element);
    };

  // Iterate through an array of objects and return the index of an object
  // with a matching property.

  function indexOfObject(array, property, element) {
    for (var i = 0, length = array.length; i < length; ++i) {
      if (array[i][property] === element) return i;
    }
    return -1;
  }

  // A sprintf implementation using %index (beginning at 1) to input
  // arguments in the format string.
  //
  // Example:
  //
  //     // Unexpected function in token
  //     sprintf('Unexpected %2 in %1.', 'token', 'function');

  function sprintf(format) {
    var args = slice.call(arguments, 1);
    format = format.replace(/%(\d)/g, function (match, index) {
      return '' + args[index - 1] || /* istanbul ignore next */ '';
    });
    return format;
  }

  // Polyfill for `Object.assign`.

  var assign = /* istanbul ignore next */ function (dest) {
    var args = slice.call(arguments, 1)
      , src, prop;

    for (var i = 0, length = args.length; i < length; ++i) {
      src = args[i];
      for (prop in src)
        /* istanbul ignore else */
        if (Object.prototype.hasOwnProperty.call(src, prop)) {
          dest[prop] = src[prop];
        }
    }

    return dest;
  };

  /* istanbul ignore else */
  if (Object.assign)
    assign = Object.assign;

  // ### Error functions

  // XXX: Eliminate this function and change the error type to be different from SyntaxError.
  // This will unfortunately be a breaking change, because some downstream users depend
  // on the error thrown being an instance of SyntaxError. For example, the Ace editor:
  // <https://github.com/ajaxorg/ace/blob/4c7e5eb3f5d5ca9434847be51834a4e41661b852/lib/ace/mode/lua_worker.js#L55>

  function fixupError(e) {
    /* istanbul ignore if */
    if (!Object.create)
      return e;
    return Object.create(e, {
      'line': { 'writable': true, value: e.line },
      'index': { 'writable': true, value: e.index },
      'column': { 'writable': true, value: e.column }
    });
  }

  // #### Raise an exception.
  //
  // Raise an exception by passing a token, a string format and its paramters.
  //
  // The passed tokens location will automatically be added to the error
  // message if it exists, if not it will default to the lexers current
  // position.
  //
  // Example:
  //
  //     // [1:0] expected [ near (
  //     raise(token, "expected %1 near %2", '[', token.value);

  function raise(token) {
    var message = sprintf.apply(null, slice.call(arguments, 1))
      , error, col;

    if (token === null || typeof token.line === 'undefined') {
      col = index - lineStart + 1;
      error = fixupError(new SyntaxError(sprintf('[%1:%2] %3', line, col, message)));
      error.index = index;
      error.line = line;
      error.column = col;
    } else {
      col = token.range[0] - token.lineStart;
      error = fixupError(new SyntaxError(sprintf('[%1:%2] %3', token.line, col, message)));
      error.line = token.line;
      error.index = token.range[0];
      error.column = col;
    }
    throw error;
  }

  function tokenValue(token) {
    var raw = input.slice(token.range[0], token.range[1]);
    if (raw)
      return raw;
    return token.value;
  }

  // #### Raise an unexpected token error.
  //
  // Example:
  //
  //     // expected <name> near '0'
  //     raiseUnexpectedToken('<name>', token);

  function raiseUnexpectedToken(type, token) {
    raise(token, errors.expectedToken, type, tokenValue(token));
  }

  // #### Raise a general unexpected error
  //
  // Usage should pass either a token object or a symbol string which was
  // expected. We can also specify a nearby token such as <eof>, this will
  // default to the currently active token.
  //
  // Example:
  //
  //     // Unexpected symbol 'end' near '<eof>'
  //     unexpected(token);
  //
  // If there's no token in the buffer it means we have reached <eof>.

  function unexpected(found) {
    var near = tokenValue(lookahead);
    if ('undefined' !== typeof found.type) {
      var type;
      switch (found.type) {
        case StringLiteral:   type = 'string';      break;
        case Keyword:         type = 'keyword';     break;
        case Identifier:      type = 'identifier';  break;
        case NumericLiteral:  type = 'number';      break;
        case Punctuator:      type = 'symbol';      break;
        case BooleanLiteral:  type = 'boolean';     break;
        case NilLiteral:
          return raise(found, errors.unexpected, 'symbol', 'nil', near);
        case EOF:
          return raise(found, errors.unexpectedEOF);
      }
      return raise(found, errors.unexpected, type, tokenValue(found), near);
    }
    return raise(found, errors.unexpected, 'symbol', found, near);
  }

  // Lexer
  // -----
  //
  // The lexer, or the tokenizer reads the input string character by character
  // and derives a token left-right. To be as efficient as possible the lexer
  // prioritizes the common cases such as identifiers. It also works with
  // character codes instead of characters as string comparisons was the
  // biggest bottleneck of the parser.
  //
  // If `options.comments` is enabled, all comments encountered will be stored
  // in an array which later will be appended to the chunk object. If disabled,
  // they will simply be disregarded.
  //
  // When the lexer has derived a valid token, it will be returned as an object
  // containing its value and as well as its position in the input string (this
  // is always enabled to provide proper debug messages).
  //
  // `lex()` starts lexing and returns the following token in the stream.

  var index
    , token
    , previousToken
    , lookahead
    , comments
    , tokenStart
    , line
    , lineStart;

  exports.lex = lex;

  function lex() {
    skipWhiteSpace();

    // Skip comments beginning with --
    while (45 === input.charCodeAt(index) &&
           45 === input.charCodeAt(index + 1)) {
      scanComment();
      skipWhiteSpace();
    }
    if (index >= length) return {
        type : EOF
      , value: '<eof>'
      , line: line
      , lineStart: lineStart
      , range: [index, index]
    };

    var charCode = input.charCodeAt(index)
      , next = input.charCodeAt(index + 1);

    // Memorize the range index where the token begins.
    tokenStart = index;
    if (isIdentifierStart(charCode)) return scanIdentifierOrKeyword();

    switch (charCode) {
      case 39: case 34: // '"
        return scanStringLiteral();

      case 48: case 49: case 50: case 51: case 52: case 53:
      case 54: case 55: case 56: case 57: // 0-9
        return scanNumericLiteral();

      case 46: // .
        // If the dot is followed by a digit it's a float.
        if (isDecDigit(next)) return scanNumericLiteral();
        if (46 === next) {
          if (46 === input.charCodeAt(index + 2)) return scanVarargLiteral();
          return scanPunctuator('..');
        }
        return scanPunctuator('.');

      case 61: // =
        if (61 === next) return scanPunctuator('==');
        return scanPunctuator('=');

      case 62: // >
        if (features.bitwiseOperators)
          if (62 === next) return scanPunctuator('>>');
        if (61 === next) return scanPunctuator('>=');
        return scanPunctuator('>');

      case 60: // <
        if (features.bitwiseOperators)
          if (60 === next) return scanPunctuator('<<');
        if (61 === next) return scanPunctuator('<=');
        return scanPunctuator('<');

      case 126: // ~
        if (61 === next) return scanPunctuator('~=');
        if (!features.bitwiseOperators)
          break;
        return scanPunctuator('~');

      case 58: // :
        if (features.labels)
          if (58 === next) return scanPunctuator('::');
        return scanPunctuator(':');

      case 91: // [
        // Check for a multiline string, they begin with [= or [[
        if (91 === next || 61 === next) return scanLongStringLiteral();
        return scanPunctuator('[');

      case 47: // /
        // Check for integer division op (//)
        if (features.integerDivision)
          if (47 === next) return scanPunctuator('//');
        return scanPunctuator('/');

      case 38: case 124: // & |
        if (!features.bitwiseOperators)
          break;

        /* fall through */
      case 42: case 94: case 37: case 44: case 123: case 125:
      case 93: case 40: case 41: case 59: case 35: case 45:
      case 43: // * ^ % , { } ] ( ) ; # - +
        return scanPunctuator(input.charAt(index));
    }

    return unexpected(input.charAt(index));
  }

  // Whitespace has no semantic meaning in lua so simply skip ahead while
  // tracking the encounted newlines. Any kind of eol sequence is counted as a
  // single line.

  function consumeEOL() {
    var charCode = input.charCodeAt(index)
      , peekCharCode = input.charCodeAt(index + 1);

    if (isLineTerminator(charCode)) {
      // Count \n\r and \r\n as one newline.
      if (10 === charCode && 13 === peekCharCode) ++index;
      if (13 === charCode && 10 === peekCharCode) ++index;
      ++line;
      lineStart = ++index;

      return true;
    }
    return false;
  }

  function skipWhiteSpace() {
    while (index < length) {
      var charCode = input.charCodeAt(index);
      if (isWhiteSpace(charCode)) {
        ++index;
      } else if (!consumeEOL()) {
        break;
      }
    }
  }

  // Identifiers, keywords, booleans and nil all look the same syntax wise. We
  // simply go through them one by one and defaulting to an identifier if no
  // previous case matched.

  function scanIdentifierOrKeyword() {
    var value, type;

    // Slicing the input string is prefered before string concatenation in a
    // loop for performance reasons.
    while (isIdentifierPart(input.charCodeAt(++index)));
    value = encodingMode.fixup(input.slice(tokenStart, index));

    // Decide on the token type and possibly cast the value.
    if (isKeyword(value)) {
      type = Keyword;
    } else if ('true' === value || 'false' === value) {
      type = BooleanLiteral;
      value = ('true' === value);
    } else if ('nil' === value) {
      type = NilLiteral;
      value = null;
    } else {
      type = Identifier;
    }

    return {
        type: type
      , value: value
      , line: line
      , lineStart: lineStart
      , range: [tokenStart, index]
    };
  }

  // Once a punctuator reaches this function it should already have been
  // validated so we simply return it as a token.

  function scanPunctuator(value) {
    index += value.length;
    return {
        type: Punctuator
      , value: value
      , line: line
      , lineStart: lineStart
      , range: [tokenStart, index]
    };
  }

  // A vararg literal consists of three dots.

  function scanVarargLiteral() {
    index += 3;
    return {
        type: VarargLiteral
      , value: '...'
      , line: line
      , lineStart: lineStart
      , range: [tokenStart, index]
    };
  }

  // Find the string literal by matching the delimiter marks used.

  function scanStringLiteral() {
    var delimiter = input.charCodeAt(index++)
      , beginLine = line
      , beginLineStart = lineStart
      , stringStart = index
      , string = encodingMode.discardStrings ? null : ''
      , charCode;

    for (;;) {
      charCode = input.charCodeAt(index++);
      if (delimiter === charCode) break;
      // EOF or `\n` terminates a string literal. If we haven't found the
      // ending delimiter by now, raise an exception.
      if (index > length || isLineTerminator(charCode)) {
        string += input.slice(stringStart, index - 1);
        raise(null, errors.unfinishedString, input.slice(tokenStart, index - 1));
      }
      if (92 === charCode) { // backslash
        if (!encodingMode.discardStrings) {
          var beforeEscape = input.slice(stringStart, index - 1);
          string += encodingMode.fixup(beforeEscape);
        }
        var escapeValue = readEscapeSequence();
        if (!encodingMode.discardStrings)
          string += escapeValue;
        stringStart = index;
      }
    }
    if (!encodingMode.discardStrings) {
      string += encodingMode.encodeByte(null);
      string += encodingMode.fixup(input.slice(stringStart, index - 1));
    }

    return {
        type: StringLiteral
      , value: string
      , line: beginLine
      , lineStart: beginLineStart
      , lastLine: line
      , lastLineStart: lineStart
      , range: [tokenStart, index]
    };
  }

  // Expect a multiline string literal and return it as a regular string
  // literal, if it doesn't validate into a valid multiline string, throw an
  // exception.

  function scanLongStringLiteral() {
    var beginLine = line
      , beginLineStart = lineStart
      , string = readLongString(false);
    // Fail if it's not a multiline literal.
    if (false === string) raise(token, errors.expected, '[', tokenValue(token));

    return {
        type: StringLiteral
      , value: encodingMode.discardStrings ? null : encodingMode.fixup(string)
      , line: beginLine
      , lineStart: beginLineStart
      , lastLine: line
      , lastLineStart: lineStart
      , range: [tokenStart, index]
    };
  }

  // Numeric literals will be returned as floating-point numbers instead of
  // strings. The raw value should be retrieved from slicing the input string
  // later on in the process.
  //
  // If a hexadecimal number is encountered, it will be converted.

  function scanNumericLiteral() {
    var character = input.charAt(index)
      , next = input.charAt(index + 1);

    var value = ('0' === character && 'xX'.indexOf(next || null) >= 0) ?
      readHexLiteral() : readDecLiteral();

    return {
        type: NumericLiteral
      , value: value
      , line: line
      , lineStart: lineStart
      , range: [tokenStart, index]
    };
  }

  // Lua hexadecimals have an optional fraction part and an optional binary
  // exoponent part. These are not included in JavaScript so we will compute
  // all three parts separately and then sum them up at the end of the function
  // with the following algorithm.
  //
  //     Digit := toDec(digit)
  //     Fraction := toDec(fraction) / 16 ^ fractionCount
  //     BinaryExp := 2 ^ binaryExp
  //     Number := ( Digit + Fraction ) * BinaryExp

  function readHexLiteral() {
    var fraction = 0 // defaults to 0 as it gets summed
      , binaryExponent = 1 // defaults to 1 as it gets multiplied
      , binarySign = 1 // positive
      , digit, fractionStart, exponentStart, digitStart;

    digitStart = index += 2; // Skip 0x part

    // A minimum of one hex digit is required.
    if (!isHexDigit(input.charCodeAt(index)))
      raise(null, errors.malformedNumber, input.slice(tokenStart, index));

    while (isHexDigit(input.charCodeAt(index))) ++index;
    // Convert the hexadecimal digit to base 10.
    digit = parseInt(input.slice(digitStart, index), 16);

    // Fraction part i optional.
    if ('.' === input.charAt(index)) {
      fractionStart = ++index;

      while (isHexDigit(input.charCodeAt(index))) ++index;
      fraction = input.slice(fractionStart, index);

      // Empty fraction parts should default to 0, others should be converted
      // 0.x form so we can use summation at the end.
      fraction = (fractionStart === index) ? 0
        : parseInt(fraction, 16) / Math.pow(16, index - fractionStart);
    }

    // Binary exponents are optional
    if ('pP'.indexOf(input.charAt(index) || null) >= 0) {
      ++index;

      // Sign part is optional and defaults to 1 (positive).
      if ('+-'.indexOf(input.charAt(index) || null) >= 0)
        binarySign = ('+' === input.charAt(index++)) ? 1 : -1;

      exponentStart = index;

      // The binary exponent sign requires a decimal digit.
      if (!isDecDigit(input.charCodeAt(index)))
        raise(null, errors.malformedNumber, input.slice(tokenStart, index));

      while (isDecDigit(input.charCodeAt(index))) ++index;
      binaryExponent = input.slice(exponentStart, index);

      // Calculate the binary exponent of the number.
      binaryExponent = Math.pow(2, binaryExponent * binarySign);
    }

    return (digit + fraction) * binaryExponent;
  }

  // Decimal numbers are exactly the same in Lua and in JavaScript, because of
  // this we check where the token ends and then parse it with native
  // functions.

  function readDecLiteral() {
    while (isDecDigit(input.charCodeAt(index))) ++index;
    // Fraction part is optional
    if ('.' === input.charAt(index)) {
      ++index;
      // Fraction part defaults to 0
      while (isDecDigit(input.charCodeAt(index))) ++index;
    }
    // Exponent part is optional.
    if ('eE'.indexOf(input.charAt(index) || null) >= 0) {
      ++index;
      // Sign part is optional.
      if ('+-'.indexOf(input.charAt(index) || null) >= 0) ++index;
      // An exponent is required to contain at least one decimal digit.
      if (!isDecDigit(input.charCodeAt(index)))
        raise(null, errors.malformedNumber, input.slice(tokenStart, index));

      while (isDecDigit(input.charCodeAt(index))) ++index;
    }

    return parseFloat(input.slice(tokenStart, index));
  }

  function readUnicodeEscapeSequence() {
    var sequenceStart = index++;

    if (input.charAt(index++) !== '{')
      raise(null, errors.braceExpected, '{', '\\' + input.slice(sequenceStart, index));
    if (!isHexDigit(input.charCodeAt(index)))
      raise(null, errors.hexadecimalDigitExpected, '\\' + input.slice(sequenceStart, index));

    while (input.charCodeAt(index) === 0x30) ++index;
    var escStart = index;

    while (isHexDigit(input.charCodeAt(index))) {
      ++index;
      if (index - escStart > 6)
        raise(null, errors.tooLargeCodepoint, '\\' + input.slice(sequenceStart, index));
    }

    var b = input.charAt(index++);
    if (b !== '}') {
      if ((b === '"') || (b === "'"))
        raise(null, errors.braceExpected, '}', '\\' + input.slice(sequenceStart, index--));
      else
        raise(null, errors.hexadecimalDigitExpected, '\\' + input.slice(sequenceStart, index));
    }

    var codepoint = parseInt(input.slice(escStart, index - 1) || '0', 16);
    var frag = '\\' + input.slice(sequenceStart, index);

    if (codepoint > 0x10ffff) {
      raise(null, errors.tooLargeCodepoint, frag);
    }

    return encodingMode.encodeUTF8(codepoint, frag);
  }

  // Translate escape sequences to the actual characters.
  function readEscapeSequence() {
    var sequenceStart = index;
    switch (input.charAt(index)) {
      // Lua allow the following escape sequences.
      case 'a': ++index; return '\x07';
      case 'n': ++index; return '\n';
      case 'r': ++index; return '\r';
      case 't': ++index; return '\t';
      case 'v': ++index; return '\x0b';
      case 'b': ++index; return '\b';
      case 'f': ++index; return '\f';

      // Backslash at the end of the line. We treat all line endings as equivalent,
      // and as representing the [LF] character (code 10). Lua 5.1 through 5.3
      // have been verified to behave the same way.
      case '\r':
      case '\n':
        consumeEOL();
        return '\n';

      case '0': case '1': case '2': case '3': case '4':
      case '5': case '6': case '7': case '8': case '9':
        // \ddd, where ddd is a sequence of up to three decimal digits.
        while (isDecDigit(input.charCodeAt(index)) && index - sequenceStart < 3) ++index;

        var frag = input.slice(sequenceStart, index);
        var ddd = parseInt(frag, 10);
        if (ddd > 255) {
          raise(null, errors.decimalEscapeTooLarge, '\\' + ddd);
        }
        return encodingMode.encodeByte(ddd, '\\' + frag);

      case 'z':
        if (features.skipWhitespaceEscape) {
          ++index;
          skipWhiteSpace();
          return '';
        }
        break;

      case 'x':
        if (features.hexEscapes) {
          // \xXX, where XX is a sequence of exactly two hexadecimal digits
          if (isHexDigit(input.charCodeAt(index + 1)) &&
              isHexDigit(input.charCodeAt(index + 2))) {
            index += 3;
            return encodingMode.encodeByte(parseInt(input.slice(sequenceStart + 1, index), 16), '\\' + input.slice(sequenceStart, index));
          }
          raise(null, errors.hexadecimalDigitExpected, '\\' + input.slice(sequenceStart, index + 2));
        }
        break;

      case 'u':
        if (features.unicodeEscapes)
          return readUnicodeEscapeSequence();
        break;

      case '\\': case '"': case "'":
        return input.charAt(index++);
    }

    if (features.strictEscapes)
      raise(null, errors.invalidEscape, '\\' + input.slice(sequenceStart, index + 1));
    return input.charAt(index++);
  }

  // Comments begin with -- after which it will be decided if they are
  // multiline comments or not.
  //
  // The multiline functionality works the exact same way as with string
  // literals so we reuse the functionality.

  function scanComment() {
    tokenStart = index;
    index += 2; // --

    var character = input.charAt(index)
      , content = ''
      , isLong = false
      , commentStart = index
      , lineStartComment = lineStart
      , lineComment = line;

    if ('[' === character) {
      content = readLongString(true);
      // This wasn't a multiline comment after all.
      if (false === content) content = character;
      else isLong = true;
    }
    // Scan until next line as long as it's not a multiline comment.
    if (!isLong) {
      while (index < length) {
        if (isLineTerminator(input.charCodeAt(index))) break;
        ++index;
      }
      if (options.comments) content = input.slice(commentStart, index);
    }

    if (options.comments) {
      var node = ast.comment(content, input.slice(tokenStart, index));

      // `Marker`s depend on tokens available in the parser and as comments are
      // intercepted in the lexer all location data is set manually.
      if (options.locations) {
        node.loc = {
            start: { line: lineComment, column: tokenStart - lineStartComment }
          , end: { line: line, column: index - lineStart }
        };
      }
      if (options.ranges) {
        node.range = [tokenStart, index];
      }
      if (options.onCreateNode) options.onCreateNode(node);
      comments.push(node);
    }
  }

  // Read a multiline string by calculating the depth of `=` characters and
  // then appending until an equal depth is found.

  function readLongString(isComment) {
    var level = 0
      , content = ''
      , terminator = false
      , character, stringStart, firstLine = line;

    ++index; // [

    // Calculate the depth of the comment.
    while ('=' === input.charAt(index + level)) ++level;
    // Exit, this is not a long string afterall.
    if ('[' !== input.charAt(index + level)) return false;

    index += level + 1;

    // If the first character is a newline, ignore it and begin on next line.
    if (isLineTerminator(input.charCodeAt(index))) consumeEOL();

    stringStart = index;
    while (index < length) {
      // To keep track of line numbers run the `consumeEOL()` which increments
      // its counter.
      while (isLineTerminator(input.charCodeAt(index))) consumeEOL();

      character = input.charAt(index++);

      // Once the delimiter is found, iterate through the depth count and see
      // if it matches.
      if (']' === character) {
        terminator = true;
        for (var i = 0; i < level; ++i) {
          if ('=' !== input.charAt(index + i)) terminator = false;
        }
        if (']' !== input.charAt(index + level)) terminator = false;
      }

      // We reached the end of the multiline string. Get out now.
      if (terminator) {
        content += input.slice(stringStart, index - 1);
        index += level + 1;
        return content;
      }
    }

    raise(null, isComment ?
                errors.unfinishedLongComment :
                errors.unfinishedLongString,
          firstLine, '<eof>');
  }

  // ## Lex functions and helpers.

  // Read the next token.
  //
  // This is actually done by setting the current token to the lookahead and
  // reading in the new lookahead token.

  function next() {
    previousToken = token;
    token = lookahead;
    lookahead = lex();
  }

  // Consume a token if its value matches. Once consumed or not, return the
  // success of the operation.

  function consume(value) {
    if (value === token.value) {
      next();
      return true;
    }
    return false;
  }

  // Expect the next token value to match. If not, throw an exception.

  function expect(value) {
    if (value === token.value) next();
    else raise(token, errors.expected, value, tokenValue(token));
  }

  // ### Validation functions

  function isWhiteSpace(charCode) {
    return 9 === charCode || 32 === charCode || 0xB === charCode || 0xC === charCode;
  }

  function isLineTerminator(charCode) {
    return 10 === charCode || 13 === charCode;
  }

  function isDecDigit(charCode) {
    return charCode >= 48 && charCode <= 57;
  }

  function isHexDigit(charCode) {
    return (charCode >= 48 && charCode <= 57) || (charCode >= 97 && charCode <= 102) || (charCode >= 65 && charCode <= 70);
  }

  // From [Lua 5.2](http://www.lua.org/manual/5.2/manual.html#8.1) onwards
  // identifiers cannot use 'locale-dependent' letters (i.e. dependent on the C locale).
  // On the other hand, LuaJIT allows arbitrary octets ≥ 128 in identifiers.

  function isIdentifierStart(charCode) {
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || 95 === charCode)
      return true;
    if (features.extendedIdentifiers && charCode >= 128)
      return true;
    return false;
  }

  function isIdentifierPart(charCode) {
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || 95 === charCode || (charCode >= 48 && charCode <= 57))
      return true;
    if (features.extendedIdentifiers && charCode >= 128)
      return true;
    return false;
  }

  // [3.1 Lexical Conventions](http://www.lua.org/manual/5.2/manual.html#3.1)
  //
  // `true`, `false` and `nil` will not be considered keywords, but literals.

  function isKeyword(id) {
    switch (id.length) {
      case 2:
        return 'do' === id || 'if' === id || 'in' === id || 'or' === id;
      case 3:
        return 'and' === id || 'end' === id || 'for' === id || 'not' === id;
      case 4:
        if ('else' === id || 'then' === id)
          return true;
        if (features.labels && !features.contextualGoto)
          return ('goto' === id);
        return false;
      case 5:
        return 'break' === id || 'local' === id || 'until' === id || 'while' === id;
      case 6:
        return 'elseif' === id || 'repeat' === id || 'return' === id;
      case 8:
        return 'function' === id;
    }
    return false;
  }

  function isUnary(token) {
    if (Punctuator === token.type) return '#-~'.indexOf(token.value) >= 0;
    if (Keyword === token.type) return 'not' === token.value;
    return false;
  }

  // Check if the token syntactically closes a block.

  function isBlockFollow(token) {
    if (EOF === token.type) return true;
    if (Keyword !== token.type) return false;
    switch (token.value) {
      case 'else': case 'elseif':
      case 'end': case 'until':
        return true;
      default:
        return false;
    }
  }

  // Scope
  // -----

  // Store each block scope as a an array of identifier names. Each scope is
  // stored in an FILO-array.
  var scopes
    // The current scope index
    , scopeDepth
    // A list of all global identifier nodes.
    , globals;

  // Create a new scope inheriting all declarations from the previous scope.
  function createScope() {
    var scope = Array.apply(null, scopes[scopeDepth++]);
    scopes.push(scope);
    if (options.onCreateScope) options.onCreateScope();
  }

  // Exit and remove the current scope.
  function destroyScope() {
    var scope = scopes.pop();
    --scopeDepth;
    if (options.onDestroyScope) options.onDestroyScope();
  }

  // Add identifier name to the current scope if it doesnt already exist.
  function scopeIdentifierName(name) {
    if (options.onLocalDeclaration) options.onLocalDeclaration(name);
    if (-1 !== indexOf(scopes[scopeDepth], name)) return;
    scopes[scopeDepth].push(name);
  }

  // Add identifier to the current scope
  function scopeIdentifier(node) {
    scopeIdentifierName(node.name);
    attachScope(node, true);
  }

  // Attach scope information to node. If the node is global, store it in the
  // globals array so we can return the information to the user.
  function attachScope(node, isLocal) {
    if (!isLocal && -1 === indexOfObject(globals, 'name', node.name))
      globals.push(node);

    node.isLocal = isLocal;
  }

  // Is the identifier name available in this scope.
  function scopeHasName(name) {
    return (-1 !== indexOf(scopes[scopeDepth], name));
  }

  // Location tracking
  // -----------------
  //
  // Locations are stored in FILO-array as a `Marker` object consisting of both
  // `loc` and `range` data. Once a `Marker` is popped off the list an end
  // location is added and the data is attached to a syntax node.

  var locations = []
    , trackLocations;

  function createLocationMarker() {
    return new Marker(token);
  }

  function Marker(token) {
    if (options.locations) {
      this.loc = {
          start: {
            line: token.line
          , column: token.range[0] - token.lineStart
        }
        , end: {
            line: 0
          , column: 0
        }
      };
    }
    if (options.ranges) this.range = [token.range[0], 0];
  }

  // Complete the location data stored in the `Marker` by adding the location
  // of the *previous token* as an end location.
  Marker.prototype.complete = function() {
    if (options.locations) {
      this.loc.end.line = previousToken.lastLine || previousToken.line;
      this.loc.end.column = previousToken.range[1] - (previousToken.lastLineStart || previousToken.lineStart);
    }
    if (options.ranges) {
      this.range[1] = previousToken.range[1];
    }
  };

  Marker.prototype.bless = function (node) {
    if (this.loc) {
      var loc = this.loc;
      node.loc = {
        start: {
          line: loc.start.line,
          column: loc.start.column
        },
        end: {
          line: loc.end.line,
          column: loc.end.column
        }
      };
    }
    if (this.range) {
      node.range = [
        this.range[0],
        this.range[1]
      ];
    }
  };

  // Create a new `Marker` and add it to the FILO-array.
  function markLocation() {
    if (trackLocations) locations.push(createLocationMarker());
  }

  // Push an arbitrary `Marker` object onto the FILO-array.
  function pushLocation(marker) {
    if (trackLocations) locations.push(marker);
  }

  // Control flow tracking
  // ---------------------
  // A context object that validates loop breaks and `goto`-based control flow.

  function FullFlowContext() {
    this.scopes = [];
    this.pendingGotos = [];
  }

  FullFlowContext.prototype.isInLoop = function () {
    var i = this.scopes.length;
    while (i --> 0) {
      if (this.scopes[i].isLoop)
        return true;
    }
    return false;
  };

  FullFlowContext.prototype.pushScope = function (isLoop) {
    var scope = {
      labels: {},
      locals: [],
      deferredGotos: [],
      isLoop: !!isLoop
    };
    this.scopes.push(scope);
  };

  FullFlowContext.prototype.popScope = function () {
    for (var i = 0; i < this.pendingGotos.length; ++i) {
      var theGoto = this.pendingGotos[i];
      if (theGoto.maxDepth >= this.scopes.length)
        if (--theGoto.maxDepth <= 0)
          raise(theGoto.token, errors.labelNotVisible, theGoto.target);
    }

    this.scopes.pop();
  };

  FullFlowContext.prototype.addGoto = function (target, token) {
    var localCounts = [];

    for (var i = 0; i < this.scopes.length; ++i) {
      var scope = this.scopes[i];
      localCounts.push(scope.locals.length);
      if (Object.prototype.hasOwnProperty.call(scope.labels, target))
        return;
    }

    this.pendingGotos.push({
      maxDepth: this.scopes.length,
      target: target,
      token: token,
      localCounts: localCounts
    });
  };

  FullFlowContext.prototype.addLabel = function (name, token) {
    var scope = this.currentScope();

    if (Object.prototype.hasOwnProperty.call(scope.labels, name)) {
      raise(token, errors.labelAlreadyDefined, name, scope.labels[name].line);
    } else {
      var newGotos = [];

      for (var i = 0; i < this.pendingGotos.length; ++i) {
        var theGoto = this.pendingGotos[i];

        if (theGoto.maxDepth >= this.scopes.length && theGoto.target === name) {
          if (theGoto.localCounts[this.scopes.length - 1] < scope.locals.length) {
            scope.deferredGotos.push(theGoto);
          }
          continue;
        }

        newGotos.push(theGoto);
      }

      this.pendingGotos = newGotos;
    }

    scope.labels[name] = {
      localCount: scope.locals.length,
      line: token.line
    };
  };

  FullFlowContext.prototype.addLocal = function (name, token) {
    this.currentScope().locals.push({
      name: name,
      token: token
    });
  };

  FullFlowContext.prototype.currentScope = function () {
    return this.scopes[this.scopes.length - 1];
  };

  FullFlowContext.prototype.raiseDeferredErrors = function () {
    var scope = this.currentScope();
    var bads = scope.deferredGotos;
    for (var i = 0; i < bads.length; ++i) {
      var theGoto = bads[i];
      raise(theGoto.token, errors.gotoJumpInLocalScope, theGoto.target, scope.locals[theGoto.localCounts[this.scopes.length - 1]].name);
    }
    // Would be dead code currently, but may be useful later
    // if (bads.length)
    //   scope.deferredGotos = [];
  };

  // Simplified context that only checks the validity of loop breaks.

  function LoopFlowContext() {
    this.level = 0;
    this.loopLevels = [];
  }

  LoopFlowContext.prototype.isInLoop = function () {
    return !!this.loopLevels.length;
  };

  LoopFlowContext.prototype.pushScope = function (isLoop) {
    ++this.level;
    if (isLoop)
      this.loopLevels.push(this.level);
  };

  LoopFlowContext.prototype.popScope = function () {
    var levels = this.loopLevels;
    var levlen = levels.length;
    if (levlen) {
      if (levels[levlen - 1] === this.level)
        levels.pop();
    }
    --this.level;
  };

  LoopFlowContext.prototype.addGoto =
  LoopFlowContext.prototype.addLabel =
  /* istanbul ignore next */
  function () { throw new Error('This should never happen'); };

  LoopFlowContext.prototype.addLocal =
  LoopFlowContext.prototype.raiseDeferredErrors =
  function () {};

  function makeFlowContext() {
    return features.labels ? new FullFlowContext() : new LoopFlowContext();
  }

  // Parse functions
  // ---------------

  // Chunk is the main program object. Syntactically it's the same as a block.
  //
  //     chunk ::= block

  function parseChunk() {
    next();
    markLocation();
    if (options.scope) createScope();
    var flowContext = makeFlowContext();
    flowContext.allowVararg = true;
    flowContext.pushScope();
    var body = parseBlock(flowContext);
    flowContext.popScope();
    if (options.scope) destroyScope();
    if (EOF !== token.type) unexpected(token);
    // If the body is empty no previousToken exists when finishNode runs.
    if (trackLocations && !body.length) previousToken = token;
    return finishNode(ast.chunk(body));
  }

  // A block contains a list of statements with an optional return statement
  // as its last statement.
  //
  //     block ::= {stat} [retstat]

  function parseBlock(flowContext) {
    var block = []
      , statement;

    while (!isBlockFollow(token)) {
      // Return has to be the last statement in a block.
      // Likewise 'break' in Lua older than 5.2
      if ('return' === token.value || (!features.relaxedBreak && 'break' === token.value)) {
        block.push(parseStatement(flowContext));
        break;
      }
      statement = parseStatement(flowContext);
      consume(';');
      // Statements are only added if they are returned, this allows us to
      // ignore some statements, such as EmptyStatement.
      if (statement) block.push(statement);
    }

    // Doesn't really need an ast node
    return block;
  }

  // There are two types of statements, simple and compound.
  //
  //     statement ::= break | goto | do | while | repeat | return
  //          | if | for | function | local | label | assignment
  //          | functioncall | ';'

  function parseStatement(flowContext) {
    markLocation();

    if (Punctuator === token.type) {
      if (consume('::')) return parseLabelStatement(flowContext);
    }

    // When a `;` is encounted, simply eat it without storing it.
    if (features.emptyStatement) {
      if (consume(';')) {
        if (trackLocations) locations.pop();
        return;
      }
    }

    flowContext.raiseDeferredErrors();

    if (Keyword === token.type) {
      switch (token.value) {
        case 'local':    next(); return parseLocalStatement(flowContext);
        case 'if':       next(); return parseIfStatement(flowContext);
        case 'return':   next(); return parseReturnStatement(flowContext);
        case 'function': next();
          var name = parseFunctionName();
          return parseFunctionDeclaration(name);
        case 'while':    next(); return parseWhileStatement(flowContext);
        case 'for':      next(); return parseForStatement(flowContext);
        case 'repeat':   next(); return parseRepeatStatement(flowContext);
        case 'break':    next();
          if (!flowContext.isInLoop())
            raise(token, errors.noLoopToBreak, token.value);
          return parseBreakStatement();
        case 'do':       next(); return parseDoStatement(flowContext);
        case 'goto':     next(); return parseGotoStatement(flowContext);
      }
    }

    if (features.contextualGoto &&
        token.type === Identifier && token.value === 'goto' &&
        lookahead.type === Identifier && lookahead.value !== 'goto') {
      next(); return parseGotoStatement(flowContext);
    }

    // Assignments memorizes the location and pushes it manually for wrapper nodes.
    if (trackLocations) locations.pop();

    return parseAssignmentOrCallStatement(flowContext);
  }

  // ## Statements

  //     label ::= '::' Name '::'

  function parseLabelStatement(flowContext) {
    var nameToken = token
      , label = parseIdentifier();

    if (options.scope) {
      scopeIdentifierName('::' + nameToken.value + '::');
      attachScope(label, true);
    }

    expect('::');

    flowContext.addLabel(nameToken.value, nameToken);
    return finishNode(ast.labelStatement(label));
  }

  //     break ::= 'break'

  function parseBreakStatement() {
    return finishNode(ast.breakStatement());
  }

  //     goto ::= 'goto' Name

  function parseGotoStatement(flowContext) {
    var name = token.value
      , gotoToken = previousToken
      , label = parseIdentifier();

    flowContext.addGoto(name, gotoToken);
    return finishNode(ast.gotoStatement(label));
  }

  //     do ::= 'do' block 'end'

  function parseDoStatement(flowContext) {
    if (options.scope) createScope();
    flowContext.pushScope();
    var body = parseBlock(flowContext);
    flowContext.popScope();
    if (options.scope) destroyScope();
    expect('end');
    return finishNode(ast.doStatement(body));
  }

  //     while ::= 'while' exp 'do' block 'end'

  function parseWhileStatement(flowContext) {
    var condition = parseExpectedExpression(flowContext);
    expect('do');
    if (options.scope) createScope();
    flowContext.pushScope(true);
    var body = parseBlock(flowContext);
    flowContext.popScope();
    if (options.scope) destroyScope();
    expect('end');
    return finishNode(ast.whileStatement(condition, body));
  }

  //     repeat ::= 'repeat' block 'until' exp

  function parseRepeatStatement(flowContext) {
    if (options.scope) createScope();
    flowContext.pushScope(true);
    var body = parseBlock(flowContext);
    expect('until');
    flowContext.raiseDeferredErrors();
    var condition = parseExpectedExpression(flowContext);
    flowContext.popScope();
    if (options.scope) destroyScope();
    return finishNode(ast.repeatStatement(condition, body));
  }

  //     retstat ::= 'return' [exp {',' exp}] [';']

  function parseReturnStatement(flowContext) {
    var expressions = [];

    if ('end' !== token.value) {
      var expression = parseExpression(flowContext);
      if (null != expression) expressions.push(expression);
      while (consume(',')) {
        expression = parseExpectedExpression(flowContext);
        expressions.push(expression);
      }
      consume(';'); // grammar tells us ; is optional here.
    }
    return finishNode(ast.returnStatement(expressions));
  }

  //     if ::= 'if' exp 'then' block {elif} ['else' block] 'end'
  //     elif ::= 'elseif' exp 'then' block

  function parseIfStatement(flowContext) {
    var clauses = []
      , condition
      , body
      , marker;

    // IfClauses begin at the same location as the parent IfStatement.
    // It ends at the start of `end`, `else`, or `elseif`.
    if (trackLocations) {
      marker = locations[locations.length - 1];
      locations.push(marker);
    }
    condition = parseExpectedExpression(flowContext);
    expect('then');
    if (options.scope) createScope();
    flowContext.pushScope();
    body = parseBlock(flowContext);
    flowContext.popScope();
    if (options.scope) destroyScope();
    clauses.push(finishNode(ast.ifClause(condition, body)));

    if (trackLocations) marker = createLocationMarker();
    while (consume('elseif')) {
      pushLocation(marker);
      condition = parseExpectedExpression(flowContext);
      expect('then');
      if (options.scope) createScope();
      flowContext.pushScope();
      body = parseBlock(flowContext);
      flowContext.popScope();
      if (options.scope) destroyScope();
      clauses.push(finishNode(ast.elseifClause(condition, body)));
      if (trackLocations) marker = createLocationMarker();
    }

    if (consume('else')) {
      // Include the `else` in the location of ElseClause.
      if (trackLocations) {
        marker = new Marker(previousToken);
        locations.push(marker);
      }
      if (options.scope) createScope();
      flowContext.pushScope();
      body = parseBlock(flowContext);
      flowContext.popScope();
      if (options.scope) destroyScope();
      clauses.push(finishNode(ast.elseClause(body)));
    }

    expect('end');
    return finishNode(ast.ifStatement(clauses));
  }

  // There are two types of for statements, generic and numeric.
  //
  //     for ::= Name '=' exp ',' exp [',' exp] 'do' block 'end'
  //     for ::= namelist 'in' explist 'do' block 'end'
  //     namelist ::= Name {',' Name}
  //     explist ::= exp {',' exp}

  function parseForStatement(flowContext) {
    var variable = parseIdentifier()
      , body;

    // The start-identifier is local.

    if (options.scope) {
      createScope();
      scopeIdentifier(variable);
    }

    // If the first expression is followed by a `=` punctuator, this is a
    // Numeric For Statement.
    if (consume('=')) {
      // Start expression
      var start = parseExpectedExpression(flowContext);
      expect(',');
      // End expression
      var end = parseExpectedExpression(flowContext);
      // Optional step expression
      var step = consume(',') ? parseExpectedExpression(flowContext) : null;

      expect('do');
      flowContext.pushScope(true);
      body = parseBlock(flowContext);
      flowContext.popScope();
      expect('end');
      if (options.scope) destroyScope();

      return finishNode(ast.forNumericStatement(variable, start, end, step, body));
    }
    // If not, it's a Generic For Statement
    else {
      // The namelist can contain one or more identifiers.
      var variables = [variable];
      while (consume(',')) {
        variable = parseIdentifier();
        // Each variable in the namelist is locally scoped.
        if (options.scope) scopeIdentifier(variable);
        variables.push(variable);
      }
      expect('in');
      var iterators = [];

      // One or more expressions in the explist.
      do {
        var expression = parseExpectedExpression(flowContext);
        iterators.push(expression);
      } while (consume(','));

      expect('do');
      flowContext.pushScope(true);
      body = parseBlock(flowContext);
      flowContext.popScope();
      expect('end');
      if (options.scope) destroyScope();

      return finishNode(ast.forGenericStatement(variables, iterators, body));
    }
  }

  // Local statements can either be variable assignments or function
  // definitions. If a function definition is found, it will be delegated to
  // `parseFunctionDeclaration()` with the isLocal flag.
  //
  // This AST structure might change into a local assignment with a function
  // child.
  //
  //     local ::= 'local' 'function' Name funcdecl
  //        | 'local' Name {',' Name} ['=' exp {',' exp}]

  function parseLocalStatement(flowContext) {
    var name
      , declToken = previousToken;

    if (Identifier === token.type) {
      var variables = []
        , init = [];

      do {
        name = parseIdentifier();

        variables.push(name);
        flowContext.addLocal(name.name, declToken);
      } while (consume(','));

      if (consume('=')) {
        do {
          var expression = parseExpectedExpression(flowContext);
          init.push(expression);
        } while (consume(','));
      }

      // Declarations doesn't exist before the statement has been evaluated.
      // Therefore assignments can't use their declarator. And the identifiers
      // shouldn't be added to the scope until the statement is complete.
      if (options.scope) {
        for (var i = 0, l = variables.length; i < l; ++i) {
          scopeIdentifier(variables[i]);
        }
      }

      return finishNode(ast.localStatement(variables, init));
    }
    if (consume('function')) {
      name = parseIdentifier();
      flowContext.addLocal(name.name, declToken);

      if (options.scope) {
        scopeIdentifier(name);
        createScope();
      }

      // MemberExpressions are not allowed in local function statements.
      return parseFunctionDeclaration(name, true);
    } else {
      raiseUnexpectedToken('<name>', token);
    }
  }

  //     assignment ::= varlist '=' explist
  //     var ::= Name | prefixexp '[' exp ']' | prefixexp '.' Name
  //     varlist ::= var {',' var}
  //     explist ::= exp {',' exp}
  //
  //     call ::= callexp
  //     callexp ::= prefixexp args | prefixexp ':' Name args

  function parseAssignmentOrCallStatement(flowContext) {
    // Keep a reference to the previous token for better error messages in case
    // of invalid statement
    var previous = token
      , marker, startMarker;
    var lvalue, base, name;

    var targets = [];

    if (trackLocations) startMarker = createLocationMarker();

    do {
      if (trackLocations) marker = createLocationMarker();

      if (Identifier === token.type) {
        name = token.value;
        base = parseIdentifier();
        // Set the parent scope.
        if (options.scope) attachScope(base, scopeHasName(name));
        lvalue = true;
      } else if ('(' === token.value) {
        next();
        base = parseExpectedExpression(flowContext);
        expect(')');
        lvalue = false;
      } else {
        return unexpected(token);
      }

      both: for (;;) {
        var newBase;

        switch (StringLiteral === token.type ? '"' : token.value) {
        case '.':
        case '[':
          lvalue = true;
          break;
        case ':':
        case '(':
        case '{':
        case '"':
          lvalue = null;
          break;
        default:
          break both;
        }

        base = parsePrefixExpressionPart(base, marker, flowContext);
      }

      targets.push(base);

      if (',' !== token.value)
        break;

      if (!lvalue) {
        return unexpected(token);
      }

      next();
    } while (true);

    if (targets.length === 1 && lvalue === null) {
      pushLocation(marker);
      return finishNode(ast.callStatement(targets[0]));
    } else if (!lvalue) {
      return unexpected(token);
    }

    expect('=');

    var values = [];

    do {
      values.push(parseExpectedExpression(flowContext));
    } while (consume(','));

    pushLocation(startMarker);
    return finishNode(ast.assignmentStatement(targets, values));
  }

  // ### Non-statements

  //     Identifier ::= Name

  function parseIdentifier() {
    markLocation();
    var identifier = token.value;
    if (Identifier !== token.type) raiseUnexpectedToken('<name>', token);
    next();
    return finishNode(ast.identifier(identifier));
  }

  // Parse the functions parameters and body block. The name should already
  // have been parsed and passed to this declaration function. By separating
  // this we allow for anonymous functions in expressions.
  //
  // For local functions there's a boolean parameter which needs to be set
  // when parsing the declaration.
  //
  //     funcdecl ::= '(' [parlist] ')' block 'end'
  //     parlist ::= Name {',' Name} | [',' '...'] | '...'

  function parseFunctionDeclaration(name, isLocal) {
    var flowContext = makeFlowContext();
    flowContext.pushScope();

    var parameters = [];
    expect('(');

    // The declaration has arguments
    if (!consume(')')) {
      // Arguments are a comma separated list of identifiers, optionally ending
      // with a vararg.
      while (true) {
        if (Identifier === token.type) {
          var parameter = parseIdentifier();
          // Function parameters are local.
          if (options.scope) scopeIdentifier(parameter);

          parameters.push(parameter);

          if (consume(',')) continue;
        }
        // No arguments are allowed after a vararg.
        else if (VarargLiteral === token.type) {
          flowContext.allowVararg = true;
          parameters.push(parsePrimaryExpression(flowContext));
        } else {
          raiseUnexpectedToken('<name> or \'...\'', token);
        }
        expect(')');
        break;
      }
    }

    var body = parseBlock(flowContext);
    flowContext.popScope();
    expect('end');
    if (options.scope) destroyScope();

    isLocal = isLocal || false;
    return finishNode(ast.functionStatement(name, parameters, isLocal, body));
  }

  // Parse the function name as identifiers and member expressions.
  //
  //     Name {'.' Name} [':' Name]

  function parseFunctionName() {
    var base, name, marker;

    if (trackLocations) marker = createLocationMarker();
    base = parseIdentifier();

    if (options.scope) {
      attachScope(base, scopeHasName(base.name));
      createScope();
    }

    while (consume('.')) {
      pushLocation(marker);
      name = parseIdentifier();
      base = finishNode(ast.memberExpression(base, '.', name));
    }

    if (consume(':')) {
      pushLocation(marker);
      name = parseIdentifier();
      base = finishNode(ast.memberExpression(base, ':', name));
      if (options.scope) scopeIdentifierName('self');
    }

    return base;
  }

  //     tableconstructor ::= '{' [fieldlist] '}'
  //     fieldlist ::= field {fieldsep field} fieldsep
  //     field ::= '[' exp ']' '=' exp | Name = 'exp' | exp
  //
  //     fieldsep ::= ',' | ';'

  function parseTableConstructor(flowContext) {
    var fields = []
      , key, value;

    while (true) {
      markLocation();
      if (Punctuator === token.type && consume('[')) {
        key = parseExpectedExpression(flowContext);
        expect(']');
        expect('=');
        value = parseExpectedExpression(flowContext);
        fields.push(finishNode(ast.tableKey(key, value)));
      } else if (Identifier === token.type) {
        if ('=' === lookahead.value) {
          key = parseIdentifier();
          next();
          value = parseExpectedExpression(flowContext);
          fields.push(finishNode(ast.tableKeyString(key, value)));
        } else {
          value = parseExpectedExpression(flowContext);
          fields.push(finishNode(ast.tableValue(value)));
        }
      } else {
        if (null == (value = parseExpression(flowContext))) {
          locations.pop();
          break;
        }
        fields.push(finishNode(ast.tableValue(value)));
      }
      if (',;'.indexOf(token.value) >= 0) {
        next();
        continue;
      }
      break;
    }
    expect('}');
    return finishNode(ast.tableConstructorExpression(fields));
  }

  // Expression parser
  // -----------------
  //
  // Expressions are evaluated and always return a value. If nothing is
  // matched null will be returned.
  //
  //     exp ::= (unop exp | primary | prefixexp ) { binop exp }
  //
  //     primary ::= nil | false | true | Number | String | '...'
  //          | functiondef | tableconstructor
  //
  //     prefixexp ::= (Name | '(' exp ')' ) { '[' exp ']'
  //          | '.' Name | ':' Name args | args }
  //

  function parseExpression(flowContext) {
    var expression = parseSubExpression(0, flowContext);
    return expression;
  }

  // Parse an expression expecting it to be valid.

  function parseExpectedExpression(flowContext) {
    var expression = parseExpression(flowContext);
    if (null == expression) raiseUnexpectedToken('<expression>', token);
    else return expression;
  }


  // Return the precedence priority of the operator.
  //
  // As unary `-` can't be distinguished from binary `-`, unary precedence
  // isn't described in this table but in `parseSubExpression()` itself.
  //
  // As this function gets hit on every expression it's been optimized due to
  // the expensive CompareICStub which took ~8% of the parse time.

  function binaryPrecedence(operator) {
    var charCode = operator.charCodeAt(0)
      , length = operator.length;

    if (1 === length) {
      switch (charCode) {
        case 94: return 12; // ^
        case 42: case 47: case 37: return 10; // * / %
        case 43: case 45: return 9; // + -
        case 38: return 6; // &
        case 126: return 5; // ~
        case 124: return 4; // |
        case 60: case 62: return 3; // < >
      }
    } else if (2 === length) {
      switch (charCode) {
        case 47: return 10; // //
        case 46: return 8; // ..
        case 60: case 62:
            if('<<' === operator || '>>' === operator) return 7; // << >>
            return 3; // <= >=
        case 61: case 126: return 3; // == ~=
        case 111: return 1; // or
      }
    } else if (97 === charCode && 'and' === operator) return 2;
    return 0;
  }

  // Implement an operator-precedence parser to handle binary operator
  // precedence.
  //
  // We use this algorithm because it's compact, it's fast and Lua core uses
  // the same so we can be sure our expressions are parsed in the same manner
  // without excessive amounts of tests.
  //
  //     exp ::= (unop exp | primary | prefixexp ) { binop exp }

  function parseSubExpression(minPrecedence, flowContext) {
    var operator = token.value
    // The left-hand side in binary operations.
      , expression, marker;

    if (trackLocations) marker = createLocationMarker();

    // UnaryExpression
    if (isUnary(token)) {
      markLocation();
      next();
      var argument = parseSubExpression(10, flowContext);
      if (argument == null) raiseUnexpectedToken('<expression>', token);
      expression = finishNode(ast.unaryExpression(operator, argument));
    }
    if (null == expression) {
      // PrimaryExpression
      expression = parsePrimaryExpression(flowContext);

      // PrefixExpression
      if (null == expression) {
        expression = parsePrefixExpression(flowContext);
      }
    }
    // This is not a valid left hand expression.
    if (null == expression) return null;

    var precedence;
    while (true) {
      operator = token.value;

      precedence = (Punctuator === token.type || Keyword === token.type) ?
        binaryPrecedence(operator) : 0;

      if (precedence === 0 || precedence <= minPrecedence) break;
      // Right-hand precedence operators
      if ('^' === operator || '..' === operator) --precedence;
      next();
      var right = parseSubExpression(precedence, flowContext);
      if (null == right) raiseUnexpectedToken('<expression>', token);
      // Push in the marker created before the loop to wrap its entirety.
      if (trackLocations) locations.push(marker);
      expression = finishNode(ast.binaryExpression(operator, expression, right));

    }
    return expression;
  }

  //     prefixexp ::= prefix {suffix}
  //     prefix ::= Name | '(' exp ')'
  //     suffix ::= '[' exp ']' | '.' Name | ':' Name args | args
  //
  //     args ::= '(' [explist] ')' | tableconstructor | String

  function parsePrefixExpressionPart(base, marker, flowContext) {
    var expression, identifier;

    if (Punctuator === token.type) {
      switch (token.value) {
        case '[':
          pushLocation(marker);
          next();
          expression = parseExpectedExpression(flowContext);
          expect(']');
          return finishNode(ast.indexExpression(base, expression));
        case '.':
          pushLocation(marker);
          next();
          identifier = parseIdentifier();
          return finishNode(ast.memberExpression(base, '.', identifier));
        case ':':
          pushLocation(marker);
          next();
          identifier = parseIdentifier();
          base = finishNode(ast.memberExpression(base, ':', identifier));
          // Once a : is found, this has to be a CallExpression, otherwise
          // throw an error.
          pushLocation(marker);
          return parseCallExpression(base, flowContext);
        case '(': case '{': // args
          pushLocation(marker);
          return parseCallExpression(base, flowContext);
      }
    } else if (StringLiteral === token.type) {
      pushLocation(marker);
      return parseCallExpression(base, flowContext);
    }

    return null;
  }

  function parsePrefixExpression(flowContext) {
    var base, name, marker;

    if (trackLocations) marker = createLocationMarker();

    // The prefix
    if (Identifier === token.type) {
      name = token.value;
      base = parseIdentifier();
      // Set the parent scope.
      if (options.scope) attachScope(base, scopeHasName(name));
    } else if (consume('(')) {
      base = parseExpectedExpression(flowContext);
      expect(')');
    } else {
      return null;
    }

    // The suffix
    for (;;) {
      var newBase = parsePrefixExpressionPart(base, marker, flowContext);
      if (newBase === null)
        break;
      base = newBase;
    }

    return base;
  }

  //     args ::= '(' [explist] ')' | tableconstructor | String

  function parseCallExpression(base, flowContext) {
    if (Punctuator === token.type) {
      switch (token.value) {
        case '(':
          if (!features.emptyStatement) {
            if (token.line !== previousToken.line)
              raise(null, errors.ambiguousSyntax, token.value);
          }
          next();

          // List of expressions
          var expressions = [];
          var expression = parseExpression(flowContext);
          if (null != expression) expressions.push(expression);
          while (consume(',')) {
            expression = parseExpectedExpression(flowContext);
            expressions.push(expression);
          }

          expect(')');
          return finishNode(ast.callExpression(base, expressions));

        case '{':
          markLocation();
          next();
          var table = parseTableConstructor(flowContext);
          return finishNode(ast.tableCallExpression(base, table));
      }
    } else if (StringLiteral === token.type) {
      return finishNode(ast.stringCallExpression(base, parsePrimaryExpression(flowContext)));
    }

    raiseUnexpectedToken('function arguments', token);
  }

  //     primary ::= String | Numeric | nil | true | false
  //          | functiondef | tableconstructor | '...'

  function parsePrimaryExpression(flowContext) {
    var literals = StringLiteral | NumericLiteral | BooleanLiteral | NilLiteral | VarargLiteral
      , value = token.value
      , type = token.type
      , marker;

    if (trackLocations) marker = createLocationMarker();

    if (type === VarargLiteral && !flowContext.allowVararg) {
      raise(token, errors.cannotUseVararg, token.value);
    }

    if (type & literals) {
      pushLocation(marker);
      var raw = input.slice(token.range[0], token.range[1]);
      next();
      return finishNode(ast.literal(type, value, raw));
    } else if (Keyword === type && 'function' === value) {
      pushLocation(marker);
      next();
      if (options.scope) createScope();
      return parseFunctionDeclaration(null);
    } else if (consume('{')) {
      pushLocation(marker);
      return parseTableConstructor(flowContext);
    }
  }

  // Parser
  // ------

  // Export the main parser.
  //
  //   - `wait` Hold parsing until end() is called. Defaults to false
  //   - `comments` Store comments. Defaults to true.
  //   - `scope` Track identifier scope. Defaults to false.
  //   - `locations` Store location information. Defaults to false.
  //   - `ranges` Store the start and end character locations. Defaults to
  //     false.
  //   - `onCreateNode` Callback which will be invoked when a syntax node is
  //     created.
  //   - `onCreateScope` Callback which will be invoked when a new scope is
  //     created.
  //   - `onDestroyScope` Callback which will be invoked when the current scope
  //     is destroyed.
  //
  // Example:
  //
  //     var parser = require('luaparser');
  //     parser.parse('i = 0');

  exports.parse = parse;

  var versionFeatures = {
    '5.1': {
    },
    '5.2': {
      labels: true,
      emptyStatement: true,
      hexEscapes: true,
      skipWhitespaceEscape: true,
      strictEscapes: true,
      relaxedBreak: true
    },
    '5.3': {
      labels: true,
      emptyStatement: true,
      hexEscapes: true,
      skipWhitespaceEscape: true,
      strictEscapes: true,
      unicodeEscapes: true,
      bitwiseOperators: true,
      integerDivision: true,
      relaxedBreak: true
    },
    'LuaJIT': {
      // XXX: LuaJIT language features may depend on compilation options; may need to
      // rethink how to handle this. Specifically, there is a LUAJIT_ENABLE_LUA52COMPAT
      // that removes contextual goto. Maybe add 'LuaJIT-5.2compat' as well?
      labels: true,
      contextualGoto: true,
      hexEscapes: true,
      skipWhitespaceEscape: true,
      strictEscapes: true,
      unicodeEscapes: true
    }
  };

  function parse(_input, _options) {
    if ('undefined' === typeof _options && 'object' === typeof _input) {
      _options = _input;
      _input = undefined;
    }
    if (!_options) _options = {};

    input = _input || '';
    options = assign({}, defaultOptions, _options);

    // Rewind the lexer
    index = 0;
    line = 1;
    lineStart = 0;
    length = input.length;
    // When tracking identifier scope, initialize with an empty scope.
    scopes = [[]];
    scopeDepth = 0;
    globals = [];
    locations = [];

    if (!Object.prototype.hasOwnProperty.call(versionFeatures, options.luaVersion)) {
      throw new Error(sprintf("Lua version '%1' not supported", options.luaVersion));
    }

    features = assign({}, versionFeatures[options.luaVersion]);
    if (options.extendedIdentifiers !== void 0)
      features.extendedIdentifiers = !!options.extendedIdentifiers;

    if (!Object.prototype.hasOwnProperty.call(encodingModes, options.encodingMode)) {
      throw new Error(sprintf("Encoding mode '%1' not supported", options.encodingMode));
    }

    encodingMode = encodingModes[options.encodingMode];

    if (options.comments) comments = [];
    if (!options.wait) return end();
    return exports;
  }

  // Write to the source code buffer without beginning the parse.
  exports.write = write;

  function write(_input) {
    input += String(_input);
    length = input.length;
    return exports;
  }

  // Send an EOF and begin parsing.
  exports.end = end;

  function end(_input) {
    if ('undefined' !== typeof _input) write(_input);

    // Ignore shebangs.
    if (input && input.substr(0, 2) === '#!') input = input.replace(/^.*/, function (line) {
      return line.replace(/./g, ' ');
    });

    length = input.length;
    trackLocations = options.locations || options.ranges;
    // Initialize with a lookahead token.
    lookahead = lex();

    var chunk = parseChunk();
    if (options.comments) chunk.comments = comments;
    if (options.scope) chunk.globals = globals;

    /* istanbul ignore if */
    if (locations.length > 0)
      throw new Error('Location tracking failed. This is most likely a bug in luaparse');

    return chunk;
  }

}));
/* vim: set sw=2 ts=2 et tw=79 : */

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[10]);
