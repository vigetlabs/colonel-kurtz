/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import Actions from 'actions/blocks'
import Button  from 'components/ui/Button'
import Section from 'components/Section'
import React   from 'react'

export default React.createClass({
  propTypes: {
    app        : React.PropTypes.object.isRequired,
    blocks     : React.PropTypes.array.isRequired,
    blockTypes : React.PropTypes.array.isRequired
  },

  getSection(block, i, parents) {
    let last = i === (parents.length - 1)

    return React.createElement(Section, { key: block.id, block, last, ...this.props })
  },

  render() {
    return (
      <div className="colonel">
        <Button ref="append" className="col-btn-fab" onClick={ this._onAdd }>+</Button>
        { this.props.blocks.filter(i => !i.parent).map(this.getSection) }
      </div>
    )
  },

  _onAdd() {
    this.props.app.push(Actions.create, 'section', 0, null)
  }

})
