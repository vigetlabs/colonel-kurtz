/**
 * Migration runner
 *
 * Important: This should be written in nodejs friendly javascript
 */

var forward = require('./forward')

// Since this code has to also run in the browser, we can't simply
// traverse a directory of migrations. They will run in the following
// order:
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
