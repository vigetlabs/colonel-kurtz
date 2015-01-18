/* @flow */

var React = require('react')
var Modes = require('../constants/mode_constants')
var Block = require('models/block')

var _types = {
  [Modes.EDIT_MODE]    : require('../components/editor_block_list'),
  [Modes.PREVIEW_MODE] : require('../components/previewer_block_list')
}

var ContentSection = React.createClass({

  render(): any {
    var ContentType = _types[this.props.mode]

    return (
      <div className="col-content">
        <ContentType block={ this.props.block } />
      </div>
    )
  }

})

module.exports = ContentSection
