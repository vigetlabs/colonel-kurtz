/* @flow */

var BlockListConstants = require('../constants/block_list_constants')

var Dispatcher = require('../dispatcher')

var BlockListActions = {

  create(params: { editorId: number; blockId: number }): void {
    var type = BlockListConstants.BLOCK_LIST_CREATE

    Dispatcher.dispatch({ type, params })
  }

}

module.exports = BlockListActions
