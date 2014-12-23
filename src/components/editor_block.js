/* @flow */

var Block            = require('./block')
var Dragon           = require('react-dragon')
var HasBlockNesting  = require('../mixins/has_block_nesting')
var Modes            = require('../constants/mode_constants')
var MoveBlock        = require('../actions/block_list/move')
var React            = require('react')
var RemoveBlock      = require('./remove_block')

var EditorBlock = React.createClass({

  mixins: [ HasBlockNesting ],

  listComponent() {
    return require('./editor_block_list')
  },

  render(): any {
    var { id, parentBlockListId } = this.state.block

    return (
      <Dragon className="col-block" message={ id } onDrop={ this._onDrop }>

        <Block block={ this.state.block } mode={ Modes.EDIT_MODE } />

        <div className="col-toolbar">
          <RemoveBlock blockId={ id } parentBlockListId={ parentBlockListId } />
        </div>

        { this.childBlockListComponent() }

      </Dragon>
    )
  },

  _onDrop(fromId, toId) {
    MoveBlock(this.state.block.parentBlockListId, fromId, toId)
  }

})

module.exports = EditorBlock
