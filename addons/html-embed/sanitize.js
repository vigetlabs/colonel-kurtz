const toArray = list => Array.prototype.slice.call(list)

export function sanitize(html) {
  let bucket = document.createElement('div')

  bucket.innerHTML = html

  let doNotAllow = toArray(bucket.querySelectorAll('script, style'))

  doNotAllow.forEach(el => el.parentNode.removeChild(el))

  return bucket.innerHTML
}
