/* @flow */

var React = require('react')
var BlockStore = require('../stores/block_store')

var ActsLikeBlockWithBlockList = {

  getInitialState(): Object {
    return {
      block: BlockStore.find(this.props.initialBlockId)
    }
  },

  childBlockListComponent(): ReactElement {
    var childBlockList = this.state.block.childBlockList()

    if (childBlockList) {
      var ListComponent = this.listComponent()

      return <ListComponent initialBlockListId={ childBlockList.id } />
    }
  }

}

module.exports = ActsLikeBlockWithBlockList


