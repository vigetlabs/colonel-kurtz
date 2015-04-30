/**
 * siblingsOf
 * Get the siblings of a provided block
 */

module.exports = function siblingsOf (list, block) {
  if (block.parent) {
    return list.filter(i => i.parent === block.parent)
  } else {
    return list.filter(i => !i.parent)
  }
}
