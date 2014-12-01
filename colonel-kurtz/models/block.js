/* @flow */

var uid            = require('../utils/uid')
var BlockList      = require('./block_list')
var BlockTypeStore = require('../stores/block_type_store')

class Block {
  id: number;
  parentBlockListId: number;

  constructor(params: {parentBlockListId: number; type: string}) {
    this.id = uid()
    this.parentBlockListId = params.parentBlockListId
    this.content = null
    this.type = params.type || 'text'
  }

  toJSON(): {id: number; content: any; childBlockList: ?BlockList} {
    var json = { id: this.id, type: this.type, content: this.content }

    var childBlockList = this.childBlockList()

    if (childBlockList) {
      json.childBlockList = childBlockList.toJSON()
    }

    return json
  }

  parentBlockList() {
    return BlockListStore.find(this.parentBlockListId)
  }

  childBlockList() {
    // To simulate Blocks with nested block lists, add a block list to every block.
    // TODO: remove once block types are implemented
    BlockListActions.create({ blockId: this.id })

    return BlockListStore.findByBlockId(this.id)
  }

  update(newContent: Object) {
    BlockActions.update({ blockId: this.id, content: newContent })
  }

  component() {
    var blockType = BlockTypeStore.find(this.type)
    return blockType ? blockType.component : null
  }
}

module.exports = Block

var BlockListStore   = require('../stores/block_list_store')
var BlockListActions = require('../actions/block_list_actions')
var BlockActions     = require('../actions/block_actions')
