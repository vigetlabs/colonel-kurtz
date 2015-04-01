import Button from './ui/Button'
import React  from 'react'

export default React.createClass({

  propTypes: {
    label   : React.PropTypes.string.isRequired,
    onClick : React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      className : 'col-toolbar-menu-item',
      type      : 'button'
    }
  },

  render() {
    let { label, ...safe } = this.props

    return (<Button { ...safe }>{ label }</Button>)
  }

})
