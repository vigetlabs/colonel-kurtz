/* @flow */

var Constants  = require('../constants/block_type_constants')
var Dispatcher = require('../dispatcher')

var BlockTypeActions = {

  create(params: ?Object) : void {
    var type:string = Constants.BLOCK_TYPE_CREATE

    Dispatcher.dispatch({ type, params })
  }

}

module.exports = BlockTypeActions
