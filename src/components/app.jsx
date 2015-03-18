/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 *
 * @flow
 */

var Animation   = require('react/lib/ReactCSSTransitionGroup')
var BlockMenu   = require('components/block_menu')
var BlockStore  = require('stores/block_store')
var BlockTypes  = require('stores/block_type_store')
var EditorBlock = require('components/editor_block')
var Fullscreen  = require('./fullscreen')
var React       = require('react')
var fullscreen  = require('vendor/requestFullscreen')

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

  getBlock(block: Block): any {
    return (<EditorBlock key={ block.id } block={ block } />)
  },

  render(): any {
    let { block } = this.props
    let children = BlockStore.childrenFor(block)

    return (
      <div className="colonel" >
        <Fullscreen ref="fullscreen" onClick={ this.goFullscreen }  />

        <Animation component="div" className="col-content" transitionName="col-appear">
          <BlockMenu key="block_menu" block={ block } />
          { children.map(this.getBlock) }
        </Animation>
      </div>
    )
  }

})

module.exports = App
