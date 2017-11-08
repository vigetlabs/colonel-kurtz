let React = require('react')

module.exports = React.createClass({

  getDefaultProps() {
    return {
      className : 'col-graphic',
      element   : 'img',
      src       : null
    }
  },

  render() {
    var { element, ...other } = this.props
    return React.createElement(element, other)
  }

})
