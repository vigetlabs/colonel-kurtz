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
var BlockListActions = require('./actions/block_list_actions')
var BlockListStore   = require('./stores/block_list_store')
var BlockTypeActions = require('./actions/block_type_actions')
var BlockTypeMixin   = require('mixins/block_type')
var Immutable        = require('immutable')
var React            = require('react')
var uid              = require('./utils/uid')
var Bus              = require('./bus')

require('style/colonel')

class ColonelKurtz {
  _callbacks: Immutable.Set<Function>;
  el: Element;
  id: number;

  constructor(el: Element) {
    this.el = el
    this.id = uid()
    this._callbacks = Immutable.Set([])

    Bus.subscribe(() => this.simulateChange())

    BlockListActions.create({ editorId: this.id })
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
    var root = BlockListStore.find(this.rootBlockList().id)

    return root ? root.toJSON() : {}
  }

  toHtml(): string {
    return React.renderToStaticMarkup(this._rootComponent())
  }

  rootBlockList(): ?BlockList {
    return BlockListStore.findByEditorId(this.id)
  }

  // Private

  _rootComponent(): ReactElement {
    return <App editor={ this } />
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

  _rootBlockListId(): number {
    var rootBlockList = this.rootBlockList()

    if (rootBlockList) {
      return rootBlockList.id
    }
  }

}

ColonelKurtz.addBlockType = function(id: string, component: any) {
  if (React.isValidElement(component) === false) {
    component = ColonelKurtz.createBlock(component)
  }

  BlockTypeActions.create({ id, component })
}

ColonelKurtz.createBlock = function(blockClass) {
  var mixins = blockClass.mixins || []

  mixins = mixins.concat(BlockTypeMixin)

  return React.createClass(
    Object.assign({}, blockClass, { React, mixins })
  )
}

ColonelKurtz.addons = require('./addons')

module.exports = ColonelKurtz
