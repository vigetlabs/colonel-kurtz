/**
 * This utility adds a new block type to ColonelKurtz. If not given a
 * valid React element, it produces one using ./createBlock
 *
 * @flow
 */

var BlockTypeActions = require('../actions/block_type_actions')
var createBlock      = require('./createBlock')
var React            = require('react')

module.exports = function (id: string, component: any): void {
  if (React.isValidElement(component) === false) {
    component = createBlock(component)
  }

  BlockTypeActions.create({ id, component })
}
