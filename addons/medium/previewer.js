var React = require('react')

var Previewer = React.createClass({

  render() {
    return (
      <div className="col-block-content">
        <div className="col-medium-preview" dangerouslySetInnerHTML={{ __html: this.props.html }} />
      </div>
    )
  }

})

module.exports = Previewer
