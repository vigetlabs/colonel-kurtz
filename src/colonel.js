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

/**
 * Colonel Kurtz is a layer on top of the Microcosm framework
 * Microcosm is a simple Flux implementation designed to solve issues
 * with state specifically for Colonel Kurtz
 *
 * See:
 * https://github.com/vigetlabs/microcosm
 */
export default class ColonelKurtz extends Microcosm {

  constructor(options) {
    super(options)

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
    this.addPlugin(bootstrap)
  }

  /**
   * Render is sugar around Microcosm's start function.
   * In Microcosm, `start()` is responsible for booting
   * the application.
   *
   * For Colonel Kurtz's purposes, `render()` starts the
   * application and then renders its interface to a provided
   * element.
   */
  render(done) {
    this.start(() => {
      let component = React.render(<App app={ this } />, this._options.el)

      if (done) {
        done(component)
      }
    })

    return this
  }

}
