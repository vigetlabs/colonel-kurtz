/* @flow */
var Dispatcher = require('../../dispatcher')

module.exports = function MoveBlockList (blockListId: number, fromId: number, toId: number) {
  Dispatcher.dispatch({ type: MoveBlockList, blockListId, fromId, toId })
}
