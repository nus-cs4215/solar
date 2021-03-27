/*
    Every scope has its own symbol table.
    It also has a link to its parent scope.
*/
class Scope {

    symbolTable: any;   // hashtable / obj
    parent: Scope;      // parent scope

    constructor(symbolTable: any, parent: Scope) {
        this.symbolTable = symbolTable;
        this.parent = parent;
    }
}
