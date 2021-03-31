import { Evaluator } from './evaluator';
const parser = require('luaparse');


const prog = `\

arr = {1,2,3,4,5,6,7,9,8,0}

for i = 0,10,1 do
    print(arr[i])
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
