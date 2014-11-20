/* @flow */

var BlockListConstants = require('../constants/block_list_constants')
var Dispatcher = require('../dispatcher')

var BlockListActions = {

  create(params: Object) {
    Dispatcher.dispatch({
      type: BlockListConstants.BLOCK_LIST_CREATE,
      editorId: params.editorId,
      blockId: params.blockId
    })
  }

}

module.exports = BlockListActions
