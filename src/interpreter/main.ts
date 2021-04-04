import { Evaluator } from './evaluator';
const parser = require('luaparse');

// To run this file - npm start

function interpret(program: string): any {

    // replace 'let' with 'local' - a workaround to allow the use of 'let' keyword
    const prog = program.replace('let', 'local');

    // parse program into AST
    const ast = parser.parse(prog, { luaVersion: '5.3' });
    
    // evaluate AST
    const e = new Evaluator();
    e.evaluate(ast);
}

// user program
const userProgram = `

print('hi')

`;

interpret(userProgram);
