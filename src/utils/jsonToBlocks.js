import Block from 'models/Block'

export default function jsonToBlocks (blocks, parent) {
  // If blocks are null or undefined, assume an empty list
  blocks = blocks || []

  return blocks.reduce(function (memo, params) {
    let block    = new Block({ ...params, parent })
    let children = jsonToBlocks(params.blocks, block)

    return memo.concat(block, children)
  }, [])
}
