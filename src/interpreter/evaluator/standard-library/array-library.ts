export class ArrayLibrary {

    callLibraryFunction(funcName: string, args: any[]): any {      
        this.typeCheckArgs(funcName, args); 
        const arr = args[0];
        switch (funcName) {
            case 'arr_len':
                return arr.length;

            case 'arr_reverse':
                arr.reverse();
                return arr;

            case 'arr_sort':
                arr.sort();
                return arr;

            case 'arr_pop':
                arr.pop();
                return arr;

            case 'arr_push':
                arr.push(args[1]);
                return arr;

            case 'arr_get': {
                const idx = args[1];
                return arr[idx];
            }

            case 'arr_set': {
                const idx = args[1];
                arr[idx] = args[2];
                return arr;
            }
        }
    }

    typeCheckArgs(funcName: string, args: number[]): void {
        switch (funcName) {
            case 'arr_len':
            case 'arr_reverse':
            case 'arr_sort':
            case 'arr_pop':
                if (this.exprIsArray(args[0])) {
                    return;
                } else {
                    const errorMsg = `Type Error: Args types should be as follows - ${funcName}([T])`;
                    console.log(errorMsg);
                    throw errorMsg; 
                }

            case 'arr_push':
                if (this.exprIsArray(args[0]) && !this.exprIsFunc(args[1])) {
                    return;
                } else {
                    const errorMsg = `Type Error: Args types should be as follows - ${funcName}([T], T)`;
                    console.log(errorMsg);
                    throw errorMsg; 
                }

            case 'arr_get':
                if (this.exprIsArray(args[0]) && typeof args[1] === 'number') {
                    return;
                } else {
                    const errorMsg = `Type Error: Args types should be as follows - ${funcName}([T], number)`;
                    console.log(errorMsg);
                    throw errorMsg; 
                }

            case 'arr_set':
                if (this.exprIsArray(args[0]) && typeof args[1] === 'number' && !this.exprIsFunc(args[2])) {
                    return;
                } else {
                    const errorMsg = `Type Error: Args types should be as follows - ${funcName}([T], number, T)`;
                    console.log(errorMsg);
                    throw errorMsg; 
                }
        }
    }

    exprIsArray(expr: any): boolean {
        return Array.isArray(expr);
    }

    exprIsFunc(expr: any): boolean {
        return expr.isFunc === true;
    }
}
