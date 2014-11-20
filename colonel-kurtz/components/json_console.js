/* @flow */

var React = require('react')
var BlockListStore = require('../stores/block_list_store')

var JsonConsole = React.createClass({

  getInitialState() {
    return this.getState()
  },

  getState(): Object {
    return {
      blockList:BlockListStore.find(this.props.initialBlockListId)
    }
  },

  updateState() {
    this.setState(this.getState())
  },

  json(): Object {
    var blockList = this.state.blockList

    if (blockList) {
      return blockList.toJson()
    } else {
      return {}
    }
  },

  render(): any {
    return(
      <pre>{ JSON.stringify(this.json(), undefined, 2) }</pre>
    )
  }

})

module.exports = JsonConsole
