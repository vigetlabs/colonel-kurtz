/* @flow */

var BlockList = require('../stores/block_list_store')
var uid       = require('../utils/uid')

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

    var childBlockList = BlockList.findByBlockId(this.id)

    if (childBlockList) {
      json.childBlockList = childBlockList.toJSON()
    }

    return json
  }
}

module.exports = Block
