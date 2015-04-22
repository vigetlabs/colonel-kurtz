/**
 * Given a list of blocks, determine if a provided block
 * is the last child of its parent
 */

import siblingsOf from 'utils/siblingsOf'

export default function(list, block) {
  let siblings = siblingsOf(list, block)

  return siblings[siblings.length - 1] === block
}
