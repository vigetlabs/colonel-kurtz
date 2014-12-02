/* @flow */

var BlockList = require('../stores/block_list_store')
var Monitor   = require('./monitor')
var React     = require('react')

var ActsLikeBlockList = {

  mixins: [ Monitor ],

  getState(): { blockIds: Array<number> } {
    return {
      blockIds: this.blockIds()
    }
  },

  blockList(): any {
    return BlockList.find(this.blockListId())
  },

  blockListId(): number {
    return this.props.initialBlockListId
  },

  blockIds(): Array<number> {
    var blockList = this.blockList()
    return blockList? blockList.all() : []
  }

}

module.exports = ActsLikeBlockList
