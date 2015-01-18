/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 *
 * @flow
 */

var ContentSection = require('./content_section')
var Modes          = require('constants/mode_constants')
var ModeSelection  = require('./mode_selection')
var React          = require('react')
var fullscreen     = require('utils/fullscreen')

var App = React.createClass({

  fullscreen() {
    fullscreen(this.getDOMNode())
  },

  getInitialState() {
    return {
      mode: Modes.EDIT_MODE
    }
  },

  render(): any {
    var { block, preview } = this.props
    var { mode } = this.state

    return (
      <div className="colonel" >
        <ModeSelection preview={ preview } mode={ mode } onChange={ this._onModeChange }/>

        <ContentSection mode={ mode } block={ block } />

        <button type="button" aria-label="Toggle fullscreen mode" className="col-fullscreen" onClick={ this._onFullscreenClick }>
          Fullscreen
        </button>
      </div>
    )
  },

  _onModeChange(mode) {
    this.setState({ mode })
  },

  _onFullscreenClick(e: Event) {
    e.preventDefault()
    this.fullscreen()
  }

})

module.exports = App
