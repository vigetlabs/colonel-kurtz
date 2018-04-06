/**
 * Bootstrap
 * This plugin is responsible for injecting data into the system
 */

let parseElement = function(element) {
  let data = []

  try {
    data = JSON.parse(element.value)
  } catch (x) {
    // Do nothing
  }

  return data
}

export default {
  filter(blockTypes, acceptable) {
    if (!acceptable) return blockTypes

    return blockTypes.filter(type => acceptable.indexOf(type.id) > -1)
  },

  register(
    app,
    { allow, maxChildren = Infinity, blocks, blockTypes, maxDepth = Infinity },
    next
  ) {
    if (blocks instanceof HTMLElement) {
      blocks = parseElement(blocks)
    }

    app.replace(
      {
        maxChildren,
        maxDepth,
        blocks,
        blockTypes: this.filter(blockTypes, allow)
      },
      next
    )
  }
}
