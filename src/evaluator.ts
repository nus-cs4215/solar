/*
    AST interpreter for Solar.
    Since the AST is a recursive data structure, our strategy is to evaluate it recursively.
*/
export class Evaluator {
    
    /*
        typescript has an 'eval' function, hence we use the 'evaluate' keyword to prevent name clash
        for the param, we use tree, instead of AST!
        Because tree can be entire ast, a subtree, or a single node (leaf)
    */
    evaluate(tree: any): any {
        
    }
    


}
