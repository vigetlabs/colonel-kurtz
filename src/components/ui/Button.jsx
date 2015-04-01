import React from 'react'
import Ink   from 'react-ink'

let Button = React.createClass({

  getDefaultProps() {
    return {
      className : 'col-btn',
      hide      : false,
      tagName   : 'button',
      type      : 'button'
    }
  },

  render() {
    let { children, hide, tagName, ...attrs } = this.props

    return hide ? null : (
      React.createElement(tagName, attrs, [
        <Ink key="__ink__"/>,
        children
      ])
    )
  }
})

export default Button
