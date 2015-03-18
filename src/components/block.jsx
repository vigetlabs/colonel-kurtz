/* @flow */

var BlockType   = require('../stores/block_type_store')
var Pure        = require('pure')
var React       = require('react')
var Stateful    = require('diode/stateful')
var UpdateBlock = require('../actions/block/update')

var Block = React.createClass({
  mixins: [ Stateful, Pure ],

  propTypes: {
    block: React.PropTypes.any.isRequired
  },

  getState(): Object {
    return BlockType.find(this.props.block.type)
  },

  render(): any {
    var { content   } = this.props.block
    var { component } = this.state

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
