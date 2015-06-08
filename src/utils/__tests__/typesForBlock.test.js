let BlockType     = require('../../models/BlockType')
let typesForBlock = require('../typesForBlock')

describe('Utils - typesForBlock', function() {

  describe('when not given a block', function() {
    let private = new BlockType({ id: 'private', private: true })
    let social  = new BlockType({ id: 'social' })

    it ('filters out private blocks', function() {
      typesForBlock([ private, social ]).should.eql([ social ])
    })
  })

})
