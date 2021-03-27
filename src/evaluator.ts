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
        }
    }

    isPrint(component: any) {
        return true;
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
