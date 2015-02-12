import React from 'react'

let Button = React.createClass({

  getDefaultProps() {
    return {
      tagName : 'button',
      type    : 'button'
    }
  },

  render() {
    let { children, tagName, ...attrs } = this.props

    return (
      React.createElement(tagName, attrs, [
        children
      ])
    )
  }
})

module.exports = Button
