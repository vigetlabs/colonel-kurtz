var Dispatcher = require('../../dispatcher')

module.exports = function UpdateEditor (id, params) {
  Dispatcher.dispatch({ type: UpdateEditor, id, params })
}
