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

function fib(x)
    if x == 0 then
        return 0
    elseif x == 1 then
        return 1
    else
        return fib(x-1) + fib(x-2)
    end
end

print(fib(30))

`;

interpret(userProgram);
