import { Scope } from './scope';
const assert = require('assert');

export class Evaluator {

    globalScope: Scope = new Scope({}, null);

    // entry point. ast is the syntax tree of the entire program.
    evaluate(ast: any): void {
        
        for (const c of ast.body) {
            this.evalComponent(c, this.globalScope);
        }
    }
    
    evalComponent(component: any, scope: Scope): any {
        
        if (this.isLiteral(component)) {
            return this.evalLiteral(component);
        }

        switch (component.type) {

            case 'Identifier': {
                const symbol = component.name;
                return scope.lookup(symbol);
            }
    
            case 'AssignmentStatement': {
                const symbol = component.variables[0].name;
                const valueComponent = component.init[0];
                const value = this.evalComponent(valueComponent, scope);
                scope.symbolTable[symbol] = value;
                return;
            }               
            
            case 'UnaryExpression':
                return this.evalUnaryExpression(component, scope);

            case 'BinaryExpression':
                return this.evalBinaryExpression(component, scope);

            case 'LogicalExpression':
                return this.evalLogicalExpression(component, scope);

            case 'ForNumericStatement':
                return this.evalForLoop(component, scope);

            case 'CallStatement':
                return this.evalCallExpression(component.expression, scope);
            
            case 'CallExpression':
                return this.evalCallExpression(component, scope);

            default:
                console.log('This syntax tree component is unrecognised');
        }
    }

    evalCallExpression(component: any, scope: Scope): any {

        const functionName = component.base.name;

        if (this.isBuiltInFunction(functionName)) {
            const argsComponent = component.arguments;
            const args = argsComponent.map(c => this.evalComponent(c, scope));
            return this.invokeBuiltInFunction(functionName, args);
        } else {
            throw "self-defined function not implemented yet";
        }
    }

    isBuiltInFunction(funcName: string): boolean {
        return funcName === 'print' 
            || funcName === 'abs' 
            || funcName === 'ceil'
            || funcName === 'floor'
            || funcName === 'sqrt'
            || funcName === 'max'
            || funcName === 'min'
    }

    invokeBuiltInFunction(funcName: string, args: any[]): number | void {
        
        if (funcName === 'max') {
            
            let max = args[0];

            for (const arg of args) {
                if (arg > max) {
                    max = arg;
                }
            }

            return max;
        }

        if (funcName === 'min') {
            
            let min = args[0];

            for (const arg of args) {
                if (arg > min) {
                    min = arg;
                }
            }

            return min;
        }
        
        const arg = args[0];

        switch (funcName) {

            case 'print':
                console.log(arg);
                return;
            
            case 'abs':
                return Math.abs(arg);

            case 'ceil':
                return Math.ceil(arg);

            case 'floor':
                return Math.floor(arg);

            case 'sqrt':
                return Math.sqrt(arg);

            default:
                console.log('No such built-in function');
        }
    }

    evalForLoop(component: any, scope: Scope): void {

        const forLoopScope: Scope = new Scope({}, scope)
        
        const start = this.evalComponent(component.start, scope);
        const end = this.evalComponent(component.end, scope);
        const step = this.evalComponent(component.step, scope);

        for (let i = start; i <= end; i += step) {

            forLoopScope.symbolTable['i'] = i; 

            for (const c of component.body) {
                this.evalComponent(c, forLoopScope);
            }
        }
    }

    // currently unused. for minimalism, we only allow simple x = 1 assignments. don't allow x,y = 1,2
    evalAssignment(component: any, scope: Scope): void {
        
        const symbols = component.variables;
        const values = component.init;

        assert(symbols.length === values.length, "Length of symbols do not match values");
        
        for (let i = 0; i < symbols.length; i++) {
            const symbol = symbols[i].name;
            const value = values[i];

            scope.symbolTable[symbol] = this.evalComponent(value, scope);
        }
    }

    isLiteral(component: any): boolean {
        return component.type === 'StringLiteral' 
            || component.type === 'NumericLiteral'
            || component.type === 'BooleanLiteral'
            || component.type === 'NilLiteral';
    }

    evalLiteral(component: any): string | number | boolean | null {

        if (component.type === 'StringLiteral') {
            return component.raw;
        } else {
            return component.value;
        }
    }

    evalUnaryExpression(component: any, scope: Scope): number | boolean {

        const argument = this.evalComponent(component.argument, scope);

        if (component.operator === 'not' && typeof argument === 'boolean') {
            return !argument;
        } else if (component.operator === '-' && typeof argument === 'number') {
            return -argument;
        } else {
            throw 'no such unary operation';
        }
    }

    evalLogicalExpression(component: any, scope: Scope): boolean {
        
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

    // to add: < > <= >= ~= ==
    evalBinaryExpression(component: any, scope: Scope): string | number {
        
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
            return left + right;
        } else {
            throw 'no such binary operation';
        }
    }
}
