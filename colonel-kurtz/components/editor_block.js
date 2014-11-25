/* @flow */

var React = require('react')
var RemoveBlockButton = require('./remove_block_button')
var ActLikeBlockWithBlockList = require('../mixins/acts_like_block_with_block_list')
var Medium = require('./block_types/medium')

var EditorBlock = React.createClass({

  mixins: [ ActLikeBlockWithBlockList ],

  listComponent() {
    return require('./editor_block_list')
  },

  render(): any {
    var { content, id, parentBlockListId } = this.state.block

    return(
      <div className="colonel-block">
        <Medium { ...this.state.block } />

        <div className="colonel-toolbar">
          <RemoveBlockButton blockId={ id } blockListId={ parentBlockListId } />
        </div>

        { this.childBlockListComponent() }
      </div>
    )
  }

})

module.exports = EditorBlock
