/* @flow */

var Constants  = require('../constants/block_type_constants')
var Dispatcher = require('../dispatcher')
var Immutable  = require('immutable')

var _blockTypes = Immutable.List()

var BlockTypeStore = {

  all(): Array<Block> {
    return _blockTypes
  },

  find(id): Block {
    return BlockTypeStore.all().find(function(blockType) {
      return blockType.id === id
    })
  },

  _create(id, component) {
    _blockTypes = _blockTypes.push({ id, component })
  },

  dispatchToken: Dispatcher.register(function(action) {
    switch (action.type) {
      case Constants.BLOCK_TYPE_CREATE:
        BlockTypeStore._create(action.id, action.component)
        break
      default:
        // do nothing
    }
  })

}

module.exports = BlockTypeStore
