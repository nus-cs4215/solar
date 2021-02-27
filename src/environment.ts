// Mainly just a symbol table, and a link to its parent (outer scope)
class Environment {

    record: object;     // symbol table. we use object as a hash table
    parent: Environment;

    constructor(parent: Environment) {
        this.record = {};   // start with empty symbol table
        this.parent = parent;
    }
}
