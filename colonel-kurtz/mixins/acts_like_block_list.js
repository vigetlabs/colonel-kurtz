/* @flow */

var React = require('react')
var BlockListStore = require('../stores/block_list_store')
var Monitor = require('./monitor')

var ActsLikeBlockList = {

  mixins: [ Monitor ],

  getState(): {blockIds: Array<number>} {
    return {
      blockIds: this.blockIds()
    }
  },

  blockList() {
    return BlockListStore.find(this.blockListId())
  },

  blockListId(): number {
    return this.props.initialBlockListId
  },

  blockIds(): Array<number> {
    var blockIds  = []
    var blockList = this.blockList()

    if (blockList) {
      blockIds = blockList.blockIds()
    }

    return blockIds
  }

}

module.exports = ActsLikeBlockList
