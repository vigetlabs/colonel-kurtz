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

  destroy(params: {blockId: number; parentBlockListId: number}) {
    Dispatcher.dispatch({
      type: BlockConstants.BLOCK_DESTROY,
      blockId: params.blockId,
      parentBlockListId: params.parentBlockListId
    })
  },

  update(params: {blockId: number; content: Object}) {
    var { blockId, content } = params

    Dispatcher.dispatch({
      type: BlockConstants.BLOCK_UPDATE,
      blockId: blockId,
      content: content
    })
  }

}
module.exports = BlockActions
