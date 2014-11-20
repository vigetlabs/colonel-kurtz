/* @flow */

var React = require('react')
var BlockListStore = require('../stores/block_list_store')

var ActsLikeBlockList = {

  getInitialState(): Object {
    return this.getState()
  },

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
    var blockIds = []
    var blockList = this.blockList()

    if(blockList) {
      blockIds = blockList.blockIds()
    }

    return blockIds
  },

  updateState() {
    this.setState(this.getState())
  },

  componentWillMount() {
    // This is niave to update on every change. TODO: scope to changes to this list
    BlockListStore.onChange(this.updateState)
  },

  componentWillUnmount() {
    // This is niave to update on every change. TODO: scope to changes to this list
    BlockListStore.offChange(this.updateState)
  }

}

module.exports = ActsLikeBlockList


