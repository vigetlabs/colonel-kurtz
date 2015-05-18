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
let assign     = require('../utils/assign')
let deepRemove = require('../utils/deepRemove')
let findBy     = require('../utils/findBy')
let insertAt   = require('../utils/insertAt')
let siblingAt  = require('../utils/siblingAt')

module.exports = {

  /**
   * getInitialState
   * Runs whenever the application starts. Provides the expected array
   * relied upon by other operations
   */
  getInitialState() {
    return []
  },

  getChildren(state, block) {
    return state.filter(b => b.parent === block)
  },

  withoutChildren(state) {
    return state.filter(i => !i.parent)
  },

  /**
   * For simplicity, blocks are stored in an array, `blocksToJson`
   * takes a list of blocks and transforms them into the nested structure
   * shown in the front end
   */
  serialize: require('../utils/blocksToJson'),

  /**
   * As mentioned previously, blocks are serialized to a nested
   * structure. jsonToBlocks takes this nested structure and flattens
   * into a list for this store.
   */
  deserialize: require('../utils/jsonToBlocks'),

  /**
   * Actions.create
   * Produces a new block based upon given parameters.
   */
  [Actions.create](state, { type, parent, position=0 }) {
    let record = new Block({ parent, type })

    // If the provided position is a Block, place the new block right
    // after it.
    if (position instanceof Block) {
      position = state.indexOf(position) + 1
    }

    return insertAt(state, record, position)
  },

  /**
   * Actions.destroy
   * Given an id, remove that block and eliminate all other blocks
   * nested inside of it.
   */
  [Actions.destroy](state, id) {
    return deepRemove(state, id)
  },

  /**
   * Actions.update
   * Given a parameters, find the block associated with those
   * parameters (by id) and update the content inside. All other
   * attributes will not be changed.
   */
  [Actions.update](state, params) {
    var block = findBy(state, params.id)

    block.content = assign(block.content, params.content)

    return state
  },

  /**
   * Actions.move
   * Adjust the position of a given block.
   */
  [Actions.move](state, { block, distance }) {
    let without = state.filter(i => i !== block)
    let before  = siblingAt(state, block, distance)

    return insertAt(without, block, state.indexOf(before))
  }

}
