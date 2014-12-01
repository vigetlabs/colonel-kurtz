/* @flow */

var AddBlock  = require('./add_block')
var BlockType = require('../stores/block_type_store')
var Monitor   = require('../mixins/monitor')
var React     = require('react')

var BlockMenu = React.createClass({

  mixins: [ Monitor ],

  getDefaultProps() {
    return {
      position: 0
    }
  },

  getState() {
    return {
      types: BlockType.keys()
    }
  },

  getButton(type) {
    return <AddBlock key={ type } type={ type } { ...this.props } />
  },

  render(): any {
    return (
      <nav className="colonel-menu" role="navigation">
        { this.state.types.map(this.getButton) }
      </nav>
    )
  }

})

module.exports = BlockMenu
