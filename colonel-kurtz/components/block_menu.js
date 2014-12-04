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
    var block = this.props.block

    return {
      types: block ? BlockType.find(block.type).nest : BlockType.keys()
    }
  },

  getButton(type:string): any {
    return <AddBlock key={ type } type={ type } { ...this.props } />
  },

  getNavigation() {
    return (
      <nav className="col-menu" role="navigation">
        { this.state.types.map(this.getButton) }
      </nav>
    )
  },

  render(): any {
    return this.state.types ? this.getNavigation() : null
  },

})

module.exports = BlockMenu
