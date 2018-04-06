import Button from './Button'
import React from 'react'

export default class MenuItem extends React.Component {
  static defaultProps = {
    className: 'col-menu-item',
    type: 'button',
    onClick() {},
    isDisabled() {}
  }

  isDisabled() {
    let { app, block, isDisabled } = this.props
    return isDisabled(app, block)
  }

  render() {
    let {
      label,
      app,
      block,
      onOpen,
      onExit,
      active,
      isDisabled,
      items,
      ...safe
    } = this.props

    return (
      <Button
        {...safe}
        onClick={this._onClick.bind(this)}
        disabled={this.isDisabled()}
      >
        {label}
      </Button>
    )
  }

  _onClick() {
    let { app, block, onClick } = this.props
    onClick(app, block, this)
  }
}
