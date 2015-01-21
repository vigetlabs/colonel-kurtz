/* @flow weak */

var BlockMenu   = require('components/block_menu')
var EditorBlock = require('components/editor_block')
var HasBlocks   = require('mixins/hasBlocks')
var React       = require('react/addons')
var Animation   = React.addons.CSSTransitionGroup;

var Editor = React.createClass({

  mixins: [ HasBlocks ],

  getBlock(block: Block): any {
    return <EditorBlock key={ block.id } block={ block } editor={ this.props.editor } />
  },

  render(): any {
    var { block, editor } = this.props

    return (
      <Animation component="div" className="col-content" transitionName="col-block">
        <BlockMenu key="block_menu" block={ block } editor={ editor } />
        { this.state.blocks.map(this.getBlock) }
      </Animation>
    )
  }

})

module.exports = Editor
