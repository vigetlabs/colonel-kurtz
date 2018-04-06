let BlockType = require('../../models/BlockType')
let Block = require('../../models/Block')
let typesForBlock = require('../typesForBlock')

describe('Utils - typesForBlock', function() {
  describe('when not given a block', function() {
    let normal = new BlockType({ id: 'social' })
    let root = new BlockType({ id: 'child-only', root: false })

    it('filters out non-root blocks', function() {
      typesForBlock([root, normal]).should.eql([normal])
    })
  })

  describe('when given a block that includes specific types', function() {
    let parent = new BlockType({ id: 'parent', types: ['child-only'] })
    let root = new BlockType({ id: 'child-only', root: false })
    let block = new Block({ type: 'parent' })

    it('includes root blocks', function() {
      typesForBlock([root, parent], block).should.eql([root])
    })
  })
})
