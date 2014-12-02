/* @flow */
var uid       = require('../utils/uid')
var BlockList = require('../stores/block_list_store')

class Block {
  content: ?string;
  id: number;
  parentBlockListId: number;
  type: string;

  constructor(params: { parentBlockListId: number; type: string }){
    this.id = uid()
    this.parentBlockListId = params.parentBlockListId
    this.content = null
    this.type = params.type || 'text'
  }

  toJSON(): Object {
    // Note: This is to get around circular dependency issues
    var BlockList = require('../stores/block_list_store')
    var blockList = BlockList.findByBlockId(this.id)

    return {
      childBlockList : blockList ? blockList.toJSON() : [],
      content        : this.content,
      id             : this.id,
      type           : this.type
    }
  }
}

module.exports = Block
