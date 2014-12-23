/* @flow */
var Dispatcher = require('../../dispatcher')

module.exports = function update (params: { blockId: number; parentBlockListId: number }) {
  Dispatcher.dispatch({ type: update, ...params })
}
