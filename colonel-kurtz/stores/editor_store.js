var Bus        = require('../bus')
var Immutable  = require('immutable')
var Modes      = require('../constants/mode_constants')
var Constants  = require('../constants/editor_constants')
var Dispatcher = require('../dispatcher')
var invariant  = require('react/lib/invariant')

var _editors  = Immutable.List()
var _defaults = {
  mode    : Modes.EDIT_MODE,
  nesting : true
}

var EditorStore = {

  all() {
    return _editors
  },

  last() {
    return _editors.last()
  },

  find(id) {
    return _editors.find(block => block.id === id ) || null
  },

  _create(params) {
    var mode   = Modes.EDIT_MODE
    var editor = { ..._defaults, ...params }

    invariant(EditorStore.find(editor.id) === null, 'Editors must have a unique identifier')

    _editors = _editors.push(editor)

    Bus.publish()
  },

  _update(id, params) {
    var editor = EditorStore.find(id)
    var index  = _editors.indexOf(editor)

    invariant(index >= 0, 'Unable to find editor with an id of ' + id)

    _editors = _editors.set(index, { ...defaults, ...editor, ...params })

    Bus.publish()
  },

  dispatchToken: Dispatcher.register(function(action) {
    switch (action.type) {
      case Constants.EDITOR_CREATE:
        EditorStore._create(action.params)
        break
      case Constants.EDITOR_UPDATE:
        EditorStore._update(action.id, action.params)
          break
      default:
        // do nothing
    }
  })

}

module.exports = EditorStore
