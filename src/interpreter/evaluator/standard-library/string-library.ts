export class StringLibrary {

    callLibraryFunction(funcName: string, args: any[]): number | string | string[] {
        // TODO: run time type check

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
}