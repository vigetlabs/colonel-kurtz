/* @flow */
var uid = require('../utils/uid')

class Block {
  content: ?Object;
  id: number;
  parent: Block;
  type: string;

  constructor(params: { content: ?Object; parent: Block; type: string }){
    this.id      = uid()
    this.content = params.content || null
    this.parent  = params.parent
    this.type    = params.type
  }

  valueOf() {
    return this.id
  }

  toJSON(): Object {
    var BlockStore = require('stores/block_store')

    return {
      blocks  : BlockStore.childrenFor(this).map(i => i.toJSON()),
      content : this.content,
      type    : this.type
    }
  }
}

module.exports = Block
