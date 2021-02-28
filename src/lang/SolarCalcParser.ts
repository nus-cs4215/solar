// Generated from src/lang/SolarCalc.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { SolarCalcListener } from "./SolarCalcListener";
import { SolarCalcVisitor } from "./SolarCalcVisitor";


export class SolarCalcParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly NAME = 7;
	public static readonly INT = 8;
	public static readonly FLOAT = 9;
	public static readonly RULE_chunk = 0;
	public static readonly RULE_block = 1;
	public static readonly RULE_stat = 2;
	public static readonly RULE_retstat = 3;
	public static readonly RULE_varlist = 4;
	public static readonly RULE_explist = 5;
	public static readonly RULE_exp = 6;
	public static readonly RULE_operatorBinary = 7;
	public static readonly RULE_operatorUnary = 8;
	public static readonly RULE_number = 9;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"chunk", "block", "stat", "retstat", "varlist", "explist", "exp", "operatorBinary", 
		"operatorUnary", "number",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "';'", "'='", "'return'", "','", "'+'", "'-'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"NAME", "INT", "FLOAT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(SolarCalcParser._LITERAL_NAMES, SolarCalcParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return SolarCalcParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "SolarCalc.g4"; }

	// @Override
	public get ruleNames(): string[] { return SolarCalcParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return SolarCalcParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(SolarCalcParser._ATN, this);
	}
	// @RuleVersion(0)
	public chunk(): ChunkContext {
		let _localctx: ChunkContext = new ChunkContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, SolarCalcParser.RULE_chunk);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 20;
			this.block();
			this.state = 21;
			this.match(SolarCalcParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block(): BlockContext {
		let _localctx: BlockContext = new BlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, SolarCalcParser.RULE_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 26;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SolarCalcParser.T__0 || _la === SolarCalcParser.NAME) {
				{
				{
				this.state = 23;
				this.stat();
				}
				}
				this.state = 28;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 30;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SolarCalcParser.T__2) {
				{
				this.state = 29;
				this.retstat();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stat(): StatContext {
		let _localctx: StatContext = new StatContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, SolarCalcParser.RULE_stat);
		try {
			this.state = 37;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SolarCalcParser.T__0:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 32;
				this.match(SolarCalcParser.T__0);
				}
				break;
			case SolarCalcParser.NAME:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 33;
				this.varlist();
				this.state = 34;
				this.match(SolarCalcParser.T__1);
				this.state = 35;
				this.explist();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public retstat(): RetstatContext {
		let _localctx: RetstatContext = new RetstatContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, SolarCalcParser.RULE_retstat);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 39;
			this.match(SolarCalcParser.T__2);
			this.state = 41;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SolarCalcParser.T__5) | (1 << SolarCalcParser.INT) | (1 << SolarCalcParser.FLOAT))) !== 0)) {
				{
				this.state = 40;
				this.explist();
				}
			}

			this.state = 44;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SolarCalcParser.T__0) {
				{
				this.state = 43;
				this.match(SolarCalcParser.T__0);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varlist(): VarlistContext {
		let _localctx: VarlistContext = new VarlistContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, SolarCalcParser.RULE_varlist);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 46;
			this.match(SolarCalcParser.NAME);
			this.state = 51;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SolarCalcParser.T__3) {
				{
				{
				this.state = 47;
				this.match(SolarCalcParser.T__3);
				this.state = 48;
				this.match(SolarCalcParser.NAME);
				}
				}
				this.state = 53;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public explist(): ExplistContext {
		let _localctx: ExplistContext = new ExplistContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, SolarCalcParser.RULE_explist);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 54;
			this.exp(0);
			this.state = 59;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === SolarCalcParser.T__3) {
				{
				{
				this.state = 55;
				this.match(SolarCalcParser.T__3);
				this.state = 56;
				this.exp(0);
				}
				}
				this.state = 61;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public exp(): ExpContext;
	public exp(_p: number): ExpContext;
	// @RuleVersion(0)
	public exp(_p?: number): ExpContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpContext = new ExpContext(this._ctx, _parentState);
		let _prevctx: ExpContext = _localctx;
		let _startState: number = 12;
		this.enterRecursionRule(_localctx, 12, SolarCalcParser.RULE_exp, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 67;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SolarCalcParser.INT:
			case SolarCalcParser.FLOAT:
				{
				this.state = 63;
				this.number();
				}
				break;
			case SolarCalcParser.T__5:
				{
				this.state = 64;
				this.operatorUnary();
				this.state = 65;
				this.exp(2);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 75;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					{
					_localctx = new ExpContext(_parentctx, _parentState);
					this.pushNewRecursionContext(_localctx, _startState, SolarCalcParser.RULE_exp);
					this.state = 69;
					if (!(this.precpred(this._ctx, 1))) {
						throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
					}
					this.state = 70;
					this.operatorBinary();
					this.state = 71;
					this.exp(2);
					}
					}
				}
				this.state = 77;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operatorBinary(): OperatorBinaryContext {
		let _localctx: OperatorBinaryContext = new OperatorBinaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, SolarCalcParser.RULE_operatorBinary);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 78;
			_la = this._input.LA(1);
			if (!(_la === SolarCalcParser.T__4 || _la === SolarCalcParser.T__5)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public operatorUnary(): OperatorUnaryContext {
		let _localctx: OperatorUnaryContext = new OperatorUnaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, SolarCalcParser.RULE_operatorUnary);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 80;
			this.match(SolarCalcParser.T__5);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public number(): NumberContext {
		let _localctx: NumberContext = new NumberContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, SolarCalcParser.RULE_number);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 82;
			_la = this._input.LA(1);
			if (!(_la === SolarCalcParser.INT || _la === SolarCalcParser.FLOAT)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 6:
			return this.exp_sempred(_localctx as ExpContext, predIndex);
		}
		return true;
	}
	private exp_sempred(_localctx: ExpContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\vW\x04\x02\t" +
		"\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07\t" +
		"\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x03\x02\x03\x02\x03\x02\x03" +
		"\x03\x07\x03\x1B\n\x03\f\x03\x0E\x03\x1E\v\x03\x03\x03\x05\x03!\n\x03" +
		"\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04(\n\x04\x03\x05\x03\x05" +
		"\x05\x05,\n\x05\x03\x05\x05\x05/\n\x05\x03\x06\x03\x06\x03\x06\x07\x06" +
		"4\n\x06\f\x06\x0E\x067\v\x06\x03\x07\x03\x07\x03\x07\x07\x07<\n\x07\f" +
		"\x07\x0E\x07?\v\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x05\bF\n\b\x03\b\x03" +
		"\b\x03\b\x03\b\x07\bL\n\b\f\b\x0E\bO\v\b\x03\t\x03\t\x03\n\x03\n\x03\v" +
		"\x03\v\x03\v\x02\x02\x03\x0E\f\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02" +
		"\x0E\x02\x10\x02\x12\x02\x14\x02\x02\x04\x03\x02\x07\b\x03\x02\n\v\x02" +
		"U\x02\x16\x03\x02\x02\x02\x04\x1C\x03\x02\x02\x02\x06\'\x03\x02\x02\x02" +
		"\b)\x03\x02\x02\x02\n0\x03\x02\x02\x02\f8\x03\x02\x02\x02\x0EE\x03\x02" +
		"\x02\x02\x10P\x03\x02\x02\x02\x12R\x03\x02\x02\x02\x14T\x03\x02\x02\x02" +
		"\x16\x17\x05\x04\x03\x02\x17\x18\x07\x02\x02\x03\x18\x03\x03\x02\x02\x02" +
		"\x19\x1B\x05\x06\x04\x02\x1A\x19\x03\x02\x02\x02\x1B\x1E\x03\x02\x02\x02" +
		"\x1C\x1A\x03\x02\x02\x02\x1C\x1D\x03\x02\x02\x02\x1D \x03\x02\x02\x02" +
		"\x1E\x1C\x03\x02\x02\x02\x1F!\x05\b\x05\x02 \x1F\x03\x02\x02\x02 !\x03" +
		"\x02\x02\x02!\x05\x03\x02\x02\x02\"(\x07\x03\x02\x02#$\x05\n\x06\x02$" +
		"%\x07\x04\x02\x02%&\x05\f\x07\x02&(\x03\x02\x02\x02\'\"\x03\x02\x02\x02" +
		"\'#\x03\x02\x02\x02(\x07\x03\x02\x02\x02)+\x07\x05\x02\x02*,\x05\f\x07" +
		"\x02+*\x03\x02\x02\x02+,\x03\x02\x02\x02,.\x03\x02\x02\x02-/\x07\x03\x02" +
		"\x02.-\x03\x02\x02\x02./\x03\x02\x02\x02/\t\x03\x02\x02\x0205\x07\t\x02" +
		"\x0212\x07\x06\x02\x0224\x07\t\x02\x0231\x03\x02\x02\x0247\x03\x02\x02" +
		"\x0253\x03\x02\x02\x0256\x03\x02\x02\x026\v\x03\x02\x02\x0275\x03\x02" +
		"\x02\x028=\x05\x0E\b\x029:\x07\x06\x02\x02:<\x05\x0E\b\x02;9\x03\x02\x02" +
		"\x02<?\x03\x02\x02\x02=;\x03\x02\x02\x02=>\x03\x02\x02\x02>\r\x03\x02" +
		"\x02\x02?=\x03\x02\x02\x02@A\b\b\x01\x02AF\x05\x14\v\x02BC\x05\x12\n\x02" +
		"CD\x05\x0E\b\x04DF\x03\x02\x02\x02E@\x03\x02\x02\x02EB\x03\x02\x02\x02" +
		"FM\x03\x02\x02\x02GH\f\x03\x02\x02HI\x05\x10\t\x02IJ\x05\x0E\b\x04JL\x03" +
		"\x02\x02\x02KG\x03\x02\x02\x02LO\x03\x02\x02\x02MK\x03\x02\x02\x02MN\x03" +
		"\x02\x02\x02N\x0F\x03\x02\x02\x02OM\x03\x02\x02\x02PQ\t\x02\x02\x02Q\x11" +
		"\x03\x02\x02\x02RS\x07\b\x02\x02S\x13\x03\x02\x02\x02TU\t\x03\x02\x02" +
		"U\x15\x03\x02\x02\x02\v\x1C \'+.5=EM";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!SolarCalcParser.__ATN) {
			SolarCalcParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(SolarCalcParser._serializedATN));
		}

		return SolarCalcParser.__ATN;
	}

}

export class ChunkContext extends ParserRuleContext {
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	public EOF(): TerminalNode { return this.getToken(SolarCalcParser.EOF, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SolarCalcParser.RULE_chunk; }
	// @Override
	public enterRule(listener: SolarCalcListener): void {
		if (listener.enterChunk) {
			listener.enterChunk(this);
		}
	}
	// @Override
	public exitRule(listener: SolarCalcListener): void {
		if (listener.exitChunk) {
			listener.exitChunk(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SolarCalcVisitor<Result>): Result {
		if (visitor.visitChunk) {
			return visitor.visitChunk(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockContext extends ParserRuleContext {
	public stat(): StatContext[];
	public stat(i: number): StatContext;
	public stat(i?: number): StatContext | StatContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatContext);
		} else {
			return this.getRuleContext(i, StatContext);
		}
	}
	public retstat(): RetstatContext | undefined {
		return this.tryGetRuleContext(0, RetstatContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SolarCalcParser.RULE_block; }
	// @Override
	public enterRule(listener: SolarCalcListener): void {
		if (listener.enterBlock) {
			listener.enterBlock(this);
		}
	}
	// @Override
	public exitRule(listener: SolarCalcListener): void {
		if (listener.exitBlock) {
			listener.exitBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SolarCalcVisitor<Result>): Result {
		if (visitor.visitBlock) {
			return visitor.visitBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatContext extends ParserRuleContext {
	public varlist(): VarlistContext | undefined {
		return this.tryGetRuleContext(0, VarlistContext);
	}
	public explist(): ExplistContext | undefined {
		return this.tryGetRuleContext(0, ExplistContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SolarCalcParser.RULE_stat; }
	// @Override
	public enterRule(listener: SolarCalcListener): void {
		if (listener.enterStat) {
			listener.enterStat(this);
		}
	}
	// @Override
	public exitRule(listener: SolarCalcListener): void {
		if (listener.exitStat) {
			listener.exitStat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SolarCalcVisitor<Result>): Result {
		if (visitor.visitStat) {
			return visitor.visitStat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RetstatContext extends ParserRuleContext {
	public explist(): ExplistContext | undefined {
		return this.tryGetRuleContext(0, ExplistContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SolarCalcParser.RULE_retstat; }
	// @Override
	public enterRule(listener: SolarCalcListener): void {
		if (listener.enterRetstat) {
			listener.enterRetstat(this);
		}
	}
	// @Override
	public exitRule(listener: SolarCalcListener): void {
		if (listener.exitRetstat) {
			listener.exitRetstat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SolarCalcVisitor<Result>): Result {
		if (visitor.visitRetstat) {
			return visitor.visitRetstat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarlistContext extends ParserRuleContext {
	public NAME(): TerminalNode[];
	public NAME(i: number): TerminalNode;
	public NAME(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SolarCalcParser.NAME);
		} else {
			return this.getToken(SolarCalcParser.NAME, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SolarCalcParser.RULE_varlist; }
	// @Override
	public enterRule(listener: SolarCalcListener): void {
		if (listener.enterVarlist) {
			listener.enterVarlist(this);
		}
	}
	// @Override
	public exitRule(listener: SolarCalcListener): void {
		if (listener.exitVarlist) {
			listener.exitVarlist(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SolarCalcVisitor<Result>): Result {
		if (visitor.visitVarlist) {
			return visitor.visitVarlist(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExplistContext extends ParserRuleContext {
	public exp(): ExpContext[];
	public exp(i: number): ExpContext;
	public exp(i?: number): ExpContext | ExpContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpContext);
		} else {
			return this.getRuleContext(i, ExpContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SolarCalcParser.RULE_explist; }
	// @Override
	public enterRule(listener: SolarCalcListener): void {
		if (listener.enterExplist) {
			listener.enterExplist(this);
		}
	}
	// @Override
	public exitRule(listener: SolarCalcListener): void {
		if (listener.exitExplist) {
			listener.exitExplist(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SolarCalcVisitor<Result>): Result {
		if (visitor.visitExplist) {
			return visitor.visitExplist(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpContext extends ParserRuleContext {
	public number(): NumberContext | undefined {
		return this.tryGetRuleContext(0, NumberContext);
	}
	public operatorUnary(): OperatorUnaryContext | undefined {
		return this.tryGetRuleContext(0, OperatorUnaryContext);
	}
	public exp(): ExpContext[];
	public exp(i: number): ExpContext;
	public exp(i?: number): ExpContext | ExpContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpContext);
		} else {
			return this.getRuleContext(i, ExpContext);
		}
	}
	public operatorBinary(): OperatorBinaryContext | undefined {
		return this.tryGetRuleContext(0, OperatorBinaryContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SolarCalcParser.RULE_exp; }
	// @Override
	public enterRule(listener: SolarCalcListener): void {
		if (listener.enterExp) {
			listener.enterExp(this);
		}
	}
	// @Override
	public exitRule(listener: SolarCalcListener): void {
		if (listener.exitExp) {
			listener.exitExp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SolarCalcVisitor<Result>): Result {
		if (visitor.visitExp) {
			return visitor.visitExp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperatorBinaryContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SolarCalcParser.RULE_operatorBinary; }
	// @Override
	public enterRule(listener: SolarCalcListener): void {
		if (listener.enterOperatorBinary) {
			listener.enterOperatorBinary(this);
		}
	}
	// @Override
	public exitRule(listener: SolarCalcListener): void {
		if (listener.exitOperatorBinary) {
			listener.exitOperatorBinary(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SolarCalcVisitor<Result>): Result {
		if (visitor.visitOperatorBinary) {
			return visitor.visitOperatorBinary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OperatorUnaryContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SolarCalcParser.RULE_operatorUnary; }
	// @Override
	public enterRule(listener: SolarCalcListener): void {
		if (listener.enterOperatorUnary) {
			listener.enterOperatorUnary(this);
		}
	}
	// @Override
	public exitRule(listener: SolarCalcListener): void {
		if (listener.exitOperatorUnary) {
			listener.exitOperatorUnary(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SolarCalcVisitor<Result>): Result {
		if (visitor.visitOperatorUnary) {
			return visitor.visitOperatorUnary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NumberContext extends ParserRuleContext {
	public INT(): TerminalNode | undefined { return this.tryGetToken(SolarCalcParser.INT, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(SolarCalcParser.FLOAT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SolarCalcParser.RULE_number; }
	// @Override
	public enterRule(listener: SolarCalcListener): void {
		if (listener.enterNumber) {
			listener.enterNumber(this);
		}
	}
	// @Override
	public exitRule(listener: SolarCalcListener): void {
		if (listener.exitNumber) {
			listener.exitNumber(this);
		}
	}
	// @Override
	public accept<Result>(visitor: SolarCalcVisitor<Result>): Result {
		if (visitor.visitNumber) {
			return visitor.visitNumber(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


