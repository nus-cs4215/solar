"use strict";
exports.__esModule = true;
var evaluator_1 = require("./evaluator");
var parser = require('luaparse');
// To run this file - npm start
function interpret(program) {
    // parse program into AST
    var ast = parser.parse(program, { luaVersion: '5.3' });
    // evaluate AST
    var e = new evaluator_1.Evaluator();
    e.evaluate(ast);
}
// user program
var prog = "\n\nprint('hi')\n\n";
interpret(prog);
