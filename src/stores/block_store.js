import Actions      from 'actions/blocks'
import Block        from 'models/block'
import blocksToJson from 'utils/blocksToJson'
import findBy       from 'utils/findBy'
import jsonToBlocks from 'utils/jsonToBlocks'

let BlockStore = {

  getInitialState(blocks=[]) {
    return jsonToBlocks(blocks)
  },

  serialize(state) {
    return blocksToJson(state)
  },

  toString() {
    return 'blocks'
  },

  [Actions.create](state, { content, parent, type }) {
    return state.concat(new Block({ content, parent, type }))
  },

  [Actions.destroy](state, id) {
    return state.filter(function(node) {
      for (var n = node; n; n = n.parent) {
        if (n.id == id) return false
      }
      return true
    })
  },

  [Actions.update](state, params) {
    var block = findBy(state, params.id, 'id')
    block.content = { ...block.content, ...params.content }
    return state
  }

}

export default BlockStore
