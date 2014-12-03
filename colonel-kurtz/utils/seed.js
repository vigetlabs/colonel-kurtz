/**
 * Given a root block list, this function will populate
 * an editor with content
 *
 * @flow
 */

var BlockActions   = require('../actions/block_actions')
var BlockListStore = require('../stores/block_list_store')

module.exports = function seed (parentBlockListId: number, blocks: Array): void {

  blocks.forEach(function(block, position) {

    BlockActions.create({ position, parentBlockListId, ...block })

    if (Array.isArray(block.blocks)) {
      seed(BlockListStore.last().id, block.blocks)
    }

  })

}
