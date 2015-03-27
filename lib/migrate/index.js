/**
 * Migration runner
 *
 * Note: This should be written in nodejs friendly
 * javascript
 */

var forward = require('./forward')
var version = require('../../package').version

var migrations = [
  require('./migrations/2.0.0')
]

module.exports = function (state) {
  var version = '0.0.0'

  state = state || {}

  if (state.system) {
    version = state.system.version
  }

  return forward(version, state, migrations)
}
