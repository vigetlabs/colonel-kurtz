import Button from './ui/Button'
import React  from 'react'

export default React.createClass({

  propTypes: {
    label   : React.PropTypes.string.isRequired,
    onClick : React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      className : 'col-menu-item',
      hide      : false,
      type      : 'button'
    }
  },

  render() {
    let { hide, label, ...safe } = this.props

    return hide ? null : (<Button { ...safe }>{ label }</Button>)
  }

})
