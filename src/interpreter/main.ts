import { Evaluator } from './evaluator';
const parser = require('luaparse');

// To run this file - npm start

function parseIntoAST(program: string): any {
    const prog = program.replace(/let/g, 'local');
    const ast = parser.parse(prog, { luaVersion: '5.3' });
    return ast;
}

function interpret(program: string): any {
    const ast = parseIntoAST(program);
    const e = new Evaluator();
    e.evaluate(ast);
}

// user program
const userProgram = `

if 5>1 then return 11 end
`;

interpret(userProgram);
