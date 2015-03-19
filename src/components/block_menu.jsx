var AddBlock = require('./add_block')
var React    = require('react')

var BlockMenu = React.createClass({

  contextTypes: {
    allowed : React.PropTypes.array.isRequired,
    flux    : React.PropTypes.object.isRequired
  },

  propTypes: {
    block : React.PropTypes.any.isRequired,
  },

  getDefaultProps() {
    return {
      position : 0
    }
  },

  getButton(blockType) {
    var { block, position } = this.props

    return React.createElement(AddBlock, {
      key   : blockType.id,
      onAdd : this.context.flux.actions.blocks.create,
      block, blockType, position
    })
  },

  getNavigation(allowed) {
    return (
      <nav ref="buttons" className="col-menu" role="navigation">
        { allowed.map(this.getButton) }
      </nav>
    )
  },

  render() {
    let { allowed, flux } = this.context
    let { blockTypes } = flux.stores
    let { block } = this.props

    let whitelist = block.parent ? blockTypes.subset(block.type) : blockTypes.within(allowed)

    return whitelist.length? this.getNavigation(whitelist) : null
  },

})

module.exports = BlockMenu
