import Menu from 'components/Menu'
import React from 'react'
import { destroy, move, update } from 'actions/blocks'

export default React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  getActions() {
    let { app, block, first, last } = this.props

    let actions = [
      {
        id       : 'moveUp',
        label    : 'Move Up',
        onClick  : app.prepare(move, block, -1),
        disabled : first
      },
      {
        id       : 'moveDown',
        label    : 'Move Down',
        onClick  : app.prepare(move, block, 1),
        disabled : last
      },
      {
        id      : 'destroy',
        label   : 'Remove',
        onClick : app.prepare(destroy, block.id)
      }
    ]

    return actions.map(function(action) {
      let { id } = action
      return <Menu.Item { ...action } key={ id} ref={ id } />
    })
  },

  render() {
    let { app, block, children } = this.props
    let { component:Component } = app.refine('blockTypes').find(i => i.id === block.type)

    return (
      <div className={ `col-block col-block-${ block.type }`}>
        <Component ref="block" onChange={ app.prepare(update, block) } { ...block }>
          { children }
        </Component>

        <Menu ref="menu" app={ app } block={ block }>
          { this.getActions() }
        </Menu>
      </div>
    )
  }

})
