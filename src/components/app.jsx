/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import BlockMenu   from 'components/block_menu'
import EditorBlock from 'components/editor_block'
import React       from 'react'

let App = React.createClass({

  propTypes: {
    flux : React.PropTypes.object.isRequired
  },

  childContextTypes: {
    flux : React.PropTypes.object.isRequired
  },

  getChildContext() {
    return {
      flux : this.props.flux
    }
  },

  getElement(block) {
    let { allowed, flux } = this.props

    return (
      <div className="colonel" key={ block.id }>
        <BlockMenu allowed={ allowed } block={ block } blockTypes={ flux.stores.blockTypes } onAdd={ flux.actions.blocks.create } />
        <EditorBlock allowed={ allowed } flux={ flux } block={ block } blockTypes={ flux.stores.blockTypes } />
      </div>
    )
  },

  render() {
    return (<div>{ this.props.root.map(this.getElement) }</div>)
  }

})

module.exports = App
