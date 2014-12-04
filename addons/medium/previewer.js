/* @flow */

var React = require('react')

var Previewer = React.createClass({

  render(): any {
    return (
      <div className="col-block-content">
        <div className="col-block-editor-preview" dangerouslySetInnerHTML={{ __html: this.props.html }} />
      </div>
    )
  }

})

module.exports = Previewer
