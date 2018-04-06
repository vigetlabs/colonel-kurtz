import React from 'react'

export default class Graphic extends React.Component {
  static defaultProps = {
    className: 'col-graphic',
    element: 'img',
    src: null
  }

  render() {
    const { element, ...other } = this.props
    return React.createElement(element, other)
  }
}
