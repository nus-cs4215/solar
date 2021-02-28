// Mainly just a symbol table, and a link to its parent (outer scope)
class Environment {

    record: any;     // symbol table. we use object as a hash table
    parent: Environment;

    constructor(record: any, parent: Environment) {
        this.record = record;   // start with empty symbol table
        this.parent = parent;
    }
}
