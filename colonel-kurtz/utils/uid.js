/* @flow */

var uidCounter = 0;

var uid = function(): number {
  uidCounter += 1
  return uidCounter
}

module.exports = uid
