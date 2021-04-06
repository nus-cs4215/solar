import { Scope } from './scope';

export class Evaluator {

    globalScope = new Scope(null);

    // entry point. ast is the syntax tree of the entire program.
    evaluate(ast: any): void {
        
        for (const c of ast.body) {
            this.evalComponent(c, this.globalScope);
        }
    }
    
    evalComponent(component: any, scope: any): any {
        
        if (this.isLiteral(component)) {
            return this.evalLiteral(component);
        }

        switch (component.type) {

            case 'Identifier': {
                const symbol = component.name;
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
                const returnValue = this.evalComponent(component.arguments[0], scope);
                throw returnValue;

            case 'TableConstructorExpression':
                return this.evalTable(component, scope);

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

            default:
                throw 'This syntax tree component is unrecognised';
        }
    }

    evalFunctionDeclaration(component: any, scope: Scope): any {
        
        if (scope !== this.globalScope) {
            throw 'Functions can only be declared in the global scope';
        }

        const funcSymbol = component.identifier.name;
        const funcParams = component.parameters.map(p => p.name);
        const funcBody = component.body;
        const value = { params: funcParams, body: funcBody };

        scope.symbolTable[funcSymbol] = value;
    }

    evalDeclaration(component: any, scope: any): any {

        const symbol = component.variables[0].name;
        const value = this.evalComponent(component.init[0], scope);

        if (symbol in scope.symbolTable) {
            throw `${symbol} was already declared!`;
        } else {
            scope.symbolTable[symbol] = value;
        }
    }

    evalAssignment(component: any, scope: any): any {

        const symbol = component.variables[0].name;
        const value = this.evalComponent(component.init[0], scope);
        scope.assign(symbol, value);
    }

    isArray(tableComponent: any): boolean {
        return tableComponent[0].type === 'TableValue';
    }

    evalTable(component: any, scope: any): any {
        
        const tableComponent = component.fields;
        
        // if the "table" is really just an array, we return an array
        if (this.isArray(tableComponent)) {
            const arr = tableComponent.map(c => this.evalComponent(c.value, scope));
            return arr;
        } else {
            let tbl = {}

            for (const c of tableComponent) {
                const k = c.key.name;
                const v = this.evalComponent(c.value, scope);
                tbl[k] = v;
            }

            return tbl;
        }
    }

    hasElseClause(clauses: any[]): boolean {
        const lastClause = clauses[clauses.length - 1];
        return lastClause.type === 'ElseClause';
    }

    evalIfStatement(component: any, scope: any): any {
        
        for (const clause of component.clauses) {

            if (clause.type !== 'ElseClause') {
                
                const condition = this.evalComponent(clause.condition, scope);

                if (condition === true) {

                    const clauseScope = new Scope(scope)
                    
                    for (const c of clause.body) {
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

            const elseClause = component.clauses[component.clauses.length - 1];     // last clause
            const elseClauseScope = new Scope(scope);

            for (const c of elseClause.body) {
                this.evalComponent(c, elseClauseScope);
            }
        }

    }

    evalCallExpression(component: any, scope: any): any {

        const functionName = component.base.name;

        const argsComponent = component.arguments;
        const args = argsComponent.map(c => this.evalComponent(c, scope));

        if (functionName === 'print')                   console.log(args[0]);
        else if (this.inMathLibrary(functionName))      return this.callMathLibrary(functionName, args);
        else if (this.inStringLibrary(functionName))    return this.callStringLibrary(functionName, args);
        else if (this.inArrayLibrary(functionName))     throw "array library not implemented yet";
        else if (this.inTableLibrary(functionName))     throw "table library not implemented yet";
        else                                            return this.callSelfDefinedFunction(functionName, args);
    }

    callSelfDefinedFunction(funcName: string, args: any[]): any {
        
        const functionScope = new Scope(null);
        
        const params = this.globalScope.symbolTable[funcName].params;
        
        // todo: abstract the following loop into a method

        if (params.length !== args.length) {
            throw 'Number of params should be equal to number of args';
        }

        const n = params.length;
        
        for (let i = 0; i < n; ++i) {
            const symbol = params[i];
            const value = args[i];
            functionScope.symbolTable[symbol] = value;
        }
        
        const funcBody = this.globalScope.symbolTable[funcName].body;

        for (const c of funcBody) {

            try {
                this.evalComponent(c, functionScope);
            } catch (returnValue) {
                return returnValue;
            }
        }
    }

    inMathLibrary(funcName: string): boolean {
        return funcName === 'math_max'
            || funcName === 'math_min'
            || funcName === 'math_abs'
            || funcName === 'math_ceil'
            || funcName === 'math_floor'
            || funcName === 'math_sqrt'
    }

    // to add: str_substring
    inStringLibrary(funcName: string): boolean {
        return funcName === 'str_len'
            || funcName === 'str_reverse'
            || funcName === 'str_split'
    }

    inArrayLibrary(funcName: string): boolean {
        return funcName === 'arr_len'
            || funcName === 'arr_push'
            || funcName === 'arr_pop'
            || funcName === 'arr_set'
            || funcName === 'arr_sort'
    }

    inTableLibrary(funcName: string): boolean {
        return funcName === 'tbl_len'
            || funcName === 'tbl_put'
            || funcName === 'tbl_remove'
            || funcName === 'tbl_contains'
    }

    callMathLibrary(funcName: string, args: any[]): number {
        
        for (const arg of args) {
            if (typeof arg !== 'number') {
                throw 'Math lib function - all args must be of type number';
            }
        }

        if (funcName === 'math_max') {
            
            let max = args[0];

            for (const arg of args) {
                if (arg > max) {
                    max = arg;
                }
            }

            return max;
        }

        if (funcName === 'math_min') {
            
            let min = args[0];

            for (const arg of args) {
                if (arg < min) {
                    min = arg;
                }
            }

            return min;
        }
        
        const arg = args[0];

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
    }

    reverseString(str: string): string {
        return str.split("").reverse().join("");
    }

    callStringLibrary(funcName: string, args: any[]): number  | string | string[] {

        if (typeof args[0] !== 'string') {
            throw 'String lib function - first arg must be of type string';
        }

        switch (funcName) {

            case 'str_len':
                return args[0].length;

            case 'str_reverse':
                return this.reverseString(args[0]);

            case 'str_split':
                if (typeof args[1] === 'string'){
                    return args[0].split(args[1]);
                } else {
                    throw 'Split function - second arg must be of type string';
                }

            default:
                throw 'No such string library function';
        }
    }

    evalWhileLoop(component: any, scope: any): void {

        const whileLoopScope = new Scope(scope);

        let condition = this.evalComponent(component.condition, scope);

        while (condition === true) {

            for (const c of component.body) {
                
                try {
                    this.evalComponent(c, whileLoopScope);

                    /*
                        'refresh' / update the while loop condition.
                        This is necessary when the while loop body modifies the while loop condition
                    */
                    condition = this.evalComponent(component.condition, scope);
                } catch (breakException) {
                    return;
                }
            }
        }

    }

    evalGenericForLoop(component: any, scope: Scope): void {
 
        const forLoopScope = new Scope(scope);

        const itemSymbol = component.variables[0].name;
        const container = this.evalComponent(component.iterators[0], scope);

        for (const item of container) {
            
            forLoopScope.symbolTable[itemSymbol] = item;

            for (const c of component.body) {

                try {
                    this.evalComponent(c, forLoopScope);
                } catch (breakException) {
                    return;
                }
            }
        }

    }

    evalNumericForLoop(component: any, scope: Scope): void {

        const forLoopScope = new Scope(scope);
        
        const loopControlVariable = component.variable.name;
        const start = this.evalComponent(component.start, scope);
        const end = this.evalComponent(component.end, scope);
        const step = this.evalComponent(component.step, scope);

        for (let i = start; i < end; i += step) {

            forLoopScope.symbolTable[loopControlVariable] = i; 

            for (const c of component.body) {

                try {
                    this.evalComponent(c, forLoopScope);
                } catch (breakException) {
                    return;
                }
            }
        }
    }

    /*
    // currently unused. for minimalism, we only allow simple x = 1 assignments. don't allow x,y = 1,2
    evalAssignment(component: any, scope: Scope): void {
        
        const symbols = component.variables;
        const values = component.init;

        // assert(symbols.length === values.length, "Length of symbols do not match values");
        
        for (let i = 0; i < symbols.length; i++) {
            const symbol = symbols[i].name;
            const value = values[i];

            scope.symbolTable[symbol] = this.evalComponent(value, scope);
        }
    }
    */

    isLiteral(component: any): boolean {
        return component.type === 'StringLiteral' 
            || component.type === 'NumericLiteral'
            || component.type === 'BooleanLiteral'
    }

    evalLiteral(component: any): string | number | boolean | null {

        if (component.type === 'StringLiteral') {
            const strLiteral = component.raw.slice(1, -1);  // remove the outermost quotes
            return strLiteral;
        } else {
            return component.value;
        }
    }

    evalUnaryExpression(component: any, scope: any): number | boolean {

        const argument = this.evalComponent(component.argument, scope);

        if (component.operator === 'not' && typeof argument === 'boolean') {
            return !argument;
        } else if (component.operator === '-' && typeof argument === 'number') {
            return -argument;
        } else {
            throw 'no such unary operation';
        }
    }

    evalLogicalExpression(component: any, scope: any): boolean {
        
        const left = this.evalComponent(component.left, scope);
        const right = this.evalComponent(component.right, scope);

        if (component.operator === 'and' && typeof left === 'boolean' && typeof right === 'boolean') {
            return left && right;
        } else if (component.operator === 'or' && typeof left === 'boolean' && typeof right === 'boolean') {
            return left || right;
        } else {
            throw 'no such logical operation';
        }
    }

    evalBinaryExpression(component: any, scope: Scope): string | number | boolean {
        
        const left = this.evalComponent(component.left, scope);
        const right = this.evalComponent(component.right, scope);

        const bothSidesAreNumbers = typeof left === 'number' && typeof right === 'number';
        const bothSidesAreStrings = typeof left === 'string' && typeof right === 'string';

        if (component.operator === '^' && bothSidesAreNumbers) {
            return left ** right;
        } else if (component.operator === '%' && bothSidesAreNumbers) {
            return left % right;
        } else if (component.operator === '//' && bothSidesAreNumbers) {
            return Math.floor(left / right);
        } else if (component.operator === '*' && bothSidesAreNumbers) {
            return left * right;
        } else if (component.operator === '/' && bothSidesAreNumbers) {
            return left / right;
        } else if (component.operator === '+' && bothSidesAreNumbers) {
            return left + right;
        } else if (component.operator === '-' && bothSidesAreNumbers) {
            return left - right;
        } else if (component.operator === '+' && bothSidesAreStrings) {
            return left + right;    // string concat
        } else if (component.operator === '==' && bothSidesAreStrings) {
            return left === right;
        } else if (component.operator === '==' && bothSidesAreNumbers) {
            return left === right;
        } else if (component.operator === '~=' && bothSidesAreStrings) {
            return left !== right;
        } else if (component.operator === '~=' && bothSidesAreNumbers) {
            return left !== right;
        } else if (component.operator === '>' && bothSidesAreStrings) {
            return left > right;
        } else if (component.operator === '>' && bothSidesAreNumbers) {
            return left > right;
        } else if (component.operator === '>=' && bothSidesAreStrings) {
            return left >= right;
        } else if (component.operator === '>=' && bothSidesAreNumbers) {
            return left >= right;
        } else if (component.operator === '<' && bothSidesAreStrings) {
            return left < right;
        } else if (component.operator === '<' && bothSidesAreNumbers) {
            return left < right;
        } else if (component.operator === '<=' && bothSidesAreStrings) {
            return left <= right;
        } else if (component.operator === '<=' && bothSidesAreNumbers) {
            return left <= right;
        } else {
            throw 'no such binary operation';
        }
    }
}
