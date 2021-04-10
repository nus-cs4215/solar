import { Parser } from './parser';
import { ReturnStatementAnalyser } from './return-statement-analyser';
import { Evaluator } from './evaluator';
import { SemanticAnalyser } from './semantic-analyser';

// To run this file - npm start

function interpret(program: string): any {
    const p = new Parser();
    const ast = p.parseIntoAst(program);

    const s = new SemanticAnalyser();
    s.analyse(ast);

    const e = new Evaluator();
    e.evaluate(ast);
}

// user program
const userProgram = `

print(1,1)
`;

interpret(userProgram);
