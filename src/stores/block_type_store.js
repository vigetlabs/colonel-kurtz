/* @flow */

var Dispatcher = require('../dispatcher')
var React      = require('react')
var invariant  = require('react/lib/invariant')

var _blockTypes = []
var _defaults   = {
  icon  : null,
  types : null
}

var BlockTypeStore = {

  keys(): Array<string> {
    return _blockTypes.map(b => b.id)
  },

  find(id: number): Object {
    var type = _blockTypes.filter(b => b.id === id)[0]

    invariant(type, "Unable to find block type with an id of %s")

    return type
  },

  _create(params: BlockType): void {
    var record = { ..._defaults, ...params }

    invariant(record.id, 'BlockType must have an identifier')

    _blockTypes = _blockTypes.concat(record)
  }
}

module.exports = BlockTypeStore

Dispatcher.register(function(action: Object) {
  switch (action.type) {
    case require('../actions/block_type/create'):
      BlockTypeStore._create(action.params)
      break
  }
})
