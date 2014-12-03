/* @flow */

var Modes  = require('../constants/mode_constants')
var React  = require('react')
var Types  = React.PropTypes

var _types = {}

_types[Modes.EDIT_MODE]    = require('../components/editor')
_types[Modes.PREVIEW_MODE] = require('../components/previewer')

var ContentSection = React.createClass({

  propTypes: {
    editor             : Types.any.isRequired,
    initialBlockListId : Types.number.isRequired
  },

  render(): any {
    var ContentType = _types[this.props.editor.mode]

    return (
      <div className="colonel-content">
        <ContentType { ...this.props } />
      </div>
    )
  }

})

module.exports = ContentSection
