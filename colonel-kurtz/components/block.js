/* @flow */

var AppConstants = require('constants/app_constants')
var BlockActions = require('../actions/block_actions')
var BlockType    = require('../stores/block_type_store')
var Monitor      = require('../mixins/monitor')
var Pure         = require('../mixins/pure')
var React        = require('react')

var Block = React.createClass({

  mixins: [ Monitor, Pure ],

  getState() {
    return BlockType.find(this.props.block.type)
  },

  render(): any {
    var { block, ...props } = this.props
    var { component:Component } = this.state

    return <Component initialContent={ block.content } updateContent={ this._onUpdateContent } { ...props } />
  },

  _onUpdateContent(content) {
    BlockActions.update(this.props.block.id, content)
  }

})

module.exports = Block
