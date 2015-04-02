/**
 * childrenOf
 * Get the children of a provided block
 */

export default function childrenOf (list, block) {
  return list.filter(i => i.parent === block)
}
