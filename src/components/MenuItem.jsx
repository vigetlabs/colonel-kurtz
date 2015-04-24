import Button from './Button'
import React  from 'react'

export default React.createClass({

  propTypes: {
    label   : React.PropTypes.string.isRequired,
    onClick : React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      className : 'col-menu-item',
      type      : 'button'
    }
  },

  render() {
    let { label, ...safe } = this.props
    return React.createElement(Button, safe, label)
  }

})
