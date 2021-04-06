import { Evaluator } from './evaluator';
const parser = require('luaparse');

// To run this file - npm start

function interpret(program: string): any {

    // replace 'let' with 'local' - a workaround to allow the use of 'let' keyword
    const prog = program.replace(/let/g, 'local');

    // parse program into AST
    const ast = parser.parse(prog, { luaVersion: '5.3' });
    
    // evaluate AST
    const e = new Evaluator();
    e.evaluate(ast);
}

// user program
const userProgram = `

function add(x,y) 
    let a = 1
    if 5 > 3 then
        print('bye')
        return x + y
    end
    print('can')
    return 7
end
let sum = add(1,2)
print(sum)
`;

interpret(userProgram);
