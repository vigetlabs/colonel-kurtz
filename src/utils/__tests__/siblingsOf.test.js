import Block from '../../models/Block'
import siblingsOf from '../siblingsOf'

describe('Utils - siblingsOf', function () {
  it('returns all top level parents if no parent exists', function () {
    let parent = new Block({})
    let blocks = [parent, new Block({ parent }), new Block({ parent })]
    let result = siblingsOf(blocks, parent)

    expect(result).toEqual([parent])
  })

  it(`returns all children of a block's parent`, function () {
    let parent = new Block({})
    let child = new Block({ parent })
    let sibling = new Block({ parent })

    let blocks = [parent, child, sibling]
    let result = siblingsOf(blocks, child)

    expect(result).toEqual([child, sibling])
  })
})
