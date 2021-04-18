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
            case 'ForNumericStatement':
            case 'ForGenericStatement':
                return this.analyseBlock(component);

            case 'ReturnStatement':
                const errorMsg = 'Syntax Error: return cannot be used outside a function';
                console.log(errorMsg);
                throw errorMsg;
        }
    }

    analyseIfStatement(component: any): void {
        for (const clause of component.clauses) {
            this.analyseBlock(clause);
        }
    }

    analyseBlock(component: any): void {
        for (const c of component.body) {
            this.analyseComponent(c);
        }
    }
}
