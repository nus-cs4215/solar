"use strict";
exports.__esModule = true;
var parser_1 = require("./parser");
var semantic_analyser_1 = require("./semantic-analyser/semantic-analyser");
var evaluator_1 = require("./evaluator");
// To run this file - npm start
function interpret(program) {
    var p = new parser_1.Parser();
    var ast = p.parseIntoAst(program);
    var s = new semantic_analyser_1.SemanticAnalyser();
    s.analyse(ast);
    var e = new evaluator_1.Evaluator();
    e.evaluate(ast);
}
// user program
var userProgram = "\n\nfunction hitZero(n)\n    if n == 0 then\n        return 'We have hit zero!!'\n    else\n        return hitZero(n-1)\n    end\nend\n\nlet res = hitZero(10000)\nprint(res)\n\n";
interpret(userProgram);
