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
  setup(
    app,
    {
      allow,
      maxChildren = Infinity,
      blocks = [],
      blockTypes,
      maxDepth = Infinity
    }
  ) {
    if (blocks instanceof HTMLElement) {
      blocks = parseElement(blocks)
    }

    app.patch(
      {
        blocks,
        blockTypes: this.filter(blockTypes, allow),
        settings: {
          maxChildren,
          maxDepth
        }
      },
      true // deserialize
    )
  },

  filter(blockTypes, acceptable) {
    if (!acceptable) return blockTypes

    return blockTypes.filter((type) => acceptable.indexOf(type.id) > -1)
  }
}
