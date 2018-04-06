/**
 * Render
 * Handles updating the browser UI
 */

import React from 'react'
import App from '../components/App'
import DOM from 'react-dom'

export default {
  render(app, el) {
    DOM.render(<App app={app} />, el)
  },

  register(app, { el }) {
    this.render(app, el)

    app.listen(i => this.render(app, el))
  }
}
