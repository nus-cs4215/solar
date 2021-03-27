const parser = require('luaparse');


// refer to lua cheatsheet https://devhints.io/lua to write sample program

const prog = `

-- this is a comment

function foo(x)
    print(x)
    return 5
end

foo(3)

`;

const ast = parser.parse(prog);

console.log(JSON.stringify(ast));
console.log(ast);

// to run this file - npm run parse
