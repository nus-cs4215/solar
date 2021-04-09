"use strict";
exports.__esModule = true;
var parser_1 = require("./parser");
var return_statement_analyser_1 = require("./return-statement-analyser");
var evaluator_1 = require("./evaluator");
// To run this file - npm start
function interpret(program) {
    var p = new parser_1.Parser();
    var ast = p.parseIntoAst(program);
    var r = new return_statement_analyser_1.ReturnStatementAnalyser();
    r.analyse(ast);
    var e = new evaluator_1.Evaluator();
    e.evaluate(ast);
}
// user program
var userProgram = "\n\nlet x = {vb=-1,a=2,c=4}\nprint(x)\n";
interpret(userProgram);
