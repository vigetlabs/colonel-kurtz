let React = require('react')
let Ink   = require('react-ink')

module.exports = React.createClass({

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
