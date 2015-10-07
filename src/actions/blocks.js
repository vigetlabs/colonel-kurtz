module.exports = {
  create(type, position, parent) {
    return { type, position, parent }
  },

  destroy(id) {
    return id
  },

  update(id, content) {
    // valueOf() allows blocks to be passed, it will return
    // the id
    return { id: id.valueOf(), content }
  },

  move(block, distance) {
    return { block, distance }
  },

  insertAt(block, containingBlock, preceedingBlock) {
    return { block, containingBlock, preceedingBlock }
  }
}
