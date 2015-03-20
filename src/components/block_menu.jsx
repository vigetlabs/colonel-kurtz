var AddBlock = require('./add_block')
var React    = require('react')

var BlockMenu = React.createClass({

  propTypes: {
    allowed    : React.PropTypes.array.isRequired,
    block      : React.PropTypes.object.isRequired,
    blockTypes : React.PropTypes.object.isRequired,
    onAdd      : React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      position : 0
    }
  },

  getButton(blockType) {
    let { block, onAdd, position } = this.props

    return (<AddBlock key={ blockType.id }
                      block={ block }
                      blockType={ blockType }
                      onAdd={ onAdd }
                      position={ position } />)
  },

  getBlockTypes() {
    let { allowed, block, blockTypes } = this.props

    return blockTypes.subset(block.type)
  },

  render() {
    return (
      <nav className="col-menu" role="navigation">
        { this.getBlockTypes().map(this.getButton) }
      </nav>
    )
  },

})

module.exports = BlockMenu
