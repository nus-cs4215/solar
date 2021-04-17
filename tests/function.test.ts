import { interpret } from '../src/interpreter/main';
import { getLog } from 'console-testing-library';

test('function', () => {

    const prog = `
    
    function f()
        return 5
    end

    print(f())

    `;
    interpret(prog);
    expect(getLog().log).toBe('5');
}
);

test('functions', () => {

    const prog = `
    
    function add(x,y)
        return x + y
    end

    function f()
        return add(1,2)
    end

    print(f())

    `;
    interpret(prog);
    expect(getLog().log).toBe('3');
}
);
