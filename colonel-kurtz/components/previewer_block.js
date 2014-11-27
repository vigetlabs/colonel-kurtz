/* @flow */

var React = require('react')
var ActLikeBlockWithBlockList = require('../mixins/acts_like_block_with_block_list')
var AppConstants = require('constants/app_constants')
var Medium = require('./block_types/medium')

var PreviewerBlock = React.createClass({

  mixins: [ ActLikeBlockWithBlockList ],

  listComponent() {
    return require('./previewer_block_list')
  },

  render(): any {
    return(
      <div>
        <Medium mode={ AppConstants.PREVIEW_MODE } initialContent={ this.state.block.content } />
        { this.childBlockListComponent() }
      </div>
    )
  }

})

module.exports = PreviewerBlock
