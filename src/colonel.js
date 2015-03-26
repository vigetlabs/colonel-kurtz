/**
 * Colonel Kurts
 * A custom block editor
 */

import App        from 'components/App'
import BlockTypes from 'stores/block_type_store'
import Blocks     from 'stores/block_store'
import Microcosm  from 'microcosm'
import React      from 'react'
import migrate    from 'lib/migrator'

class ColonelKurtz extends Microcosm {

  constructor({ el, seed }) {
    super()

    this.addStore(Blocks)
    this.addStore(BlockTypes)

    this.seed(migrate(seed))

    this.el = el
  }

  render() {
    React.render(<App flux={ this } />, this.el)

    return this
  }

  toJSON() {
    let data = this.serialize()

    return {
      blocks  : data.blocks,
      version : process.env.VERSION
    }
  }

}

export default ColonelKurtz
