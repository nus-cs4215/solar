export class Linter {

    analyse(ast: any): any {

        for (const c of ast.body) {
            this.analyseComponent(c, false)
        }
    }

    analyseComponent(component: any, insideFunction): void {

        switch (component.type) {

            case 'IfStatement':
                return this.analyseIfStatement(component, insideFunction);

            case 'WhileStatement':
                return this.analyseWhileLoop(component, insideFunction);

            case 'ForNumericStatement':
                return this.analyseNumericForLoop(component, insideFunction);
            
            case 'ForGenericStatement':
                return this.analyseGenericForLoop(component, insideFunction);

            case 'ReturnStatement':
                if (!insideFunction) throw 'return can only be used inside a function';

            default:
                console.log('Not a block');
        }
    }

    analyseIfStatement(component: any, insideFunction: boolean): void {

        for (const clause of component.clauses) {
            for (const c of clause.body) {
                this.analyseComponent(c, insideFunction);
            }
        }
    }

    analyseWhileLoop(component: any, insideFunction: boolean): void {
        
        for (const c of component.body) {
            this.analyseComponent(c, insideFunction);
        }
    }

    analyseNumericForLoop(component: any, insideFunction: boolean): void {

        for (const c of component.body) {
            this.analyseComponent(c, insideFunction);
        }
    }

    analyseGenericForLoop(component: any, insideFunction: boolean): void {

        for (const c of component.body) {
            this.analyseComponent(c, insideFunction);
        }
    }

}