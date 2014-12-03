/* @flow */

var ActsLikeBlockList = require('../mixins/acts_like_block_list')
var PreviewerBlock    = require('./previewer_block')
var React             = require('react')

var PreviewerBlockList = React.createClass({

  mixins: [ ActsLikeBlockList ],

  blockComponents(): Array<ReactElement> {
    return this.state.blockIds.map(function(blockId) {
      return <PreviewerBlock key={ blockId } initialBlockId={ blockId } />
    })
  },

  render(): any {
    return (
      <div className="colonel-blocks">
        { this.blockComponents() }
      </div>
    )
  }

})

module.exports = PreviewerBlockList
