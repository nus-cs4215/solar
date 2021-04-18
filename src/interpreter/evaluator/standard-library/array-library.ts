export class ArrayLibrary {

    callLibraryFunction(funcName: string, args: any[]): any {       
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
}
