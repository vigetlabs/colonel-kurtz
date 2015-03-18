/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 *
 * @flow
 */

var Editor      = require('./editor')
var EditorStore = require('stores/editor_store')
var Fullscreen  = require('./fullscreen')
var React       = require('react')
var Stateful    = require('diode/stateful')
var fullscreen  = require('fullscreen')

var App = React.createClass({

  mixins: [ Stateful ],

  propTypes: {
    editorId: React.PropTypes.string.isRequired
  },

  getState(): Object {
    return {
      editor: EditorStore.find(this.props.editorId)
    }
  },

  goFullscreen(): void {
    fullscreen(this.getDOMNode())
  },

  render(): any {
    var { editor } = this.state

    return (
      <div className="colonel" >
        <Editor editor={ editor } block={ editor.block } />
        <Fullscreen ref="fullscreen" onClick={ this.goFullscreen }  />
      </div>
    )
  }

})

module.exports = App
