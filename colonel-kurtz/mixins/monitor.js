/**
 * Listens to the Bus and calls a provided `getState` function when
 * the Bus publishes.
 */

var Bus       = require('../bus');
var invariant = require('react/lib/invariant');

var Monitor = {

  getInitialState(): Object {
    if (__DEV__) {
      invariant(this.getState, "Monitor mixin requires `getState` implementation.");
    }

    return this.getState();
  },

  updateState() {
    this.setState(this.getState());
  },

  componentDidMount() {
    Bus.subscribe(this.updateState);
  },

  componentWillUnmount() {
    Bus.unsubscribe(this.updateState);
  },

  componentWillReceiveProps() {
    this.updateState();
  }

};

module.exports = Monitor;
