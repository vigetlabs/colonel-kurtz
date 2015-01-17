/**
 * Colonel Kurts
 * A custom block editor
 * @flow
 */

// Polyfill Object.assign for splat arguments
if (!Object.assign) {
  Object.assign = require('object-assign');
}

// Polyfill Array.prototype.find for easy record retrieval
require('array.prototype.find')

var App              = require('./components/app')
var BlockListStore   = require('./stores/block_list_store')
var Bus              = require('./bus')
var CreateBlockList  = require('./actions/block_list/create')
var CreateEditor     = require('./actions/editor/create')
var React            = require('react')
var seed             = require('./utils/seed')
var uid              = require('./utils/uid')

require('style/colonel')

class ColonelKurtz {
  _callbacks: Array<Function>;
  el: Element;
  id: number;

  constructor(config: { el: Element; seed: ?Object }) {
    this.id = uid()
    this.el = config.el
    this._callbacks = []

    CreateEditor({ id: this.id, ...config })

    Bus.subscribe(() => this.simulateChange())

    if (config.seed) {
      seed(BlockListStore.last().id, config.seed)
    }

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
    return BlockListStore.findByEditorId(this.id).toJSON()
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
