import { Scope } from '../src/scope';

export class Evaluator {

    globalScope: Scope = new Scope({}, null);

    // entry point
    evaluate(ast: any): void {
        
        const body = ast.body
        
        for (let c of body) {
            this.evalComponent(c, this.globalScope);
        }
    }
    
    evalComponent(component: any, scope: Scope): any {
        
        if (this.isPrint(component)) {
            console.log(5);
            return;
        }

        if (this.isAssignment(component)) {
            this.evalAssignment(component, scope);
            return;
        }
    }

    isPrint(component: any) {
        return component.type === 'CallStatement' && component.expression.base.name === 'print';
    }

    isAssignment(component: any) {
        return component.type === 'AssignmentStatement';
    }

    evalAssignment(component: any, scope: Scope) {
        const symbol = component.variables[0].name;
        const value = component.init[0].value;

        scope.symbolTable[symbol] = value;
    }


    /*

    isLiteral(component: any): boolean {
        return component.type === 'StringLiteral' 
            || component.type === 'NumericLiteral'
            || component.type === 'BooleanLiteral'
            || component.type === 'NilLiteral';
    }

    evalLiteral(component: any): string | number | boolean | null {
        return component.value;
    }

    */






}
