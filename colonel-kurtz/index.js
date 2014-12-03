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
if (!Array.prototype.find) {
  require('array.prototype.find')
}

var App              = require('./components/app')
var EditorActions    = require('./actions/editor_actions')
var BlockActions     = require('./actions/block_actions')
var BlockListActions = require('./actions/block_list_actions')
var BlockListStore   = require('./stores/block_list_store')
var Immutable        = require('immutable')
var React            = require('react')
var uid              = require('./utils/uid')
var Bus              = require('./bus')
var seed             = require('./utils/seed')

require('style/colonel')

class ColonelKurtz {
  _callbacks: Immutable.Set<Function>;
  el: Element;
  id: number;

  constructor(config: { el: Element; nesting: ?boolean; seed: ?Object }) {
    this.id = uid()
    this.el = config.el
    this._callbacks = Immutable.Set([])

    EditorActions.create({ id: this.id, ...config })

    Bus.subscribe(() => this.simulateChange())

    BlockListActions.create({ editorId: this.id })

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
    this._callbacks = this._callbacks.add(callback)
  }

  toJSON(): Object {
    var root = BlockListStore.findByEditorId(this.id)

    return root ? root.toJSON() : {}
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

ColonelKurtz.addons       = require('./addons')
ColonelKurtz.createBlock  = require('./utils/createBlock')
ColonelKurtz.addBlockType = require('./utils/addBlockType')

module.exports = ColonelKurtz
