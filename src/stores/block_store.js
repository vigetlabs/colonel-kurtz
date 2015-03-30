/**
 * Block Store
 *
 * The Block Store is responsible for defining how blocks are stored
 * within Colonel Kurtz. Whenever an action associated with block
 * records is pushed into the system, this module tells Colonel Kurtz
 * how that action manipulates block data.
 */

import Actions      from 'actions/blocks'
import Block        from 'models/block'
import findBy       from 'utils/findBy'
import insertAt     from 'utils/insertAt'

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
   * Actions.append
   * Simply add a new block at the end of the list
   */
  [Actions.append](state, params) {
    return state.concat(new Block(params))
  },

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
    return state.filter(function(node) {
      for (var n = node; n; n = n.parent) {
        if (n.id == id) return false
      }
      return true
    })
  },

  /**
   * Actions.update
   * Given a parameters, find the block associated with those
   * parameters (by id) and update the content inside. All other
   * attributes will not be changed.
   */
  [Actions.update](state, params) {
    var block = findBy(state, params.id, 'id')

    block.content = { ...block.content, ...params.content }

    return state
  }

}
