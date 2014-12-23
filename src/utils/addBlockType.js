/**
 * This utility adds a new block type to ColonelKurtz. If not given a
 * valid React element, it produces one using ./createBlock
 *
 * @flow
 */

var CreateBlockType = require('../actions/block_type/create')
var React           = require('react')
var createBlock     = require('./createBlock')

module.exports = function (options: Object): void {
  var component = options.component

  if (React.isValidElement(component) === false) {
    component = createBlock(component)
  }

  CreateBlockType({ ...options, component })
}
