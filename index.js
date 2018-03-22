'use strict'

/**
 * Expose compositor.
 */

module.exports = purpose
module.exports.wrap = wrap

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function purpose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)(context)
    function dispatch (i) {
      return function (ctx) {
        if (i <= index) return Promise.reject(new Error('next() called multiple times'))
        index = i
        let fn = middleware[i]
        if (i === middleware.length) fn = next
        if (!fn) return Promise.resolve(ctx)
        try {
          return Promise.resolve(fn(ctx, function next (ctx) {
            return dispatch(i + 1)(ctx)
          }))
        } catch (err) {
          return Promise.reject(err)
        }
      }
    }
  }
}

/**
 * Wrap an impure `middleware` function
 * to be compatible with purpose.
 *
 * @param {Function} koa middleware function
 * @return {Function}
 * @api public
 */

function wrap (fn) {
  return function (context, next) {
    return Promise.resolve(fn(context, function () {
      return next(context)
    })).then(result => result || context)
  }
}
