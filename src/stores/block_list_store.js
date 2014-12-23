/* @flow */

var BlockList  = require('../models/block_list')
var BlockStore = require('../stores/block_store')
var Bus        = require('../bus')
var Dispatcher = require('../dispatcher')

var _blockLists = []

var BlockListStore = {

  all(): Array<BlockList> {
    return _blockLists
  },

  last() {
    return _blockLists[_blockLists.length - 1]
  },

  findByKey(key:string, value:any): any {
    return this.all().find(item => item[key] === value) || null
  },

  findByEditorId(id: number): ?BlockList {
    return BlockListStore.findByKey('editorId', id)
  },

  findByBlockId(id: number): ?BlockList {
    return BlockListStore.findByKey('blockId', id)
  },

  find(id: number): ?BlockList {
    return BlockListStore.findByKey('id', id)
  },

  _create(editorId: number): void {
    _blockLists = _blockLists.concat(new BlockList({ editorId }))
  },

  _createFromParent(block:Block): void {
    var parent = this.find(block.parentBlockListId)

    if (parent) {
      var blockList = new BlockList({ editorId: parent.editorId, blockId: block.id})
      _blockLists = _blockLists.concat(blockList)
    }
  },

  _addBlockToList(block: Block, position: number) :void {
    var blockList = this.find(block.parentBlockListId)

    if (blockList) {
      blockList.insertBlock(block.id, position)
      Bus.publish()
    }
  },

  _removeBlockFromList(blockId: number, blockListId: number) {
    var blockList = this.find(blockListId)

    if (blockList) {
      blockList.removeBlock(blockId)
      Bus.publish()
    }
  },

  _move(blockListId: number, fromId: number, toId: number) {
    var blockList = this.find(blockListId)

    if (blockList) {
      blockList.move(fromId, toId)
      Bus.publish()
    }
  },

  dispatchToken: Dispatcher.register(function(action) {
    switch (action.type) {

      case require('../actions/block/create'):
        Dispatcher.waitFor([ BlockStore.dispatchToken ])
        BlockListStore._addBlockToList(action.block, action.position)
        BlockListStore._createFromParent(action.block, action.position)
        break

      case require('../actions/block/destroy'):
        Dispatcher.waitFor([ BlockStore.dispatchToken ])
        BlockListStore._removeBlockFromList(action.blockId, action.parentBlockListId)
        break

      case require('../actions/block_list/create'):
        BlockListStore._create(action.editorId)
        break

      case require('../actions/block_list/move'):
        BlockListStore._move(action.blockListId, action.fromId, action.toId)
        break

      default:
        // do nothing
    }
  })
}

module.exports = BlockListStore
