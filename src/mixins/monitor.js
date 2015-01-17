/**
 * Listens to the Bus and calls a provided `getState` function when
 * the Bus publishes.
 *
 * @flow
 */

var Bus       = require('../bus');
var invariant = require('react/lib/invariant');

var Monitor = {

  getInitialState(): Object {
    invariant(this.getState, "Monitor mixin requires `getState` implementation.");

    return this.getState();
  },

  updateState(): void {
    this.setState(this.getState());
  },

  componentDidMount(): void {
    Bus.subscribe(this.updateState);
  },

  componentWillUnmount(): void {
    Bus.unsubscribe(this.updateState);
  },

  componentWillReceiveProps(): void {
    this.updateState();
  }

};

module.exports = Monitor;
