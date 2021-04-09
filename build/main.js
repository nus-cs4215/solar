"use strict";
exports.__esModule = true;
var evaluator_1 = require("./evaluator");
var linter_1 = require("./linter");
var parser = require('luaparse');
// To run this file - npm start
function parseIntoAST(program) {
    var prog = program.replace(/let/g, 'local');
    var ast = parser.parse(prog, { luaVersion: '5.3' });
    return ast;
}
function interpret(program) {
    var ast = parseIntoAST(program);
    var lntr = new linter_1.Linter();
    lntr.analyse(ast);
    var e = new evaluator_1.Evaluator();
    e.evaluate(ast);
}
// user program
var userProgram = "\n\nif true then return 5 else print(1) end\n\n";
interpret(userProgram);
