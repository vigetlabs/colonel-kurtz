/* @flow weak */
var Animation   = require('react/lib/ReactCSSTransitionGroup')
var BlockMenu   = require('components/block_menu')
var EditorBlock = require('components/editor_block')
var HasBlocks   = require('mixins/hasBlocks')
var React       = require('react')

var Editor = React.createClass({

  mixins: [ HasBlocks ],

  getBlock(block: Block): any {
    return <EditorBlock key={ block.id } block={ block } />
  },

  render(): any {
    return (
      <Animation component="div" className="col-content" transitionName="col-appear">
        <BlockMenu key="block_menu" block={ this.props.block } />
        { this.state.blocks.map(this.getBlock) }
      </Animation>
    )
  }

})

module.exports = Editor
