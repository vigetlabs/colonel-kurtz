/* @flow */
var Dispatcher = require('../../dispatcher')

module.exports = function create (params: { content: ?Object; parentBlockListId: number; position: number; type: string }) {
  var position = params.position

  Dispatcher.dispatch({ type: create, params, position })
}
