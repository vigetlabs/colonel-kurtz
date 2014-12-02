/* @flow */

var React        = require('react')
var Button       = require('./ui/button')
var BlockActions = require('../actions/block_actions')
var Strings      = require('../constants/strings')

var AddBlock = React.createClass({

  render(): any {
    var { type } = this.props

    return (
      <Button key={ type } aria-label={ Strings.add.label } className="colonel-btn colonel-btn-icon" onClick={ this._onClick }>
        { type[0] }
      </Button>
    )
  },

  _onClick() {
    var { blockListId: parentBlockListId,type: blockType, position } = this.props

    BlockActions.create({ parentBlockListId, position, blockType })
  }

})

module.exports = AddBlock
