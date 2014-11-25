/* @flow */

var React = require('react')
var Button = require('./ui/button')
var BlockActions = require('../actions/block_actions')
var Strings = require('constants/strings')

var RemoveBlockButton = React.createClass({

  removeBlock() {
    var { blockId, blockListId: parentBlockListId } = this.props

    BlockActions.destroy({ blockId, parentBlockListId })
  },

  render(): any {
    return (
      <Button aria-label={ Strings.remove.label } className="colonel-btn colonel-btn-icon" onClick={ this._onClick }>
        &times;
      </Button>
    )
  },

  _onClick() {
    var answer = confirm(Strings.remove.confirm)

    if (answer) {
      this.removeBlock()
    }
  }

})

module.exports = RemoveBlockButton
