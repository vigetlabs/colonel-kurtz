/* @flow */

var AppConstants = require('constants/app_constants')
var ActLikeBlockWithBlockList = require('../mixins/acts_like_block_with_block_list')
var Block = require('./block')
var React = require('react')

var PreviewerBlock = React.createClass({

  mixins: [ ActLikeBlockWithBlockList ],

  listComponent() {
    return require('./previewer_block_list')
  },

  render(): any {
    return (
      <div>
        <Block block={ this.state.block } mode={ AppConstants.PREVIEW_MODE } />
        { this.childBlockListComponent() }
      </div>
    )
  }

})

module.exports = PreviewerBlock
