import { Scope } from './scope';
import { Break } from './instructions/break';
import { Return } from './instructions/return';
import { MathLibrary } from './standard-library/math-library';
import { StringLibrary } from './standard-library/string-library';
import { ArrayLibrary } from './standard-library/array-library';
import { TableLibrary } from './standard-library/table-library';
import { TailCall } from './instructions/tail-call';

export class Evaluator {

    tailCallOptimization = false;
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
            case 'Identifier':
                const symbol = component.name;
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
                return new Break();

            case 'FunctionDeclaration':
                return this.evalFunctionDeclaration(component, scope);

            case 'CallStatement':
                return this.evalCallExpression(component.expression, scope);
            
            case 'CallExpression':
                return this.evalCallExpression(component, scope);

            case 'ReturnStatement':
                if (this.tailCallOptimization) {
                    return this.evalReturnStatementTCO(component, scope);
                } else {
                    return this.evalReturnStatement(component, scope);
                }

            case 'ContainerConstructorExpression':
                return this.evalContainer(component, scope);

            default:
                console.warn('This syntax tree component is unrecognised');
                console.log('Syntax Error');
                throw 'Syntax Error';
        }
    }

    evalReturnStatementTCO(component: any, scope: Scope) {
        const returnValueComponent = component.arguments[0];
        if (returnValueComponent.type === 'CallExpression') {
            const argsComponent = returnValueComponent.arguments;
            const args = argsComponent.map(c => this.evalComponent(c, scope));
            return new TailCall(args);
        } else {
            const returnValue = this.evalComponent(component.arguments[0], scope);
            return new Return(returnValue);
        }
    }

    evalReturnStatement(component: any, scope: Scope) {
        const returnValue = this.evalComponent(component.arguments[0], scope);
        return new Return(returnValue);
    }

    evalFunctionDeclaration(component: any, scope: Scope): any {
        if (scope !== this.globalScope) {
            const errorMsg = 'Syntax Error: Functions can only be declared in the global scope';
            console.log(errorMsg);
            throw errorMsg;
        }

        const funcSymbol = component.identifier.name;
        const funcParams = component.parameters.map(p => p.name);
        const funcBody = component.body;
        const value = { params: funcParams, body: funcBody };

        scope.symbolTable[funcSymbol] = value;
    }

    evalDeclaration(component: any, scope: Scope): void {
        const symbol = component.variables[0].name;
        const value = this.evalComponent(component.init[0], scope);

        if (symbol in scope.symbolTable) {
            const errorMsg = `Syntax Error: ${symbol} has already been declared`;
            console.log(errorMsg);
            throw errorMsg;
        } else {
            scope.symbolTable[symbol] = value;
        }
    }

    evalAssignment(component: any, scope: Scope): void {
        const symbol = component.variables[0].name;
        const value = this.evalComponent(component.init[0], scope);
        scope.assign(symbol, value);
    }

    isArray(component: any): boolean {
        for (const field of component.fields) {
            if (field.type === 'TableKeyString') {
                return false;
            }
        }
        return true;
    }

    isTable(component: any): boolean {
        for (const field of component.fields) {
            if (field.type === 'TableValue') {
                return false;
            }
        }
        return true;
    }

    evalContainer(component: any, scope: Scope): any {
        if (this.isArray(component)) {
            const arr = component.fields.map(field => this.evalComponent(field.value, scope));
            return arr;
        } else if (this.isTable(component)) {
            let tbl = {}

            for (const field of component.fields) {
                const k = field.key.name;
                const v = this.evalComponent(field.value, scope);
                tbl[k] = v;
            }
            return tbl;
        } else {
            const errorMsg = 'Type Error: Container is neither an array nor table';
            console.log(errorMsg);
            throw errorMsg;
        }
    }

    hasElseClause(component: any): boolean {
        const lastClause = component.clauses[component.clauses.length - 1];
        return lastClause.type === 'ElseClause';
    }

    evalNonElseClauses(component: any, scope: Scope): any {
        for (const clause of component.clauses) {
            if (clause.type === 'ElseClause') return false;
            
            // we only evaluate the non-else clauses, and short circuit if necessary
            const condition = this.evalComponent(clause.condition, scope);
            
            if (condition === true) {
                
                const clauseScope = new Scope(scope);
                
                for (const c of clause.body) {
                    const evaluatedC = this.evalComponent(c, clauseScope);

                    if (evaluatedC instanceof Break || evaluatedC instanceof Return || evaluatedC instanceof TailCall) {
                        return evaluatedC;
                    }
                }
                return;
            }
        }
    }

    evalElseClause(component: any, scope: Scope): any {
        if (this.hasElseClause(component)) {

            const elseClause = component.clauses[component.clauses.length - 1];     // last clause
            const elseClauseScope = new Scope(scope);

            for (const c of elseClause.body) {
                const evaluatedC = this.evalComponent(c, elseClauseScope);
                
                if (evaluatedC instanceof Break || evaluatedC instanceof Return || evaluatedC instanceof TailCall) {
                    return evaluatedC;
                }
            }
        }
    }

    evalIfStatement(component: any, scope: Scope): any {
        const res = this.evalNonElseClauses(component, scope);

        if (res === false) {
            return this.evalElseClause(component, scope);
        } else {
            return res;
        }
    }

    evalCallExpression(component: any, scope: Scope): any {
        const funcName = component.base.name;
        const argsComponent = component.arguments;
        const args = argsComponent.map(c => this.evalComponent(c, scope));

        if (funcName === 'print') {
            console.log(args[0]);
        } else if (this.inMathLibrary(funcName)) {
            const mathLibrary = new MathLibrary();
            return mathLibrary.callLibraryFunction(funcName, args);
        } else if (this.inStringLibrary(funcName)) {
            const stringLibrary = new StringLibrary();
            return stringLibrary.callLibraryFunction(funcName, args);
        } else if (this.inArrayLibrary(funcName)) {
            const arrayLibrary = new ArrayLibrary();
            return arrayLibrary.callLibraryFunction(funcName, args);
        } else if (this.inTableLibrary(funcName)) {
            const tableLibray = new TableLibrary();
            return tableLibray.callLibraryFunction(funcName, args);
        } else {
            if (this.tailCallOptimization) {
                return this.callSelfDefinedFunctionTCO(funcName, args);
            } else {
                return this.callSelfDefinedFunction(funcName, args);
            }
        }
    }

    callSelfDefinedFunctionTCO(funcName: string, args: any[]): any {
        const functionScope = new Scope(null);
        const params = this.globalScope.symbolTable[funcName].params;
        functionScope.storeArguments(params, args);
        const funcBody = this.globalScope.symbolTable[funcName].body;

        for (let i = 0; i < funcBody.length; i++) {
            const c = funcBody[i];
            const evaluatedC = this.evalComponent(c, functionScope);
            
            if (evaluatedC instanceof Return) {
                return evaluatedC.returnValue;
            }

            if (evaluatedC instanceof TailCall) {
                const newArgs = evaluatedC.args;
                functionScope.storeArguments(params, newArgs);
                i = -1; // restarts the loop
                // -1 would immediately be incremented to 0 because of i++, hence the loop would effectively start at 0 again
            }
        }
    }

    callSelfDefinedFunction(funcName: string, args: any[]): any {
        const functionScope = new Scope(null);
        const params = this.globalScope.symbolTable[funcName].params;
        functionScope.storeArguments(params, args);
        const funcBody = this.globalScope.symbolTable[funcName].body;

        for (const c of funcBody) {
            const evaluatedC = this.evalComponent(c, functionScope);
            
            if (evaluatedC instanceof Return) {
                return evaluatedC.returnValue;
            }
        }
    }

    inMathLibrary(funcName: string): boolean {
        return funcName === 'math_abs'
            || funcName === 'math_ceil'
            || funcName === 'math_floor'
            || funcName === 'math_sqrt'
            || funcName === 'math_max'
            || funcName === 'math_min';
    }

    inStringLibrary(funcName: string): boolean {
        return funcName === 'str_len'//1
            || funcName === 'str_reverse'//1
            || funcName === 'str_split'//2
            || funcName === 'str_substring';//3
    }

    inArrayLibrary(funcName: string): boolean {
        return funcName === 'arr_len'//1
            || funcName === 'arr_reverse'//1
            || funcName === 'arr_sort'//1
            || funcName === 'arr_pop'//1
            || funcName === 'arr_push'//2
            || funcName === 'arr_get'//2
            || funcName === 'arr_set';//3
    }

    inTableLibrary(funcName: string): boolean {
        return funcName === 'tbl_len'//1
            || funcName === 'tbl_contains'//2
            || funcName === 'tbl_remove'//2
            || funcName === 'tbl_get'//2
            || funcName === 'tbl_put';//3
    }

    evalWhileLoop(component: any, scope: any): any {
        const whileLoopScope = new Scope(scope);

        let condition = this.evalComponent(component.condition, scope);

        while (condition === true) {

            for (const c of component.body) {
                const evaluatedC = this.evalComponent(c, whileLoopScope);
                condition = this.evalComponent(component.condition, scope); // while loop body might modify while loop condition

                if (evaluatedC instanceof Break || evaluatedC instanceof Return) {
                    return evaluatedC;
                }
            }
        }
    }

    evalGenericForLoop(component: any, scope: Scope): void {
        if (component.iterators.length !== 1) {
            const errorMsg = 'Syntax Error: Generic For Loop can only iterate through 1 container';
            console.log(errorMsg);
            throw errorMsg;
        }

        if (component.iterators[0].type !== 'Identifier') {
            const errorMsg = 'Syntax Error: Container referenced must be a symbol, not a literal';
            console.log(errorMsg);
            throw errorMsg;
        }
        
        const container = this.evalComponent(component.iterators[0], scope);
        
        if (Array.isArray(container)) {
            return this.evalGenericForLoopThroughArray(component, scope);
        } else {
            return this.evalGenericForLoopThroughTable(component, scope)
        }
    }

    evalGenericForLoopThroughArray(component: any, scope: Scope): any {
        if (component.variables.length !== 1) {
            const errorMsg = 'Syntax Error: There should only be 1 loop variable'
            console.log(errorMsg);
            throw errorMsg;
        }

        const forLoopScope = new Scope(scope);

        const itemSymbol = component.variables[0].name;
        const container = this.evalComponent(component.iterators[0], scope);

        for (const item of container) {
            forLoopScope.symbolTable[itemSymbol] = item;

            for (const c of component.body) {
                const evaluatedC = this.evalComponent(c, forLoopScope);
                
                if (evaluatedC instanceof Break || evaluatedC instanceof Return) {
                    return evaluatedC;
                }
            }
        }
    }

    evalGenericForLoopThroughTable(component: any, scope: Scope): any {
        if (component.variables.length !== 2) {
            const errorMsg = 'Syntax Error: There should be 2 loop variables, first variable for key and second variable for value';
            console.log(errorMsg);
            throw errorMsg;
        }

        const forLoopScope = new Scope(scope);

        const keySymbol = component.variables[0].name;
        const valueSymbol = component.variables[1].name;
        const container = this.evalComponent(component.iterators[0], scope);

        for (const [key, value] of Object.entries(container)) {
            forLoopScope.symbolTable[keySymbol] = key;
            forLoopScope.symbolTable[valueSymbol] = value;

            for (const c of component.body) {
                const evaluatedC = this.evalComponent(c, forLoopScope);

                if (evaluatedC instanceof Break || evaluatedC instanceof Return) {
                    return evaluatedC;
                }
            }
        }
    }

    evalNumericForLoop(component: any, scope: Scope): any {
        const forLoopScope = new Scope(scope);
        
        const loopControlVariable = component.variable.name;
        const start = this.evalComponent(component.start, scope);
        const end = this.evalComponent(component.end, scope);
        const step = this.evalComponent(component.step, scope);

        for (let i = start; i < end; i += step) {
            forLoopScope.symbolTable[loopControlVariable] = i; 

            for (const c of component.body) {
                const evaluatedC = this.evalComponent(c, forLoopScope);

                if (evaluatedC instanceof Break || evaluatedC instanceof Return) {
                    return evaluatedC;
                }
            }
        }
    }

    isLiteral(component: any): boolean {
        return component.type === 'StringLiteral' 
            || component.type === 'NumericLiteral'
            || component.type === 'BooleanLiteral';
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
            const errorMsg = 'Type Error: No such unary operation';
            console.log(errorMsg);
            throw errorMsg;
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
            const errorMsg = 'Type Error: No such logical operation';
            console.log(errorMsg);
            throw errorMsg;
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
            const errorMsg = 'Type Error: No such binary operation';
            console.log(errorMsg);
            throw errorMsg;
        }
    }
    
}
