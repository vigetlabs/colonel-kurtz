/* @flow */
var uid = require('../utils/uid')

class BlockList {
  blockId: number;
  editorId: number;
  id: number;
  _blocks: Array<number>;

  constructor(params: { editorId: number; blockId: number }) {
    this.editorId = params.editorId
    this.blockId = params.blockId
    this.id      = uid()
    this._blocks = []
  }

  all() : Array {
    return this._blocks
  }

  removeBlock(blockId:number) : void {
    this._blocks = this._blocks.filter(id => id !== blockId)
  }

  insertBlock(block:Block, position:number) : void {
    this._blocks.splice(position, 0, block.id)
  }

  toJSON() : Object {
    // Note: This is to get around circular dependency issues
    var Block = require('../stores/block_store')

    return {
      id: this.id,
      blocks: this.all().map(id => Block.find(id).toJSON())
    }
  }

}

module.exports = BlockList
