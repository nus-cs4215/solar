export class Error {

    type: string;
    message: string;
    returnValue: any;

    constructor(type: string, message: string, returnValue: any = 'Nope') {
        this.type = type;
        this.message = message;
        this.returnValue = returnValue;
    }
}
