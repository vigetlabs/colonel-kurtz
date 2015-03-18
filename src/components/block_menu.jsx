/* @flow */

var AddBlock  = require('./add_block')
var BlockType = require('../stores/block_type_store')
var React     = require('react')

var BlockMenu = React.createClass({

  contextTypes: {
    types: React.PropTypes.array.isRequired
  },

  propTypes: {
    block : React.PropTypes.any.isRequired
  },

  getDefaultProps(): { position: number } {
    return {
      position: 0
    }
  },

  getTypes(): { types: Array<string> } {
    var { block } = this.props

    // If there is a given block, then use the accepted types provided by that definition
    // Otherwise, fallback to the editor.
    return block.type ? BlockType.find(block.type).types : this.context.types
  },

  getButton(type:string): ReactElement {
    var { block, position } = this.props

    return (<AddBlock key={ type } type={ type } block={ block } position={ position } />)
  },

  getNavigation(types): ReactElement {
    return (
      <nav ref="buttons" className="col-menu" role="navigation">
        { types.map(this.getButton) }
      </nav>
    )
  },

  render(): any {
    let types = this.getTypes()

    return types ? this.getNavigation(types) : null
  },

})

module.exports = BlockMenu
