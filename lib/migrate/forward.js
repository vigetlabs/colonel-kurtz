/**
 * Forward
 * Given a current state, determine and run all future migrations
 */

var isNewer = require('./isNewer')

module.exports = function(version, state, migrations) {

  var operations = migrations.filter(function(migration) {
    return isNewer(migration.version, version)
  })

  if (operations.length) {
    console.log('Upgrading Colonel Kurtz from version ' +
                version + ' to ' + operations[operations.length - 1].version)
  }

  return operations.reduce(function(data, migration) {
    var update = migration.up(data)

    console.log('✓ ' + migration.version)

    return update
  }, state)
}
