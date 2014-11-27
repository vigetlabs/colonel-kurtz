/* @flow */

var React = require('react')
var ActLikeBlockWithBlockList = require('../mixins/acts_like_block_with_block_list')
var AppConstants = require('constants/app_constants')

var PreviewerBlock = React.createClass({

  mixins: [ ActLikeBlockWithBlockList ],

  listComponent() {
    return require('./previewer_block_list')
  },

  render(): any {
    var BlockType = this.state.block.component()

    return(
      <div>
        <BlockType mode={ AppConstants.PREVIEW_MODE } initialContent={ this.state.block.content } />
        { this.childBlockListComponent() }
      </div>
    )
  }

})

module.exports = PreviewerBlock
