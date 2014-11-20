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
    this.content = "I'm block " + this.id
  }

  toJson(): {id: number; content: any; childBlockList: ?BlockList} {
    var json = {
      id: this.id,
      content: this.content
    }

    var childBlockList = this.childBlockList()

    if (childBlockList) {
      json.childBlockList = childBlockList.toJson()
    }

    return json
  }

  parentBlockList() {
    return BlockListStore.find(this.parentBlockListId)
  }

  childBlockList() {
    BlockListActions.create({ blockId: this.id })

    return BlockListStore.findByBlockId(this.id)
  }
}

module.exports = Block

var BlockListStore = require('../stores/block_list_store')
var BlockListActions = require('../actions/block_list_actions')
