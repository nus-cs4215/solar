// Generated from src/lang/SolarCalc.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class SolarCalcLexer extends Lexer {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly NAME = 7;
	public static readonly INT = 8;
	public static readonly FLOAT = 9;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "NAME", "INT", "FLOAT", 
		"EXPONENTPART", "DIGIT",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "';'", "'='", "'return'", "','", "'+'", "'-'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"NAME", "INT", "FLOAT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(SolarCalcLexer._LITERAL_NAMES, SolarCalcLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return SolarCalcLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(SolarCalcLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "SolarCalc.g4"; }

	// @Override
	public get ruleNames(): string[] { return SolarCalcLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return SolarCalcLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return SolarCalcLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return SolarCalcLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\vb\b\x01\x04" +
		"\x02\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04" +
		"\x07\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x03\x02\x03" +
		"\x02\x03\x03\x03\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x05\x03\x05\x03\x06\x03\x06\x03\x07\x03\x07\x03\b\x03\b\x07\b" +
		"-\n\b\f\b\x0E\b0\v\b\x03\t\x06\t3\n\t\r\t\x0E\t4\x03\n\x06\n8\n\n\r\n" +
		"\x0E\n9\x03\n\x03\n\x07\n>\n\n\f\n\x0E\nA\v\n\x03\n\x05\nD\n\n\x03\n\x03" +
		"\n\x06\nH\n\n\r\n\x0E\nI\x03\n\x05\nM\n\n\x03\n\x06\nP\n\n\r\n\x0E\nQ" +
		"\x03\n\x03\n\x05\nV\n\n\x03\v\x03\v\x05\vZ\n\v\x03\v\x06\v]\n\v\r\v\x0E" +
		"\v^\x03\f\x03\f\x02\x02\x02\r\x03\x02\x03\x05\x02\x04\x07\x02\x05\t\x02" +
		"\x06\v\x02\x07\r\x02\b\x0F\x02\t\x11\x02\n\x13\x02\v\x15\x02\x02\x17\x02" +
		"\x02\x03\x02\x07\x05\x02C\\aac|\x06\x022;C\\aac|\x04\x02GGgg\x04\x02-" +
		"-//\x03\x022;\x02k\x02\x03\x03\x02\x02\x02\x02\x05\x03\x02\x02\x02\x02" +
		"\x07\x03\x02\x02\x02\x02\t\x03\x02\x02\x02\x02\v\x03\x02\x02\x02\x02\r" +
		"\x03\x02\x02\x02\x02\x0F\x03\x02\x02\x02\x02\x11\x03\x02\x02\x02\x02\x13" +
		"\x03\x02\x02\x02\x03\x19\x03\x02\x02\x02\x05\x1B\x03\x02\x02\x02\x07\x1D" +
		"\x03\x02\x02\x02\t$\x03\x02\x02\x02\v&\x03\x02\x02\x02\r(\x03\x02\x02" +
		"\x02\x0F*\x03\x02\x02\x02\x112\x03\x02\x02\x02\x13U\x03\x02\x02\x02\x15" +
		"W\x03\x02\x02\x02\x17`\x03\x02\x02\x02\x19\x1A\x07=\x02\x02\x1A\x04\x03" +
		"\x02\x02\x02\x1B\x1C\x07?\x02\x02\x1C\x06\x03\x02\x02\x02\x1D\x1E\x07" +
		"t\x02\x02\x1E\x1F\x07g\x02\x02\x1F \x07v\x02\x02 !\x07w\x02\x02!\"\x07" +
		"t\x02\x02\"#\x07p\x02\x02#\b\x03\x02\x02\x02$%\x07.\x02\x02%\n\x03\x02" +
		"\x02\x02&\'\x07-\x02\x02\'\f\x03\x02\x02\x02()\x07/\x02\x02)\x0E\x03\x02" +
		"\x02\x02*.\t\x02\x02\x02+-\t\x03\x02\x02,+\x03\x02\x02\x02-0\x03\x02\x02" +
		"\x02.,\x03\x02\x02\x02./\x03\x02\x02\x02/\x10\x03\x02\x02\x020.\x03\x02" +
		"\x02\x0213\x05\x17\f\x0221\x03\x02\x02\x0234\x03\x02\x02\x0242\x03\x02" +
		"\x02\x0245\x03\x02\x02\x025\x12\x03\x02\x02\x0268\x05\x17\f\x0276\x03" +
		"\x02\x02\x0289\x03\x02\x02\x0297\x03\x02\x02\x029:\x03\x02\x02\x02:;\x03" +
		"\x02\x02\x02;?\x070\x02\x02<>\x05\x17\f\x02=<\x03\x02\x02\x02>A\x03\x02" +
		"\x02\x02?=\x03\x02\x02\x02?@\x03\x02\x02\x02@C\x03\x02\x02\x02A?\x03\x02" +
		"\x02\x02BD\x05\x15\v\x02CB\x03\x02\x02\x02CD\x03\x02\x02\x02DV\x03\x02" +
		"\x02\x02EG\x070\x02\x02FH\x05\x17\f\x02GF\x03\x02\x02\x02HI\x03\x02\x02" +
		"\x02IG\x03\x02\x02\x02IJ\x03\x02\x02\x02JL\x03\x02\x02\x02KM\x05\x15\v" +
		"\x02LK\x03\x02\x02\x02LM\x03\x02\x02\x02MV\x03\x02\x02\x02NP\x05\x17\f" +
		"\x02ON\x03\x02\x02\x02PQ\x03\x02\x02\x02QO\x03\x02\x02\x02QR\x03\x02\x02" +
		"\x02RS\x03\x02\x02\x02ST\x05\x15\v\x02TV\x03\x02\x02\x02U7\x03\x02\x02" +
		"\x02UE\x03\x02\x02\x02UO\x03\x02\x02\x02V\x14\x03\x02\x02\x02WY\t\x04" +
		"\x02\x02XZ\t\x05\x02\x02YX\x03\x02\x02\x02YZ\x03\x02\x02\x02Z\\\x03\x02" +
		"\x02\x02[]\x05\x17\f\x02\\[\x03\x02\x02\x02]^\x03\x02\x02\x02^\\\x03\x02" +
		"\x02\x02^_\x03\x02\x02\x02_\x16\x03\x02\x02\x02`a\t\x06\x02\x02a\x18\x03" +
		"\x02\x02\x02\x0E\x02.49?CILQUY^\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!SolarCalcLexer.__ATN) {
			SolarCalcLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(SolarCalcLexer._serializedATN));
		}

		return SolarCalcLexer.__ATN;
	}

}

