import FocusTrap from 'react-focus-trap'
import React     from 'react'

export default React.createClass({

  getDefaultProps() {
    return {
      className: 'col-dialog'
    }
  },

  render() {
    let { active, children, className, onExit } = this.props
    return React.createElement(FocusTrap, { active, className, onExit }, children)
  }

})
