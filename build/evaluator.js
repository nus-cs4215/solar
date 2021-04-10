"use strict";
exports.__esModule = true;
exports.Evaluator = void 0;
var scope_1 = require("./scope");
var break_1 = require("./instructions/break");
var return_1 = require("./instructions/return");
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
                var returnValue = this.evalComponent(component.arguments[0], scope);
                return new return_1.Return(returnValue);
            case 'ContainerConstructorExpression':
                return this.evalContainer(component, scope);
            default:
                console.warn('This syntax tree component is unrecognised');
                console.log('Syntax Error');
                throw 'Syntax Error';
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
                    if (evaluatedC instanceof break_1.Break || evaluatedC instanceof return_1.Return) {
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
                if (evaluatedC instanceof break_1.Break || evaluatedC instanceof return_1.Return) {
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
        var functionName = component.base.name;
        var argsComponent = component.arguments;
        var args = argsComponent.map(function (c) { return _this.evalComponent(c, scope); });
        if (functionName === 'print')
            console.log(args[0]);
        else if (this.inMathLibrary(functionName))
            return this.callMathLibrary(functionName, args);
        else if (this.inStringLibrary(functionName))
            return this.callStringLibrary(functionName, args);
        else if (this.inArrayLibrary(functionName))
            throw 'array library not implemented yet';
        else if (this.inTableLibrary(functionName))
            throw 'table library not implemented yet';
        else
            return this.callSelfDefinedFunction(functionName, args);
    };
    Evaluator.prototype.typeCheck = function (funcName, args) {
        switch (funcName) {
        }
    };
    Evaluator.prototype.typeCheckMathLibrary = function (funcName, args) {
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var arg = args_1[_i];
            if (typeof arg !== 'number') {
                var errorMsg = "Type Error: " + funcName + " - " + arg + " is not a number";
                console.log(errorMsg);
                throw errorMsg;
            }
        }
    };
    Evaluator.prototype.callSelfDefinedFunction = function (funcName, args) {
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
        return funcName === 'str_len' //1
            || funcName === 'str_reverse' //1
            || funcName === 'str_split' //2
            || funcName === 'str_substring'; //3
    };
    Evaluator.prototype.inArrayLibrary = function (funcName) {
        return funcName === 'arr_len' //1
            || funcName === 'arr_reverse' //1
            || funcName === 'arr_sort' //1
            || funcName === 'arr_pop' //1
            || funcName === 'arr_push' //2
            || funcName === 'arr_get' //2
            || funcName === 'arr_set'; //3
    };
    Evaluator.prototype.inTableLibrary = function (funcName) {
        return funcName === 'tbl_len' //1
            || funcName === 'tbl_contains' //2
            || funcName === 'tbl_remove' //2
            || funcName === 'tbl_get' //2
            || funcName === 'tbl_put'; //3
    };
    Evaluator.prototype.callMathLibrary = function (funcName, args) {
        // run time type check
        this.typeCheckMathLibrary(funcName, args);
        if (funcName === 'math_max') {
            var max = args[0];
            for (var _i = 0, args_2 = args; _i < args_2.length; _i++) {
                var arg_1 = args_2[_i];
                if (arg_1 > max) {
                    max = arg_1;
                }
            }
            return max;
        }
        if (funcName === 'math_min') {
            var min = args[0];
            for (var _a = 0, args_3 = args; _a < args_3.length; _a++) {
                var arg_2 = args_3[_a];
                if (arg_2 < min) {
                    min = arg_2;
                }
            }
            return min;
        }
        var arg = args[0];
        switch (funcName) {
            case 'math_abs':
                return Math.abs(arg);
            case 'math_ceil':
                return Math.ceil(arg);
            case 'math_floor':
                return Math.floor(arg);
            case 'math_sqrt':
                return Math.sqrt(arg);
            default:
                var errorMessage = 'Syntax Error: No such math library function';
                console.log(errorMessage);
                throw errorMessage;
        }
    };
    Evaluator.prototype.reverseString = function (str) {
        return str.split('').reverse().join('');
    };
    Evaluator.prototype.callStringLibrary = function (funcName, args) {
        if (typeof args[0] !== 'string') {
            throw 'String lib function - first arg must be of type string';
        }
        switch (funcName) {
            case 'str_len':
                return args[0].length;
            case 'str_reverse':
                return this.reverseString(args[0]);
            case 'str_split':
                if (typeof args[1] === 'string') {
                    return args[0].split(args[1]);
                }
                else {
                    throw 'Split function - second arg must be of type string';
                }
            case 'str_substring':
                if (typeof args[1] === 'number' && typeof args[2] === 'number') {
                    return args[0].substring(args[1], args[2]);
                }
                else {
                    throw 'Substring function - second and third arg must be of type number';
                }
            default:
                var errorMsg = 'Syntax Error: No such string library function';
                console.log(errorMsg);
                throw errorMsg;
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
