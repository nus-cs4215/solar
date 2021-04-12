import { Parser } from './parser';
import { SemanticAnalyser } from './semantic-analyser/semantic-analyser';
import { Evaluator } from './evaluator';

// To run this file - npm start

function interpret(program: string): any {
    const p = new Parser();
    const ast = p.parseIntoAst(program);
    console.log(ast.body[0])
    const s = new SemanticAnalyser();
    s.analyse(ast);

    const e = new Evaluator();
    e.evaluate(ast);
}

// user program
const userProgram = `

let x

`;

interpret(userProgram);
