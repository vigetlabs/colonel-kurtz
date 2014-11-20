/* @flow */

var React = require('react')
var EditorBlockList = require('./editor_block_list')

var Editor = React.createClass({

  render(): any {
    return(
      <div>
        <EditorBlockList initialBlockListId={ this.props.initialBlockListId } />
      </div>
    )
  }

})

module.exports = Editor
