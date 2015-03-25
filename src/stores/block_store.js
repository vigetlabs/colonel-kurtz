import Actions      from 'actions/blocks'
import Block        from 'models/block'
import blocksToJson from 'utils/blocksToJson'
import findBy       from 'utils/findBy'
import insertAt     from 'utils/insertAt'
import jsonToBlocks from 'utils/jsonToBlocks'

let BlockStore = {
  serialize   : blocksToJson,
  deserialize : jsonToBlocks,

  getInitialState() {
    return []
  },

  toString() {
    return 'blocks'
  },

  [Actions.append](state, params) {
    return state.concat(new Block(params))
  },

  [Actions.create](state, { type, parent, position=0 }) {
    let record = new Block({ parent, type })

    if (position instanceof Block) {
      position = state.indexOf(position) + 1
    }

    return insertAt(state, record, position)
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
