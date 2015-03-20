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
      blocks : require('actions/blocks')
    })

    this.addStores({
      blocks     : require('stores/block_store'),
      blockTypes : require('stores/block_type_store')
    })

    this.el    = el
    this.types = types

    this.listen(this.render.bind(this))
  }

  create() {
    return (<App allowed={ this.types } flux={ this } />)
  }

  render() {
    React.render(this.create(), this.el)

    this.rendered = true

    return this
  }

  toJSON() {
    return this.serialize().blocks
  }

}

export default ColonelKurtz
