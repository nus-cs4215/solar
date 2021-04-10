export class MathLibrary {

    callLibraryFunction(funcName: string, args: number[]): number {
        // TODO: run time type check

        switch (funcName) {
            case 'math_abs':
                return Math.abs(args[0]);

            case 'math_ceil':
                return Math.ceil(args[0]);

            case 'math_floor':
                return Math.floor(args[0]);

            case 'math_sqrt':
                return Math.sqrt(args[0]);

            case 'math_max':
                return this.max(args);
            
            case 'math_min':
                return this.min(args);
            
            default:
                const errorMessage = 'Syntax Error: No such function in Math Library';
                console.log(errorMessage);
                throw errorMessage;
        }
    }

    max(args: number[]): number {
        let max = args[0];
            for (const arg of args) {
                if (arg > max) {
                    max = arg;
                }
            }
        return max;
    }

    min(args: number[]): number {
        let min = args[0];
            for (const arg of args) {
                if (arg < min) {
                    min = arg;
                }
            }
        return min;
    }
}
