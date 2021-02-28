grammar SolarCalc;

/**
 * Parser Rules
 */

// A chunk is a block followed by EOF
chunk : block EOF;

// A block is zero or more statements followed by
// an optional return statement
block : stat* retstat?;

stat 
    :  ';'
    | varlist '=' explist
    ;

retstat : 'return' explist? ';'?;

varlist : NAME (',' NAME)*;

explist : exp (',' exp)*;

exp 
    : number
    | operatorUnary exp
    | exp operatorBinary exp
    ;

operatorBinary : '+' | '-';

operatorUnary : '-';

number
    : INT
    | FLOAT
    ;

/**
* Lexer Rules
*/ 

NAME : [a-zA-Z_][a-zA-Z_0-9]*;

INT : DIGIT+;

FLOAT 
    : DIGIT+ '.' DIGIT* EXPONENTPART?
    | '.' DIGIT+ EXPONENTPART?
    | DIGIT+ EXPONENTPART
    ;

fragment 
EXPONENTPART : [eE] [+-]? DIGIT+;


fragment 
DIGIT: [0-9];

