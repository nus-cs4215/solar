export class ForLoopAnalyser {
    
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
            case 'FunctionDeclaration':
                return this.analyseBlock(component);

            case 'ForNumericStatement':
                return this.analyseNumericForLoop(component);
            
            case 'ForGenericStatement':
                return this.analyseGenericForLoop(component);
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

    analyseNumericForLoop(component: any): void {
        if (component.step === null) {
            const errorMsg = 'Syntax Error: Numeric For Loop requires a step size'
            console.log(errorMsg);
            throw errorMsg;
        }
        this.analyseBlock(component);
    }

    analyseGenericForLoop(component: any): void {
        if (component.iterators[0].type !== 'Identifier') {
            const errorMsg = 'Syntax Error: Container referenced must be a symbol, not a literal';
            console.log(errorMsg);
            throw errorMsg;
        }

        if (component.iterators.length !== 1) {
            const errorMsg = 'Syntax Error: Generic For Loop can only iterate through 1 container';
            console.log(errorMsg);
            throw errorMsg;
        }       
    }
}