/* @flow */

var BlockMenu    = require('./block_menu')
var EditorBlock  = require('./editor_block')
var React        = require('react/addons')

var EditorBlockListItem = React.createClass({

  render() {
    var { block, blockId, parentBlockListId, position } = this.props;

    return (
      <div>
        <EditorBlock initialBlockId={ blockId } />
        <BlockMenu block={ block } parentBlockListId={ parentBlockListId } position={ position } />
      </div>
    )
  }

})

module.exports = EditorBlockListItem
