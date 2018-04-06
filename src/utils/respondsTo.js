/**
 * respondsTo
 * Can an object respond to a method name?
 */

export default function responesTo(obj, key) {
  return !!(obj && typeof obj[key] === 'function')
}
