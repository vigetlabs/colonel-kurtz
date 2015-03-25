/**
 * Colonel Kurts
 * A custom block editor
 */

import App        from 'components/app'
import BlockTypes from 'stores/block_type_store'
import Blocks     from 'stores/block_store'
import Microcosm  from 'microcosm'
import React      from 'react'

class ColonelKurtz extends Microcosm {

  constructor({ el, seed }) {
    super()

    this.addStore(Blocks)
    this.addStore(BlockTypes)

    this.seed(seed)

    this.el = el
  }

  render() {
    React.render(<App flux={ this } />, this.el)

    return this
  }

  toJSON() {
    return this.serialize().blocks
  }

}

export default ColonelKurtz
