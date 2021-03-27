import { Scope } from '../src/scope';
const assert = require('assert');

export class Evaluator {

    globalScope: Scope = new Scope({}, null);

    // entry point. ast is the syntax tree of the entire program.
    evaluate(ast: any): void {
        
        const body = ast.body
        
        for (const c of body) {
            this.evalComponent(c, this.globalScope);
        }
    }
    
    evalComponent(component: any, scope: Scope): any {
        if (this.isLiteral(component)) {
            return this.evalLiteral(component);
        } else if (this.isSymbol(component)) {
            const symbol = component.name;
            return scope.lookup(symbol);
        } else if (this.isPrint(component)) {
            const printArgument = this.evalComponent(component.expression.arguments[0], scope);
            return;
        } else if (this.isAssignment(component)) {
            this.evalAssignment(component, scope);
            return;
        } else if (this.isBinaryExpression(component)) {
            return this.evalBinaryExpression(component, scope);
        } else if (this.isForLoop(component)) {
            this.evalForLoop(component, scope);
            return;
        }
    }

    isForLoop(component: any): boolean {
        return component.type === 'ForNumericStatement';
    }

    evalForLoop(component: any, scope: Scope) {

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

    evalAssignment(component: any, scope: Scope) {
        const symbols = component.variables;
        const values = component.init;
        assert(symbols.length === values.length, "Length of symbols do not match values")
        for (let i = 0; i < symbols.length; i++) {
            const symbolName = symbols[i].name;
            scope.symbolTable[symbolName] = this.evalComponent(values[i], scope);
        }
    }

    isLiteral(component: any): boolean {
        return component.type === 'StringLiteral' 
            || component.type === 'NumericLiteral'
            || component.type === 'BooleanLiteral'
            || component.type === 'NilLiteral';
    }

    evalLiteral(component: any): string | number | boolean | null {
        return component.type === 'StringLiteral'
            ? component.raw
            : component.value;
    }

    isBinaryExpression(component: any): boolean {
        return component.type === "BinaryExpression";
    }

    evalBinaryExpression(component: any, scope: Scope): number | boolean {
        const operator = component.operator;
        const leftOperand = component.left;
        const rightOperand = component.right;

        return operator === '*'
            ? this.evalComponent(leftOperand, scope) * this.evalComponent(rightOperand, scope)
            : operator === '/'
            ? this.evalComponent(leftOperand, scope) / this.evalComponent(rightOperand, scope)
            : operator === '+'
            ? this.evalComponent(leftOperand, scope) + this.evalComponent(rightOperand, scope)
            : /** operator === '-' */ this.evalComponent(leftOperand, scope) - this.evalComponent(rightOperand, scope)
    }
}
