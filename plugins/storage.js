/**
 * Storage
 * Whenever the app changes, save the current state in localStorage
 */

let KEY = 'seed'

module.exports = {

  save(app) {
    localStorage.setItem(KEY, JSON.stringify(app))
  },

  fetch() {
    let raw = localStorage.getItem(KEY)

    try {
      return JSON.parse(raw) || []
    } catch(x) {
      return []
    }
  },

  register(app, options, next) {
    app.listen(() => this.save(app))

    app.replace({
      blocks     : this.fetch(),
      blockTypes : app.get('blockTypes')
    })

    next()
  }

}
