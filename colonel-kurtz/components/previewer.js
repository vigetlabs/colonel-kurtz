/* @flow */

var React = require('react')
var PreviewerBlockList = require('./previewer_block_list')

var Previewer = React.createClass({

  render(): any {
    return(
      <div>
        <PreviewerBlockList initialBlockListId={ this.props.initialBlockListId } />
      </div>
    )
  }

})

module.exports = Previewer
