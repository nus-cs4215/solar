import { Parser } from './parser';
import { SemanticAnalyser } from './semantic-analyser/semantic-analyser';
import { Evaluator } from './evaluator/evaluator';

// To run this file - npm start

export function interpret(program: string): any {
    const p = new Parser();
    const ast = p.parseIntoAst(program);

    const s = new SemanticAnalyser();
    s.analyse(ast);

    const e = new Evaluator();
    e.evaluate(ast);
}

// user program
const userProgram = `
let arr= {1,2,7}

for i = 0,3,1 do
    for y = 0,3,1 do
        print(i)
    end
end
`;

interpret(userProgram);
