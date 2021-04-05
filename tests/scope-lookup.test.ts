import { Scope } from '../src/interpreter/scope';

test('Lookup x in scope that contains x', () => {
    const scope = new Scope({}, null);
    scope.symbolTable.x = 1;
    expect(scope.lookup('x')).toBe(1);
})

test('Lookup x where parent scope contains x', () => {
    const parentScope = new Scope({}, null);
    parentScope.symbolTable.x = 1;
    const currScope = new Scope({}, parentScope);
    expect(currScope.lookup('x')).toBe(1);
})

test('Lookup x in scope that does not contain x', () => {
    const scope = new Scope({}, null);
    expect(() => scope.lookup('x')).toThrow('symbol not defined');
})