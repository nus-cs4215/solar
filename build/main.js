"use strict";
exports.__esModule = true;
exports.interpret = void 0;
var parser_1 = require("./parser");
var semantic_analyser_1 = require("./semantic-analyser/semantic-analyser");
var evaluator_1 = require("./evaluator/evaluator");
// To run this file - npm start
function interpret(program) {
    var p = new parser_1.Parser();
    var ast = p.parseIntoAst(program);
    var s = new semantic_analyser_1.SemanticAnalyser();
    s.analyse(ast);
    var e = new evaluator_1.Evaluator();
    e.evaluate(ast);
}
exports.interpret = interpret;
// user program
var userProgram = "\nlet b = 1!=2\nlet a = 1!=1\nprint(b)\nprint(a)\nprint(b or a)\n";
interpret(userProgram);
