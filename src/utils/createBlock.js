/**
 * This utility takes an object and mixes in the required boilerplate
 * needed to integrate it into ColonelKurtz.
 *
 * @flow
 */

var React     = require('react')
var BlockType = require('../mixins/block_type')

module.exports = function (spec: Object): any {
  var mixins = spec.mixins || []

  if (mixins.indexOf(BlockType) < 0) {
    mixins = mixins.concat(BlockType)
  }

  return React.createClass({ ...spec, ...{ React, mixins }})
}
