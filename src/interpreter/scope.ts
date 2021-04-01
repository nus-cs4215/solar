/*
    Every scope has its own symbol table.
    It also has a link to its parent scope.
*/
export class Scope {

    symbolTable: any;   // hashtable / obj
    parent: Scope;      // parent scope

    constructor(symbolTable: any, parent: Scope) {
        this.symbolTable = symbolTable;
        this.parent = parent;
    }

    lookup(symbol: string): any {


        if (symbol in this.symbolTable) {
            return this.symbolTable[symbol];
        } else {
            
            if (this.isGlobalScope()) {
                throw 'symbol not defined';
            } else {
                return this.parent.lookup(symbol);
            }
        }
    }

    isGlobalScope(): boolean {
        return this.parent === null;
    }
}
