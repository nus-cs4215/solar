"use strict";
exports.__esModule = true;
var evaluator_1 = require("./evaluator");
var parser = require('luaparse');
// To run this file - npm start
function interpret(program) {
    // replace 'let' with 'local' - a workaround to allow the use of 'let' keyword
    var prog = program.replace('let', 'local');
    // parse program into AST
    var ast = parser.parse(prog, { luaVersion: '5.3' });
    // evaluate AST
    var e = new evaluator_1.Evaluator();
    e.evaluate(ast);
}
// user program
var userProgram = "\n\nprint('hi')\n\n";
interpret(userProgram);
