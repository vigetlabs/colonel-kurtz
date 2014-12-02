/* @flow */
var App              = require('./components/app')
var BlockListActions = require('./actions/block_list_actions')
var BlockListStore   = require('./stores/block_list_store')
var BlockTypeActions = require('./actions/block_type_actions')
var BlockTypeMixin   = require('./mixins/block_type')
var BlockTypeStore   = require('./stores/block_type_store')
var Immutable        = require('immutable')
var React            = require('react')
var assign           = require('object.assign')
var uid              = require('./utils/uid')

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
    var root = BlockListStore.find(this.rootBlockList().id)

    return root ? root.toJSON() : {}
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

ColonelKurtz.addBlockType = function(id: string, component: ReactElement) {
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
