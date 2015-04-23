import React from 'react'
import cx    from 'classnames'

export default React.createClass({

  getDefaultProps() {
    return {
      element: 'figure'
    }
  },

  render() {
    var { element, children, open, ...other } = this.props

    let className = cx('col-frame', {
      'col-frame-open': open
    })

    return React.createElement(element, { className, ...other }, children)
  }

})
