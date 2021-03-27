import { Evaluator } from "./evaluator";

const parser = require('luaparse');


// refer to lua cheatsheet https://devhints.io/lua to write sample program

const prog = `
x = 1 - 3
print(true)
print('Entering loop now, step of increment is 2, not 1')
for i = 1, 10, 2 do
    print(i)
    print(x)
end

a,b = 5,6
print(a)
print(b)
`;

const config = { luaVersion: '5.3' };

const ast = parser.parse(prog, config);

// console.log(JSON.stringify(ast));   // prints the full AST in string form
// console.log(ast);                   // prints the concise AST in object form

// evaluate the ast
const e = new Evaluator();
e.evaluate(ast);

// to run this file - npm run parse
