"use strict";
exports.__esModule = true;
exports.Parser = void 0;
var parser = require('luaparse');
var Parser = /** @class */ (function () {
    function Parser() {
    }
    Parser.prototype.parseIntoAst = function (program) {
        var prog = program.replace(/let/g, 'local').replace(/!=/g, '~=');
        var defaultAST = parser.parse(prog, { luaVersion: '5.3' });
        var ast = this.modifyDefaultAST(defaultAST);
        return ast;
    };
    Parser.prototype.modifyDefaultAST = function (defaultAST) {
        var defaultASTstring = JSON.stringify(defaultAST);
        var modifiedASTstring = defaultASTstring.replace(/LocalStatement/g, 'LetStatement')
            .replace(/TableConstructorExpression/g, 'ContainerConstructorExpression');
        var modifiedAST = JSON.parse(modifiedASTstring);
        return modifiedAST;
    };
    return Parser;
}());
exports.Parser = Parser;
