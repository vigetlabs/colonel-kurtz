/**
 * System Store
 *
 * Keeps track of any information necessary for the system
 * to work properly. Currently, this is limited to the version of
 * Colonel Kurtz for the individual instance. This is helpful to
 * plugins, such as the data migration plugin.
 */

export default {

  /**
   * getInitialState
   * Version is defined by Webpack during the build process.
   * See the plugins section of webpack.config.js for more details
   */
  getInitialState() {
    return {
      version: process.env.VERSION
    }
  },

  /**
   * serialize
   * Always serialize to the initial state, this information should
   * never change at run time.
   */
  serialize() {
    return this.getInitialState()
  },

  /**
   * toString
   * Tells Colonel Kurtz that system information can be found at the
   * `system` key
   */
  toString() {
    return 'system'
  }

}
