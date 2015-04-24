/**
 * Given a list of blocks, determine if a provided block
 * is the first child of its parent
 */

import siblingsOf from 'utils/siblingsOf'

export default function(list, block, delta) {
  let siblings = siblingsOf(list, block)
  let index    = siblings.indexOf(block)

  return index !== -1 ? siblings[index + delta] : null
}
