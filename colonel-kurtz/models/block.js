/* @flow */
var uid       = require('../utils/uid')
var BlockList = require('../stores/block_list_store')

class Block {
  id: number;
  parentBlockListId: number;

  constructor(params: { parentBlockListId: number; type: string }) {
    this.id = uid()
    this.parentBlockListId = params.parentBlockListId
    this.content = null
    this.type = params.type || 'text'
  }

  toJSON() {
    // Note: This is to get around circular dependency issues
    var BlockList = require('../stores/block_list_store')

    return {
      childBlockList : BlockList.findByBlockId(this.id).toJSON(),
      content        : this.content,
      id             : this.id,
      type           : this.type
    }
  }
}

module.exports = Block
