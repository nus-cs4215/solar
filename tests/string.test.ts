import { interpret } from '../src/interpreter/main';
import { getLog } from 'console-testing-library';

test('hello world', () => {

    const prog = `
    print('hello world')
    `;
    interpret(prog);
    expect(getLog().log).toBe('hello world');
}
);

test('string concat', () => {

    const prog = `
    print('hello' + ' there')
    `;
    interpret(prog);
    expect(getLog().log).toBe('hello there');
}
);

test('str_reverse', () => {

    const prog = `
    print(str_reverse('abc'))
    `;
    interpret(prog);
    expect(getLog().log).toBe('cba');
}
);
