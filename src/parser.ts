import { Evaluator } from './evaluator';
const parser = require('luaparse');


const prog = `\
x = 2
print(1== x)

for j = 1,10,1 do
print(j)
break
end

`;

const config = { luaVersion: '5.3' };

const ast = parser.parse(prog, config);

// console.log(JSON.stringify(ast));   // prints the full AST in string form
// console.log(ast);                   // prints the concise AST in object form

const a = ast.body[2];
console.log(a.body);

// evaluate the ast
const e = new Evaluator();
e.evaluate(ast);

// to run this file - npm run parse
