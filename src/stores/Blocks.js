/**
 * Block Store
 *
 * The Block Store is responsible for defining how blocks are stored
 * within Colonel Kurtz. Whenever an action associated with block
 * records is pushed into the system, this module tells Colonel Kurtz
 * how that action manipulates block data.
 */

import Actions    from 'actions/blocks'
import Block      from 'models/Block'
import assign     from 'utils/assign'
import deepRemove from 'utils/deepRemove'
import findBy     from 'utils/findBy'
import insertAt   from 'utils/insertAt'
import siblingsOf from 'utils/siblingsOf'

export default {

  /**
   * getInitialState
   * Runs whenever the application starts. Provides the expected array
   * relied upon by other operations
   */
  getInitialState() {
    return []
  },

  /**
   * toString
   * Tells Colonel Kurtz that this store manages the `blocks` key. Any
   * modifications related to blocks can be found there
   */
  toString() {
    return 'blocks'
  },

  /**
   * For simplicity, blocks are stored in an array, `blocksToJson`
   * takes a list of blocks and transforms them into the nested structure
   * shown in the front end
   */
  serialize: require('utils/blocksToJson'),

  /**
   * As mentioned previously, blocks are serialized to a nested
   * structure. jsonToBlocks takes this nested structure and flattens
   * into a list for this store.
   */
  deserialize: require('utils/jsonToBlocks'),

  /**
   * Actions.create
   * Produces a new block based upon given parameters.
   * If the provided position is a Block, place the new block right
   * after it.
   */
  [Actions.create](state, { type, parent, position=0 }) {
    let record = new Block({ parent, type })

    if (position instanceof Block) {
      position = state.indexOf(position) + 1
    }

    return insertAt(state, record, position)
  },

  /**
   * Actions.destroy
   * Given an id, remove that block and eliminate all other blocks
   * nested inside of it. This is important so removing that `section`
   * type blocks also eliminates children
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
   * Actions.shift
   * Adjust the position of a given block.
   */
  [Actions.shift](state, { id, delta }) {
    // Get the current item
    let item = findBy(state, id)

    // Find all siblings of that item
    let siblings = siblingsOf(state, item)

    // Determine the new index by shifting along sibligns
    let index = siblings.indexOf(item) + delta

    // Next translate that to be within context to the greater list
    let goal = state.indexOf(siblings[index])

    // Next produce a list without the current item
    let without = state.filter(i => i !== item)

    // Finally, return a new list with the item injected at the desired location
    return insertAt(without, item, goal)
  }

}
