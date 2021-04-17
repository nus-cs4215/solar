// Scans an if block or loop block to see if it illegally contains a return statement
export class ReturnStatementAnalyser {

    // entry point. ast is the syntax tree of the entire program.
    analyse(ast: any): void {
        for (const c of ast.body) {
            this.analyseComponent(c)
        }
    }

    analyseComponent(component: any): void {
        switch (component.type) {
            case 'IfStatement':
                return this.analyseIfStatement(component);

            case 'WhileStatement':
                return this.analyseWhileLoop(component);

            case 'ForNumericStatement':
                return this.analyseNumericForLoop(component);
            
            case 'ForGenericStatement':
                return this.analyseGenericForLoop(component);

            case 'ReturnStatement':
                const errorMsg = 'Syntax Error: return cannot be used outside a function';
                console.log(errorMsg);
                throw errorMsg;
        }
    }

    analyseIfStatement(component: any): void {
        for (const clause of component.clauses) {
            for (const c of clause.body) {
                this.analyseComponent(c);
            }
        }
    }

    analyseWhileLoop(component: any): void {
        for (const c of component.body) {
            this.analyseComponent(c);
        }
    }

    analyseNumericForLoop(component: any): void {
        for (const c of component.body) {
            this.analyseComponent(c);
        }
    }

    analyseGenericForLoop(component: any): void {
        for (const c of component.body) {
            this.analyseComponent(c);
        }
    }
}
