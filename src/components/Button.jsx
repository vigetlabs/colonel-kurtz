let React = require('react')
let Ink   = require('react-ink')

module.exports = React.createClass({

  getDefaultProps() {
    return {
      className : 'col-btn',
      tagName   : 'button',
      type      : 'button'
    }
  },

  render() {
    let { children, tagName, ...attrs } = this.props

    return React.createElement(tagName, attrs, [
      <Ink key="__ink__"/>,
      children
    ])
  }

})
