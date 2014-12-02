/* @flow */

var Constants  = require('../constants/block_type_constants')
var Dispatcher = require('../dispatcher')
var Immutable  = require('immutable')

var _blockTypes = Immutable.List()

var BlockTypeStore = {

  keys(): Array<string> {
    return _blockTypes.toArray().map(b => b.id)
  },

  find (id:number): Object {
    return _blockTypes.find(b => b.id === id)
  },

  _create (id: string, component: ReactElement): void {
    _blockTypes = _blockTypes.push({ id, component })
  },

  dispatchToken: Dispatcher.register(function(action: Object) {
    switch (action.type) {
      case Constants.BLOCK_TYPE_CREATE:
        BlockTypeStore._create(action.id, action.component)
        break
      default:
        // do nothing
    }
  })

}

module.exports = BlockTypeStore
