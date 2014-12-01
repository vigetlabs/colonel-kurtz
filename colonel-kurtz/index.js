/* @flow */
var React            = require('react')
var Immutable        = require('immutable')
var App              = require('./components/app')
var BlockListActions = require('./actions/block_list_actions')
var BlockTypeActions = require('./actions/block_type_actions')
var BlockListStore   = require('./stores/block_list_store')
var BlockTypeStore   = require('./stores/block_type_store')
var BlockTypeMixin   = require('mixins/block_type')
var uid              = require('./utils/uid')
var assign           = require('object.assign')

require('array.prototype.find')
require('style/colonel')

var _instances = []

class ColonelKurtz {
  _callbacks: Immutable.Set<Function>;
  domElement: Element;
  id: number;

  constructor(domElement: Element) {
    this.id = uid()
    this.domElement = domElement
    this._callbacks = Immutable.Set([])

    _instances.push(this)

    BlockListActions.create({ editorId: this.id })
  }

  render(): void {
    React.render(this._rootComponent(), this._getDomElement())
  }

  simulateChange(): void {
    this._runCallbacks()
  }

  addCallback(callback: Function): void {
    this._callbacks = this._callbacks.add(callback)
  }

  toJSON() {
    return BlockListStore.find(this.rootBlockList().id).toJSON()
  }

  toHtml(): string {
    return React.renderToStaticMarkup(this._rootComponent())
  }

  rootBlockList() {
    return BlockListStore.findByEditorId(this.id)
  }

  // Private

  _rootComponent(): ReactElement {
    return <App editor={ this } />
  }

  _getDomElement(): Element {
    return this.domElement
  }

  _runCallbacks(): void {
    this._callbacks.forEach(function(callback){
      callback()
    })
  }

  _rootBlockListId(): number {
    var rootBlockList = this.rootBlockList()

    if(rootBlockList) {
      return rootBlockList.id
    }
  }

}

ColonelKurtz.addBlockType = function(id, component) {
  BlockTypeActions.create({ id, component })
}

ColonelKurtz.createBlock = function(blockClass) {
  return React.createClass(
    assign(blockClass, {
      React: React,
      mixins: [BlockTypeMixin]
    })
  )
}

// Add core block types
ColonelKurtz.addBlockType('medium', require('components/block_types/medium'))

module.exports = ColonelKurtz
