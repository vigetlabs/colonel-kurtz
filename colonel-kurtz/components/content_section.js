/* @flow */

var React = require('react')
var Modes = require('../constants/mode_constants')

var _types = {}

_types[Modes.EDIT_MODE]    = require('../components/editor')
_types[Modes.PREVIEW_MODE] = require('../components/previewer')

var ContentSection = React.createClass({

  propTypes: {
    editor             : React.PropTypes.any.isRequired,
    initialBlockListId : React.PropTypes.number.isRequired
  },

  render(): any {
    var editor      = this.props.editor
    var ContentType = _types[editor.mode]

    return (
      <div className="col-content">
        <ContentType editor={ editor } initialBlockListId={ this.props.initialBlockListId } />
      </div>
    )
  }

})

module.exports = ContentSection
