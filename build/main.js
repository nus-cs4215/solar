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
var userProgram = "\n\nlet t = { a=1,vc=45,fc=6,b=1}\nprint(t)\n\nfor x,y in t do\n    print(y)\nend\n";
interpret(userProgram);
