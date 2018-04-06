import React from 'react'
import Ink from 'react-ink'

export default class Button extends React.Component {
  static defaultProps = {
    className: 'col-btn',
    tagName: 'button',
    type: 'button'
  }

  render() {
    const { children, tagName, ...attrs } = this.props

    return React.createElement(tagName, attrs, [
      <Ink key="__ink__" />,
      children
    ])
  }
}
