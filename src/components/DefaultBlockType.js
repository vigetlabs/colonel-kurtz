const React = require('react')

module.exports = React.createClass({
  render() {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
})
