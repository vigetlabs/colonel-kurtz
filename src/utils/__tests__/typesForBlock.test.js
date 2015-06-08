let BlockType     = require('../../models/BlockType')
let Block         = require('../../models/Block')
let typesForBlock = require('../typesForBlock')

describe('Utils - typesForBlock', function() {

  describe('when not given a block', function() {
    let normal    = new BlockType({ id: 'social' })
    let childOnly = new BlockType({ id: 'child-only', childOnly: true })

    it ('filters out childOnly blocks', function() {
      typesForBlock([ childOnly, normal ]).should.eql([ normal ])
    })
  })

  describe('when given a block that includes specific types', function() {
    let parent    = new BlockType({ id: 'parent', types: [ 'child-only' ] })
    let childOnly = new BlockType({ id: 'child-only', childOnly: true })
    let block     = new Block({ type: 'parent' })

    it ('includes childOnly blocks', function() {
      typesForBlock([ childOnly, parent ], block).should.eql([ childOnly ])
    })
  })

})
