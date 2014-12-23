var Constants  = require('../constants/editor_constants')
var Dispatcher = require('../dispatcher')

var EditorActions = {

  create(params) {
    var type = Constants.EDITOR_CREATE
    Dispatcher.dispatch({ type, params })
  },

  update(id, params) {
    var type = Constants.EDITOR_UPDATE
    Dispatcher.dispatch({ type, id, params })
  }

}

module.exports = EditorActions
