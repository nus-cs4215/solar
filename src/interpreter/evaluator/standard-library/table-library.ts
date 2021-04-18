export class TableLibrary {

    callLibraryFunction(funcName: string, args: any[]): any {   
        this.typeCheckArgs(funcName, args);     
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

    typeCheckArgs(funcName: string, args: number[]): void {
        switch (funcName) {
            case 'tbl_len':
                if (this.exprIsTable(args[0])) {
                    return;
                } else {
                    const errorMsg = `Type Error: Args types should be as follows - ${funcName}({T})`;
                    console.log(errorMsg);
                    throw errorMsg; 
                }

            case 'tbl_contains':      
            case 'tbl_remove':
            case 'tbl_get':
                if (this.exprIsTable(args[0]) && typeof args[1] === 'string') {
                    return;
                } else {
                    const errorMsg = `Type Error: Args types should be as follows - ${funcName}({T}, string)`;
                    console.log(errorMsg);
                    throw errorMsg; 
                }

            case 'tbl_put':
                if (this.exprIsTable(args[0]) && typeof args[1] === 'string' && !this.exprIsFunc(args[2])) {
                    return;
                } else {
                    const errorMsg = `Type Error: Args types should be as follows - ${funcName}({T}, string, T)`;
                    console.log(errorMsg);
                    throw errorMsg; 
                }
        }
    }
 
    exprIsTable(expr: any): boolean {
        return (expr instanceof Object) && !this.exprIsArray(expr) && !this.exprIsFunc(expr)
    }

    exprIsArray(expr: any): boolean {
        return Array.isArray(expr);
    }

    exprIsFunc(expr: any): boolean {
        return expr.isFunc === true;
    }
}
