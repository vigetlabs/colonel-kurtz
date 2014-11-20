/* @flow */

var React = require('react')
var BlockActions = require('../actions/block_actions')

var RemoveBlockButton = React.createClass({

  removeBlock() {
    BlockActions.destroy({ blockId: this.props.blockId, parentBlockListId: this.props.blockListId })
  },

  render(): any {
    return(
      <button onClick={ this.removeBlock }>Remove Block</button>
    )
  }

})

module.exports = RemoveBlockButton
