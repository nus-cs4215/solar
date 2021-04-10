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
var userProgram = "\n\nlet a = {7,2,4}\na = arr_pop(a)\na = arr_sort(a)\na = arr_set(a, 1, 3)\nprint(a)\n";
interpret(userProgram);
