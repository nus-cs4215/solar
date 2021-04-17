import { interpret } from '../src/interpreter/main';
import { getLog } from 'console-testing-library';

test('2 print statements', () => {

    const prog = `
    print('hello world') print('hi')
    `;
    interpret(prog);
    expect(getLog().log).toBe('hello world\nhi');
}
);

test('print(true)', () => {

    const prog = `
    print(true)
    `;
    interpret(prog);
    expect(getLog().log).toBe('true');
}
);

test('print loop variable i inside a for loop', () => {

    const prog = `
    
    for i = 0, 6, 1 do
        print(i)
    end
    
    `;
    interpret(prog);
    expect(getLog().log).toBe('0\n1\n2\n3\n4\n5');
}
);