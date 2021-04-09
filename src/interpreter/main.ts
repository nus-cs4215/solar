import { Evaluator } from './evaluator';
import { Linter } from './linter';
const parser = require('luaparse');

// To run this file - npm start

function parseIntoAST(program: string): any {
    const prog = program.replace(/let/g, 'local');
    const ast = parser.parse(prog, { luaVersion: '5.3' });
    return ast;
}

function interpret(program: string): any {
    const ast = parseIntoAST(program);

    const lntr = new Linter();
    lntr.analyse(ast);

    const e = new Evaluator();
    e.evaluate(ast);
}

// user program
const userProgram = `

let x = 0
while x < 10 do
    print(x)    
    if x == 5 then break end
    x = x + 1
end

`;

interpret(userProgram);
