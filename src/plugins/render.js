/**
 * Render
 * Handles updating the browser UI
 */

let App   = require('../components/App')
let React = require('react')

module.exports = {

  render(app, el) {
    React.render(<App app={ app } />, el)
  },

  register(app, { el }, next) {
    this.render(app, el)

    app.listen(i => this.render(app,el))

    next()
  }

}
