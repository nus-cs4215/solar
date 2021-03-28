import { Evaluator } from "./evaluator";

const parser = require('luaparse');


// refer to lua cheatsheet https://devhints.io/lua to write sample program

const prog = `
x = true + "string"
y = nil
b = true or x
print(b)
`;

const config = { luaVersion: '5.3' };

const ast = parser.parse(prog, config);

// console.log(JSON.stringify(ast));   // prints the full AST in string form
// console.log(ast);                   // prints the concise AST in object form

console.log(ast.body[0])

// evaluate the ast
const e = new Evaluator();
e.evaluate(ast);

// to run this file - npm run parse
