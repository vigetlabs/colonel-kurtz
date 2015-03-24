import addBlockType from 'utils/addBlockType'
import manifest     from 'manifest'

let BlockTypeStore = {

  getInitialState(seed=[]) {
    return addBlockType(seed.concat(manifest.blockTypes))
  },

  find(state, id) {
    return state.filter(b => b.id === id)[0]
  },

  serialize() {
    return undefined
  },

  toString() {
    return 'blockTypes'
  }

}

export default BlockTypeStore
