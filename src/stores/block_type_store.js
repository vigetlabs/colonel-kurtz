/**
 * Block Type Store
 *
 * A Block Type describes the editing experience for a Block. Whenever
 * an action associated with block type the system, this module tells
 * Colonel Kurtz how that action manipulates block type data.
 */

import addBlockType from 'utils/addBlockType'
import manifest     from 'manifest'

export default {

  /**
   * getInitialState
   * Block types are stored in a list, however we always want to make
   * sure that list includes the block types specified in the manifest
   */
  getInitialState() {
    return manifest.blockTypes
  },

  /**
   * toString
   * Tells Colonel Kurtz that block type information can be found at
   * the `blockTypes` key
   */
  toString() {
    return 'blockTypes'
  },

  /**
   * deserialize
   * Any time block types are seeded into the system, always make sure
   * they include the ones provided initially.
   */
  deserialize(seed=[]) {
    return addBlockType(seed.concat(this.getInitialState()))
  },

  /**
   * serialize
   * Block types are never serialized, so return nothing
   */
  serialize() {
    return undefined
  }

}
