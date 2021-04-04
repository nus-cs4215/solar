import { Evaluator } from './evaluator';
const parser = require('luaparse');

// To run this file - npm start

function interpret(program: string): any {

    // replace 'let' with 'local' - a workaround to allow the use of 'let' keyword
    const prog = program.replace('let', 'local');

    // parse program into AST
    const ast = parser.parse(prog, { luaVersion: '5.3' });
    console.log(ast.body[1])
    
    // evaluate AST
    const e = new Evaluator();
    e.evaluate(ast);
}

// user program
const userProgram = `

let x = 1

while 10 > x do
    print(x)
    x = x + 1
end

`;

interpret(userProgram);
