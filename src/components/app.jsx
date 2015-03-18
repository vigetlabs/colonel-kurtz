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
var fullscreen  = require('fullscreen')

var App = React.createClass({

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
      onFullscreen: fullscreen,
      types: BlockTypes.keys()
    }
  },

  goFullscreen(): void {
    this.props.onFullscreen(this.getDOMNode())
  },

  render(): any {
    return (
      <div className="colonel" >
        <Fullscreen ref="fullscreen" onClick={ this.goFullscreen }  />
        <Editor block={ this.props.block } />
      </div>
    )
  }

})

module.exports = App
