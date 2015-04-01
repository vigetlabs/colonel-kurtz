/**
 * This is the root component that contains sections for
 * toggling between viewing modes and viewing managed content
 */

import Actions    from 'actions/blocks'
import Button     from 'components/ui/button'
import Section    from 'components/section'
import React      from 'react'
import {Upstream} from 'microcosm'

export default React.createClass({
  mixins: [ Upstream ],

  propTypes: {
    app        : React.PropTypes.object.isRequired,
    blocks     : React.PropTypes.array.isRequired,
    blockTypes : React.PropTypes.array.isRequired
  },

  getSection(block, i, parents) {
    let isLast = i === (parents.length - 1)

    return (
      <Section key={ block.id } block={ block } last={ isLast } { ...this.props } />
    )
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
    this.props.app.send(Actions.create, 'section', 0, null)
  }

})
