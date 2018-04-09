import React from 'react'

const defaultProps = {
  className: 'col-graphic',
  element: 'img',
  src: null
}

export default class Graphic extends React.Component {
  render() {
    const { element, ...other } = this.props
    return React.createElement(element, other)
  }
}

Graphic.defaultProps = defaultProps
