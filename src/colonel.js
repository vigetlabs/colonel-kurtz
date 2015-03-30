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
import bootstrap  from 'plugins/bootstrap'

class ColonelKurtz extends Microcosm {

  constructor({ el, blockTypes, seed }) {
    super({ el, blockTypes, seed })

    this.el = el

    // The system store keeps track of information
    // for the colonel kurtz instance itself
    this.addStore(System)

    // A block is an individual chunk of content. It can have child
    // blocks
    this.addStore(Blocks)

    // A block type defines the editing experience for a specific type
    // content
    this.addStore(BlockTypes)

    // The bootstrap plugin takes seed data and prepares the
    // application's state beyond initializing
    this.addPlugin(bootstrap)
  }

  render() {
    this.start(() => {
      React.render(<App app={ this } />, this.el)
    })

    return this
  }

}

export default ColonelKurtz
