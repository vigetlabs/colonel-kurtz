/* @flow */

var React = require('react')
var EditorBlockList = require('./editor_block_list')

var Editor = React.createClass({

  render(): any {
    return <EditorBlockList { ...this.props } />
  }

})

module.exports = Editor
