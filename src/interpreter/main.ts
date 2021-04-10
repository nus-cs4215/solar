import { Parser } from './parser';
import { ReturnStatementAnalyser } from './return-statement-analyser';
import { Evaluator } from './evaluator';

// To run this file - npm start

function interpret(program: string): any {
    const p = new Parser();
    const ast = p.parseIntoAst(program);

    const r = new ReturnStatementAnalyser();
    r.analyse(ast);

    const e = new Evaluator();
    e.evaluate(ast);
}

// user program
const userProgram = `

print(1,1)
`;

interpret(userProgram);
