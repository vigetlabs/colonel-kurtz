/**
 * Given a root block list, this function will populate
 * an editor with content
 */

var BlockStore = require('stores/block_store')

module.exports = function seed (parent, blocks): void {
  return BlockStore._seed(parent, blocks)
}
