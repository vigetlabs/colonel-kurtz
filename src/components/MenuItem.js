import Button from './Button'
import React from 'react'

const defaultProps = {
  className: 'col-menu-item',
  type: 'button',
  onClick() {},
  isDisabled() {}
}

export default class MenuItem extends React.Component {
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
        {this._formatLabel(label)}
      </Button>
    )
  }

  _formatLabel(label) {
    let { app, block } = this.props
    if (typeof label === 'function') {
      return label(app, block, this)
    } else {
      return label
    }
  }

  _onClick() {
    let { app, block, onClick } = this.props
    onClick(app, block, this)
  }
}

MenuItem.defaultProps = defaultProps
