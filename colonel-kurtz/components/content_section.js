/* @flow */

var React     = require('react')
var Constants = require('../constants/app_constants')

var _types    = {}

_types[Constants.EDIT_MODE]         = require('../components/editor'))
_types[Constants.PREVIEW_MODE]      = require('../components/previewer'))
_types[Constants.JSON_CONSOLE_MODE] = require('../components/json_console'))

var ContentSection = React.createClass({

  propTypes: {
    mode: React.PropTypes.oneOf(Object.keys(Constants)).isRequired,
    initialBlockListId: React.PropTypes.number.isRequired
  },

  render(): any {
    var ContentType = _types[this.props.mode]

    return (
      <ContentType initialBlockListId={ this.props.initialBlockListId } />
    )
  }

})

module.exports = ContentSection
