/* @flow */

var Bus        = require('../bus')
var Constants  = require('../constants/block_constants')
var Dispatcher = require('../dispatcher')
var Immutable  = require('immutable')

var _blocks = Immutable.List()

var BlockStore = {

  all(): Array<Block> {
    return _blocks
  },

  find(id: number): Block {
    return BlockStore.all().find(function(block) {
      return block.id === id
    })
  },

  _create(parentBlockListId: number, type: string): Block {
    var block = new Block({ parentBlockListId, type })

    _blocks = _blocks.push(block)

    Bus.publish()

    return block
  },

  _destroy(blockId: number) {
    var block = BlockStore.find(blockId)

    if (block) {
      var removalIndex = _blocks.indexOf(block)

      _blocks = _blocks.splice(removalIndex, 1)

      Bus.publish()
    }
  },

  _update(blockId: number, content: Object) {
    var block = BlockStore.find(blockId)

    if (block) {
      // This could probably be done more immutably, but seems fine as is.
      block.content = content

      Bus.publish()
    }
  },

  dispatchToken: Dispatcher.register(function(action) {
    switch (action.type) {
      case Constants.BLOCK_CREATE:
        var block = BlockStore._create(action.parentBlockListId, action.blockType)
        action.block = block
        break
      case Constants.BLOCK_DESTROY:
        BlockStore._destroy(action.blockId)
        break
      case Constants.BLOCK_UPDATE:
        BlockStore._update(action.blockId, action.content)
        break
      default:
        // do nothing
    }
  })

}

module.exports = BlockStore

// This is to get around circular dependencies
var Block = require('../models/block')
