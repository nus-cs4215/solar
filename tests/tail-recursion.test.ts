import { interpret } from '../src/interpreter/main';
import { getLog } from 'console-testing-library';

test('factorial', () => {

    const prog = `
    
    function fact(n, acc)
        if n == 0 then
            return acc
        else 
            return fact(n-1, n * acc)
        end
    end

    print(fact(1000000, 1))

    `;
    interpret(prog);
    expect(getLog().log).toBe('Infinity');
}
);
