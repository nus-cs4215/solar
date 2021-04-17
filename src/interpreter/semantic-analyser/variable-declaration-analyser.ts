export class VariableDeclarationAnalyser {
    
    // entry point. ast is the syntax tree of the entire program.
    analyse(ast: any): void {
        for (const c of ast.body) {
            this.analyseComponent(c)
        }
    }

    analyseComponent(component: any): void {
        switch(component.type) {
            case 'LetStatement':
                return this.analyseVariableDeclaration(component);
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
