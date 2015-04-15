import Handle     from './ToolbarHandle'
import Item       from './MenuItem'
import Menu       from './Menu'
import React      from 'react'
import classNames from 'classnames'
import siblingsOf from 'utils/siblingsOf'

import { destroy, shift } from 'actions/blocks'

export default React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  getInitialState() {
    return { open : false }
  },

  getMenu() {
    let { app, block } = this.props

    let siblings = app.pull('blocks', siblingsOf, block)
    let isFirst  = siblings[0] === block
    let isLast   = siblings[siblings.length - 1] === block

    return this.state.open ? (
      <Menu onExit={ this._onExit }>
        <Item ref="moveUp"   label="Move Up"   onClick={ app.prepare(shift, block.id, -1) } hide={ isFirst } />
        <Item ref="moveDown" label="Move Down" onClick={ app.prepare(shift, block.id, 1) }  hide={ isLast } />
        <Item ref="destroy"  label="Remove"    onClick={ app.prepare(destroy, block.id) } />
      </Menu>
    ) : null;
  },

  render() {
    return (
      <div className="col-toolbar">
        <Handle ref="handle" onClick={ this._onHandleClick }/>
        { this.getMenu() }
      </div>
    )
  },

  _onExit() {
    this.setState({ open: false })
  },

  _onHandleClick(e) {
    e.preventDefault()
    this.setState({ open : !this.state.open })
  }

})
