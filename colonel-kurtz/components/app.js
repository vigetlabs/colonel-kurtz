/* @flow */

var React = require('react')
var AppConstants = require('../constants/app_constants')
var ModeSelection = require('./mode_selection')
var ContentSection = require('./content_section')

var App = React.createClass({

  getInitialState() {
    return {
      mode: AppConstants.EDIT_MODE
    }
  },

  getBlockListId(): number {
    return this.props.editor.rootBlockList().id
  },

  setModeTo(mode: string): Function {
    var component = this

    return function() {
      component.setState({ mode: mode })
    }
  },

  render(): any {
    return(
      <div>
        <ModeSelection mode={ this.state.mode } modeSetter={ this.setModeTo } />
        <ContentSection mode={ this.state.mode } initialBlockListId={ this.getBlockListId() } />
      </div>
    )
  }

})

module.exports = App
