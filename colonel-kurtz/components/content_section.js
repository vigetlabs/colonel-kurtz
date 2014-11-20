/* @flow */

var React = require('react')
var Immutable = require('immutable')
var EditorComponent = require('./editor')
var PreviewerComponent = require('./previewer')
var JsonConsoleComponent = require('./json_console')
var AppConstants = require('../constants/app_constants')

var ContentSection = React.createClass({

  contentType(): React {
    var contentTypes: Immutable.Map = Immutable.Map({}).
      set(AppConstants.EDIT_MODE, EditorComponent).
      set(AppConstants.PREVIEW_MODE, PreviewerComponent).
      set(AppConstants.JSON_CONSOLE_MODE, JsonConsoleComponent)

    return contentTypes.get(this.props.mode)
  },

  render(): any {
    var ContentType = this.contentType()

    return(
     <ContentType initialBlockListId={ this.props.initialBlockListId } />
    )
  }

})

module.exports = ContentSection
