module.exports = {

  getInitialState() {
    return {
      allow       : null,
      blockTypes  : [],
      maxChildren : Infinity
    }
  },

  deserialize(options) {
    return Object.assign(this.getInitialState(), options)
  }

}
