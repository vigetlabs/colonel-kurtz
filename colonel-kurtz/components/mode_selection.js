/* @flow */

var React = require('react')
var AppConstants = require('../constants/app_constants')

var ModeSelection = React.createClass({

  render(): any {
    return(
      <div>
        <button onClick={ this.props.setMode(AppConstants.EDIT_MODE) } disabled={ this.props.mode === AppConstants.EDIT_MODE }>Edit</button>
        <button onClick={ this.props.setMode(AppConstants.PREVIEW_MODE) } disabled={ this.props.mode === AppConstants.PREVIEW_MODE }>Preview</button>
        <button onClick={ this.props.setMode(AppConstants.JSON_CONSOLE_MODE)} disabled={ this.props.mode === AppConstants.JSON_CONSOLE_MODE }>JSON</button>
      </div>
    )
  }

})

module.exports = ModeSelection
