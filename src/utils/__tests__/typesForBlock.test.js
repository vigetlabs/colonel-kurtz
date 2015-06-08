let BlockType     = require('../../models/BlockType')
let typesForBlock = require('../typesForBlock')

describe('Utils - typesForBlock', function() {

  describe('when not given a block', function() {
    let childOnly = new BlockType({ id: 'child-only', childOnly: true })
    let normal    = new BlockType({ id: 'social' })

    it ('filters out childOnly blocks', function() {
      typesForBlock([ childOnly, normal ]).should.eql([ normal ])
    })
  })

})
