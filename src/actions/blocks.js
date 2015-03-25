import { tag } from 'microcosm'

export default tag({

  append(type, parent) {
    return { type, parent }
  },

  create(type, position, parent) {
    return { type, position, parent }
  },

  destroy(id) {
    return id
  },

  update(id, content) {
    return { id, content }
  }

})
