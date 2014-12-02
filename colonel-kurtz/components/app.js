/* @flow */

var Modes          = require('../constants/mode_constants')
var ContentSection = require('./content_section')
var ModeSelection  = require('./mode_selection')
var React          = require('react')

var App = React.createClass({

  getInitialState() {
    return {
      mode: Modes.EDIT_MODE
    }
  },

  getBlockListId(): number {
    return this.props.editor.rootBlockList().id
  },

  setMode(mode: string): Function {
    return () => this.setState({ mode: mode })
  },

  render(): any {
    return (
      <div className="colonel">
        <ModeSelection mode={ this.state.mode } setMode={ this.setMode } />
        <ContentSection mode={ this.state.mode } initialBlockListId={ this.getBlockListId() } />
      </div>
    )
  }

})

module.exports = App
