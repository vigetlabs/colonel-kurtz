/**
 * Colonel Kurts
 * A custom block editor
 * @flow
 */

var App   = require('components/app')
var Bus   = require('bus')
var React = require('react')
var seed  = require('utils/seed')

require('style/colonel')

class ColonelKurtz {
  _callbacks: Array<Function>;
  _options: Object;
  el: Element;

  constructor(config: { el: Element; seed: ?Object }) {
    this.el         = config.el
    this._callbacks = []
    this._options   = config
    this._root      = seed(this._root, config.seed || [])

    Bus.subscribe(() => this.simulateChange())

    setTimeout(this.simulateChange.bind(this), 10)
  }

  render(): ColonelKurtz {
    React.render(this._rootComponent(), this._getDomElement())
    return this
  }

  simulateChange(): void {
    this._runCallbacks()
  }

  addCallback(callback: Function): void {
    this._callbacks = this._callbacks.concat(callback)
  }

  removeCallback(callback: Function): void {
    this._callbacks = this._callbacks.filter(c => c !== callback)
  }

  toJSON(): Array<Object> {
    return this._root.toJSON().blocks
  }

  toHtml(): string {
    return React.renderToStaticMarkup(this._rootComponent())
  }

  // Private

  _rootComponent(): ReactElement {
    return <App block={ this._root } { ...this.options } />
  }

  _getDomElement(): Element {
    return this.el
  }

  _runCallbacks(): void {
    var json = this.toJSON()

    this._callbacks.forEach(function(callback){
      callback(json)
    })
  }

}

ColonelKurtz.createBlock  = require('./utils/createBlock')
ColonelKurtz.addBlockType = require('./utils/addBlockType')

module.exports = ColonelKurtz
