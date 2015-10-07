let Blocks        = require('../stores/Blocks')
let typesForBlock = require('../utils/typesForBlock')

module.exports = class InsertionController {

  constructor(props) {
    this.props = props
  }

  insertAllowed(block) {
    if (!block) return [false, "Must provide a block."]
    const type = block.type

    let message = null
    let allowed = false

    if(this.containerIsSelf(block)) {
      // TODO: i18n these messages
      message = "Can't drop here. You can't drop a block into itself."
    } else if(!this.typeAllowed(type)) {
      message = "Can't drop here. This type is disallowed by the containing block."
    } else if (this.full() && !this.intrablockMove(block)) {
      message = "Can't drop here. The containing block is full."
    } else {
      allowed = true
      message = "Drop away!"
    }

    return [allowed, message]
  }

  containerIsSelf(block) {
    const { containingBlock } = this.props
    return(block === containingBlock)
  }

  typeAllowed(type) {
    const { app, containingBlock } = this.props
    const allowedTypes = typesForBlock(app.get('blockTypes'), containingBlock).map((type) => type.id)
    return(allowedTypes.indexOf(type) !== -1)
  }

  full() {
    const { app, containingBlock } = this.props

    if (!containingBlock) {
      const maxRootBlocks = app.get('maxChildren', Infinity)
      return Blocks.filterChildren(app.get('blocks')).length >= maxRootBlocks
    }

    const childBlocks = Blocks.getChildren(app.get('blocks'), containingBlock)
    const type = app.refine('blockTypes').find(type => type.id === containingBlock.type)

    return childBlocks.length >= type.maxChildren
  }

  intrablockMove(block) {
    const { containingBlock } = this.props
    return (block.parent === this.props.containingBlock)
  }

}
