import Actions    from 'actions/blocks'
import React      from 'react'
import Toolbar    from 'components/Toolbar'
import classNames from 'classnames'

export default React.createClass({

  propTypes: {
    app       : React.PropTypes.object.isRequired,
    block     : React.PropTypes.object.isRequired,
    blockType : React.PropTypes.object.isRequired,
  },

  getClassName({ id }) {
    return classNames('col-block', `col-block-${ id }`)
  },

  render() {
    let { app, block, blockType, children } = this.props
    let { id, component:Component } = blockType

    return (
      <div className={ this.getClassName(blockType) }>
        <Component ref="block" content={ block.content } onChange={ this._onChange }>
          { children }
        </Component>
        <Toolbar app={ app } block={ block } />
      </div>
    )
  },

  _onChange(content) {
    let { app, block } = this.props

    app.send(Actions.update, block, content)
  }

})
