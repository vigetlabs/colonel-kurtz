/* @flow */

var BlockConstants = require('../constants/block_constants')
var BlockList      = require('../models/block_list')
var BlockStore     = require('../stores/block_store')
var Bus            = require('../bus')
var Constants      = require('../constants/block_list_constants')
var Dispatcher     = require('../dispatcher')
var Immutable      = require('immutable')

var _blockLists = Immutable.List()

var BlockListStore = {

  all(): Array<BlockList> {
    return _blockLists
  },

  last() {
    return _blockLists.last()
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

  _create(params: Object): void {
    var blockList = new BlockList({ editorId: params.editorId, blockId: params.blockId })

    _blockLists = _blockLists.push(blockList)
  },

  _createFromParent(block:Block, position:number): void {
    var parent = this.find(block.parentBlockListId)

    if (parent) {
      var blockList = new BlockList({ editorId: parent.editorId, blockId: block.id})
      _blockLists = _blockLists.push(blockList)
    }
  },

  _addBlockToList(block: Block, position: number) :void {
    var blockList = this.find(block.parentBlockListId)

    if (blockList) {
      blockList.insertBlock(block, position)
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

  dispatchToken: Dispatcher.register(function(action) {
    switch (action.type) {
      case BlockConstants.BLOCK_CREATE:
        Dispatcher.waitFor([ BlockStore.dispatchToken ])
        BlockListStore._addBlockToList(action.block, action.position)
        BlockListStore._createFromParent(action.block, action.position)
        break
      case BlockConstants.BLOCK_DESTROY:
        BlockListStore._removeBlockFromList(action.blockId, action.parentBlockListId)
        break
      case Constants.BLOCK_LIST_CREATE:
        BlockListStore._create({ editorId: action.editorId, blockId: action.blockId })
        break
      default:
        // do nothing
    }
  })

}

module.exports = BlockListStore
