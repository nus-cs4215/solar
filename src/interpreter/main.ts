import { Parser } from './parser';
import { SemanticAnalyser } from './semantic-analyser/semantic-analyser';
import { Evaluator } from './evaluator';

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

let a = {z= 11, b = 2, a=1}
a = tbl_put(a, 'a', 3)
print(a)
`;

interpret(userProgram);
