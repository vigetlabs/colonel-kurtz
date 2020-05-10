/**
 * Colonel Kurts
 * A custom block editor
 */

import BlockTypes from './domains/BlockTypes'
import Blocks from './domains/Blocks'
import Settings from './domains/Settings'
import Microcosm from 'microcosm'
import bootstrap from './plugins/bootstrap'
import render from './plugins/render'

export default class ColonelKurtz extends Microcosm {
  constructor(options) {
    super()

    /**
     * A block is an individual chunk of content. It can have children
     */
    this.addDomain('blocks', Blocks)

    /**
     * A block type defines the editing experience for a specific type
     * content
     */
    this.addDomain('blockTypes', BlockTypes)

    /**
     * Settings track various options that control CK's behaviour
     */
    this.addDomain('settings', Settings)

    /**
     * The bootstrap plugin takes seed data and prepares the
     * application's state beyond initializing
     */
    this.addEffect(bootstrap, options)

    /**
     * The render plugin handles updating the browser ui
     */
    this.addEffect(render, options)
  }

  toJSON() {
    return this.serialize().blocks
  }
}
