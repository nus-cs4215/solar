import { Evaluator } from './evaluator';
import parser = require('luaparse');

const prog = `\
x = 2
print(1== x)
`;

const ast = parser.parse(prog, { luaVersion: '5.3' });

// console.log(JSON.stringify(ast));   // prints the full AST in string form
// console.log(ast);                   // prints the concise AST in object form

console.log(ast.body);

// evaluate the ast
const e = new Evaluator();
e.evaluate(ast);

// to run this file - npm run parse
