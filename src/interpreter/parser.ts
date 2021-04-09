const parser = require('luaparse');

export class Parser {

    parseIntoAst(program: string): any {
        const prog = program.replace(/let/g, 'local');
        const ast = parser.parse(prog, { luaVersion: '5.3' });
        return ast;
    }
}
