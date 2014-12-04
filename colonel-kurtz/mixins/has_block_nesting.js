/* @flow */

var React     = require('react')
var Block     = require('../stores/block_store')
var BlockList = require('../stores/block_list_store')

var HasBlockNesting = {

  getInitialState(): Object {
    var id = this.props.initialBlockId;

    return {
      block     : Block.find(id),
      blockList : BlockList.findByBlockId(id)
    }
  },

  childBlockListComponent(): ReactElement {
    var ListComponent = this.listComponent()

    if (this.state.blockList) {
      return <ListComponent block={ this.state.block } initialBlockListId={ this.state.blockList.id } />
    }
  }

}

module.exports = HasBlockNesting
