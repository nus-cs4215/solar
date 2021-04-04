import { Evaluator } from './evaluator';
const parser = require('luaparse');

// To run this file - npm start

function interpret(program: string): any {

    // parse program into AST
    const ast = parser.parse(program, { luaVersion: '5.3' });
    
    // evaluate AST
    const e = new Evaluator();
    e.evaluate(ast);
}

// user program
const prog = `
x = 1
let x = 2
print(x)

    if true then
        let y = 1
    end

`;

interpret(prog);
