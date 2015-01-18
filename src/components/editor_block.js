/* @flow */

var Block       = require('components/block')
var Dragon      = require('react-dragon')
var Modes       = require('constants/mode_constants')
var MoveBlock   = require('actions/block/move')
var React       = require('react')
var RemoveBlock = require('components/remove_block')

var EditorBlock = React.createClass({

  render(): any {
    var { block } = this.props
    var EditorBlockList = require('./editor_block_list')

    return (
      <Dragon className="col-block" message={ block.id } onDrop={ this._onDrop }>

        <Block block={ block } mode={ Modes.EDIT_MODE } />

        <div className="col-toolbar">
          <RemoveBlock block={ block } />
        </div>

        <EditorBlockList block={ block } />

      </Dragon>
    )
  },

  _onDrop(fromId: number) {
    MoveBlock(fromId, this.props.block.id)
  }

})

module.exports = EditorBlock
