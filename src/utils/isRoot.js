/**
 * isRoot
 * For displaying root level blocks, we only care about blocks that don't have
 * parents.
 */

export default function (lists) {
  return lists.filter(i => !i.parent)
}
