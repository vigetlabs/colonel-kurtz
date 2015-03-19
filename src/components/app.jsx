/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import BlockMenu   from 'components/block_menu'
import EditorBlock from 'components/editor_block'
import Fullscreen  from './fullscreen'
import React       from 'react'
import fullscreen  from 'vendor/requestFullscreen'

let App = React.createClass({

  childContextTypes: {
    actions : React.PropTypes.object.isRequired,
    allowed : React.PropTypes.array.isRequired,
    stores  : React.PropTypes.object.isRequired
  },

  getChildContext() {
    return {
      allowed : this.props.allowed,
      actions : this.props.actions,
      stores  : this.props.stores
    }
  },

  getDefaultProps() {
    return {
      onFullscreen: fullscreen
    }
  },

  goFullscreen() {
    this.props.onFullscreen(this.getDOMNode())
  },

  render() {
    let { actions, stores, allowed } = this.props
    let { blocks } = stores

    let root = blocks.root()

    return (
      <div className="colonel">
        <Fullscreen ref="fullscreen" onClick={ this.goFullscreen }  />
        <BlockMenu block={ root } position={ root } />
        <EditorBlock block={ root } />
      </div>
    )
  }

})

module.exports = App
