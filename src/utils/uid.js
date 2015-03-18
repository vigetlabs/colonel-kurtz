/* @flow */

var uidCounter = 0;

var uid = function(): number {
  return `c${ uidCounter += 1 }`
}

module.exports = uid
