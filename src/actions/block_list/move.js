/* @flow */
var Dispatcher = require('../../dispatcher')

module.exports = function move (blockListId: number, fromId: number, toId: number) {
  Dispatcher.dispatch({ type: move, blockListId, fromId, toId })
}
