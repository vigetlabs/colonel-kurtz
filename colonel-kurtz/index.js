/* @flow */

var React = require('react')
var App = require('./components/app')
var uid = require('./utils/uid')
var exportGlobal = require('./utils/export_global')

class ColonelKurtz {

  constructor(domElement: Element) {
    this.id = uid()
    this.domElement = domElement
  }

  render(): void {
    React.renderComponent(this._rootComponent(), this._getDomElement())
  }

  _rootComponent() {
    return <App editor={ this } />
  }

  _getDomElement(): Element  {
    return this.domElement
  }

}

module.exports = ColonelKurtz

exportGlobal('ColonelKurtz', ColonelKurtz)
