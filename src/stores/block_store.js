/* @flow */

var Bus        = require('../bus')
var Block      = require('../models/block')
var Dispatcher = require('../dispatcher')
var invariant  = require('react/lib/invariant')

var _blocks = []

var BlockStore = {

  childrenFor(block): Array<Block> {
    return _blocks.filter((d) => d.parent === block)
  },

  all(): Array<Block> {
    return _blocks
  },

  last() {
    return _blocks[_blocks.length - 1]
  },

  find(id: number): Block {
    var block:Block = _blocks.filter(block => block.id === id )[0]

    invariant(block, "Unable to find block with id of %s", id)

    return block
  },

  // content: ?Object, type: string, parentBlockListId: number
  _create({ content, type, parent }, position) {
    var block = new Block({ content, type, parent })

    if (position === undefined) {
      position = _blocks.length
    }

    _blocks.splice(position, 0, block)

    Bus.publish()

    return block
  },

  _destroy(id: number, silent: boolean) {
    var block    = this.find(id)
    var children = this.childrenFor(block)

    _blocks = _blocks.filter(b => b !== block)

    children.forEach(b => BlockStore._destroy(b.id, true))

    if (!silent) {
      Bus.publish()
    }
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

  _seed(parent, blocks): void {
    if (!parent) {
      parent = BlockStore._create({})
    }

    blocks.forEach(function({ blocks, content, type }): void {
      var next = BlockStore._create({ content, parent, type })

      if (Array.isArray(blocks)) {
        BlockStore._seed(next, blocks)
      }
    })

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
