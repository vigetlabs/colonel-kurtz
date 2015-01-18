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
    var { block } = this.props

    // If there is a given block, then use the accepted types provided by that definition
    return {
      types: block.type ? BlockType.find(block.type).types : BlockType.keys()
    }
  },

  getButton(type:string): ReactElement {
    var { block, position } = this.props

    return <AddBlock key={ type } type={ type } parent={ block } position={ position }/>
  },

  getNavigation(): ReactElement {
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
