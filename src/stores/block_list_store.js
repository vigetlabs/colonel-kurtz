/* @flow */

var BlockList  = require('../models/block_list')
var BlockStore = require('../stores/block_store')
var Bus        = require('../bus')
var Dispatcher = require('../dispatcher')
var invariant  = require('react/lib/invariant')

var _blockLists = []

var BlockListStore = {

  all(): Array<BlockList> {
    return _blockLists
  },

  last() {
    return _blockLists[_blockLists.length - 1]
  },

  findByKey(key: string, value: any): BlockList {
    var blockList:BlockList = this.all().filter(item => item[key] === value)[0]

    invariant(blockList, "Unable to find block list with an '%s' attribute of '%s'", key, value)

    return blockList
  },

  findByEditorId(id: number): BlockList {
    return BlockListStore.findByKey('editorId', id)
  },

  findByBlockId(id: number): BlockList {
    return BlockListStore.findByKey('blockId', id)
  },

  find(id: number): BlockList {
    return BlockListStore.findByKey('id', id)
  },

  _createFromEditor(editorId: number): void {
    var blockList = new BlockList({ editorId })

    _blockLists = _blockLists.concat(blockList)

    return blockList
  },

  _createFromParent(block:Block): void {
    var parent = this.find(block.parentBlockListId)
    var blockList = new BlockList({ editorId: parent.editorId, blockId: block.id})

    _blockLists = _blockLists.concat(blockList)

    return blockList
  },

  _addBlockToList(block: Block, position: number) :void {
    var blockList = this.find(block.parentBlockListId)

    blockList.insertBlock(block.id, position)
    Bus.publish()
  },

  _removeBlockFromList(blockId: number, blockListId: number) {
    var blockList = this.find(blockListId)

    blockList.removeBlock(blockId)

    Bus.publish()
  },

  _move(blockListId: number, fromId: number, toId: number) {
    var blockList = this.find(blockListId)

    blockList.move(fromId, toId)
    Bus.publish()
  },

  dispatchToken: Dispatcher.register(function(action) {
    switch (action.type) {

      case require('actions/block/create'):
        Dispatcher.waitFor([ BlockStore.dispatchToken ])
        BlockListStore._createFromParent(action.block, action.position)
        BlockListStore._addBlockToList(action.block, action.position)
        break

      case require('actions/block/destroy'):
        BlockListStore._removeBlockFromList(action.blockId, action.parentBlockListId)
        break

      case require('actions/editor/create'):
        BlockListStore._createFromEditor(action.params.id)
        break

      case require('actions/block_list/move'):
        BlockListStore._move(action.blockListId, action.fromId, action.toId)
        break
    }
  })
}

module.exports = BlockListStore
