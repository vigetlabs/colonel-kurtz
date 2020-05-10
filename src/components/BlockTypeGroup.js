import React from 'react'
import Animator from './Animator'
import FocusTrap from 'react-focus-trap'
import Btn from './Button'

const defaultProps = {
  items: []
}

export default class BlockTypeGroup extends React.Component {
  constructor() {
    super(...arguments)

    this.state = {
      open: false
    }
  }

  open() {
    this.setState({ open: true })
  }

  close() {
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
        onExit={this.close.bind(this)}
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
        classNames="col-menu"
        className="col-switch-dropdown"
        transition={{ exit: 200, enter: 300 }}
        onKeyUp={this._onKeyUp.bind(this)}
      >
        <>
          <Btn
            key="label"
            className="col-switch-btn col-menu-label"
            onClick={this.open.bind(this)}
          >
            {this.props.label}
          </Btn>
          {this.getMenu()}
        </>
      </Animator>
    )
  }

  _onKeyUp(event) {
    // Do not allow escape presses to bubble up to parent switch
    if (event.key === 'Escape' && this.state.open) {
      event.stopPropagation()
    }
  }
}

BlockTypeGroup.defaultProps = defaultProps
