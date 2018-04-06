import Animator from './Animator'
import FocusTrap from 'react-focus-trap'
import Handle from './MenuHandle'
import Item from './MenuItem'
import React from 'react'
import menuItems from '../config/menu'

export default class BlockMenu extends React.Component {
  static Item = Item

  static defaultProps = {
    items: []
  }

  getMenuItem(item) {
    let { id } = item

    return (
      <Item key={id} ref={el => (this[id] = el)} {...item} {...this.props} />
    )
  }

  getMenuItems() {
    const { items } = this.props

    return items.concat(menuItems).map(this.getMenuItem, this)
  }

  getMenu() {
    if (!this.props.active) return null

    return React.createElement(
      FocusTrap,
      {
        active: true,
        key: 'menu',
        className: 'col-menu',
        element: 'nav',
        onExit: this.props.onExit,
        role: 'navigation'
      },
      this.getMenuItems()
    )
  }

  render() {
    return (
      <Animator
        className="col-menu-wrapper"
        transitionName="col-menu"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={200}
      >
        <Handle
          key="handle"
          ref={el => (this.handle = el)}
          onClick={this.props.onOpen}
        />
        {this.getMenu()}
      </Animator>
    )
  }
}
