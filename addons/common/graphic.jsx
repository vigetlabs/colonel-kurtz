import React from 'react'
import cx    from 'classnames'

let Graphic = React.createClass({

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

export default Graphic
