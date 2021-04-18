const parser = require('luaparse');

export class Parser {

    parseIntoAst(program: string): any {
        const prog = program.replace(/let/g, 'local').replace(/!=/g, '~=');
        const defaultAST = parser.parse(prog, { luaVersion: '5.3' });
        const ast = this.modifyDefaultAST(defaultAST);
        return ast;
    }

    modifyDefaultAST(defaultAST: any): any {
        const defaultASTstring = JSON.stringify(defaultAST);
        const modifiedASTstring = defaultASTstring.replace(/LocalStatement/g, 'LetStatement')
                                                  .replace(/TableConstructorExpression/g, 'ContainerConstructorExpression');
        const modifiedAST = JSON.parse(modifiedASTstring);
        return modifiedAST;
    }
}
