import React      from 'react'
import classNames from 'classnames'

export default React.createClass({

  getDefaultProps() {
    return { open: false }
  },

  render() {
    let className = classNames('col-menu', {
      'col-menu-open' : this.props.open
    })

    return (
      <nav role="navigation" className={ className }>
        <div className="col-menu-backdrop" aria-hidden="true" />
        { this.props.children }
      </nav>
    )
  }

})
