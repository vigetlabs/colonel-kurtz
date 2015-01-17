var BlockType  = require('./block_type_store')
var Bus        = require('../bus')
var Dispatcher = require('../dispatcher')
var Modes      = require('../constants/mode_constants')
var invariant  = require('react/lib/invariant')

var _editors    = []
var getDefaults = function() {
  return {
    mode    : Modes.EDIT_MODE,
    types   : BlockType.keys(),
    preview : true
  }
}

var EditorStore = {

  find(id, safe) {
    var editor = _editors.filter(block => block.id === id )[0]

    if (!safe) {
      invariant(editor, "Unable to find editor with an id of %s", id)
    }

    return editor
  },

  _create(params) {
    var editor = { ...getDefaults(), ...params }

    invariant(Modes[editor.mode], 'Unacceptable mode for editor: ' + editor.mode)
    invariant(!EditorStore.find(editor.id, true), 'Editors must have a unique identifier')

    _editors = _editors.concat(editor)

    Bus.publish()
  },

  _update(id, params) {
    var editor = EditorStore.find(id)
    var index  = _editors.indexOf(editor)

    _editors = _editors.concat()
    _editors[index] = { ...getDefaults(), ...editor, ...params }

    Bus.publish()
  },

  dispatchToken: Dispatcher.register(function(action) {
    switch (action.type) {

      case require('actions/editor/create'):
        EditorStore._create(action.params)
        break

      case require('actions/editor/update'):
        EditorStore._update(action.id, action.params)
        break
    }
  })

}

module.exports = EditorStore
