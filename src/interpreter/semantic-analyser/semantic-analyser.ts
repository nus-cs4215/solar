import { VariableDeclarationAnalyser } from './semantic-analyser-components/variable-declaration-analyser';
import { ReturnStatementAnalyser } from './semantic-analyser-components/return-statement-analyser';
import { ForLoopAnalyser } from './semantic-analyser-components/for-loop-analyser';
import { ArgsLengthAnalyser } from './semantic-analyser-components/args-length-analyser';

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
