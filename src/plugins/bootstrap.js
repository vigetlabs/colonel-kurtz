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

  register(app, { blocks, blockTypes }, next) {
    if (blocks instanceof HTMLElement) {
      blocks = parseElement(blocks)
    }

    app.replace({ blocks, blockTypes })

    next()
  }

}
