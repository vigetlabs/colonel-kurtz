/* @flow */

var React = require('react')
var EditorComponent = require('./editor')
var PreviewerComponent = require('./previewer')
var JsonConsoleComponent = require('./json_console')
var AppConstants = require('../constants/app_constants')

var ContentSection = React.createClass({
  contentTypes(): Object {
    var types = {}
    types[AppConstants.EDIT_MODE] = EditorComponent,
    types[AppConstants.PREVIEW_MODE] = PreviewerComponent,
    types[AppConstants.JSON_CONSOLE_MODE] = JsonConsoleComponent

    return types
  },

  contentType(): React {
    return this.contentTypes()[this.props.mode]
  },

  render(): any {
    var ContentType = this.contentType()

    return(
     <ContentType initialBlockListId={ this.props.initialBlockListId } />
    )
  }

})

module.exports = ContentSection
