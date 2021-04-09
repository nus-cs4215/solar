import { Evaluator } from './evaluator';
import { ReturnStatementAnalyser } from './return-statement-analyser';
import { Parser } from './parser';

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

print(5)
`;

interpret(userProgram);
