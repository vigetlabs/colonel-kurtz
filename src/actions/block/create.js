/* @flow */
var Dispatcher = require('dispatcher')

module.exports = function CreateBlock (params: Object, position: any) {
  Dispatcher.dispatch({ type: CreateBlock, params, position })
}
