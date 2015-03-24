import { tag } from 'microcosm'

export default tag({

  create(type, parent) {
    return { type, parent }
  },

  destroy(id) {
    return id
  },

  update(id, content) {
    return { id, content }
  }

})
