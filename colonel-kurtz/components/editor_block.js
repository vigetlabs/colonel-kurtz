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
      <div className="colonel-block">
        <p className="colonel-block-content" contentEditable>
          { this.state.block.content }
        </p>

        <div className="colonel-toolbar">
          <RemoveBlockButton blockId={ this.state.block.id } blockListId={ this.state.block.parentBlockListId } />
        </div>

        { this.childBlockListComponent() }
      </div>
    )
  }

})

module.exports = EditorBlock
