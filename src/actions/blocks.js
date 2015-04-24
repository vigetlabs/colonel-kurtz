import { tag } from 'microcosm'

export default tag({
  create(type, position, parent) {
    return { type, position, parent }
  },

  destroy(id) {
    return id
  },

  update(id, content) {
    return { id, content }
  },

  move(from, to) {
    return { from, to }
  }
})
