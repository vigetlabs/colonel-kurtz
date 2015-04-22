/**
 * Render
 * Handles updating the browser UI
 */

import App   from 'components/App'
import React from 'react'

export default {

  render(app, el) {
    React.render(<App app={ app } />, el)
  },

  register(app, { el }, next) {
    this.render(app, el)

    app.listen(i => this.render(app,el))

    next()
  }

}
