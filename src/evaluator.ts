/*
    AST interpreter for Solar.
    Evaluation of the AST is done recursively.

    Current progress:
    - evaluate literal
    - evaluate addition

*/
export class Evaluator {
    
    typeIsArithmetic(tree: any): boolean {
        return tree.type === 'plus' || tree.type === 'minus' || tree.type === 'times' || tree.type === 'divide'
    }

    arithmeticEval(tree: any): number {
        
        if (tree.type === 'plus') {
            return this.evaluate(tree.left) + this.evaluate(tree.right);
        }
        
        if (tree.type === 'minus') {
            return this.evaluate(tree.left) - this.evaluate(tree.right);
        }

        if (tree.type === 'times') {
            return this.evaluate(tree.left) * this.evaluate(tree.right);
        }

        if (tree.type === 'divide') {
            return this.evaluate(tree.left) / this.evaluate(tree.right);
        }
    }

    /*
        typescript has an 'eval' function, hence we use the 'evaluate' keyword to prevent name clash
        for the param, we use tree, instead of AST!
        Because tree can be entire ast, a subtree, or a single node (leaf)
    */
    evaluate(tree: any): any {
        
        // number, boolean, string
        if (tree.type === 'literal') {
            return tree.value;
        }

        if (this.typeIsArithmetic(tree)) {
            return this.arithmeticEval(tree);
        }
    }
}
