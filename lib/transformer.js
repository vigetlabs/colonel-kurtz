var isNewer = require('./isNewer')

module.exports = function(state, migrations) {

  var operations = migrations.filter(function(migration) {
    return isNewer(migration.version, state.version)
  })

  return operations.reduce(function(data, migration) {
    return migration.up(data)
  }, state)

}
