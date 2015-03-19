/* @flow */

var invariant    = require('react/lib/invariant')
var addBlockType = require('utils/addBlockType')

import { Store } from 'microcosm'

var _defaults = {
  icon  : null,
  types : null
}

class BlockTypeStore extends Store {

  getInitialState(seed) {
    return addBlockType(seed)
  }

  within(types=[]) {
    return this.state.filter(i => types.indexOf(i.id) > -1)
  }

  subset(type) {
    return this.within(this.find(type).types)
  }

  find(id) {
    var type = this.state.filter(b => b.id === id)[0]

    invariant(type, `Unable to find block type with an id of ${ type }`)

    return type
  }

  _create(params) {
    invariant(params.id, `BlockTypes must have an identifier`)

    this.state = this.state.concat({ ..._defaults, ...params })
  }

}

export default BlockTypeStore
