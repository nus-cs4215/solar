"use strict";
exports.__esModule = true;
var parser_1 = require("./parser");
var semantic_analyser_1 = require("./semantic-analyser/semantic-analyser");
var evaluator_1 = require("./evaluator");
// To run this file - npm start
function interpret(program, tco) {
    var p = new parser_1.Parser();
    var ast = p.parseIntoAst(program);
    var s = new semantic_analyser_1.SemanticAnalyser();
    s.analyse(ast);
    var e = new evaluator_1.Evaluator(tco);
    e.evaluate(ast);
}
// user program
var userProgram = "\n\nfunction fact(n, res)\n    if n == 0 then \n        return res\n    else\n        return fact(n-1, res * n)\n    end\nend\n\nprint(fact(99, 1))\n\n";
interpret(userProgram, false);
