/**
 * Colonel Kurts
 * A custom block editor
 */

import BlockTypes from 'stores/block_type_store'
import Blocks     from 'stores/block_store'
import Microcosm  from 'microcosm'
import React      from 'react'
import System     from 'stores/system_store'

import bootstrap  from 'plugins/bootstrap'
import render     from 'plugins/render'

/**
 * Colonel Kurtz is a layer on top of the Microcosm framework
 * Microcosm is a simple Flux implementation designed to solve issues
 * with state specifically for Colonel Kurtz
 *
 * See:
 * https://github.com/vigetlabs/microcosm
 */
export default class ColonelKurtz extends Microcosm {

  constructor({ el, seed, blockTypes }) {
    super()

    /**
     * The system store keeps track of information
     * for the colonel kurtz instance itself
     */
    this.addStore(System)

    /**
     * A block is an individual chunk of content. It can have child
     */
    this.addStore(Blocks)

    /**
     * A block type defines the editing experience for a specific type
     * content
     */
    this.addStore(BlockTypes)

    /**
     * The bootstrap plugin takes seed data and prepares the
     * application's state beyond initializing
     */
    this.addPlugin(bootstrap, { seed, blockTypes })

    /**
     * The render plugin handles updating the browser ui
     */
    this.addPlugin(render, { el })
  }

}
