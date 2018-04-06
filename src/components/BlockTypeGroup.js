import Animator from './Animator'
import FocusTrap from 'react-focus-trap'
import React from 'react'
import Btn from './Button'

export default class BlockTypeGroup extends React.Component {
  static defaultProps = {
    items: []
  }

  state = {
    open: false
  }

  open = () => {
    this.setState({ open: true })
  }

  close = () => {
    this.setState({ open: false })
  }

  getButton(type) {
    let { id, label } = type
    let { onAdd } = this.props

    return (
      <Btn key={id} className="col-menu-item" onClick={() => onAdd(type)}>
        {label}
      </Btn>
    )
  }

  getMenu() {
    return this.state.open ? (
      <FocusTrap
        key="menu"
        className="col-menu"
        element="nav"
        active
        onExit={this.close}
        role="navigation"
      >
        {this.props.items.map(this.getButton, this)}
      </FocusTrap>
    ) : null
  }

  render() {
    return (
      <Animator
        role="button"
        transitionName="col-menu"
        className="col-switch-dropdown"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={200}
        onKeyUp={this._onKeyUp}
      >
        <Btn
          key="label"
          className="col-switch-btn col-menu-label"
          onClick={this.open}
        >
          {this.props.label}
        </Btn>
        {this.getMenu()}
      </Animator>
    )
  }

  _onKeyUp = e => {
    // Do not allow escape presses to bubble up to parent switch
    if (e.key === 'Escape' && this.state.open) {
      e.stopPropagation()
    }
  }
}
