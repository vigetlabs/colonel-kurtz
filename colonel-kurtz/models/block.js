/* @flow */

var uid = require('../utils/uid')
var BlockList = require('./block_list')

class Block {
  id: number;
  parentBlockListId: number;
  content: string;

  constructor(params: {parentBlockListId: number}) {
    this.id = uid()
    this.parentBlockListId = params.parentBlockListId
    this.content = ""
  }

  toJSON(): {id: number; content: any; childBlockList: ?BlockList} {
    var json = { id, content }

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
}

module.exports = Block

var BlockListStore = require('../stores/block_list_store')
var BlockListActions = require('../actions/block_list_actions')
