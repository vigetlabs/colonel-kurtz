/* @flow */
var Dispatcher = require('../../dispatcher')

module.exports = function CreateBlockList (editorId: number): void {
  Dispatcher.dispatch({ type: CreateBlockList, editorId })
}
