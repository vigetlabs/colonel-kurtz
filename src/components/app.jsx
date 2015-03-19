/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
  */

let BlockMenu   = require('components/block_menu')
let BlockTypes  = require('stores/block_type_store')
let EditorBlock = require('components/editor_block')
let Fullscreen  = require('./fullscreen')
let React       = require('react')
let fullscreen  = require('vendor/requestFullscreen')

let App = React.createClass({

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
    let { block } = this.props

    return (
      <div className="colonel">
        <Fullscreen ref="fullscreen" onClick={ this.goFullscreen }  />
        <BlockMenu block={ block } />
        <EditorBlock block={ block } />
      </div>
    )
  }

})

module.exports = App
