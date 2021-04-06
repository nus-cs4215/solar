export class ActivationRecord {

    symbolTable: any;     // hashtable / obj

    constructor() {
        this.symbolTable = {};  // start with empty symbol table
    }

    storeArguments(params: string[], args: any[]): void {

        if (params.length != args.length) {
            throw 'Number of params should be equals to number of args';
        }

        const n = params.length;

        for (let i = 0; i < n; ++i) {
            
            const symbol = params[i];
            const value = args[i];
            
            this.symbolTable[symbol] = value;
        }
    }
}
