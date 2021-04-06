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

    lookup(symbol: string): any {

        if (symbol in this.symbolTable) {
            return this.symbolTable[symbol];
        } else {
            
            if (this.parent === null) {
                throw 'symbol not defined';
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
                throw 'symbol not defined'
            } else {
                this.parent.assign(symbol, value);
            }
        }
    }

    // this method is only called by function scopes
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
