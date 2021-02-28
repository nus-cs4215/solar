// Generated from src/lang/SolarCalc.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `SolarCalcParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface SolarCalcVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `SolarCalcParser.chunk`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitChunk?: (ctx: ChunkContext) => Result;

	/**
	 * Visit a parse tree produced by `SolarCalcParser.block`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlock?: (ctx: BlockContext) => Result;

	/**
	 * Visit a parse tree produced by `SolarCalcParser.stat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStat?: (ctx: StatContext) => Result;

	/**
	 * Visit a parse tree produced by `SolarCalcParser.retstat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRetstat?: (ctx: RetstatContext) => Result;

	/**
	 * Visit a parse tree produced by `SolarCalcParser.varlist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarlist?: (ctx: VarlistContext) => Result;

	/**
	 * Visit a parse tree produced by `SolarCalcParser.explist`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExplist?: (ctx: ExplistContext) => Result;

	/**
	 * Visit a parse tree produced by `SolarCalcParser.exp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExp?: (ctx: ExpContext) => Result;

	/**
	 * Visit a parse tree produced by `SolarCalcParser.operatorBinary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperatorBinary?: (ctx: OperatorBinaryContext) => Result;

	/**
	 * Visit a parse tree produced by `SolarCalcParser.operatorUnary`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOperatorUnary?: (ctx: OperatorUnaryContext) => Result;

	/**
	 * Visit a parse tree produced by `SolarCalcParser.number`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumber?: (ctx: NumberContext) => Result;
}

