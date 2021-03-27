export class Evaluator {
    isLiteral(component: any): boolean {
        return component.type === 'StringLiteral' 
            || component.type === 'NumericLiteral'
            || component.type === 'BooleanLiteral'
            || component.type === 'NilLiteral';
    }

    evalLiteral(component: any): string | number | boolean | null {
        return component.value;
    }
    
    evaluate(component: any): any {
        // number, boolean, string, nil
        return this.isLiteral(component)
            ? this.evalLiteral(component)
            : console.error("Unknown component type");
    }
}
