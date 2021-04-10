// Scans for any library function call with the incorrect number of arguments
export class ArgsLengthAnalyser {

    // entry point. ast is the syntax tree of the entire program.
    analyse(ast: any): void {
        for (const c of ast.body) {
            this.analyseComponent(c)
        }
    }

    analyseComponent(component: any): void {
        switch(component.type) {
            case 'CallStatement':
                return this.analyseCallExpression(component.expression);
            
            case 'CallExpression':
                return this.analyseCallExpression(component);
        }
    }

    analyseCallExpression(component: any): void {
        const funcName = component.base.name;
        const argsLength = component.arguments.length;
        this.argsLengthCheck(funcName, argsLength);
    }

    argsLengthCheck(funcName: string, argsLen: number): void {
        switch (funcName) {
            case 'print':
            case 'math_abs':
            case 'math_ceil':
            case 'math_floor':
            case 'math_sqrt':
            case 'str_len':
            case 'str_reverse':
            case 'arr_len':
            case 'arr_reverse':
            case 'arr_sort':
            case 'arr_pop':
            case 'tbl_len':
                if (argsLen !== 1) {
                    const errorMsg = `Syntax Error: ${funcName}() takes 1 parameter`;
                    console.log(errorMsg);
                    throw errorMsg;
                } else {
                    return;
                }
            
            case 'str_split':
            case 'arr_push':
            case 'arr_get':
            case 'tbl_contains':
            case 'tbl_remove':
            case 'tbl_get':
                if (argsLen !== 2) {
                    const errorMsg = `Syntax Error: ${funcName}() takes 2 parameters`;
                    console.log(errorMsg);
                    throw errorMsg;
                } else {
                    return;
                }

            case 'str_substring':
            case 'arr_set':
            case 'tbl_put':
                if (argsLen !== 3) {
                    const errorMsg = `Syntax Error: ${funcName}() takes 3 parameters`;
                    console.log(errorMsg);
                    throw errorMsg;
                } else {
                    return;
                }

            default:
                console.warn(`ArgsLengthAnalyser: ${funcName}() is not a library function, no need to analyse`)
        }
    }
}
