/* @flow */

var React = require('react')
var ActLikeBlockWithBlockList = require('../mixins/acts_like_block_with_block_list')

var PreviewerBlock = React.createClass({

  mixins: [ActLikeBlockWithBlockList],

  listComponent() {
    return require('./previewer_block_list')
  },

  render(): any {
    return(
      <div>
        <p>{ this.state.block.content }</p>
        { this.childBlockListComponent() }
      </div>
    )
  }

})

module.exports = PreviewerBlock
