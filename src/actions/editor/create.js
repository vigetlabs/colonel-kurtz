var Dispatcher = require('../dispatcher')

module.exports = function create (params) {
  var type = Constants.EDITOR_CREATE
  Dispatcher.dispatch({ type: create, params })
}
