/* @flow */

var BlockConstants = require('../constants/block_constants')
var Dispatcher = require('../dispatcher')

var BlockActions = {

  create(params: {parentBlockListId: number; position: number}) {
    Dispatcher.dispatch({
      type: BlockConstants.BLOCK_CREATE,
      parentBlockListId: params.parentBlockListId,
      position: params.position
    })
  },

  destroy(params: {blockId: number; blockListId: number}) {
    Dispatcher.dispatch({
      type: BlockConstants.BLOCK_DESTROY,
      blockId: params.blockId,
      blockListId: params.blockListId
    })
  }

}
module.exports = BlockActions
