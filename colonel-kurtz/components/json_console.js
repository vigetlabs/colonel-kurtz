/* @flow */

var React = require('react')
var BlockListStore = require('../stores/block_list_store')

var JsonConsole = React.createClass({

  getDefaultProps() {
    return {
      indentation: 2
    }
  },

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

  toJSON(): Object {
    return this.state.blockList.toJSON() || {}
  },

  render(): any {
    return(
      <pre>{ JSON.stringify(this, undefined, this.props.indentation) }</pre>
    )
  }

})

module.exports = JsonConsole
