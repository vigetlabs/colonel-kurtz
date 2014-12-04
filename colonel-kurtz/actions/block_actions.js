/* @flow */

var BlockConstants = require('../constants/block_constants')
var Dispatcher = require('../dispatcher')

var BlockActions = {

  create(params: { content: ?Object; parentBlockListId: number; position: number; type: string }) {
    var type     = BlockConstants.BLOCK_CREATE
    var position = params.position

    Dispatcher.dispatch({ type, params, position })
  },

  destroy(params: { blockId: number; parentBlockListId: number }) {
    var type = BlockConstants.BLOCK_DESTROY

    Dispatcher.dispatch({ type, ...params })
  },

  update(blockId: number, content: string) {
    var type = BlockConstants.BLOCK_UPDATE

    Dispatcher.dispatch({ type, blockId, content })
  }

}

module.exports = BlockActions
