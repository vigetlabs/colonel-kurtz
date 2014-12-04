/* @flow */

var React = require('react')
var Modes = require('../constants/mode_constants')

var _types = {}

_types[Modes.EDIT_MODE]    = require('../components/editor')
_types[Modes.PREVIEW_MODE] = require('../components/previewer')

var ContentSection = React.createClass({

  propTypes: {
    mode: React.PropTypes.oneOf(Object.keys(_types)).isRequired,
    initialBlockListId: React.PropTypes.number.isRequired
  },

  render(): any {
    var ContentType = _types[this.props.mode]

    return (
      <div className="colonel-content">
        <ContentType initialBlockListId={ this.props.initialBlockListId } />
      </div>
    )
  }

})

module.exports = ContentSection
