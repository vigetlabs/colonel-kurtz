function copyOver(next, obj) {
  for (var key in obj) {
    next[key] = obj[key]
  }

  return next
}

export function assign(subject, ...values) {
  return values.reduce(copyOver, subject)
}
