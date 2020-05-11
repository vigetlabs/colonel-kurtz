import Animator from './Animator'
import MenuItem from './MenuItem'
import React from 'react'
import menuItems from '../config/menu'
import Handle from './MenuHandle'
import { Menu, MenuItems, MenuPopover } from '@reach/menu-button'
import { positionRight } from '@reach/popover'

const defaultProps = {
  items: []
}

export default class BlockMenu extends React.Component {
  getMenuItem(item) {
    let { id } = item

    return (
      <MenuItem
        key={id}
        ref={(el) => (this[id] = el)}
        {...item}
        {...this.props}
      />
    )
  }

  getMenuItems() {
    const { items } = this.props

    return items.concat(menuItems).map(this.getMenuItem, this)
  }

  render() {
    return (
      <Animator
        className="col-menu-wrapper"
        classNames="col-menu"
        timeout={{ exit: 200, enter: 300 }}
      >
        <Menu>
          <Handle key="handle" />

          <MenuPopover position={positionRight}>
            <div className="colonel">
              <MenuItems className="col-menu">{this.getMenuItems()}</MenuItems>
            </div>
          </MenuPopover>
        </Menu>
      </Animator>
    )
  }
}

BlockMenu.Item = MenuItem
BlockMenu.defaultProps = defaultProps
