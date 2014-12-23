var Dispatcher = require('../../dispatcher')

module.exports = function CreateEditor (params) {
  Dispatcher.dispatch({ type: CreateEditor, params })
}
