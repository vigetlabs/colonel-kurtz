/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import BlockMenu   from 'components/block_menu'
import EditorBlock from 'components/editor_block'
import React       from 'react'

let App = React.createClass({

  propTypes: {
    allowed : React.PropTypes.array,
    flux    : React.PropTypes.object.isRequired
  },

  getDefaultProps() {
    return {
      allowed: []
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
    let root = this.props.flux.stores.blocks.root()

    return (<div>{ root.map(this.getElement) }</div>)
  }

})

module.exports = App
