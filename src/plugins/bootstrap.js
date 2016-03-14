/**
 * Bootstrap
 * This plugin is responsible for injecting data into the system
 */

let parseElement = function (element) {
  let data = []

  try {
    data = JSON.parse(element.value)
  } catch(x) {}

  return data
}

module.exports = {

  filterBlockTypes(blockTypes, acceptable) {
    if (!acceptable) return blockTypes

    return blockTypes.filter(type => acceptable.indexOf(type.id) > -1)
  },

  filterBlocks(blocks, blockTypes) {
    var _this = this
    var typeWhitelist = blockTypes.map(blockType => blockType.id)
    var validBlocks   = []

    blocks.forEach(function(block) {
      if (typeWhitelist.indexOf(block.type) > -1) {
        block.blocks = _this.filterBlocks(block.blocks, blockTypes)
        validBlocks  = validBlocks.concat(block)
      }
    })

    return validBlocks
  },

  register(app, { allow, maxChildren, blocks, blockTypes }, next) {
    blockTypes = this.filterBlockTypes(blockTypes, allow)

    if (blocks instanceof HTMLElement) {
      blocks = parseElement(blocks)
      blocks = this.filterBlocks(blocks, blockTypes)
    }

    app.replace({ blocks, blockTypes })

    app.set('maxChildren', maxChildren)

    next()
  }

}
