import { Scope } from '../src/scope';
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
                if (component.expression.base.name === 'print') {

                    const printArgumentComponent = component.expression.arguments[0];
                    const printArgument = this.evalComponent(printArgumentComponent, scope);
                    console.log(printArgument);
                    return;
                }
                break;
            
            default:
                console.log('This syntax tree component is unrecognised');
        }
        
        /*
        if (this.isLiteral(component)) {
            return this.evalLiteral(component);
        } else if (this.isSymbol(component)) {
            const symbol = component.name;
            return scope.lookup(symbol);
        } else if (this.isPrint(component)) {
            const printArgumentComponent = component.expression.arguments[0];
            const printArgument = this.evalComponent(printArgumentComponent, scope);
            console.log(printArgument);
            return;
        } else if (this.isAssignment(component)) {
            this.evalAssignment(component, scope);
            return;
        } else if (this.isBinaryExpression(component)) {
            return this.evalBinaryExpression(component, scope);
        } else if (this.isUnaryExpression(component)) {
            return this.evalUnaryExpression(component, scope);
        } else if (this.isForLoop(component)) {
            this.evalForLoop(component, scope);
            return;
        }
        */
    }

    isForLoop(component: any): boolean {
        return component.type === 'ForNumericStatement';
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

    isSymbol(component: any): boolean {
        return component.type === 'Identifier';
    }

    isPrint(component: any): boolean {
        return component.type === 'CallStatement' && component.expression.base.name === 'print';
    }

    isAssignment(component: any): boolean {
        return component.type === 'AssignmentStatement';
    }

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

    isUnaryExpression(component: any): boolean {
        return component.type === 'UnaryExpression';
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

    isBinaryExpression(component: any): boolean {
        return component.type === 'BinaryExpression';
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


    evalBinaryExpression(component: any, scope: Scope): string | number {
        
        const left = this.evalComponent(component.left, scope);
        const right = this.evalComponent(component.right, scope);

        if (component.operator === '*' && typeof left === 'number' && typeof right === 'number') {
            return left * right;
        } else if (component.operator === '/' && typeof left === 'number' && typeof right === 'number') {
            return left / right;
        } else if (component.operator === '+' && typeof left === 'number' && typeof right === 'number') {
            return left + right;
        } else if (component.operator === '+' && typeof left === 'number' && typeof right === 'number') {
            return left - right;
        } else if (component.operator === '+' && typeof left === 'string' && typeof right === 'string') {
            return left + right;
        } else {
            throw 'no such binary operation';
        }

        // return operator === '*'
        //     ? this.evalComponent(leftOperand, scope) * this.evalComponent(rightOperand, scope)
        //     : operator === '/'
        //     ? this.evalComponent(leftOperand, scope) / this.evalComponent(rightOperand, scope)
        //     : operator === '+'
        //     ? this.evalComponent(leftOperand, scope) + this.evalComponent(rightOperand, scope)
        //     : /** operator === '-' */ this.evalComponent(leftOperand, scope) - this.evalComponent(rightOperand, scope)
    }
}
