import Actions from 'actions/blocks'
import Block   from 'models/block'

let find = function(blocks, id) {
  let records = blocks.filter(i => i.id == id)

  if (records.length) {
    return records[0]
  }

  throw new Error(`Unable to find block with id of ${ id }`)
}

let BlockStore = {

  getInitialState(seed=[]) {
    return BlockStore.deserialize(seed)
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
    var block = find(state, params.id)
    block.content = { ...block.content, ...params.content }
    return state
  },

  deserialize(state) {
    return state.reduce(function(memo, { blocks, content, type='section' }) {
      return memo.concat(new Block({ content, parent, type }))
    }, [])
  },

  serialize(state) {
    let root = state.filter(i => !i.parent)

    return root.map(function jsonify (block) {
      let children = state.filter(i => i.parent === block)

        return {
          content : block.content,
          type    : block.type,
          blocks  : children.map(jsonify)
        }
    })
  },

  toString() {
    return 'blocks'
  }

}

export default BlockStore
