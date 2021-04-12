import { VariableDeclarationAnalyser } from './variable-declaration-analyser';
import { ReturnStatementAnalyser } from './return-statement-analyser';
import { ArgsLengthAnalyser } from './args-length-analyser';

export class SemanticAnalyser {

    variableDeclarationAnalyser = new VariableDeclarationAnalyser();
    returnStatementAnalyser = new ReturnStatementAnalyser();
    argsLengthAnalyser = new ArgsLengthAnalyser();

    analyse(ast: any): void {
        this.variableDeclarationAnalyser.analyse(ast);
        this.returnStatementAnalyser.analyse(ast);
        this.argsLengthAnalyser.analyse(ast);
    }
}
