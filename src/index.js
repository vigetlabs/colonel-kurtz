/**
 * Colonel Kurts
 * A custom block editor
 * @flow
 */

var App          = require('components/app')
var Diode        = require('diode')
var EditorCreate = require('actions/editor/create')
var EditorStore  = require('stores/editor_store')
var React        = require('react')
var seed         = require('utils/seed')
var uid          = require('utils/uid')

require('style/colonel')

class ColonelKurtz {
  _callbacks: Array<Function>;
  _options: Object;
  el: Element;
  id: number;

  constructor(config: { el: Element; seed: ?Object }) {
    this.id         = uid()
    this.el         = config.el
    this._callbacks = []

    EditorCreate({
      id    : this.id,
      block : seed(undefined, config.seed || []),
      ...config
    })

    Diode.subscribe(() => this.simulateChange())

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
    return EditorStore.find(this.id).block.toJSON().blocks
  }

  toHtml(): string {
    return React.renderToStaticMarkup(this._rootComponent())
  }

  // Private

  _rootComponent(): ReactElement {
    return <App editorId={ this.id } />
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
