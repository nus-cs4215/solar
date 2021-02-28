import { Evaluator } from '../src/evaluator';

// ast for 2 + 3
const ast1 = {

    type: 'plus',
    left: {
        type: 'literal',
        value: 2
    },
    right: {
        type: 'literal',
        value: 3
    }
};

// ast for 1 + 2 + 3
const ast2 = {

    type: 'plus',
    left: {
        type: 'literal',
        value: 1
    },
    right: ast1
};

const e = new Evaluator();

test('2 + 3', () => {
    expect(e.evaluate(ast1)).toBe(5);
});

test('1 + 2 + 3', () => {
    expect(e.evaluate(ast2)).toBe(6);
});
