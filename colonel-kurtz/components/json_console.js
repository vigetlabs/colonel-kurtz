/* @flow */

var Serializer = require('../stores/serializer_store')
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
      data: Serializer.serializeBlockList(this.props.initialBlockListId)
    }
  },

  toJSON(): Object {
    return this.state.data
  },

  render(): any {
    return (
      <pre>{ JSON.stringify(this, undefined, this.props.indentation) }</pre>
    )
  }

})

module.exports = JsonConsole
