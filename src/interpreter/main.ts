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

print(x)
if x == 2 then
    x = 3
elseif x == 1 then
    x = 5
end

print(x)

`;

interpret(userProgram);
