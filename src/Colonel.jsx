/**
 * Colonel Kurts
 * A custom block editor
 */

let BlockTypes = require('./stores/BlockTypes')
let Blocks     = require('./stores/Blocks')
let Microcosm  = require('microcosm')
let Options    = require('./stores/Options')
let React      = require('react')
let bootstrap  = require('./plugins/bootstrap')
let render     = require('./plugins/render')

/**
 * Colonel Kurtz is a layer on top of the Microcosm framework
 * Microcosm is a simple Flux implementation designed to solve issues
 * with state specifically for Colonel Kurtz
 *
 * See:
 * https://github.com/vigetlabs/microcosm
 */
class ColonelKurtz extends Microcosm {

  constructor(options) {
    super()

    /**
     * Keep track of all options
     */
    this.addStore('options', Options)

    /**
     * A block is an individual chunk of content. It can have children
     */
    this.addStore('blocks', Blocks)

    /**
     * A block type defines the editing experience for a specific type
     * content
     */
    this.addStore('blockTypes', BlockTypes)

    /**
     * The bootstrap plugin takes seed data and prepares the
     * application's state beyond initializing
     */
    this.addPlugin(bootstrap, options)

    /**
     * The render plugin handles updating the browser ui
     */
    this.addPlugin(render, options)
  }

  toJSON() {
    return this.serialize().blocks
  }

}

module.exports = ColonelKurtz
