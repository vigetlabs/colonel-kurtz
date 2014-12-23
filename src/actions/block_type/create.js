/* @flow */

var Dispatcher = require('../../dispatcher')

module.exports = function CreateBlockType (params: ?Object) : void {
  Dispatcher.dispatch({ type: CreateBlockType, params })
}
