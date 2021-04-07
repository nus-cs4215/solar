"use strict";
exports.__esModule = true;
exports.Evaluator = void 0;
var scope_1 = require("./scope");
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
            case 'Identifier': {
                var symbol = component.name;
                return scope.lookup(symbol);
            }
            // 'LetStatement'
            case 'LocalStatement':
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
                throw 'Break out of the loop!';
            case 'FunctionDeclaration':
                return this.evalFunctionDeclaration(component, scope);
            case 'CallStatement':
                return this.evalCallExpression(component.expression, scope);
            case 'CallExpression':
                return this.evalCallExpression(component, scope);
            case 'ReturnStatement':
                var returnValue = this.evalComponent(component.arguments[0], scope);
                throw returnValue;
            // 'ContainerConstructorExpression'
            case 'TableConstructorExpression':
                return this.evalContainer(component, scope);
            /*
            case 'IndexExpression': {
                const tableName = component.base.name;
                const table = scope.lookup(tableName);
                const index = this.evalComponent(component.index, scope);
                return table[index];
            }

            case 'MemberExpression': {
                const tableName = component.base.name;
                const table = scope.lookup(tableName);
                const key = component.identifier.name;
                return table[key];
            }
            */
            default:
                throw 'This syntax tree component is unrecognised';
        }
    };
    Evaluator.prototype.evalFunctionDeclaration = function (component, scope) {
        if (scope !== this.globalScope) {
            throw 'Functions can only be declared in the global scope';
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
            throw symbol + " was already declared!";
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
            throw 'Container is must either be an array or a table';
        }
    };
    Evaluator.prototype.hasElseClause = function (clauses) {
        var lastClause = clauses[clauses.length - 1];
        return lastClause.type === 'ElseClause';
    };
    Evaluator.prototype.evalIfStatement = function (component, scope) {
        for (var _i = 0, _a = component.clauses; _i < _a.length; _i++) {
            var clause = _a[_i];
            if (clause.type !== 'ElseClause') {
                var condition = this.evalComponent(clause.condition, scope);
                if (condition === true) {
                    var clauseScope = new scope_1.Scope(scope);
                    for (var _b = 0, _c = clause.body; _b < _c.length; _b++) {
                        var c = _c[_b];
                        this.evalComponent(c, clauseScope);
                    }
                    return;
                }
            }
        }
        /*
            if we reach here, means none of the if and elseif branches were evaluated.
            hence we will have to evaluate the else branch.
        */
        if (this.hasElseClause(component.clauses)) {
            var elseClause = component.clauses[component.clauses.length - 1]; // last clause
            var elseClauseScope = new scope_1.Scope(scope);
            for (var _d = 0, _e = elseClause.body; _d < _e.length; _d++) {
                var c = _e[_d];
                this.evalComponent(c, elseClauseScope);
            }
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
            throw "array library not implemented yet";
        else if (this.inTableLibrary(functionName))
            throw "table library not implemented yet";
        else
            return this.callSelfDefinedFunction(functionName, args);
    };
    Evaluator.prototype.callSelfDefinedFunction = function (funcName, args) {
        var functionScope = new scope_1.Scope(null);
        var params = this.globalScope.symbolTable[funcName].params;
        functionScope.storeArguments(params, args);
        var funcBody = this.globalScope.symbolTable[funcName].body;
        for (var _i = 0, funcBody_1 = funcBody; _i < funcBody_1.length; _i++) {
            var c = funcBody_1[_i];
            try {
                this.evalComponent(c, functionScope);
            }
            catch (returnValue) {
                return returnValue;
            }
        }
    };
    Evaluator.prototype.inMathLibrary = function (funcName) {
        return funcName === 'math_max'
            || funcName === 'math_min'
            || funcName === 'math_abs'
            || funcName === 'math_ceil'
            || funcName === 'math_floor'
            || funcName === 'math_sqrt';
    };
    // to add: str_substring
    Evaluator.prototype.inStringLibrary = function (funcName) {
        return funcName === 'str_len'
            || funcName === 'str_reverse'
            || funcName === 'str_split';
    };
    Evaluator.prototype.inArrayLibrary = function (funcName) {
        return funcName === 'arr_len'
            || funcName === 'arr_push'
            || funcName === 'arr_pop'
            || funcName === 'arr_set'
            || funcName === 'arr_sort';
    };
    Evaluator.prototype.inTableLibrary = function (funcName) {
        return funcName === 'tbl_len'
            || funcName === 'tbl_put'
            || funcName === 'tbl_remove'
            || funcName === 'tbl_contains';
    };
    Evaluator.prototype.callMathLibrary = function (funcName, args) {
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var arg_1 = args_1[_i];
            if (typeof arg_1 !== 'number') {
                throw 'Math lib function - all args must be of type number';
            }
        }
        if (funcName === 'math_max') {
            var max = args[0];
            for (var _a = 0, args_2 = args; _a < args_2.length; _a++) {
                var arg_2 = args_2[_a];
                if (arg_2 > max) {
                    max = arg_2;
                }
            }
            return max;
        }
        if (funcName === 'math_min') {
            var min = args[0];
            for (var _b = 0, args_3 = args; _b < args_3.length; _b++) {
                var arg_3 = args_3[_b];
                if (arg_3 < min) {
                    min = arg_3;
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
                throw 'No such math library function';
        }
    };
    Evaluator.prototype.reverseString = function (str) {
        return str.split("").reverse().join("");
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
            default:
                throw 'No such string library function';
        }
    };
    Evaluator.prototype.evalWhileLoop = function (component, scope) {
        var whileLoopScope = new scope_1.Scope(scope);
        var condition = this.evalComponent(component.condition, scope);
        while (condition === true) {
            for (var _i = 0, _a = component.body; _i < _a.length; _i++) {
                var c = _a[_i];
                try {
                    this.evalComponent(c, whileLoopScope);
                    /*
                        'refresh' / update the while loop condition.
                        This is necessary when the while loop body modifies the while loop condition
                    */
                    condition = this.evalComponent(component.condition, scope);
                }
                catch (breakException) {
                    return;
                }
            }
        }
    };
    Evaluator.prototype.evalGenericForLoop = function (component, scope) {
        if (component.iterators.length !== 1)
            throw 'Container needs to be length 1';
        if (component.iterators[0].type !== 'Identifier')
            throw 'Container referenced must be a symbol';
        var container = this.evalComponent(component.iterators[0], scope);
        if (Array.isArray(container)) {
            return this.evalGenericForLoopThroughArray(component, scope);
        }
        else {
            return this.evalGenericForLoopThroughTable(component, scope);
        }
    };
    Evaluator.prototype.evalGenericForLoopThroughArray = function (component, scope) {
        if (component.variables.length !== 1)
            throw 'There should only be 1 loop variable for array';
        var forLoopScope = new scope_1.Scope(scope);
        var itemSymbol = component.variables[0].name;
        var container = this.evalComponent(component.iterators[0], scope);
        for (var _i = 0, container_1 = container; _i < container_1.length; _i++) {
            var item = container_1[_i];
            forLoopScope.symbolTable[itemSymbol] = item;
            for (var _a = 0, _b = component.body; _a < _b.length; _a++) {
                var c = _b[_a];
                try {
                    this.evalComponent(c, forLoopScope);
                }
                catch (breakException) {
                    return;
                }
            }
        }
    };
    Evaluator.prototype.evalGenericForLoopThroughTable = function (component, scope) {
        if (component.variables.length !== 2)
            throw 'There should 2 loop variable for table - first variable for key and second variable for value';
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
                try {
                    this.evalComponent(c, forLoopScope);
                }
                catch (breakException) {
                    return;
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
                try {
                    this.evalComponent(c, forLoopScope);
                }
                catch (breakException) {
                    return;
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
            throw 'no such unary operation';
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
            throw 'no such logical operation';
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
            throw 'no such binary operation';
        }
    };
    return Evaluator;
}());
exports.Evaluator = Evaluator;
