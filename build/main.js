"use strict";
exports.__esModule = true;
var parser_1 = require("./parser");
var semantic_analyser_1 = require("./semantic-analyser/semantic-analyser");
var evaluator_1 = require("./evaluator");
// To run this file - npm start
// tco stands for tail call optimization
function interpret(program, tco) {
    var p = new parser_1.Parser();
    var ast = p.parseIntoAst(program);
    var s = new semantic_analyser_1.SemanticAnalyser();
    s.analyse(ast);
    var e = new evaluator_1.Evaluator(tco);
    e.evaluate(ast);
}
// user program
var userProgram = "\n\n-- tail recursive fibonacci\n\nfunction fib(n, a, b)\n    if n == 0 then\n        return a\n    end\n    if n == 1 then\n        return b\n    end\n    return fib(n-1, b, a+b)\nend\n\nprint(fib(2000,0,1))\n\n";
interpret(userProgram, true);
