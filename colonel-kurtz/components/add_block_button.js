/* @flow */

var React = require('react')
var BlockActions = require('../actions/block_actions')

var AddBlockButton = React.createClass({

  addBlock() {
    BlockActions.create({ parentBlockListId: this.props.blockListId, position: this.props.position })
  },

  render(): any {
    return(
      <button onClick={ this.addBlock }>Add Block</button>
    )
  }

})

module.exports = AddBlockButton
