export class Evaluator {
    isChunk(component: any): boolean {
        return component.type === 'Chunk';
    }

    evalChunk(component: any): string | number | boolean | null {
        return this.evaluate(component.body);
    }

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
        return this.isChunk(component)
            ? this.evalChunk(component)
            : this.isLiteral(component)
            ? this.evalLiteral(component)
            : console.error("Unknown component type");
    }
}
