/**
 * Colonel Kurts
 * A custom block editor
 */

import App        from 'components/App'
import BlockTypes from 'stores/block_type_store'
import Blocks     from 'stores/block_store'
import Microcosm  from 'microcosm'
import React      from 'react'
import System     from 'stores/system_store'
import migrate    from 'lib/migrate'

class ColonelKurtz extends Microcosm {

  constructor({ el, blockTypes, seed }) {
    super()

    this.addStore(System)
    this.addStore(Blocks)
    this.addStore(BlockTypes)

    this.seed({ ...migrate(seed), blockTypes })

    this.el = el
  }

  render() {
    React.render(<App flux={ this } />, this.el)

    return this
  }

}

export default ColonelKurtz
