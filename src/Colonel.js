import React from 'react'
import DOM from 'react-dom'
import App from './components/App'

export default class ColonelKurtz {
  constructor(options) {
    this.types = options.types
    this.structure = options.structure
  }

  render(el) {
    return DOM.render(<App types={this.types} structure={this.structure} />, el)
  }
}
