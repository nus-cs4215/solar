import { Scope } from '../src/scope';

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
        }

        if (this.isSymbol(component)) {
            const symbol = component.name;
            return scope.lookup(symbol);
        }

        if (this.isPrint(component)) {
            const printArgument = this.evalComponent(component.expression.arguments[0], scope);
            console.log(printArgument);
            return;
        }

        if (this.isAssignment(component)) {
            this.evalAssignment(component, scope);
            return;
        }

        if (this.isForLoop(component)) {

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
        const symbol = component.variables[0].name;
        const value = component.init[0].value;

        scope.symbolTable[symbol] = value;
    }

    isLiteral(component: any): boolean {
        return component.type === 'StringLiteral' 
            || component.type === 'NumericLiteral'
            || component.type === 'BooleanLiteral'
            || component.type === 'NilLiteral';
    }

    evalLiteral(component: any): string | number | boolean | null {
        return component.value;
    }






}
