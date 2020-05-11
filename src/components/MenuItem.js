import React from 'react'
import { MenuItem as ReachMenuItem } from '@reach/menu-button'

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
      onClick, // don't forward this to the Reach component
      active,
      isDisabled,
      items,
      ...safe
    } = this.props

    return (
      <ReachMenuItem
        {...safe}
        as="button"
        onSelect={this._onClick.bind(this)}
        disabled={this.isDisabled()}
      >
        {this._formatLabel(label)}
      </ReachMenuItem>
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
