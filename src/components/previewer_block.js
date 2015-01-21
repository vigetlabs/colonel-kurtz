/* @flow */

var Block     = require('./block')
var HasBlocks = require('mixins/hasBlocks')
var React     = require('react')

var PreviewerBlock = React.createClass({

  mixins: [ HasBlocks],

  getBlock(block): any {
    return <PreviewerBlock key={ block.id } block={ block } editor={ this.props.editor } />
  },

  render(): any {
    var { block, editor } = this.props

    return (
      <div>
        <Block block={ block } mode={ editor.mode } />
        { this.state.blocks.map(this.getBlock) }
      </div>
    )
  }

})

module.exports = PreviewerBlock
