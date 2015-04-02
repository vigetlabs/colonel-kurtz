/**
 * notPrivate
 * Get all items that do not have the `private` attribute
 */

export default function (list) {
  return list.filter(i => !i.private)
}
