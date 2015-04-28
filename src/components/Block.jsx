import Actions   from 'actions/blocks'
import Menu      from 'components/Menu'
import React     from 'react'
import menuItems from '../config/menu'

export default React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  getBlockType() {
    let { app, block } = this.props
    return app.refine('blockTypes').find(i => i.id === block.type)
  },

  getMenuItem(item) {
    let { id } = item
    return (<Menu.Item key={ id } ref={ id } { ...item} { ...this.props} />)
  },

  render() {
    let { type, content } = this.props.block
    let { component:Component } = this.getBlockType()

    return (
      <div className={ `col-block col-block-${ type }`}>
        <Component ref="block" content={ content } onChange={ this._onChange } >
          { this.props.children }
        </Component>

        <Menu ref="menu">
          { menuItems.map(this.getMenuItem) }
        </Menu>
      </div>
    )
  },

  _onChange(content) {
    let { app, block } = this.props
    app.push(Actions.update, block, content)
  }

})
