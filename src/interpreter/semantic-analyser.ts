import { ReturnStatementAnalyser } from "./return-statement-analyser";
import { ArgsLengthAnalyser } from "./args-length-analyser";

export class SemanticAnalyser {

    returnStatementAnalyser = new ReturnStatementAnalyser();
    argsLengthAnalyser = new ArgsLengthAnalyser();

    analyse(ast: any): void {
        this.returnStatementAnalyser.analyse(ast);
        this.argsLengthAnalyser.analyse(ast);
    }
}
