/* @flow */

var Modes          = require('../constants/mode_constants')
var ContentSection = require('./content_section')
var ModeSelection  = require('./mode_selection')
var React          = require('react')
var Types          = React.PropTypes

var App = React.createClass({

  propTypes: {
    root: Types.number.isRequired
  },

  getInitialState() {
    return {
      mode: Modes.EDIT_MODE
    }
  },

  setMode(mode: string): Function {
    return () => this.setState({ mode })
  },

  render(): any {
    return (
      <div className="colonel">
        <ModeSelection mode={ this.state.mode } setMode={ this.setMode } />
        <ContentSection mode={ this.state.mode } initialBlockListId={ this.props.root } />
      </div>
    )
  }

})

module.exports = App
