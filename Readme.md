
# Purpose.js

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

A middleware composition tool for pure functions.

## Installation

```js
$ npm i purposejs
```

## API

### purpose([a, b, c, ...])

  Compose the given middleware functions and return a middleware function.
  
### purpose.wrap(impureMiddlewareFn)

  Wraps an "impure" middleware function to be compatible with Purpose.js
  
  ```js
  const pure = purpose.wrap(ctx => {
   ctx.a = 1
   return next()
  })
  purpose([pure])({}) // => { a: 1 }
  ```

## Pure middleware function

#### Function(data:Object, next:Function) => Promise[Object]

```js
(data, next) => next({ ...data }).then(res => res)
```

#### data : Object

  The input data for the function to act on
  
#### next : Function(data : Object) => Promise[Object]

  Passes control to the next middleware function with `data` as its input
  
#### Return value

  A promise that resolves to an Object

## License

  MIT
  
### Acknowledgements

This is a fork of [koa-compose@4.0.0](https://github.com/koajs/compose/tree/4.0.0) under the MIT license.

[npm-image]: https://img.shields.io/npm/v/purposejs.svg?style=flat-square
[npm-url]: https://npmjs.org/package/purposejs
[travis-image]: https://img.shields.io/travis/gingerich/purpose/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/gingerich/purpose
[codecov-image]: https://img.shields.io/codecov/c/github/gingerich/purpose/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/gingerich/purpose
[license-image]: http://img.shields.io/npm/l/purposejs.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/purposejs.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/purposejs
