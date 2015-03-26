import addBlockType from 'utils/addBlockType'
import manifest     from 'manifest'

let BlockTypeStore = {

  getInitialState() {
    return manifest.blockTypes
  },

  deserialize(seed=[]) {
    return addBlockType(seed.concat(this.getInitialState()))
  },

  toString() {
    return 'blockTypes'
  }

}

export default BlockTypeStore
