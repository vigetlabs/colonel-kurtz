export default {

  create(params) {
    return params
  },

  destroy(id) {
    return id
  },

  update(id, content) {
    return { id, content }
  },

  move(fromId, toId) {
    return { fromId, toId }
  }

}
