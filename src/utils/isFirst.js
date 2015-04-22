/**
 * Given a list of blocks, determine if a provided block
 * is the first child of its parent
 */

import siblingsOf from 'utils/siblingsOf'

export default function(list, block) {
  let siblings = siblingsOf(list, block)

  return siblings[0] === block
}
