/**
 * Block Store
 *
 * The Block Store is responsible for defining how blocks are stored
 * within Colonel Kurtz. Whenever an action associated with block
 * records is pushed into the system, this module tells Colonel Kurtz
 * how that action manipulates block data.
 */

let Actions    = require('../actions/blocks')
let Block      = require('../models/Block')
let insertAt   = require('../utils/insertAt')
let siblingAt  = require('../utils/siblingAt')

let Blocks = {
  register() {
    return {
      [Actions.create]   : this.create,
      [Actions.destroy]  : this.destroy,
      [Actions.update]   : this.update,
      [Actions.move]     : this.move,
      [Actions.insertAt] : this.insertAt
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

  filterChildren(state) {
    return state.filter(i => !i.parent)
  },

  /**
   * `blocksToJson` takes a list of blocks and transforms them into
   * the nested structure shown in the front end
   */
  serialize: require('../utils/blocksToJson'),

  /**
   * jsonToBlocks takes this nested structure and flattens
   * into a list for this store.
   */
  deserialize: require('../utils/jsonToBlocks'),

  create(state, { type, parent, position }) {
    let record = new Block({ parent, type })

    // If the provided position is a Block, place the new block right
    // after it.
    if (position instanceof Block) {
      position = state.indexOf(position) + 1
    }

    return insertAt(state, record, position || 0)
  },

  update(state, { id, content }) {
    var block = Blocks.find(state, id)

    block.content = Object.assign(block.content, content)

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
    let before  = siblingAt(state, block, distance)

    return insertAt(without, block, state.indexOf(before))
  },

  insertAt(state, { block, containingBlock, preceedingBlock }) {
    block.parent = containingBlock
    if (!preceedingBlock) preceedingBlock = containingBlock
    let currentPosition = state.indexOf(block)
    let newPosition = (state.indexOf(preceedingBlock) + 1)
    if (currentPosition < newPosition) newPosition -= 1
    let otherBlocks = state.filter(i => i !== block)
    return insertAt(otherBlocks, block, newPosition)
  }
}

module.exports = Blocks
