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
var HeartBeat    = require('heartbeat')

class ColonelKurtz {
  _heartbeat: Object;
  el: Element;
  id: number;

  constructor(config: { el: Element; seed: ?Object }) {
    this.id         = uid()
    this.el         = config.el
    this._heartbeat = HeartBeat()

    EditorCreate({
      id    : this.id,
      block : seed(config.seed),
      ...config
    })

    Diode.subscribe(this.simulateChange.bind(this))

    this.simulateChange();
  }

  render(): ColonelKurtz {
    React.render(<App editorId={ this.id } />, this.el)
    return this
  }

  addCallback(fn) {
    this._heartbeat.listen(fn)
  }

  removeCallback(fn) {
    this._heartbeat.ignore(fn)
  }

  simulateChange() {
    this._heartbeat.pump(this.toJSON())
  }

  toJSON(): Array<Object> {
    return EditorStore.find(this.id).block.toJSON().blocks
  }

}

ColonelKurtz.createBlock  = require('./utils/createBlock')
ColonelKurtz.addBlockType = ColonelKurtz.addBlockTypes = require('./utils/addBlockType')

module.exports = ColonelKurtz
