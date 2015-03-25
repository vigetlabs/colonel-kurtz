export default function(items, val, param='id') {
  let matches = items.filter(i => i[param] == val)

  if (matches.length) {
    return matches[0]
  }

  throw new Error(`Unable to find record with ${ param } of ${ val }`)
}
