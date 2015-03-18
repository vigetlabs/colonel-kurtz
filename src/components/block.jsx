/* @flow */

var BlockType   = require('../stores/block_type_store')
var Pure        = require('pure')
var React       = require('react')
var UpdateBlock = require('../actions/block/update')

var Block = React.createClass({
  mixins: [ Pure ],

  propTypes: {
    block: React.PropTypes.any.isRequired
  },

  render(): any {
    var { content, type } = this.props.block
    var { component } = BlockType.find(type)

    return React.createElement(component, {
      ref            : 'block',
      initialContent : content,
      updateContent  : this._onUpdateContent
    })
  },

  _onUpdateContent(content:Object): void {
    UpdateBlock(this.props.block.id, content)
  }
})

module.exports = Block
