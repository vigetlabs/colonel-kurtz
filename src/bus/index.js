/**
 * The Bus emits a heartbeat whenever any store state has changed.
 * When Stores change, they can use this entity to broadcast
 * that state has changed.
 */

var invariant = require('react/lib/invariant');

var _callbacks = [];

var Bus = {

  /**
   * Given a CALLBACK function, remove it from the Set of callbacks.
   * Throws an error if the callback is not included in the Set.
   */
  unsubscribe(callback) {
    if (__DEV__) {
      invariant(_callbacks.indexOf(callback) > -1, 'Bus.unsubscribe() was asked to remove callback that it was not subscribed to.');
    }

    _callbacks = _callbacks.filter(i => i !== callback);
  },

  /**
   * Given a CALLBACK function, add it to the Set of all callbacks.
   */
  subscribe(callback) {
    if (__DEV__) {
      var type = typeof callback;
      invariant(type === 'function', 'Bus.listenTo() expects a function, instead it received a ' + type);
    }

    _callbacks = _callbacks.concat(callback);
  },

  /**
   * Trigger every callback in the Set
   */
  publish() {
    _callbacks.forEach(callback => callback());
  }

}

module.exports = Bus;
