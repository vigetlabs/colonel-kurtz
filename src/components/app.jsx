/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import EditorBlock from 'components/editor_block'
import React       from 'react'
import Button      from 'components/ui/button'

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
    let { blockTypes } = flux.stores

    return React.createElement(EditorBlock, { key: block.id, allowed, flux, block, blockTypes })
  },

  render() {
    return (
      <div className="colonel">
        <div className="colonel-wrapper">
          <Button className="col-btn-fab" onClick={ this._onSectionAppend }>+</Button>
          { this.props.flux.stores.blocks.root().map(this.getElement) }
        </div>
      </div>
    )
  },

  _onSectionAppend(e) {
    e.preventDefault();

    this.props.flux.actions.blocks.create({
      type: 'section'
    })
  }
})

export default App
