/**
 * The Bus emits a heartbeat whenever any store state has changed.
 * When Stores change, they can use this entity to broadcast
 * that state has changed.
 */

var Immutable  = require('immutable');
var invariant  = require('react/lib/invariant');

var _callbacks = Immutable.Set();

var Bus = {

  /**
   * Given a CALLBACK function, remove it from the Set of callbacks.
   * Throws an error if the callback is not included in the Set.
   */
  unsubscribe(callback) {
    if (__DEV__) {
      invariant(_callbacks.has(callback), 'Bus.stopListeningTo() was asked to remove callback that it was not subscribed to.');
    }

    _callbacks = _callbacks.remove(callback);
  },

  /**
   * Given a CALLBACK function, add it to the Set of all callbacks.
   */
  subscribe(callback) {
    if (__DEV__) {
      var type = typeof callback
      invariant(type === 'function', 'Bus.listenTo() expects a function, instead it received a ' + type)
    }

    _callbacks = _callbacks.add(callback);
  },

  /**
   * Trigger every callback in the Set
   */
  publish() {
    _callbacks.forEach(callback => callback());
  }

}

module.exports = Bus;
