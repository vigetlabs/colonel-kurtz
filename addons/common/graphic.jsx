import React from 'react'

export default React.createClass({

  getDefaultProps() {
    return {
      className : 'col-graphic',
      element   : 'img',
      src       : null
    }
  },

  render() {
    var { element, ...other } = this.props
    return React.createElement(element, other)
  }

})
