/* @flow */
var Dispatcher = require('../../dispatcher')

module.exports = function CreateBlockList (params: { editorId: number; blockId: number }): void {
  Dispatcher.dispatch({ type: CreateBlockList, params })
}
