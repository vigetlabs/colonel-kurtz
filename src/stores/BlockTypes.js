/**
 * Block Type Store
 *
 * A Block Type describes the editing experience for a Block. Whenever
 * an action associated with block type the system, this module tells
 * Colonel Kurtz how that action manipulates block type data.
 */

import BlockType from '../models/BlockType'

export default {
  getInitialState() {
    return []
  },

  deserialize(blockTypes = []) {
    return blockTypes.map(options => new BlockType(options))
  },

  serialize() {
    return undefined
  }
}
