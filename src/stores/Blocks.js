/**
 * Block Store
 *
 * The Block Store is responsible for defining how blocks are stored
 * within Colonel Kurtz. Whenever an action associated with block
 * records is pushed into the system, this module tells Colonel Kurtz
 * how that action manipulates block data.
 */

import Actions from '../actions/blocks'
import Block from '../models/Block'
import insertAt from '../utils/insertAt'
import siblingAt from '../utils/siblingAt'
import blocksToJson from '../utils/blocksToJson'
import jsonToBlocks from '../utils/jsonToBlocks'

const Blocks = {
  register() {
    return {
      [Actions.create]: this.create,
      [Actions.destroy]: this.destroy,
      [Actions.update]: this.update,
      [Actions.move]: this.move
    }
  },

  getInitialState() {
    return []
  },

  find(state, id) {
    return state.filter(block => block.valueOf() === id)[0]
  },

  getChildren(state, parent) {
    return state.filter(i => i.parent === parent)
  },

  getDepth(state, block, maxDepth) {
    let currentBlock = block
    let depth = 0

    while (currentBlock && depth <= maxDepth + 1) {
      depth += 1
      currentBlock = state.filter(i => i === currentBlock.parent)[0]
    }

    return depth
  },

  filterChildren(state) {
    return state.filter(i => !i.parent)
  },

  /**
   * `blocksToJson` takes a list of blocks and transforms them into
   * the nested structure shown in the front end
   */
  serialize(state) {
    return blocksToJson(state)
  },

  /**
   * jsonToBlocks takes this nested structure and flattens
   * into a list for this store.
   */
  deserialize(state) {
    return jsonToBlocks(state)
  },

  create(state, { type, parent, position }) {
    let record = new Block({ clientOnly: true, parent, type })

    // If the provided position is a Block, place the new block right
    // after it.
    if (position instanceof Block) {
      position = state.indexOf(position) + 1
    }

    return insertAt(state, record, position || 0)
  },

  update(state, { id, content }) {
    var block = Blocks.find(state, id)

    block.content = { ...block.content, ...content }

    return state
  },

  destroy(state, id) {
    return state.filter(function(block) {
      for (let b = block; b; b = b.parent) {
        if (b.id == id) return false
      }
      return true
    })
  },

  move(state, { block, distance }) {
    let without = state.filter(i => i !== block)
    let before = siblingAt(state, block, distance)

    return insertAt(without, block, state.indexOf(before))
  }
}

export default Blocks
