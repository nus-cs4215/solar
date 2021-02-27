/*
    Interpreter for Solar.
    AST interpreter. Evaluation of the AST is done recursively.

    Current progress:
    - evaluate literal
    - evaluate addition

*/
export class Evaluator {
    
    /*
        typescript has an 'eval' function, hence we use the 'evaluate' keyword to prevent name clash
        for the param, we use tree, instead of AST!
        Because tree can be entire ast, a subtree, or a single node (leaf)
    */
    evaluate(tree: any) {
        
        if (tree.type === 'literal') {
            return tree.value;
        }

        if (tree.type === 'addition') {
            return this.evaluate(tree.left) + this.evaluate(tree.right);
        }

        return -1;  // shouldnt reach here
    }
}
