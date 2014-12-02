/* @flow */

var AddBlock  = require('./add_block')
var BlockType = require('../stores/block_type_store')
var Monitor   = require('../mixins/monitor')
var React     = require('react')

var BlockMenu = React.createClass({

  mixins: [ Monitor ],

  getDefaultProps(): { position: number } {
    return {
      position: 0
    }
  },

  getState(): { types: Array<string> } {
    return {
      types: BlockType.keys()
    }
  },

  getButton(type:string): any {
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
