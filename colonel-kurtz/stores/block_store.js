/* @flow */

var Bus        = require('../bus')
var Block      = require('../models/block')
var Constants  = require('../constants/block_constants')
var Dispatcher = require('../dispatcher')
var Immutable  = require('immutable')

var _blocks = Immutable.List()

var BlockStore = {

  all(): Array<Block> {
    return _blocks
  },

  last() {
    return _blocks.last()
  },

  find(id: number): Block {
    return _blocks.find(block => block.id === id )
  },

  _create(parentBlockListId: number, type: string): Block {
    var block = new Block({ parentBlockListId, type })

    _blocks = _blocks.push(block)

    Bus.publish()

    return block
  },

  _destroy(id: number) {
    _blocks = _blocks.filter(b => b.id !== id)
    Bus.publish()
  },

  _update(blockId: number, content: string) {
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
