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
    var types = blockTypes.map(blockType => blockType.id)

    return blocks.filter(block => types.indexOf(block.type) > -1)
  },

  register(app, { allow, maxChildren, blocks, blockTypes }, next) {
    blockTypes = this.filterBlockTypes(blockTypes, allow)

    if (blocks instanceof HTMLElement) {
      blocks = parseElement(blocks)
      blocks = filterBlocks(blocks, blockTypes)
    }

    app.replace({ blocks, blockTypes })

    app.set('maxChildren', maxChildren)

    next()
  }

}
