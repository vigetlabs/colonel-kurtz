/* @flow */

var AddBlock  = require('./add_block')
var BlockType = require('../stores/block_type_store')
var React     = require('react')
var Stateful  = require('diode/stateful')

var BlockMenu = React.createClass({

  mixins: [ Stateful ],

  propTypes: {
    editor: React.PropTypes.any.isRequired
  },

  getDefaultProps(): { position: number } {
    return {
      position: 0
    }
  },

  getState(): { types: Array<string> } {
    var { editor, block } = this.props

    // If there is a given block, then use the accepted types provided by that definition
    // Otherwise, fallback to the editor.
    return {
      types : block.type ? BlockType.find(block.type).types : editor.types
    }
  },

  getButton(type:string): ReactElement {
    var { block, position } = this.props

    return <AddBlock key={ type } type={ type } block={ block } position={ position } />
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
