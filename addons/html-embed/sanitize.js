let scriptTags = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
let styleTags = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi

export function sanitize(html) {
  return html.replace(scriptTags, '').replace(styleTags, '')
}
