/* @flow */

var HasBlockList   = require('../mixins/has_block_list')
var PreviewerBlock = require('./previewer_block')
var React          = require('react')

var PreviewerBlockList = React.createClass({

  mixins: [ HasBlockList ],

  blockComponents(): Array<ReactElement> {
    return this.state.blockIds.map(function(blockId) {
      return <PreviewerBlock key={ blockId } initialBlockId={ blockId } />
    })
  },

  render(): any {
    return (
      <div className="col-blocks">
        { this.blockComponents() }
      </div>
    )
  }

})

module.exports = PreviewerBlockList
