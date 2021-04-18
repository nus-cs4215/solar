export class TableLibrary {

    callLibraryFunction(funcName: string, args: any[]): any {        
        const tbl = args[0];
        switch (funcName) {
            case 'tbl_len':
                return Object.keys(tbl).length;

            case 'tbl_contains':
                return args[1] in tbl;
            
            case 'tbl_remove': {
                const k = args[1];
                delete tbl[k];
                return tbl;
            }
                
            case 'tbl_get': {
                const k = args[1];
                return tbl[k];
            }
            
            case 'tbl_put': {
                const k = args[1];
                tbl[k] = args[2];
                return tbl;
            }
        }
    }

    exprIsArray(expr: any): boolean {
        return Array.isArray(expr);
    }

    exprIsTable(expr: any): boolean {
        return (expr instanceof Object) && !this.exprIsArray(expr) && !this.exprIsFunc(expr)
    }

    exprIsFunc(expr: any): boolean {
        return expr.isFunc === true;
    }
}
