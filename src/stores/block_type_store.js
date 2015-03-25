import addBlockType from 'utils/addBlockType'
import manifest     from 'manifest'

let BlockTypeStore = {

  getInitialState() {
    return manifest.blockTypes
  },

  deserialize(seed) {
    return addBlockType(seed.concat(manifest.blockTypes))
  },

  toString() {
    return 'blockTypes'
  }

}

export default BlockTypeStore
