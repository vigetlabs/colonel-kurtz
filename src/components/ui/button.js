var React = require('react');

var Button = React.createClass({

  getDefaultProps() {
    return {
      tagName  : 'button'
    }
  },

  render() {
    var { children, tagName, ...attrs } = this.props;

    return (
      React.createElement(tagName, attrs, [
        children
      ])
    );
  }
});

module.exports = Button;
