import { Evaluator } from './evaluator';
const parser = require('luaparse');

// To run this file - npm start

function interpret(program: string): any {

    // parse program into AST
    const ast = parser.parse(program, { luaVersion: '5.3' });
    console.log(ast.body);
    
    // evaluate AST
    const e = new Evaluator();
    e.evaluate(ast);
}

// user program
const prog = `

local x = 1

`;

interpret(prog);
