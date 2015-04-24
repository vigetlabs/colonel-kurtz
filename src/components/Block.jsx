import Actions from 'actions/blocks'
import Menu    from 'components/Menu'
import React   from 'react'

export default React.createClass({

  propTypes: {
    app   : React.PropTypes.object.isRequired,
    block : React.PropTypes.object.isRequired
  },

  render() {
    let { app, block, children } = this.props
    let { component:Component } = app.refine('blockTypes').find(i => i.id === block.type)

    return (
      <div className={ `col-block col-block-${ block.type }`}>
        <Component ref="block" content={ block.content } onChange={ this._onChange }>
          { children }
        </Component>
        <Menu app={ app } block={ block } />
      </div>
    )
  },

  _onChange(content) {
    let { app, block } = this.props

    app.push(Actions.update, block, content)
  }

})
