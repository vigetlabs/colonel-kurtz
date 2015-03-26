/**
 * Migration runner
 *
 * Note: This should be written in nodejs friendly
 * javascript
 */

var config      = require('../package')
var transformer = require('./transformer')

var migrations = [
  require('./migrations/2.0.0')
]

export default function(state) {
  var migrated = transformer(state || {}, migrations)

  migrated.version = config.version

  return migrated
}
