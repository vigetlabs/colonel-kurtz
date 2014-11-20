/* @flow */

var React = require('react')
var Immutable = require('immutable')
var App = require('./components/app')
var BlockListActions = require('./actions/block_list_actions')
var BlockListStore = require('./stores/block_list_store')
var exportGlobal = require('./utils/export_global')
var uid = require('./utils/uid')

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
    var rootList = this.rootBlockList()

    return rootList ? rootList.toJSON() : {}
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

module.exports = ColonelKurtz

exportGlobal('ColonelKurtz', ColonelKurtz)
