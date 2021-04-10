import { Parser } from './parser';
import { SemanticAnalyser } from './semantic-analyser/semantic-analyser';
import { Evaluator } from './evaluator';

// To run this file - npm start

// tco stands for tail call optimization
function interpret(program: string, tco: boolean): any {
    const p = new Parser();
    const ast = p.parseIntoAst(program);

    const s = new SemanticAnalyser();
    s.analyse(ast);

    const e = new Evaluator(tco);
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

let res = hitZero(1100)
print(res)

`;

interpret(userProgram, true);
