// Generated from src/lang/SolarCalc.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { ChunkContext } from "./SolarCalcParser";
import { BlockContext } from "./SolarCalcParser";
import { StatContext } from "./SolarCalcParser";
import { RetstatContext } from "./SolarCalcParser";
import { VarlistContext } from "./SolarCalcParser";
import { ExplistContext } from "./SolarCalcParser";
import { ExpContext } from "./SolarCalcParser";
import { OperatorBinaryContext } from "./SolarCalcParser";
import { OperatorUnaryContext } from "./SolarCalcParser";
import { NumberContext } from "./SolarCalcParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `SolarCalcParser`.
 */
export interface SolarCalcListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `SolarCalcParser.chunk`.
	 * @param ctx the parse tree
	 */
	enterChunk?: (ctx: ChunkContext) => void;
	/**
	 * Exit a parse tree produced by `SolarCalcParser.chunk`.
	 * @param ctx the parse tree
	 */
	exitChunk?: (ctx: ChunkContext) => void;

	/**
	 * Enter a parse tree produced by `SolarCalcParser.block`.
	 * @param ctx the parse tree
	 */
	enterBlock?: (ctx: BlockContext) => void;
	/**
	 * Exit a parse tree produced by `SolarCalcParser.block`.
	 * @param ctx the parse tree
	 */
	exitBlock?: (ctx: BlockContext) => void;

	/**
	 * Enter a parse tree produced by `SolarCalcParser.stat`.
	 * @param ctx the parse tree
	 */
	enterStat?: (ctx: StatContext) => void;
	/**
	 * Exit a parse tree produced by `SolarCalcParser.stat`.
	 * @param ctx the parse tree
	 */
	exitStat?: (ctx: StatContext) => void;

	/**
	 * Enter a parse tree produced by `SolarCalcParser.retstat`.
	 * @param ctx the parse tree
	 */
	enterRetstat?: (ctx: RetstatContext) => void;
	/**
	 * Exit a parse tree produced by `SolarCalcParser.retstat`.
	 * @param ctx the parse tree
	 */
	exitRetstat?: (ctx: RetstatContext) => void;

	/**
	 * Enter a parse tree produced by `SolarCalcParser.varlist`.
	 * @param ctx the parse tree
	 */
	enterVarlist?: (ctx: VarlistContext) => void;
	/**
	 * Exit a parse tree produced by `SolarCalcParser.varlist`.
	 * @param ctx the parse tree
	 */
	exitVarlist?: (ctx: VarlistContext) => void;

	/**
	 * Enter a parse tree produced by `SolarCalcParser.explist`.
	 * @param ctx the parse tree
	 */
	enterExplist?: (ctx: ExplistContext) => void;
	/**
	 * Exit a parse tree produced by `SolarCalcParser.explist`.
	 * @param ctx the parse tree
	 */
	exitExplist?: (ctx: ExplistContext) => void;

	/**
	 * Enter a parse tree produced by `SolarCalcParser.exp`.
	 * @param ctx the parse tree
	 */
	enterExp?: (ctx: ExpContext) => void;
	/**
	 * Exit a parse tree produced by `SolarCalcParser.exp`.
	 * @param ctx the parse tree
	 */
	exitExp?: (ctx: ExpContext) => void;

	/**
	 * Enter a parse tree produced by `SolarCalcParser.operatorBinary`.
	 * @param ctx the parse tree
	 */
	enterOperatorBinary?: (ctx: OperatorBinaryContext) => void;
	/**
	 * Exit a parse tree produced by `SolarCalcParser.operatorBinary`.
	 * @param ctx the parse tree
	 */
	exitOperatorBinary?: (ctx: OperatorBinaryContext) => void;

	/**
	 * Enter a parse tree produced by `SolarCalcParser.operatorUnary`.
	 * @param ctx the parse tree
	 */
	enterOperatorUnary?: (ctx: OperatorUnaryContext) => void;
	/**
	 * Exit a parse tree produced by `SolarCalcParser.operatorUnary`.
	 * @param ctx the parse tree
	 */
	exitOperatorUnary?: (ctx: OperatorUnaryContext) => void;

	/**
	 * Enter a parse tree produced by `SolarCalcParser.number`.
	 * @param ctx the parse tree
	 */
	enterNumber?: (ctx: NumberContext) => void;
	/**
	 * Exit a parse tree produced by `SolarCalcParser.number`.
	 * @param ctx the parse tree
	 */
	exitNumber?: (ctx: NumberContext) => void;
}

