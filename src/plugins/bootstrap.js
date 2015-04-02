/**
 * Bootstrap
 * This plugin is responsible for injecting data into the system on
 * start up, migrating old versions to new.
 */
import migrate from 'lib/migrate'

export default {

  register(app, { value, blockTypes }, next) {
    let migration  = migrate(value)

    app.replace({ ...migration, blockTypes })

    next()
  }

}
