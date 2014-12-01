/* @flow */

var BlockConstants = require('../constants/block_constants')
var Dispatcher = require('../dispatcher')

var BlockActions = {

  create(params: {parentBlockListId: number; position: number; blockType: string}) {
    Dispatcher.dispatch({
      type: BlockConstants.BLOCK_CREATE,
      blockType: params.blockType,
      parentBlockListId: params.parentBlockListId,
      position: params.position
    })
  },

  destroy(params: {blockId: number; parentBlockListId: number}) {
    Dispatcher.dispatch({
      type: BlockConstants.BLOCK_DESTROY,
      blockId: params.blockId,
      parentBlockListId: params.parentBlockListId
    })
  },

  update(blockId: number, content: string) {
    Dispatcher.dispatch({ type: BlockConstants.BLOCK_UPDATE, blockId, content })
  }

}
module.exports = BlockActions
