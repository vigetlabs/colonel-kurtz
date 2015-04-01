/**
 * childrenOf
 * Get the children of a provided block
 */

export default function childrenOf (block, list) {
  return list.filter(i => i.parent === block)
}
