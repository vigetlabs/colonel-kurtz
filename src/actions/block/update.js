/* @flow */
var Dispatcher = require('../../dispatcher')

module.exports = function UpdateBlock (blockId: number, content: Object) {
  Dispatcher.dispatch({ type: UpdateBlock, blockId, content })
}
