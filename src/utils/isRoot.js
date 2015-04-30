/**
 * isRoot
 * For displaying root level blocks, we only care about blocks that don't have
 * parents.
 */

module.exorts = function (lists) {
  return lists.filter(i => !i.parent)
}
