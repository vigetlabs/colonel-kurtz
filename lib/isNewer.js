/**
 * isNewer
 * a ridiculously simple semver checker
 */

var semverify = function(string) {
  string = string || '0.0.0'

  let base = string.split('.').map(function(num) {
    return parseInt(num, 10)
  })

  return { major: base[0], minor: base[1], patch: base[2] }
}

module.exports = function(neo, old) {
  neo = semverify(neo)
  old = semverify(old)

  // If the major version is greater, this is blatantly
  // a new version
  if (neo.major > old.major) {
    return true
  }

  // if the major version matches, but the minor version is greater,
  // this is a new version
  if (neo.major === old.major && neo.minor > old.minor) {
    return true
  }

  // finally, if the major and minor or equal, but the page isn't,
  // this is a new version
  if (neo.minor === old.minor && neo.patch > old.patch) {
    return true
  }

  return false
}
