/**
 * Bootstrap
 * This plugin is responsible for injecting data into the system
 */

export default {

  register(app, { value, blockTypes }, next) {
    app.replace({ blocks: value, blockTypes })
    next()
  }

}
