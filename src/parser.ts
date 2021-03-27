import { Evaluator } from "./evaluator";

const parser = require('luaparse');


// refer to lua cheatsheet https://devhints.io/lua to write sample program

const prog = `

-- this is a comment

print(1)

x = 6

x = 3

print(x)

print('Entering loop now')

for i = 1, 10, 1 do
    print(x)
    print(i)
end

`;

const config = { luaVersion: '5.3' };

const ast = parser.parse(prog, config);

console.log(JSON.stringify(ast));   // prints the full AST in string form
console.log(ast);                   // prints the concise AST in object form

console.log(ast.body[4]);

// evaluate the ast - console will display 1 and 3
const e = new Evaluator();
e.evaluate(ast);

// to run this file - npm run parse
