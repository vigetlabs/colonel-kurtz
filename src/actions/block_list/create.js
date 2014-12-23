/* @flow */
var Dispatcher = require('../../dispatcher')

module.exports = function create (params: { editorId: number; blockId: number }): void {
  Dispatcher.dispatch({ type: create, params })
}
