const parser = require('luaparse');


// refer to lua cheatsheet https://devhints.io/lua to write sample program

const prog = `

-- this is a comment

function foo(x)
    print(x)
    y = 5 + 5
    return y
end

foo(3)

print(5)

--t = { 1,3, 7 }

`;

const config = { luaVersion: '5.3' };

const ast = parser.parse(prog, config);

console.log(JSON.stringify(ast));   // prints the full AST in string form
console.log(ast);                   // prints the concise AST in object form

// to run this file - npm run parse
