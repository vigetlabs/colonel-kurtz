/**
 * Forward
 * Given a current state, determine and run all future migrations
 */

var isNewer = require('./isNewer')

module.exports = function(version, state, migrations) {

  var operations = migrations.filter(function(migration) {
    return isNewer(migration.version, version)
  })

  return operations.reduce(function(data, migration) {
    return migration.up(data)
  }, state)
}
