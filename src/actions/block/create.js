/* @flow */
var Dispatcher = require('../../dispatcher')

module.exports = function CreateBlock (params: { content: ?Object; parentBlockListId: number; position: number; type: string }) {
  var position = params.position

  Dispatcher.dispatch({ type: CreateBlock, params, position })
}
