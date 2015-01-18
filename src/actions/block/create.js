/* @flow */
var Dispatcher = require('dispatcher')

module.exports = function CreateBlock (params: { content: ?Object; parent: number; position: number; type: string }) {
  var position = params.position

  Dispatcher.dispatch({ type: CreateBlock, params, position })
}
