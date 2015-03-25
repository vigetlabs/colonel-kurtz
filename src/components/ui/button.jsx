import React from 'react'
import Ink   from 'react-ink'

let Button = React.createClass({

  getDefaultProps() {
    return {
      className : 'col-btn',
      tagName   : 'button',
      type      : 'button'
    }
  },

  render() {
    let { children, tagName, ...attrs } = this.props

    return (
      React.createElement(tagName, attrs, [
        <Ink key="__ink__"/>,
        children
      ])
    )
  }
})

export default Button
