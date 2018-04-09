import DefaultBlockType from '../components/DefaultBlockType'
import { assign } from '../utils/data'

let defaults = {
  component: DefaultBlockType,
  group: null,
  maxChildren: Infinity,
  root: true,
  types: []
}

export default class BlockType {
  constructor(config) {
    assign(this, defaults, config)
  }

  valueOf() {
    return this.id
  }
}
