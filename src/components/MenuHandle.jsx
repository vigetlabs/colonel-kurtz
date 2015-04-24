import Btn   from './Button'
import React from 'react'
import icon  from 'icons/menu'

export default React.createClass({

  getDefaultProps() {
    return {
      className : 'col-menu-handle',
      label     : 'Open the menu for this block',
      type      : 'button'
    }
  },

  render() {
    let { label, ...safe } = this.props

    return (
      <Btn { ...safe }>
        <span className="col-hidden">{ label }</span>
        <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: icon }} />
      </Btn>
    )
  }

})
