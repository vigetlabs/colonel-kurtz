import BlockType from '../../models/BlockType'
import Block from '../../models/Block'
import typesForBlock from '../typesForBlock'

describe('Utils - typesForBlock', function () {
  describe('when not given a block', function () {
    let normal = new BlockType({ id: 'social' })
    let root = new BlockType({ id: 'child-only', root: false })

    it('filters out non-root blocks', function () {
      expect(typesForBlock([root, normal])).toEqual([normal])
    })
  })

  describe('when given a block that includes specific types', function () {
    let parent = new BlockType({ id: 'parent', types: ['child-only'] })
    let root = new BlockType({ id: 'child-only', root: false })
    let block = new Block({ type: 'parent' })

    it('includes root blocks', function () {
      expect(typesForBlock([root, parent], block)).toEqual([root])
    })
  })
})
