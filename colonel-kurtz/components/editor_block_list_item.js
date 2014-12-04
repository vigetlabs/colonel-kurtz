/* @flow */

var HasBlockList = require('../mixins/has_block_list')
var BlockMenu    = require('./block_menu')
var EditorBlock  = require('./editor_block')
var React        = require('react')

var EditorBlockList = React.createClass({

  mixins: [ HasBlockList ],

  blockComponents(): ?Array<ReactElement> {
    var blockListId = this.blockListId()

    return this.state.blockIds.map(function(blockId, i) {
      return (
        <div key={ blockId }>
          <EditorBlock initialBlockId={ blockId } />
          <BlockMenu block={ this.props.block } blockListId={ this.blockListId() } position={ i + 1 } />
        </div>
      )
    }, this)
  },

  render(): any {

    return (
      <div className="col-blocks">
        <BlockMenu block={ this.props.block } blockListId={ this.blockListId() } />
        { this.blockComponents() }
      </div>
    )
  }

})

module.exports = EditorBlockList
