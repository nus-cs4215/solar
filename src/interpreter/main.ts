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

function hitZero(n)
    if n == 0 then
        return 'We have hit zero!!'
    else
        return hitZero(n-1)
    end
end

let res = hitZero(10000)
print(res)

`;

interpret(userProgram);
