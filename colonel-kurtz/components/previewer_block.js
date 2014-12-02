/* @flow */

var ActLikeBlockWithBlockList = require('../mixins/acts_like_block_with_block_list')
var Block = require('./block')
var Modes = require('constants/mode_constants')
var React = require('react')

var PreviewerBlock = React.createClass({

  mixins: [ ActLikeBlockWithBlockList ],

  listComponent(): ReactElement {
    return require('./previewer_block_list')
  },

  render(): any {
    return (
      <div>
        <Block block={ this.state.block } mode={ Modes.PREVIEW_MODE } />
        { this.childBlockListComponent() }
      </div>
    )
  }

})

module.exports = PreviewerBlock
