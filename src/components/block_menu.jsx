import AddBlock   from './add_block'
import BlockTypes from 'stores/block_type_store'
import React      from 'react'

let BlockMenu = React.createClass({

  propTypes: {
    block      : React.PropTypes.object.isRequired,
    blockTypes : React.PropTypes.array.isRequired,
    onAdd      : React.PropTypes.func.isRequired
  },

  getButton(blockType) {
    return (<AddBlock key={ blockType.id }
                      block={ this.props.block }
                      onAdd={ this.props.onAdd }
                      { ...blockType }/>)
  },

  render() {
    return (
      <nav className="col-menu" role="navigation">
        { this.props.blockTypes.map(this.getButton) }
      </nav>
    )
  },

})

export default BlockMenu
