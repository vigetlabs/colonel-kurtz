/* @flow */

var Block           = require('./block')
var HasBlockNesting = require('../mixins/has_block_nesting')
var Modes           = require('../constants/mode_constants')
var React           = require('react')

var PreviewerBlock = React.createClass({

  mixins: [ HasBlockNesting ],

  listComponent(): ReactElement {
    return require('./previewer_block_list')
  },

  render(): any {
    return (
      <div>
        <Block block={ this.state.block } mode={ Modes.PREVIEW_MODE } />
        { this.childBlockListComponent() }
      </div>
    )
  }

})

module.exports = PreviewerBlock
