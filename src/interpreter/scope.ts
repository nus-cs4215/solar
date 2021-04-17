/*
    Every scope has its own symbol table.
    It also has a link to its parent scope.
*/
export class Scope {

    symbolTable: any;   // hashtable / obj
    parent: Scope;      // link to parent

    constructor(parent: Scope) {
        this.symbolTable = {};
        this.parent = parent;
    }

    declare(symbol: string, value: any): void {
        if (symbol in this.symbolTable) {
            const errorMsg = `Syntax Error: ${symbol} has already been declared`;
            console.log(errorMsg);
            throw errorMsg;
        } else {
            this.symbolTable[symbol] = value;
        }
    }

    lookup(symbol: string): any {
        if (symbol in this.symbolTable) {
            return this.symbolTable[symbol];
        } else {
            if (this.parent === null) {
                const errorMsg = `Name Error: ${symbol} is not defined`;
                console.log(errorMsg);
                throw errorMsg;
            } else {
                return this.parent.lookup(symbol);
            }
        }
    }

    assign(symbol: string, value: any): void {
        if (symbol in this.symbolTable) {
            this.symbolTable[symbol] = value;
        } else {
            if (this.parent === null) {
                const errorMsg = `Name Error: ${symbol} is not defined`;
                console.log(errorMsg);
                throw errorMsg;
            } else {
                this.parent.assign(symbol, value);
            }
        }
    }

    // this method is only called by function scopes
    storeArguments(params: string[], args: any[]): void {
        if (params.length != args.length) {
            const errorMsg = 'Syntax Error: Number of parameters not equal to number of arguments';
            console.log(errorMsg);
            throw errorMsg;
        }
        const n = params.length;
        for (let i = 0; i < n; ++i) {
            const symbol = params[i];
            const value = args[i];
            this.symbolTable[symbol] = value;
        }
    }
}
