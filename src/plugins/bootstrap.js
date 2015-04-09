/**
 * Bootstrap
 * This plugin is responsible for injecting data into the system
 */

export default {

  register(app, { blocks, blockTypes }, next) {
    app.replace({ blocks, blockTypes })
    next()
  }

}
