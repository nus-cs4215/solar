import { Evaluator } from './evaluator';
const parser = require('luaparse');


// refer to lua cheatsheet https://devhints.io/lua to write sample program

const prog = `\
x = 77
print(max(1,x,23,11,56))

for k = 1, 10, 2 do
    print(k)
end

`;

const config = { luaVersion: '5.3' };

const ast = parser.parse(prog, config);

// console.log(JSON.stringify(ast));   // prints the full AST in string form
// console.log(ast);                   // prints the concise AST in object form

console.log(ast.body);

// evaluate the ast
const e = new Evaluator();
e.evaluate(ast);

// to run this file - npm run parse
