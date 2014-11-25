/* @flow */

var React = require('react')
var EditorBlock = require('./editor_block')
var AddBlockButton = require('./add_block_button')
var ActsLikeBlockList = require('../mixins/acts_like_block_list')

var EditorBlockList = React.createClass({

  mixins: [ActsLikeBlockList],

  blockComponents(): ?Array<ReactElement> {
    var blockList = this.blockList()
    var blockListId = this.blockListId()

    if (blockList) {
      return blockList.blockIds().map(function(blockId, i) {
        return (
          <div>
            <EditorBlock key={ blockId } initialBlockId={ blockId } />
            <div className="colonel-dropzone">
              <AddBlockButton position={ i } blockListId={ blockListId } />
            </div>
          </div>
        )
      })
    }
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
