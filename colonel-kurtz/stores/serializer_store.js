/* @flow */
var Block     = require('../stores/block_store')
var BlockList = require('../stores/block_list_store')

var Serializer = {

  serializeBlock(id) {
    var { type, content } = Block.find(id)
    var childBlockList = Serializer.serializeBlockList(BlockList.findByBlockId(id).id)

    return { id, type, content, childBlockList }
  },

  serializeBlockList(id) {
    var blocks = BlockList.find(id).all().map(Serializer.serializeBlock)
    return { id, blocks }
  }

}

module.exports = Serializer
