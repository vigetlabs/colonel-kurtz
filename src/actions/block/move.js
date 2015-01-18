/* @flow */
var Dispatcher = require('dispatcher')

module.exports = function MoveBlock (fromId, toId) {
  Dispatcher.dispatch({ type: MoveBlock, fromId, toId })
}
