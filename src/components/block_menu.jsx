var AddBlock = require('./add_block')
var React    = require('react')

var BlockMenu = React.createClass({

  contextTypes: {
    actions : React.PropTypes.object.isRequired,
    allowed : React.PropTypes.array.isRequired,
    stores  : React.PropTypes.object.isRequired
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
      key: blockType.id,
      block,
      blockType,
      position
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
    let { allowed, stores } = this.context
    let { block } = this.props

    let whitelist = block.parent ? stores.blockTypes.subset(block.type) : stores.blockTypes.within(allowed)

    return whitelist.length? this.getNavigation(whitelist) : null
  },

})

module.exports = BlockMenu
