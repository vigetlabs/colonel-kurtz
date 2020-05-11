import React from 'react'
import Animator from './Animator'
import Item from './MenuItem'
import { Menu, MenuButton, MenuItems, MenuPopover } from '@reach/menu-button'
import { positionRight } from '@reach/popover'

const defaultProps = {
  items: []
}

export default class BlockTypeGroup extends React.Component {
  getMenuItem(type) {
    const { id, label } = type
    const { onAdd } = this.props

    return <Item key={id} label={label} onClick={() => onAdd(type)} />
  }

  getMenuItems() {
    return this.props.items.map(this.getMenuItem, this)
  }

  render() {
    return (
      <div
        className="col-switch-dropdown"
        onKeyUp={this._onKeyUp.bind(this)}
        onKeyDown={this._onKeyDown.bind(this)}
      >
        <Animator
          role="button"
          classNames="col-menu"
          className="col-switch-dropdown"
          transition={{ exit: 200, enter: 300 }}
        >
          <Menu>
            {({ isExpanded }) => {
              // @HACK(shawk): workaround for the inability to introspect
              // the Reach UI Menu state
              this.menuIsOpen = isExpanded

              return (
                <>
                  <MenuButton
                    key="label"
                    className="col-switch-btn col-menu-label"
                  >
                    {this.props.label}
                  </MenuButton>

                  <MenuPopover
                    ref={(el) => (this.menu = el)}
                    position={positionRight}
                  >
                    <div className="colonel">
                      <MenuItems className="col-menu">
                        {this.getMenuItems()}
                      </MenuItems>
                    </div>
                  </MenuPopover>
                </>
              )
            }}
          </Menu>
        </Animator>
      </div>
    )
  }

  _onKeyDown(event) {
    // This is a bit of a hack to workaround the event lifecycle of the Reach UI
    // Menu. By the time the key up event bubbles up to our wrapper, `this.menuIsOpen`
    // is already `false` so we need to track separately whether the menu was open.
    if (event.key === 'Escape' && this.menuIsOpen) {
      this.menuWasOpen = true
    }
  }

  _onKeyUp(event) {
    // Do not allow escape presses to bubble up to parent switch
    if (event.key === 'Escape' && this.menuWasOpen) {
      this.menuWasOpen = false
      event.stopPropagation()
    }
  }
}

BlockTypeGroup.defaultProps = defaultProps
