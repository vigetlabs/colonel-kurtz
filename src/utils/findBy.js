export default function(records, val, param='id') {
  let records = records.filter(i => i[param] == val)

  if (records.length) {
    return records[0]
  }

  throw new Error(`Unable to find record with ${ param } of ${ id }`)
}
