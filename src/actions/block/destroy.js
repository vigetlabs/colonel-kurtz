/* @flow */
var Dispatcher = require('dispatcher')

module.exports = function DestroyBlock (id: number) {
  Dispatcher.dispatch({ type: DestroyBlock, id })
}
