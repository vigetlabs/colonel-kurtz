/* @flow */
var Dispatcher = require('../../dispatcher')

module.exports = function DestroyBlock (params: { blockId: number; parentBlockListId: number }) {
  Dispatcher.dispatch({ type: DestroyBlock, ...params })
}
