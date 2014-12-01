/* @flow */

var uid = require('../utils/uid')

class Block {
  id: number;
  parentBlockListId: number;

  constructor(params: {parentBlockListId: number; type: string}) {
    this.id = uid()
    this.parentBlockListId = params.parentBlockListId
    this.content = null
    this.type = params.type || 'text'
  }
}

module.exports = Block
