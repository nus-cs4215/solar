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

    lookup(symbol: string): any {
        
        if (symbol in this.symbolTable) {
            return this.symbolTable[symbol];
        } else {
            throw 'symbol not defined';
        }
    }
    assign(symbol:string, value: any): void {
        
        if (symbol in this.symbolTable) {
            this.symbolTable[symbol] = value;
        } else {
            throw 'symbol not defined';
        }
    }
}
