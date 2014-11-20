/* @flow */

var React = require('react')
var EditorBlock = require('./editor_block')
var AddBlockButton = require('./add_block_button')
var ActsLikeBlockList = require('../mixins/acts_like_block_list')

var EditorBlockList = React.createClass({

  mixins: [ActsLikeBlockList],

  blockComponents(): ?Array<ReactElement> {
    var counter = 1
    var blockList = this.blockList()
    var blockListId = this.blockListId()

    if (blockList) {
      return blockList.blockIds().map(function(blockId) {
        var components = <div>
          <EditorBlock key={ blockId } initialBlockId={ blockId } />
          <AddBlockButton position={ counter } blockListId={ blockListId } />
        </div>

        counter += 1
        return components
      })
    }
  },

  render(): any {
    return(
      <div className="blocks">
        <AddBlockButton position={ 0 } blockListId={ this.blockListId() } />
        { this.blockComponents() }
      </div>
    )
  }

})

module.exports = EditorBlockList
