/**
 * This utility adds a new block type to ColonelKurtz. If not given a
 * valid React element, it produces one using ./createBlock
 */

var React       = require('react')
var createBlock = require('./createBlock')

module.exports = function (config=[]) {
  return config.map(options => {
    var component = options.component

    if (typeof component === 'object') {
      component = createBlock(component)
    }

    return { ...options, component }
  })
}
