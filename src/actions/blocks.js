let { tag } = require('microcosm')

module.exports = tag({
  create(type, position, parent) {
    return { type, position, parent }
  },

  destroy(id) {
    return id
  },

  update(id, content) {
    return { id, content }
  },

  move(block, distance) {
    return { block, distance }
  }
})
