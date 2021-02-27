About Solar
===========

Solar is a sublanguage of the Lua programming language.

Just like Lua, Solar is a lightweight and high-level programming language. It is meant to ease beginners into the world of programming by introducing fundamental yet powerful constructs of programming.

To that aim, Solar has an online IDE for users to write and run programs - Solar IDE. Users will only require a modern web browser, no other installations needed.
To access Solar IDE, visit <https://source-academy.github.io/playground>.

If you are keen to set up Solar and Solar IDE locally, please read on.

Local Setup
===========

After cloning this repository, run the following commands

``` {.}
$ cd x-slang-T2-ak-lyh
$ yarn install
$ yarn build
$ yarn link
```

Solar is now on your local machine. To try it in a REPL environment, run

``` {.}
$ node dist/repl/repl.js '1 + 1'
```

To set up Solar IDE locally, visit its GitHub repository at <https://github.com/nus-cs4215/x-frontend-T2-ak-lyh>.

Documentation
=============

Solar is documented here: <https://sicp.comp.nus.edu.sg/source/>

Testing
=======

The Solar project utilises the Jest testing framework for its test suite. To run the test suite:
``` {.}
$ yarn jest
```

Jest is documented here: <https://jestjs.io/docs/en/getting-started.html>
