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

  componentWillReceiveProps() {
    this.setState({ open: false })
  },

  render() {
    let { app, block } = this.props

    let siblings = app.pull('blocks', siblingsOf, block)
    let isFirst  = siblings[0] === block
    let isLast   = siblings[siblings.length - 1] === block

    return (
      <div className="col-toolbar">
        <Handle onClick={ this._onHandleClick }/>
        <Menu open={ this.state.open }>
          <Item ref="moveUp"   label="Move Up"   onClick={ app.prepare(shift, block.id, -1) } hide={ isFirst } />
          <Item ref="moveDown" label="Move Down" onClick={ app.prepare(shift, block.id, 1) }  hide={ isLast } />
          <Item ref="destroy"  label="Remove"    onClick={ app.prepare(destroy, block.id) } />
        </Menu>
      </div>
    )
  },

  _onHandleClick(e) {
    e.preventDefault()
    this.setState({ open : true })
  }

})
