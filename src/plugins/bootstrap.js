import migrate from 'lib/migrate'

export default {

  register(app, options, next) {
    let migration  = migrate(options.seed)
    let blockTypes = options.blockTypes

    app.seed({ ...migration, blockTypes })

    next()
  }

}
