/**
 * InsertAfter
 * Given a list and an item, non-destructively return a new list
 * including the item after a given position
 */

let inRange = (value, min, max) => Math.max(min, Math.min(max, value))

export default (list, item, position=list.length) => {
  let corrected = inRange(position, 0, list.length)

  let head = list.slice(0, corrected)
  let tail = list.slice(corrected)

  return head.concat(item, tail)
}
