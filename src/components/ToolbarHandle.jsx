import React    from 'react'
import menuIcon from 'icons/menu'

export default React.createClass({

  getDefaultProps() {
    return {
      label : 'Open the menu for this block',
      type  : 'button'
    }
  },

  render() {
    let { label, ...safe } = this.props

    return (
      <button { ...safe}>
        <span className="col-toolbar-handle"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: menuIcon }} />
      </button>
    )
  }

})
