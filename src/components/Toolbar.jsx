import Handle     from './ToolbarHandle'
import Item       from './MenuItem'
import FocusTrap  from 'react-focus-trap'
import React      from 'react'
import classNames from 'classnames'
import siblingsOf from 'utils/siblingsOf'
import isFirst    from 'utils/isFirst'
import isLast     from 'utils/isLast'

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

    let blocks = app.get('blocks')

    return (
      <FocusTrap element="nav" role="navigation" className="col-menu" onExit={ this._onExit } active={ this.state.open }>
        <Item ref="moveUp"   label="Move Up"   onClick={ app.prepare(shift, block.id, -1) } hide={ isFirst(blocks, block) } />
        <Item ref="moveDown" label="Move Down" onClick={ app.prepare(shift, block.id, 1) }  hide={ isLast(blocks, block) } />
        <Item ref="destroy"  label="Remove"    onClick={ app.prepare(destroy, block.id) } />
      </FocusTrap>
    )
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
