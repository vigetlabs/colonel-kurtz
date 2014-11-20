/* @flow */

var React = require('react')
var RemoveBlockButton = require('./remove_block_button')
var ActLikeBlockWithBlockList = require('../mixins/acts_like_block_with_block_list')

var EditorBlock = React.createClass({

  mixins: [ActLikeBlockWithBlockList],

  listComponent() {
    return require('./editor_block_list')
  },

  render(): any {
    return(
      <div className="block">
        <RemoveBlockButton blockId={ this.state.block.id } blockListId={ this.state.block.parentBlockListId } />
        <p>{ this.state.block.content }</p>
        { this.childBlockListComponent() }
      </div>
    )
  }

})

module.exports = EditorBlock


