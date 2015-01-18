/* @flow */

var Block = require('./block')
var Modes = require('../constants/mode_constants')
var React = require('react')

var PreviewerBlock = React.createClass({

  render(): any {
    var { block } = this.props

    return (
      <div>
        <Block block={ block } mode={ Modes.PREVIEW_MODE } />
        <PreviewerBlockList block={ block } />
      </div>
    )
  }

})

module.exports = PreviewerBlock
