import { interpret } from '../src/interpreter/main';
import { getLog } from 'console-testing-library';

test(`testing two calls to print()`, () => {

    const prog = `
    print('hello world') print('hi')
    `;
    interpret(prog);
    expect(getLog().log).toBe('hello world\nhi');
}
)
