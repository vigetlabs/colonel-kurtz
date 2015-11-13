/**
 * Render
 * Handles updating the browser UI
 */

let App   = require('../components/App')
let DOM   = require('react-dom')
let React = require('react')

module.exports = {

  render(app, el) {
    DOM.render(<App app={ app } />, el)
  },

  register(app, { el }, next) {
    this.render(app, el)

    app.listen(i => this.render(app,el))

    next()
  }

}
