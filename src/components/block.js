/* @flow */

var BlockType   = require('../stores/block_type_store')
var Pure        = require('../mixins/pure')
var Stateful    = require('diode/stateful')
var React       = require('react')
var UpdateBlock = require('../actions/block/update')

var Block = React.createClass({
  mixins: [ Stateful, Pure ],

  propTypes: {
    block: React.PropTypes.any.isRequired
  },

  getState(): ?Object {
    return BlockType.find(this.props.block.type)
  },

  render(): any {
    var { block, ...props } = this.props
    var { component:Component } = this.state

    return (
      <Component initialContent={ block.content } updateContent={ this._onUpdateContent } { ...props } />
    )
  },

  _onUpdateContent(content:Object): void {
    UpdateBlock(this.props.block.id, content)
  }

})

module.exports = Block
