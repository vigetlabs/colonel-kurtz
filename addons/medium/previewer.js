/* @flow */

var React = require('react')

var Previewer = React.createClass({

  render(): any {
    return <div dangerouslySetInnerHTML={{ __html: this.props.html }}></div>
  }

})

module.exports = Previewer
