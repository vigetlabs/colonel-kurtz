/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 *
 * @flow
 */

var Editor      = require('../components/editor')
var EditorStore = require('stores/editor_store')
var React       = require('react')
var Stateful    = require('diode/stateful')
var Strings     = require('constants/strings')
var fullscreen  = require('utils/fullscreen')

var App = React.createClass({

  mixins: [ Stateful ],

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
        <Editor editor={ editor } block={ editor.block } />
        <button type="button" aria-label={ Strings.fullscreen } className="col-fullscreen" onClick={ this._onFullscreenClick }>Fullscreen</button>
      </div>
    )
  },

  _onFullscreenClick(e: Event) {
    e.preventDefault()
    this.fullscreen()
  }

})

module.exports = App
