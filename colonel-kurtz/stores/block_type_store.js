/* @flow */

var Constants  = require('../constants/block_type_constants')
var Dispatcher = require('../dispatcher')
var Immutable  = require('immutable')
var React      = require('react')
var invariant  = require('react/lib/invariant')

var _blockTypes = Immutable.List()
var _defaults   = {
  icon : null,
  nest : null
}

var BlockTypeStore = {

  keys(): Array<string> {
    return _blockTypes.toArray().map(b => b.id)
  },

  find (id:number): ?Object {
    return _blockTypes.find(b => b.id === id) || null
  },

  _create (params: Object): void {
    var record = { ..._defaults, ...params }

    invariant(record.id, 'BlockType must have an identifier')

    _blockTypes = _blockTypes.push(record)
  },

  dispatchToken: Dispatcher.register(function(action: Object) {
    switch (action.type) {
      case Constants.BLOCK_TYPE_CREATE:
        BlockTypeStore._create(action.params)
        break
      default:
        // do nothing
    }
  })

}

module.exports = BlockTypeStore
