/* @flow */

var React     = require('react')
var Block     = require('../stores/block_store')
var BlockList = require('../stores/block_list_store')

var HasBlockNesting = {

  propTypes: {
    editor: React.PropTypes.any.isRequired
  },

  getInitialState(): Object {
    var id = this.props.initialBlockId;

    return {
      block     : Block.find(id),
      blockList : BlockList.findByBlockId(id)
    }
  },

  childBlockListComponent(): ReactElement {
    var { block, blockList } = this.state;
    var { editor }           = this.props;
    var ListComponent        = this.listComponent()

    if (blockList) {
      return <ListComponent block={ block } editor={ editor } initialBlockListId={ blockList.id } />
    }
  }

}

module.exports = HasBlockNesting
