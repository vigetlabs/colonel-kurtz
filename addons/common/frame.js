import React from 'react'
import cx from 'classnames'

const defaultProps = {
  element: 'figure'
}

export default class Frame extends React.Component {
  render() {
    const { element, children, open, ...other } = this.props

    let className = cx('col-frame', {
      'col-frame-open': !!open
    })

    return React.createElement(element, { className, ...other }, children)
  }
}

Frame.defaultProps = defaultProps
