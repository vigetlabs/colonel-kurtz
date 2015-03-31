/**
 * Move
 * Given a list and an item, non-destructively return a new list
 * where a given item has been moved by a given delta
 */

import insertAt from './insertAt'

export default (list, item, delta=0) => {
  let index   = list.indexOf(item) + delta
  var without = list.filter(i => i !== item)

  return insertAt(without, item, index)
}
