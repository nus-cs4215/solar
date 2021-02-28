// Generated from /Users/yuheem/Projects/solar/src/lang/SolarCalc.g4 by ANTLR 4.8
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class SolarCalcLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.8", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, NAME=7, INT=8, FLOAT=9;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "NAME", "INT", "FLOAT", 
			"EXPONENTPART", "DIGIT"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "';'", "'='", "'return'", "','", "'+'", "'-'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, "NAME", "INT", "FLOAT"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}


	public SolarCalcLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "SolarCalc.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\13b\b\1\4\2\t\2\4"+
		"\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t"+
		"\13\4\f\t\f\3\2\3\2\3\3\3\3\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\5\3\5\3\6\3"+
		"\6\3\7\3\7\3\b\3\b\7\b-\n\b\f\b\16\b\60\13\b\3\t\6\t\63\n\t\r\t\16\t\64"+
		"\3\n\6\n8\n\n\r\n\16\n9\3\n\3\n\7\n>\n\n\f\n\16\nA\13\n\3\n\5\nD\n\n\3"+
		"\n\3\n\6\nH\n\n\r\n\16\nI\3\n\5\nM\n\n\3\n\6\nP\n\n\r\n\16\nQ\3\n\3\n"+
		"\5\nV\n\n\3\13\3\13\5\13Z\n\13\3\13\6\13]\n\13\r\13\16\13^\3\f\3\f\2\2"+
		"\r\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\2\27\2\3\2\7\5\2C\\aac"+
		"|\6\2\62;C\\aac|\4\2GGgg\4\2--//\3\2\62;\2k\2\3\3\2\2\2\2\5\3\2\2\2\2"+
		"\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2"+
		"\2\2\2\23\3\2\2\2\3\31\3\2\2\2\5\33\3\2\2\2\7\35\3\2\2\2\t$\3\2\2\2\13"+
		"&\3\2\2\2\r(\3\2\2\2\17*\3\2\2\2\21\62\3\2\2\2\23U\3\2\2\2\25W\3\2\2\2"+
		"\27`\3\2\2\2\31\32\7=\2\2\32\4\3\2\2\2\33\34\7?\2\2\34\6\3\2\2\2\35\36"+
		"\7t\2\2\36\37\7g\2\2\37 \7v\2\2 !\7w\2\2!\"\7t\2\2\"#\7p\2\2#\b\3\2\2"+
		"\2$%\7.\2\2%\n\3\2\2\2&\'\7-\2\2\'\f\3\2\2\2()\7/\2\2)\16\3\2\2\2*.\t"+
		"\2\2\2+-\t\3\2\2,+\3\2\2\2-\60\3\2\2\2.,\3\2\2\2./\3\2\2\2/\20\3\2\2\2"+
		"\60.\3\2\2\2\61\63\5\27\f\2\62\61\3\2\2\2\63\64\3\2\2\2\64\62\3\2\2\2"+
		"\64\65\3\2\2\2\65\22\3\2\2\2\668\5\27\f\2\67\66\3\2\2\289\3\2\2\29\67"+
		"\3\2\2\29:\3\2\2\2:;\3\2\2\2;?\7\60\2\2<>\5\27\f\2=<\3\2\2\2>A\3\2\2\2"+
		"?=\3\2\2\2?@\3\2\2\2@C\3\2\2\2A?\3\2\2\2BD\5\25\13\2CB\3\2\2\2CD\3\2\2"+
		"\2DV\3\2\2\2EG\7\60\2\2FH\5\27\f\2GF\3\2\2\2HI\3\2\2\2IG\3\2\2\2IJ\3\2"+
		"\2\2JL\3\2\2\2KM\5\25\13\2LK\3\2\2\2LM\3\2\2\2MV\3\2\2\2NP\5\27\f\2ON"+
		"\3\2\2\2PQ\3\2\2\2QO\3\2\2\2QR\3\2\2\2RS\3\2\2\2ST\5\25\13\2TV\3\2\2\2"+
		"U\67\3\2\2\2UE\3\2\2\2UO\3\2\2\2V\24\3\2\2\2WY\t\4\2\2XZ\t\5\2\2YX\3\2"+
		"\2\2YZ\3\2\2\2Z\\\3\2\2\2[]\5\27\f\2\\[\3\2\2\2]^\3\2\2\2^\\\3\2\2\2^"+
		"_\3\2\2\2_\26\3\2\2\2`a\t\6\2\2a\30\3\2\2\2\16\2.\649?CILQUY^\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}