/**
 * respondsTo
 * Can an object respond to a method name?
 */

module.exports = function(obj, key) {
  return !!(obj && typeof obj[key] === 'function')
}
