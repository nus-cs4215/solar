import { Evaluator } from './evaluator';
const parser = require('luaparse');

// To run this file - npm start

function parseIntoAST(program: string): any {
    const prog = program.replace(/let/g, 'local');
    const ast = parser.parse(prog, { luaVersion: '5.3' });
    return ast;
}

function interpret(program: string): any {
    const ast = parseIntoAST(program);
    //console.log(ast.body[0])
    const e = new Evaluator();
    e.evaluate(ast);
}

// user program
const userProgram = `

let t = { a=1,vc=45,fc=6,b=1}
print(t)

for x,y in t do
    print(y)
end
`;

interpret(userProgram);
