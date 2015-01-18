/* @flow */

var BlockStore     = require('stores/block_store')
var Monitor        = require('mixins/monitor')
var PreviewerBlock = require('./previewer_block')
var React          = require('react')

var PreviewerBlockList = React.createClass({

  mixins: [ Monitor ],

  getState() {
    return {
      blocks: BlockStore.childrenFor(this.props.block)
    }
  },

  blockComponent(block): any {
    return <PreviewerBlock key={ block.id } block={ block } />
  },

  render(): any {
    var blocks = Block.childrenFor(this.props.block)

    return (
      <div className="col-blocks">
        { blocks.map(this.blockComponent) }
      </div>
    )
  }

})

module.exports = PreviewerBlockList
