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

function f(x)
    for i = x,10,1 do
        print(i)
        if i == 5 then
            return i+2
        end
    end
end
print(f(2))
`;

interpret(userProgram);
