/* @flow */

var React = require('react')
var EditorBlock = require('./editor_block')
var AddBlockButton = require('./add_block_button')
var ActsLikeBlockList = require('../mixins/acts_like_block_list')

var EditorBlockList = React.createClass({

  mixins: [ ActsLikeBlockList ],

  blockComponents(): ?Array<ReactElement> {
    var blockListId = this.blockListId()

    return this.state.blockIds.map(function(blockId, i) {
      return (
        <div key={ blockId }>
          <EditorBlock initialBlockId={ blockId } />
          <div className="colonel-dropzone">
            <AddBlockButton position={ i + 1 } blockListId={ blockListId } />
          </div>
        </div>
      )
    })
  },

  render(): any {
    return(
      <div className="colonel-blocks">
        <div className="colonel-dropzone">
          <AddBlockButton position={ 0 } blockListId={ this.blockListId() } />
        </div>
        { this.blockComponents() }
      </div>
    )
  }

})

module.exports = EditorBlockList
