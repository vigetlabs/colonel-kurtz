/* @flow */

var AppConstants = require('../constants/app_constants')
var BlockActions = require('../actions/block_actions')
var BlockType    = require('../stores/block_type_store')
var Monitor      = require('../mixins/monitor')
var Pure         = require('../mixins/pure')
var React        = require('react')

var Block = React.createClass({

  mixins: [ Monitor, Pure ],

  getState(): ?Object {
    return BlockType.find(this.props.block.type)
  },

  render(): any {
    var { block, ...props } = this.props
    var { component:Component } = this.state

    return (
      <div className="colonel-block-content">
        <Component initialContent={ block.content } updateContent={ this._onUpdateContent } { ...props } />
      </div>
    )
  },

  _onUpdateContent(content) {
    BlockActions.update(this.props.block.id, content)
  }

})

module.exports = Block
