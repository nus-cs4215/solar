/*
    Mainly just a symbol table, and a link to its parent (outer scope)
*/
class Environment {

    record: SymbolTable;
    parent: Environment;

    constructor(record: SymbolTable, parent: Environment) {
        this.record = record;
        this.parent = parent;
    }
}
