var React = require('react');
var Ink   = require('react-ink');

var Button = React.createClass({

  getDefaultProps() {
    return {
      tagName  : 'button',
      inkColor : null
    }
  },

  render() {
    var { children, inkColor, tagName, ...attrs } = this.props;

    return (
      React.createElement(tagName, attrs, [
        children,
        <Ink key="__ink" color={ inkColor }/>
      ])
    );
  }
});

module.exports = Button;
