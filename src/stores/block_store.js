/* @flow */

var Bus        = require('../bus')
var Block      = require('../models/block')
var Dispatcher = require('../dispatcher')
var invariant  = require('react/lib/invariant')

var _blocks = []

var BlockStore = {

  all(): Array<Block> {
    return _blocks
  },

  last() {
    return _blocks[_blocks.length - 1]
  },

  find(id: number): Block {
    var block:Block = _blocks.find(block => block.id === id )

    invariant(block, "Unable to find block with id of %s", id)

    return block
  },

  // content: ?Object, type: string, parentBlockListId: number
  _create({ content, type, parentBlockListId } : { content: ?Object; type: string; parentBlockListId: number }): Block {
    var block = new Block({ content, type, parentBlockListId })

    _blocks = _blocks.concat(block)

    Bus.publish()

    return block
  },

  _destroy(id: number) {
    _blocks = _blocks.filter(b => b.id !== id)
    Bus.publish()
  },

  _update(blockId: number, content: ?Object) {
    var block = BlockStore.find(blockId)

    block.content = { ...block.content, ...content }
    Bus.publish()
  },

  dispatchToken: Dispatcher.register(function(action) {
    switch (action.type) {

      case require('../actions/block/create'):
        var block = BlockStore._create(action.params)
        action.block = block
        break

      case require('../actions/block/destroy'):
        Dispatcher.waitFor([ require('./block_list_store').dispatchToken ])
        BlockStore._destroy(action.blockId)
        break

      case require('../actions/block/update'):
        BlockStore._update(action.blockId, action.content)
        break

      default:
        // do nothing
    }
  })

}

module.exports = BlockStore
