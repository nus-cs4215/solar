"use strict";
exports.__esModule = true;
exports.SemanticAnalyser = void 0;
var variable_declaration_analyser_1 = require("./semantic-analyser-components/variable-declaration-analyser");
var return_statement_analyser_1 = require("./semantic-analyser-components/return-statement-analyser");
var for_loop_analyser_1 = require("./semantic-analyser-components/for-loop-analyser");
var args_length_analyser_1 = require("./semantic-analyser-components/args-length-analyser");
var SemanticAnalyser = /** @class */ (function () {
    function SemanticAnalyser() {
        this.variableDeclarationAnalyser = new variable_declaration_analyser_1.VariableDeclarationAnalyser();
        this.returnStatementAnalyser = new return_statement_analyser_1.ReturnStatementAnalyser();
        this.forLoopAnalyser = new for_loop_analyser_1.ForLoopAnalyser();
        this.argsLengthAnalyser = new args_length_analyser_1.ArgsLengthAnalyser();
    }
    SemanticAnalyser.prototype.analyse = function (ast) {
        this.variableDeclarationAnalyser.analyse(ast);
        this.returnStatementAnalyser.analyse(ast);
        this.forLoopAnalyser.analyse(ast);
        this.argsLengthAnalyser.analyse(ast);
    };
    return SemanticAnalyser;
}());
exports.SemanticAnalyser = SemanticAnalyser;
