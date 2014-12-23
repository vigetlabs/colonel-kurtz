/* @flow */

var React           = require('react')
var EditorBlockList = require('./editor_block_list')

var Editor = React.createClass({

  render(): any {
    var { editor, initialBlockListId } = this.props

    return (
      <EditorBlockList editor={ editor } initialBlockListId={ initialBlockListId } />
    )
  }

})

module.exports = Editor
