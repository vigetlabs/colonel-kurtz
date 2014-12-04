var React = require('react');

var Tooltip = React.createClass({

  render() {
    var { children, content } = this.props;

    return (
      <span className="col-tooltip">
        <span className="col-tooltip-flag">
          { content }
        </span>
        { this.props.children }
      </span>
    );
  }
});

module.exports = Tooltip;
