/* @flow */

var Bus        = require('../bus')
var Block      = require('../models/block')
var Dispatcher = require('../dispatcher')
var invariant  = require('react/lib/invariant')

var _blocks = []

var BlockStore = {

  childrenFor(block): Array<Block> {
    return _blocks.filter((b) => b.parent === block)
  },

  all(): Array<Block> {
    return _blocks
  },

  last() {
    return _blocks[_blocks.length - 1]
  },

  find(id: number): Block {
    var block:Block = _blocks.filter((b) => b.id === id)[0]

    invariant(block, "Unable to find block with id of %s", id)

    return block
  },

  _create({ content, type, parent }, position: number): Block {
    var block = new Block({ content, type, parent })

    if (position instanceof Block) {
      position = BlockStore._indexOf(position.id) + 1
    } else if (position == void 0) {
      position = _blocks.length
    }

    _blocks.splice(position, 0, block)

    Bus.publish()

    return block
  },

  _destroy(id: number) {
    _blocks = _blocks.filter(function(node) {
      for (var n = node; n; n = n.parent) {
        if (n.id == id) return false
      }

      return true
    })

    Bus.publish()
  },

  _update(id: number, content: ?Object) {
    var block = BlockStore.find(id)

    block.content = { ...block.content, ...content }

    Bus.publish()
  },

  _indexOf(id: number): number {
    return _blocks.indexOf(BlockStore.find(id))
  },

  _move(fromId: number, toId: number): void {
    var from = BlockStore._indexOf(fromId)
    var to   = BlockStore._indexOf(toId)

    _blocks.splice(to, 0, _blocks.splice(from, 1)[0]);

    Bus.publish()
  },

  _seed(parent=BlockStore._create({}), items=[]): void {
    for (let { blocks, content, type } of items)  {
      BlockStore._seed(BlockStore._create({ content, parent, type }), blocks)
    }

    return parent
  },

  dispatchToken: Dispatcher.register(function(action) {
    switch (action.type) {

      case require('actions/block/create'):
        BlockStore._create(action.params, action.position)
        break

      case require('actions/block/destroy'):
        BlockStore._destroy(action.id)
        break

      case require('actions/block/update'):
        BlockStore._update(action.id, action.content)
        break

      case require('actions/block/move'):
        BlockStore._move(action.fromId, action.toId)
        break
    }
  })

}

module.exports = BlockStore
