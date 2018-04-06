import React from 'react'
import cx from 'classnames'

export default class Frame extends React.Component {
  static defaultProps = {
    element: 'figure'
  }

  render() {
    const { element, children, open, ...other } = this.props
    let className = cx('col-frame', {
      'col-frame-open': !!open
    })

    return React.createElement(element, { className, ...other }, children)
  }
}
