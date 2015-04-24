import FocusTrap from 'react-focus-trap'
import Handle    from './MenuHandle'
import Item      from './MenuItem'
import React     from 'react'
import siblingAt from 'utils/siblingAt'

import { destroy, move } from 'actions/blocks'

export default React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  getInitialState() {
    return { open : false }
  },

  render() {
    let { app, block } = this.props
    let blocks         = app.get('blocks')
    let before         = siblingAt(blocks, block, -1)
    let after          = siblingAt(blocks, block, 1)
    let moveBlock      = app.prepare(move, block)
    let destroyBlock   = app.prepare(destroy, block.id)

    return (
      <div className="col-menu-wrapper">
        <Handle ref="handle" onClick={ this._onHandleClick }/>
        <FocusTrap element="nav" role="navigation" className="col-menu" onExit={ this._onExit } active={ this.state.open }>
          <Item ref="moveUp" label="Move Up" onClick={ () => moveBlock(before)} disabled={ !before } />
          <Item ref="moveDown" label="Move Down" onClick={ () => moveBlock(after) } disabled={ !after } />
          <Item ref="destroy" label="Remove" onClick={ destroyBlock} />
        </FocusTrap>
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
