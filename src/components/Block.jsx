import Actions    from 'actions/blocks'
import React      from 'react'
import Menu       from 'components/Menu'
import classNames from 'classnames'

export default React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  getClassName(type) {
    return classNames('col-block', `col-block-${ type }`)
  },

  render() {
    let { app, block, children, first, last } = this.props
    let { id, component:Component } = app.refine('blockTypes').find(i => i.id === block.type)

    return (
      <div className={ this.getClassName(block.type) }>
        <Component ref="block" content={ block.content } onChange={ this._onChange }>
          { children }
        </Component>
        <Menu app={ app } block={ block } first={ first } last={ last } />
      </div>
    )
  },

  _onChange(content) {
    let { app, block } = this.props

    app.push(Actions.update, block, content)
  }

})
