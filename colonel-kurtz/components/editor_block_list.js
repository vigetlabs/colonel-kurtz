/* @flow */

var BlockMenu    = require('./block_menu')
var EditorBlock  = require('./editor_block')
var HasBlockList = require('../mixins/has_block_list')
var React        = require('react/addons')
var Animation    = React.addons.CSSTransitionGroup;

var EditorBlockList = React.createClass({

  mixins: [ HasBlockList ],

  getBlockMenu(position) {
    var { block, editor } = this.props

    return (
      <BlockMenu key="block_menu" block={ block } editor={ editor } parentBlockListId={ this.blockListId() } position={ position } />
    )
  },

  getBlock(blockId, i) {
    return (
      <div key={ blockId }>
        <EditorBlock initialBlockId={ blockId } editor={ this.props.editor } />
        { this.getBlockMenu(i + 1) }
      </div>
    )
  },

  render(): any {
    var blockIds = this.state.blockIds

    return (
      <Animation component="div" className="col-blocks" transitionName="col-block">
        { this.getBlockMenu(0) }
        { blockIds.map(this.getBlock) }
      </Animation>
    )
  }

})

module.exports = EditorBlockList
