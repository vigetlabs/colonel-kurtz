export default function blocksToJson (items) {
  // If items are null or undefined, assume an empty list
  items = items || []

  let root = items.filter(i => !i.parent)

  function jsonify (block) {
    let children = items.filter(i => i.parent === block)

    return {
      content : block.content,
      type    : block.type,
      blocks  : children.map(jsonify)
    }
  }

  return root.map(jsonify)
}
