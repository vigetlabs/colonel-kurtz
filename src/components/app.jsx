/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 *
 * @flow
 */

var BlockTypes  = require('stores/block_type_store')
var Editor      = require('./editor')
var Fullscreen  = require('./fullscreen')
var React       = require('react')
var Stateful    = require('diode/stateful')
var fullscreen  = require('fullscreen')

var App = React.createClass({

  mixins: [ Stateful ],

  childContextTypes: {
    types: React.PropTypes.array.isRequired
  },

  propTypes: {
    block: React.PropTypes.object.isRequired
  },

  getChildContext() {
    return {
      types: this.props.types
    }
  },

  getDefaultProps() {
    return {
      types: BlockTypes.keys()
    }
  },

  getState() {
    return {}
  },

  goFullscreen(): void {
    fullscreen(this.getDOMNode())
  },

  render(): any {
    return (
      <div className="colonel" >
        <Editor block={ this.props.block } />
        <Fullscreen ref="fullscreen" onClick={ this.goFullscreen }  />
      </div>
    )
  }

})

module.exports = App
