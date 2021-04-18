export class StringLibrary {

    callLibraryFunction(funcName: string, args: any[]): number | string | string[] {
        this.typeCheckArgs(funcName, args);
        switch (funcName) {
            case 'str_len':
                return args[0].length;

            case 'str_reverse':
                return this.reverseString(args[0]);

            case 'str_split':
                return args[0].split(args[1]);
            
            case 'str_substring':
                return args[0].substring(args[1], args[2]);
        }
    }

    reverseString(str: string): string {
        return str.split('').reverse().join('');
    }

    typeCheckArgs(funcName: string, args: number[]): void {
        switch (funcName) {
            case 'str_len':
            case 'str_reverse':
                if (typeof args[0] === 'string') {
                    return;
                } else {
                    const errorMsg = `Type Error: Args types should be as follows - ${funcName}(string)`;
                    console.log(errorMsg);
                    throw errorMsg;                }

            case 'str_split':
                if (typeof args[0] === 'string' && typeof args[1] === 'string') {
                    return;
                } else {
                    const errorMsg = `Type Error: Args types should be as follows - ${funcName}(string, string)`;
                    console.log(errorMsg);
                    throw errorMsg;
                }
            
            case 'str_substring':
                if (typeof args[0] === 'string' && typeof args[1] === 'number' && typeof args[2] === 'number') {
                    return;
                } else {
                    const errorMsg = `Type Error: Args types should be as follows - ${funcName}(string, number, number)`;
                    console.log(errorMsg);
                    throw errorMsg;
                }
        }
    }
}
