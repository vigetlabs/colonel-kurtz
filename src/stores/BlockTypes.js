/**
 * Block Type Store
 *
 * A Block Type describes the editing experience for a Block. Whenever
 * an action associated with block type the system, this module tells
 * Colonel Kurtz how that action manipulates block type data.
 */

let BlockType = require('../models/BlockType')

module.exports = {

  getInitialState() {
    return []
  },

  /**
   * deserialize
   * Any time block types are injected into the system, always make sure
   * they follow some guidelines.
   */
  deserialize(config=[]) {
    return config.map(options => new BlockType(options))
  },

  /**
   * serialize
   * Block types are never serialized, so return nothing
   */
  serialize() {
    return undefined
  }

}
