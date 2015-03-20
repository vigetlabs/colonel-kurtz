/* @flow */
var uid = require('../utils/uid')

class Block {
  content: ?Object;
  id: number;
  parent: Block;
  type: string;

  constructor(params: { content: ?Object; parent: Block; type: string }){
    this.id      = uid()
    this.content = params.content
    this.parent  = params.parent
    this.type    = params.type
  }

  valueOf() {
    return this.id
  }
}

module.exports = Block
