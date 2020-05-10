import Block from '../models/Block'
import { assign } from './data'

export default function jsonToBlocks(blocks, parent) {
  // If blocks are null or undefined, assume an empty list
  blocks = blocks || []

  return blocks.reduce(function (memo, params) {
    let block = new Block(assign({}, params, { parent }))
    let children = jsonToBlocks(params.blocks, block)

    return memo.concat(block, children)
  }, [])
}
