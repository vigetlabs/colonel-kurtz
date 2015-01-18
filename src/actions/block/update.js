/* @flow */
var Dispatcher = require('dispatcher')

module.exports = function UpdateBlock (id: number, content: Object) {
  Dispatcher.dispatch({ type: UpdateBlock, id, content })
}
