/**
 * Dispatcher is used to broadcast payloads to registered callbacks.
 *
 * This is different from generic pub-sub systems in two ways:
 *
 * - Callbacks are not subscribed to particular events. Every payload is dispatched to every registered callback.
 * - Callbacks can be deferred in whole or part until other callbacks have been executed.
 *
 * See http://facebook.github.io/flux/docs/dispatcher.html
 */

var Dispatcher = require('flux').Dispatcher

module.exports = new Dispatcher()
