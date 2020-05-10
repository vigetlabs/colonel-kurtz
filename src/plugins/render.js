/**
 * Render
 * Handles updating the browser UI
 */

import React from 'react'
import App from '../components/App'
import DOM from 'react-dom'

export default {
  setup(app, { el }) {
    this.render(app, el)

    app.on('change', () => {
      this.render(app, el)
    })
  },

  render(app, el) {
    DOM.render(<App app={app} />, el)
  }
}
