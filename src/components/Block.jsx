import Menu from 'components/Menu'
import React from 'react'
import standardMenuItems from 'config/menu'
import { update } from 'actions/blocks'

export default React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  getMenuItem(item) {
    let { id } = item
    return React.createElement(Menu.Item, { ...item, ...this.props, key: id, ref: id })
  },

  getMenuItems(items) {
    return items.sort((a, b) => (a.order || 0) > (b.order || 0) ? 1 : -1)
                .map(this.getMenuItem)
  },

  render() {
    let { app, block, children } = this.props
    let { component:Component, menuItems } = app.refine('blockTypes').find(i => i.id === block.type)

    return (
      <div className={ `col-block col-block-${ block.type }`}>
        <Component ref="block" onChange={ app.prepare(update, block) } { ...block }>
          { children }
        </Component>

        <Menu ref="menu">
          { this.getMenuItems(menuItems.concat(standardMenuItems)) }
        </Menu>
      </div>
    )
  }

})
