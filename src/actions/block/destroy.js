/* @flow */
var Dispatcher = require('../../dispatcher')

module.exports = function destroy (params: { blockId: number; parentBlockListId: number }) {
  Dispatcher.dispatch({ type: destroy, ...params })
}
