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

let injectOptions = function(blockTypes, options) {
  return blockTypes.map(config => {
    let { id } = config
    if (options[id]) {
      config['options'] = options[id]
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
      blockOptions = {},
      maxDepth = Infinity
    },
    next
  ) {
    if (blocks instanceof HTMLElement) {
      blocks = parseElement(blocks)
    }

    blockTypes = injectOptions(this.filter(blockTypes, allow), blockOptions)

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
