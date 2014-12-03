/* @flow */

var ActLikeBlockWithBlockList = require('../mixins/acts_like_block_with_block_list')
var Modes = require('constants/mode_constants')
var Block = require('./block')
var React = require('react')
var RemoveBlockButton = require('./remove_block_button')

var EditorBlock = React.createClass({

  mixins: [ ActLikeBlockWithBlockList ],

  listComponent() {
    return require('./editor_block_list')
  },

  render(): any {
    var { id, parentBlockListId } = this.state.block

    return (
      <div className="colonel-block">
        <Block block={ this.state.block } mode={ Modes.EDIT_MODE } />

        <div className="colonel-toolbar">
          <RemoveBlockButton blockId={ id } blockListId={ parentBlockListId } />
        </div>

        { this.childBlockListComponent() }
      </div>
    )
  }

})

module.exports = EditorBlock
