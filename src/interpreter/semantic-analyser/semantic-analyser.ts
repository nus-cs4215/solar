import { VariableDeclarationAnalyser } from './variable-declaration-analyser';
import { ReturnStatementAnalyser } from './return-statement-analyser';
import { ForLoopAnalyser } from './for-loop-analyser';
import { ArgsLengthAnalyser } from './args-length-analyser';

export class SemanticAnalyser {

    variableDeclarationAnalyser = new VariableDeclarationAnalyser();
    returnStatementAnalyser = new ReturnStatementAnalyser();
    forLoopAnalyser = new ForLoopAnalyser();
    argsLengthAnalyser = new ArgsLengthAnalyser();

    analyse(ast: any): void {
        this.variableDeclarationAnalyser.analyse(ast);
        this.returnStatementAnalyser.analyse(ast);
        this.forLoopAnalyser.analyse(ast);
        this.argsLengthAnalyser.analyse(ast);
    }
}
