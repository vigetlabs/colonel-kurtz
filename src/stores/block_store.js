/* @flow */

var Diode      = require('diode')
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

  _create({ content, type, parent }, position=_blocks.length): Block {
    var block = new Block({ content, type, parent })

    if (position instanceof Block) {
      position = BlockStore._indexOf(position.id) + 1
    }

    _blocks.splice(position, 0, block)

    Diode.publish()

    return block
  },

  _destroy(id: number|Block) {
    let ref = id.valueOf()

    _blocks = _blocks.filter(function(node) {
      for (var n = node; n; n = n.parent) {
        if (n.id == ref) return false
      }

      return true
    })

    Diode.publish()
  },

  _update(id: number, content: ?Object) {
    var block = BlockStore.find(id)

    block.content = { ...block.content, ...content }

    Diode.publish()
  },

  _reset() {
    _blocks = []
    Diode.publish()
  },

  _indexOf(ref: number|Block): number {
    return _blocks.indexOf(BlockStore.find(ref.valueOf()))
  },

  _move(fromId: number, toId: number): void {
    var from = BlockStore._indexOf(fromId)
    var to   = BlockStore._indexOf(toId)

    _blocks.splice(to, 0, _blocks.splice(from, 1)[0]);

    Diode.publish()
  },

  _seed(items=[], parent=BlockStore._create({})): void {
    for (var i = 0, len = items.length; i < len; i++) {
      let { blocks, content, type } = items[i]
      BlockStore._seed(blocks, BlockStore._create({ content, parent, type }))
    }

    return parent
  }
}

module.exports = BlockStore

Dispatcher.register(function(action) {
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
