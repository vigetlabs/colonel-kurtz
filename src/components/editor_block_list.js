/* @flow weak */

var BlockMenu    = require('components/block_menu')
var BlockStore   = require('stores/block_store')
var EditorBlock  = require('components/editor_block')
var Monitor      = require('mixins/monitor')
var React        = require('react/addons')

var Animation    = React.addons.CSSTransitionGroup;

var EditorBlockList = React.createClass({

  mixins: [ Monitor ],

  getState() {
    return {
      blocks: BlockStore.childrenFor(this.props.block)
    }
  },

  getBlockMenu(position: number): any {
    var { block } = this.props

    return (
      <BlockMenu key="block_menu" block={ block } position={ position } />
    )
  },

  getBlock(block: number, index: number): any {
    return (
      <div key={ block.id }>
        <EditorBlock block={ block } />
        { this.getBlockMenu(index + 1) }
      </div>
    )
  },

  render(): any {
    return (
      <Animation component="div" className="col-blocks" transitionName="col-block">
        { this.getBlockMenu(0) }
        { this.state.blocks.map(this.getBlock) }
      </Animation>
    )
  }

})

module.exports = EditorBlockList
