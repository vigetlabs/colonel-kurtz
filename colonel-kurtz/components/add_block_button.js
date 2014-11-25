/* @flow */

var React = require('react')
var Button = require('./ui/button')
var BlockActions = require('../actions/block_actions')
var Strings = require('constants/strings')

var AddBlockButton = React.createClass({

  addBlock() {
    var { position, blockListId: parentBlockListId } = this.props

    BlockActions.create({ parentBlockListId, position })
  },

  render(): any {
    return (
      <Button aria-label={ Strings.add.label } className="colonel-btn colonel-btn-icon" onClick={ this.addBlock }>
        +
      </Button>
    )
  }

})

module.exports = AddBlockButton
