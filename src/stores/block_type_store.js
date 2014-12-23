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

  find (id: number): Object {
    var type = _blockTypes.find(b => b.id === id)

    if (!type) {
      throw Error("BlockType " + type + " could not be found")
    }

    return type
  },

  _create (params: BlockType): void {
    var record = { ..._defaults, ...params }

    invariant(record.id, 'BlockType must have an identifier')

    _blockTypes = _blockTypes.concat(record)
  },

  dispatchToken: Dispatcher.register(function(action: Object) {
    switch (action.type) {

      case require('../actions/block_type/create'):
        BlockTypeStore._create(action.params)
        break

      default:
        // do nothing
    }
  })

}

module.exports = BlockTypeStore
