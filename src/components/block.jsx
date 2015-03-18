/* @flow */

let BlockType   = require('../stores/block_type_store')
let Pure        = require('pure')
let React       = require('react')
let UpdateBlock = require('../actions/block/update')

let Block = React.createClass({
  mixins: [ Pure ],

  propTypes: {
    block: React.PropTypes.any.isRequired
  },

  render(): any {
    let { content, type } = this.props.block
    let Component = BlockType.find(type).component

    return (
      <div className="col-block-children">
        <Component ref="block" initialContent={ content } updateContent={ this._onUpdateContent }/>
      </div>
    )
  },

  _onUpdateContent(content:Object): void {
    UpdateBlock(this.props.block.id, content)
  }
})

module.exports = Block
