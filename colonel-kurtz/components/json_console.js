/* @flow */

var BlockList = require('../stores/block_list_store')
var Monitor   = require('../mixins/monitor')
var React     = require('react')

var JsonConsole = React.createClass({

  mixins: [ Monitor ],

  getDefaultProps() {
    return {
      indentation: 2
    }
  },

  getState(): Object {
    return {
      list: BlockList.find(this.props.initialBlockListId)
    }
  },

  render(): any {
    return (
      <pre>{ JSON.stringify(this.state.list, undefined, this.props.indentation) }</pre>
    )
  }

})

module.exports = JsonConsole
