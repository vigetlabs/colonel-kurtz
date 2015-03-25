/**
 * InsertAfter
 * Given a list and an item, non-destructively return a new list
 * including the item after a given position
 */

export default (list, item, position=list.length) => {
  let head = list.slice(0, position)
  let tail = list.slice(position)

  return head.concat(item, tail)
}
