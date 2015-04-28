import Menu from 'components/Menu'
import React from 'react'
import { update } from 'actions/blocks'

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
        <Component ref="block" onChange={ app.prepare(update, block) } { ...block }>
          { children }
        </Component>
        <Menu app={ app } block={ block } />
      </div>
    )
  }

})
