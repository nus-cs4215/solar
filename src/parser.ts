import { Evaluator } from "./evaluator";

const parser = require('luaparse');


// refer to lua cheatsheet https://devhints.io/lua to write sample program

const prog = `

-- this is a comment

print(5)

x = 6

x = 3

--t = { 1,3, 7 }

`;

const config = { luaVersion: '5.3' };

const ast = parser.parse(prog, config);

console.log(JSON.stringify(ast));   // prints the full AST in string form
console.log(ast);                   // prints the concise AST in object form

console.log(ast.body[0])

const e = new Evaluator();
e.evaluate(ast);

// to run this file - npm run parse
