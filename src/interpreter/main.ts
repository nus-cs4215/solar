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

-- tail recursive fibonacci

function fib(n, a, b)
    if n == 0 then
        return a
    end
    if n == 1 then
        return b
    end
    return fib(n-1, b, a+b)
end

print(fib(2000,0,1))

`;

interpret(userProgram, true);
