/**
 * typesForBlock
 * Extracted logic to get the types of children a block may have
 */

module.exports = function (blockTypes, block) {
  if (block) {
    let types = blockTypes.filter(i => i.id === block.type)[0].types
    return blockTypes.filter(i => types.indexOf(i.id) > -1)
  } else {
    return blockTypes.filter(type => !type.private)
  }
}
