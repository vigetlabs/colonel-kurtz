/**
 * Colonel Kurts
 * A custom block editor
 * @flow
 */

var App        = require('components/app')
var Diode      = require('diode')
var HeartBeat  = require('heartbeat')
var React      = require('react')
var seed       = require('utils/seed')
var uid        = require('utils/uid')

class ColonelKurtz {
  _heart: Object;
  el: Element;
  id: number;

  constructor(config: { el: Element; seed: ?Object }) {
    this._heart = HeartBeat()

    this.block  = seed(config.seed)
    this.types  = config.types
    this.el     = config.el

    Diode.subscribe(this.simulateChange.bind(this))
  }

  render(): ColonelKurtz {
    React.render(<App block={ this.block } types={ this.types } />, this.el)

    this.simulateChange()

    return this
  }

  addCallback(fn) {
    this._heart.listen(fn)
  }

  removeCallback(fn) {
    this._heart.ignore(fn)
  }

  simulateChange() {
    this._heart.pump(this.toJSON())
  }

  toJSON(): Array<Object> {
    return this.block.toJSON().blocks
  }

}

ColonelKurtz.createBlock  = require('./utils/createBlock')
ColonelKurtz.addBlockType = ColonelKurtz.addBlockTypes = require('./utils/addBlockType')

module.exports = ColonelKurtz
