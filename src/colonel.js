/**
 * Colonel Kurts
 * A custom block editor
 */

import App       from 'components/app'
import React     from 'react'
import Microcosm from 'microcosm'
import warning   from 'warning'

class ColonelKurtz extends Microcosm {

  constructor({ el, seed, types }) {
    super(seed)

    this.addActions({
      blocks     : require('actions/blocks'),
      blockTypes : require('actions/blockTypes')
    })

    this.addStores({
      blocks     : require('stores/block_store'),
      blockTypes : require('stores/block_type_store')
    })

    this.el    = el
    this.types = types

    this.listen(this.render.bind(this))
  }

  render() {
    let { actions, el, stores, types } = this

    let component = React.createElement(App, { actions, stores, allowed: types })

    React.render(component, el)

    return this
  }

  addCallback(fn) {
    warning('ColonelKurtz::addCallback will be deprecated in v3.0.0. Instead use listen.')
    return this.listen(fn)
  }

  removeCallback(fn) {
    warning('ColonelKurtz::removeCallback will be deprecated in v3.0.0. Instead use ignore.')
    return this.ignore(fn)
  }

  simulateChange() {
    warning('ColonelKurtz::simulateChange will be deprecated in v3.0.0. Instead use pump.')
    this.pump(this.toJSON())
  }

  toJSON() {
    return this.serialize().blocks
  }

}

ColonelKurtz.createBlock  = require('./utils/createBlock')
ColonelKurtz.addBlockType = ColonelKurtz.addBlockTypes = function() {
  warning('ColonelKurtz.addBlockType has been removed. Pass `blockTypes` as a key for seed data')
}

export default ColonelKurtz
