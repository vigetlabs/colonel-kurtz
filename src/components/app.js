/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 *
 * @flow
 */

var ContentSection = require('./content_section')
var EditorStore    = require('stores/editor_store')
var Modes          = require('constants/mode_constants')
var ModeSelection  = require('./mode_selection')
var Monitor        = require('mixins/monitor')
var React          = require('react')
var Strings        = require('constants/strings')
var fullscreen     = require('utils/fullscreen')

var App = React.createClass({

  mixins: [ Monitor ],

  getState(): Object {
    return {
      editor: EditorStore.find(this.props.editorId)
    }
  },

  fullscreen(): void {
    fullscreen(this.getDOMNode())
  },

  render(): any {
    var { editor } = this.state

    return (
      <div className="colonel" >
        <ModeSelection editor={ editor } />
        <ContentSection editor={ editor } />
        <button type="button" aria-label={ Strings.fullscreen } className="col-fullscreen" onClick={ this._onFullscreenClick }>Fullscreen</button>
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
