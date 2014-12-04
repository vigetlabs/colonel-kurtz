/* @flow */

var HasBlockNesting = require('../mixins/has_block_nesting')
var Modes           = require('../constants/mode_constants')
var Block           = require('./block')
var React           = require('react')
var RemoveBlock     = require('./remove_block')

var EditorBlock = React.createClass({

  mixins: [ HasBlockNesting ],

  listComponent() {
    return require('./editor_block_list')
  },

  render(): any {
    var { id, parentBlockListId } = this.state.block

    return (
      <div className="colonel-block">
        <Block block={ this.state.block } mode={ Modes.EDIT_MODE } />

        <div className="colonel-toolbar">
          <RemoveBlock blockId={ id } blockListId={ parentBlockListId } />
        </div>

        { this.childBlockListComponent() }
      </div>
    )
  }

})

module.exports = EditorBlock
