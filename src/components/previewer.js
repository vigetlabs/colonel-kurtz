/* @flow */

var BlockStore     = require('stores/block_store')
var HasBlocks      = require('mixins/hasBlocks')
var PreviewerBlock = require('./previewer_block')
var React          = require('react')

var Previewer = React.createClass({

  mixins: [ HasBlocks ],

  getBlock(block: Block): any {
    return <PreviewerBlock key={ block.id } block={ block } editor={ this.props.editor } />
  },

  render(): any {
    return (
      <div className="col-blocks">
        { this.state.blocks.map(this.getBlock) }
      </div>
    )
  }

})

module.exports = Previewer
