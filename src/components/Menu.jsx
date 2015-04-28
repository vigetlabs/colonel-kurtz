import FocusTrap from 'react-focus-trap'
import Handle    from './MenuHandle'
import Item      from './MenuItem'
import React     from 'react'

export default React.createClass({

  statics: { Item },

  getInitialState() {
    return { open : false }
  },

  render() {
    return (
      <div className="col-menu-wrapper">
        <Handle ref="handle" onClick={ this._onHandleClick }/>
        <FocusTrap element="nav" role="navigation" className="col-menu" onExit={ this._onExit } active={ this.state.open }>
          { this.props.children }
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
