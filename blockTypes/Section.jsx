import React from 'react'
import Section from '../../addons/section'

export default React.createClass({

  statics: {
    menu: [{
      id    : 'settings',
      label : 'Settings'
    }]
  },

  menuWillSelect(item) {
    alert(`The ${ item } item was clicked!`)
  },

  render() {
    return (<Section { ...this.props } />)
  }

})
