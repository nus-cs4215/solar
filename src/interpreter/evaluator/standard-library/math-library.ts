export class MathLibrary {

    callLibraryFunction(funcName: string, args: number[]): number {
        this.typeCheckArgs(funcName, args);
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

    typeCheckArgs(funcName: string, args: number[]): void {
        switch (funcName) {
            case 'math_abs':
            case 'math_ceil':
            case 'math_floor':
            case 'math_sqrt':
                if (typeof args[0] === 'number') {
                    return;
                } else {
                    const errorMsg = `Type Error: Args types should be as follows - ${funcName}(number)`;
                    console.log(errorMsg);
                    throw errorMsg;                
                }

            case 'math_max':            
            case 'math_min':
                for (const arg of args) {
                    if (typeof arg !== 'number') {
                        const errorMsg = `Type Error: Args types should be as follows - ${funcName}(number, ... , number)`
                        console.log(errorMsg);
                        throw errorMsg;
                    }
                }
                return;
        }
    }
}
