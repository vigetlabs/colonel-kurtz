/* @flow */

var React = require('react')

var App = require('./components/app')
var BlockListActions = require('./actions/block_list_actions')
var BlockListStore = require('./stores/block_list_store')
var exportGlobal = require('./utils/export_global')
var uid = require('./utils/uid')

var _instances = []

class ColonelKurtz {
  _callbacks: Array<Function>;
  domElement: Element;
  id: number;

  constructor(domElement: Element) {
    this.id = uid()
    this.domElement = domElement
    this._callbacks = []

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
    this._callbacks.push(callback)
  }

  toJson() {
    var json
    var rootList = this.rootBlockList()

    if (rootList) {
      json = rootList.toJson()
    } else {
      json = {}
    }

    return json
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

  _getCallbacks(): Array<Function> {
    return this._callbacks
  }

  _runCallbacks(): void {
    this._getCallbacks().forEach(function(callback){
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
