import Block from 'models/block'

export default function jsonToBlocks (blocks=[], parent) {
  return blocks.reduce(function (memo, params) {
    let block    = new Block({ ...params, parent })
    let children = jsonToBlocks(params.blocks, block)

    return memo.concat(block, children)
  }, [])
}
