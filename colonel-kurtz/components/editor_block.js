/* @flow */

var Block            = require('./block')
var BlockListActions = require('../actions/block_list_actions')
var Draggable        = require('./draggable')
var HasBlockNesting  = require('../mixins/has_block_nesting')
var Modes            = require('../constants/mode_constants')
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
      <Draggable className="col-block" message={ id } onDrop={ this._onDrop }>

        <Block block={ this.state.block } mode={ Modes.EDIT_MODE } />

        <div className="col-toolbar">
          <RemoveBlock blockId={ id } parentBlockListId={ parentBlockListId } />
        </div>

        { this.childBlockListComponent() }

      </Draggable>
    )
  },

  _onDrop(fromId) {
    var { id: toId, parentBlockListId:blockListId } = this.state.block
    BlockListActions.move(blockListId, fromId, toId)
  }

})

module.exports = EditorBlock
