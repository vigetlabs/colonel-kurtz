/**
 * System Store
 * Keeps track of any information necessary for the system
 * to work properly
 */

export default {

  getInitialState() {
    return {
      version: process.env.VERSION
    }
  },

  serialize() {
    return this.getInitialState()
  },

  toString() {
    return 'system'
  }

}
