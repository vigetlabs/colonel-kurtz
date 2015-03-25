export default function(items=[]) {
  let root = items.filter(i => !i.parent)

  let jsonify = block => {
    let children = items.filter(i => i.parent === block)

    return {
      content : block.content,
      type    : block.type,
      blocks  : children.map(jsonify)
    }
  }

  return root.map(jsonify)
}
