import invariant    from 'react/lib/invariant'
import addBlockType from 'utils/addBlockType'
import manifest     from 'manifest'

import { Store } from 'microcosm'

class BlockTypeStore extends Store {

  getInitialState(seed=[]) {
    return addBlockType(seed.concat(manifest.blockTypes))
  }

  within(types=[]) {
    return this.state.filter(i => types.indexOf(i.id) > -1)
  }

  without(types=[]) {
    return this.state.filter(i => types.indexOf(i.id) === -1)
  }

  subset(type) {
    let types = this.find(type).types

    return types === '*' ? this.without(type) : this.within(types)
  }

  find(id) {
    var type = this.state.filter(b => b.id === id)[0]

    invariant(type, `Unable to find block type with an id of ${ type }`)

    return type
  }

  _create(params) {
    invariant(params.id, `BlockTypes must have an identifier`)
    this.state = this.state.concat(params)
  }

}

export default BlockTypeStore
