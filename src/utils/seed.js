/**
 * Given a root block list, this function will populate
 * an editor with content
 *
 * @flow
 */

var CreateBlock    = require('../actions/block/create')
var BlockListStore = require('../stores/block_list_store')

module.exports = function seed (parentBlockListId: number, blocks: Array): void {

  blocks.forEach(function(block: SeedBlock, position: number): void {

    CreateBlock({
      content: block.content,
      parentBlockListId,
      position,
      type: block.type
    })

    if (Array.isArray(block.blocks)) {
      seed(BlockListStore.last().id, block.blocks)
    }

  })

}
