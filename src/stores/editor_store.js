var BlockType  = require('stores/block_type_store')
var Diode      = require('diode')
var Dispatcher = require('dispatcher')
var invariant  = require('react/lib/invariant')

var _editors    = []
var getDefaults = function() {
  return {
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

    invariant(!EditorStore.find(editor.id, true), 'Editors must have a unique identifier')

    _editors = _editors.concat(editor)

    Diode.publish()
  }

}

module.exports = EditorStore

Dispatcher.register(function(action) {
  switch (action.type) {
    case require('actions/editor/create'):
      EditorStore._create(action.params)
      break
  }
})
