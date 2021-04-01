import { Evaluator } from './evaluator';
const parser = require('luaparse');

// To run this file - npm start


// user program
const prog = `

print('hi')

`;

// parse program into AST
const ast = parser.parse(prog, { luaVersion: '5.3' });

//console.log(ast.body);

// evaluate AST
const e = new Evaluator();
e.evaluate(ast);
