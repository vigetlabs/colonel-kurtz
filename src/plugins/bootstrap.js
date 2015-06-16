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

  filter(blockTypes, acceptable) {
    if (!acceptable) return blockTypes

    return blockTypes.filter(type => acceptable.indexOf(type.id) > -1)
  },

  register(app, { allow, maxChildren, blocks, blockTypes }, next) {
    if (blocks instanceof HTMLElement) {
      blocks = parseElement(blocks)
    }

    app.replace({ blocks, blockTypes: this.filter(blockTypes, allow) })

    app.set('maxChildren', maxChildren)

    next()
  }

}
