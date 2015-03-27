import addBlockType from 'utils/addBlockType'
import manifest     from 'manifest'

let BlockTypeStore = {

  getInitialState() {
    return manifest.blockTypes
  },

  deserialize(seed=[]) {
    return addBlockType(seed.concat(this.getInitialState()))
  },

  serialize() {
    // Do not serialize block types
    return undefined
  },

  toString() {
    return 'blockTypes'
  }

}

export default BlockTypeStore
