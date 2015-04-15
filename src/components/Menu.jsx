import FocusTrap  from 'react-focus-trap'
import React      from 'react'

export default React.createClass({

  render() {
    return (
      <FocusTrap onExit={ this.props.onExit }>
        <nav role="navigation" className="col-menu">
          <div className="col-menu-backdrop" aria-hidden="true" />
          { this.props.children }
        </nav>
      </FocusTrap>
    )
  }

})
