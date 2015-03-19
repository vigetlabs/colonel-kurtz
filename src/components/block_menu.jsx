var AddBlock = require('./add_block')
var React    = require('react')

var BlockMenu = React.createClass({

  contextTypes: {
    allowed : React.PropTypes.array.isRequired,
    flux    : React.PropTypes.object.isRequired
  },

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
    let { actions } = this.context.flux

    return (<AddBlock key={ blockType.id }
                      onAdd={ actions.blocks.create }
                      block={ this.props.block }
                      position={ this.props.position }
                      blockType={ blockType } />)
  },

  getBlockTypes() {
    let { allowed } = this.context
    let { block, blockTypes } = this.props

    return block.parent ? blockTypes.subset(block.type) : blockTypes.within(allowed)
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
