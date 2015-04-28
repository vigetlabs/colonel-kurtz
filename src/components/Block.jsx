import Menu from 'components/Menu'
import React from 'react'
import menuItems from 'config/menu'
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

  render() {
    let { app, block, children } = this.props
    let { component:Component } = app.refine('blockTypes').find(i => i.id === block.type)

    return (
      <div className={ `col-block col-block-${ block.type }`}>
        <Component ref="block" onChange={ app.prepare(update, block) } { ...block }>
          { children }
        </Component>

        <Menu ref="menu">
          { menuItems.map(this.getMenuItem) }
        </Menu>
      </div>
    )
  }

})
