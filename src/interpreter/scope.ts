import { ActivationRecord } from "./activation-record";

/*
    Every scope has its own symbol table.
    It also has a link to its parent scope.

    During function invocation, a scope inside the function body can have Activation Record as the parent.
*/
export class Scope {

    symbolTable: any;   // hashtable / obj
    parent: Scope | ActivationRecord;      // link to parent

    constructor(parent: Scope) {
        this.symbolTable = {};
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

    assign(symbol: string, value: any): void {

        if (symbol in this.symbolTable) {
            this.symbolTable[symbol] = value;
        } else {

            if (this.isGlobalScope()) {
                throw 'symbol not defined'
            } else {
                this.parent.assign(symbol, value);
            }
        }
    }

    isGlobalScope(): boolean {
        return this.parent === null;
    }
}
