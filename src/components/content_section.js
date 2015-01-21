/* @flow */

var React = require('react')
var Modes = require('../constants/mode_constants')

var _types = {
  [Modes.EDIT_MODE]    : require('../components/editor'),
  [Modes.PREVIEW_MODE] : require('../components/previewer')
}

var ContentSection = React.createClass({

  render(): any {
    var editor = this.props.editor;
    var block  = editor.block;

    return React.createElement(_types[editor.mode], { block, editor })
  }

})

module.exports = ContentSection
