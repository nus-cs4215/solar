"use strict";
exports.__esModule = true;
exports.SemanticAnalyser = void 0;
var variable_declaration_analyser_1 = require("./variable-declaration-analyser");
var return_statement_analyser_1 = require("./return-statement-analyser");
var args_length_analyser_1 = require("./args-length-analyser");
var SemanticAnalyser = /** @class */ (function () {
    function SemanticAnalyser() {
        this.variableDeclarationAnalyser = new variable_declaration_analyser_1.VariableDeclarationAnalyser();
        this.returnStatementAnalyser = new return_statement_analyser_1.ReturnStatementAnalyser();
        this.argsLengthAnalyser = new args_length_analyser_1.ArgsLengthAnalyser();
    }
    SemanticAnalyser.prototype.analyse = function (ast) {
        this.variableDeclarationAnalyser.analyse(ast);
        this.returnStatementAnalyser.analyse(ast);
        this.argsLengthAnalyser.analyse(ast);
    };
    return SemanticAnalyser;
}());
exports.SemanticAnalyser = SemanticAnalyser;
