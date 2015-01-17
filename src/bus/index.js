/**
 * The Bus emits a heartbeat whenever any store state has changed.
 * When Stores change, they can use this entity to broadcast
 * that state has changed.
 */

import invariant from 'react/lib/invariant'

let _callbacks = []

let Bus = {

  /**
   * Given a CALLBACK function, remove it from the Set of callbacks.
   * Throws an error if the callback is not included in the Set.
   */
  unsubscribe(callback) {
    invariant(_callbacks.indexOf(callback) > -1, 'Bus.unsubscribe() was asked to remove callback that it was not subscribed to.');
    _callbacks = _callbacks.filter(i => i !== callback);
  },

  /**
   * Given a CALLBACK function, add it to the Set of all callbacks.
   */
  subscribe(callback) {
    let type = typeof callback;

    invariant(type === 'function', 'Bus.listenTo() expects a function, instead it received a ' + type);

    _callbacks = _callbacks.concat(callback);
  },

  /**
   * Trigger every callback in the Set
   */
  publish() {
    _callbacks.forEach(callback => callback());
  }

}

export default Bus
