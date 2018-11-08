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

let injectData = function(blockTypes, data) {
  return blockTypes.map(config => {
    let { id } = config
    if (data[id]) {
      config['data'] = data[id]
    }
    return config
  })
}

export default {
  filter(blockTypes, acceptable) {
    if (!acceptable) return blockTypes

    return blockTypes.filter(type => acceptable.indexOf(type.id) > -1)
  },

  register(
    app,
    {
      allow,
      maxChildren = Infinity,
      blocks,
      blockTypes,
      blockTypesData = {},
      maxDepth = Infinity
    },
    next
  ) {
    if (blocks instanceof HTMLElement) {
      blocks = parseElement(blocks)
    }

    blockTypes = injectData(this.filter(blockTypes, allow), blockTypesData)

    app.replace(
      {
        maxChildren,
        maxDepth,
        blocks,
        blockTypes
      },
      next
    )
  }
}
