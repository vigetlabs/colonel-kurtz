/* @flow */

var Constants  = require('constants/block_type_constants')
var Dispatcher = require('../dispatcher')

var BlockTypeActions = {

  create(params) {
    Dispatcher.dispatch({
      type: Constants.BLOCK_TYPE_CREATE,
      id: params.id,
      component: params.component
    })
  }

}
module.exports = BlockTypeActions
