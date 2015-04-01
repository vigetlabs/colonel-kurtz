import Handle from './ToolbarHandle'
import Item   from './ToolbarItem'
import React  from 'react'

import { destroy, shift } from 'actions/blocks'

export default React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  render() {
    let { app, block: { id } } = this.props

    return (
      <div className="col-toolbar">
        <Handle />
        <nav role="navigation" className="col-toolbar-menu">
          <Item ref="moveUp" label="Move Up" onClick={ app.prepare(shift, id, -1) } />
          <Item ref="moveDown" label="Move Down" onClick={ app.prepare(shift, id, 1) } />
          <Item ref="destroy" label="Remove" onClick={ app.prepare(destroy, id) } />
        </nav>
      </div>
    )
  }

})
