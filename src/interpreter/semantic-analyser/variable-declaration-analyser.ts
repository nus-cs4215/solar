export class VariableDeclarationAnalyser {
    
    // entry point. ast is the syntax tree of the entire program.
    analyse(ast: any): void {
        for (const c of ast.body) {
            this.analyseComponent(c)
        }
    }

    analyseComponent(component: any): void {
        switch(component.type) {
            case 'IfStatement':
                return this.analyseIfStatement(component);
            
            case 'WhileStatement':
            case 'ForNumericStatement':
            case 'ForGenericStatement':
            case 'FunctionDeclaration':
                return this.analyseBlock(component);

            case 'LetStatement':
                return this.analyseVariableDeclaration(component);
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

    analyseVariableDeclaration(component: any): void {
        if (component.variables.length !== 1 || component.init.length !== 1) {
            const errorMsg = 'Syntax Error: Variable declaration should have 1 symbol on the left and 1 value on the right. Eg. let x = 1';
            console.log(errorMsg);
            throw errorMsg;
        }
    }
}
