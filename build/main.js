"use strict";
exports.__esModule = true;
var evaluator_1 = require("./evaluator");
var parser = require('luaparse');
// To run this file - npm start
function parseIntoAST(program) {
    var prog = program.replace(/let/g, 'local');
    var ast = parser.parse(prog, { luaVersion: '5.3' });
    return ast;
}
function interpret(program) {
    var ast = parseIntoAST(program);
    var e = new evaluator_1.Evaluator();
    e.evaluate(ast);
}
// user program
var userProgram = "\n\nlet ss = str_substring('hello', 0, 4);\nprint(ss)\n";
interpret(userProgram);
