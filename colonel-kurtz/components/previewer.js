/* @flow */

var React              = require('react')
var PreviewerBlockList = require('./previewer_block_list')

var Previewer = React.createClass({

  render(): any {
    return(
      <PreviewerBlockList initialBlockListId={ this.props.initialBlockListId } />
    )
  }

})

module.exports = Previewer
