var Dispatcher = require('../dispatcher')

module.exports = function update (id, params) {
  var type = Constants.EDITOR_UPDATE
  Dispatcher.dispatch({ type: update, id, params })
}
