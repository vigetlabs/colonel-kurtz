/* @flow */

var Constants  = require('../constants/block_type_constants')
var Dispatcher = require('../dispatcher')

var BlockTypeActions = {

  create(params:{ id:string; component:ReactElement  }) : void {
    var type:string = Constants.BLOCK_TYPE_CREATE

    Dispatcher.dispatch({
      component: params.component,
      id: params.id,
      type: type
    })
  }

}

module.exports = BlockTypeActions
