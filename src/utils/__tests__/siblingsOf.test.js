let Block = require('../../models/Block')
let siblingsOf = require('../siblingsOf')

describe('Utils - siblingsOf', function() {

  it ('returns all top level parents if no parent exists', function() {
    let parent = new Block({})
    let blocks = [ parent, new Block({ parent }), new Block({ parent }) ]
    let result = siblingsOf(blocks, parent)

    result.should.eql([ parent ])
  })

  it (`returns all children of a block's parent`, function() {
    let parent  = new Block({})
    let child   = new Block({ parent })
    let sibling = new Block({ parent })

    let blocks = [ parent, child, sibling ]
    let result = siblingsOf(blocks, child)

    result.should.eql([ child, sibling ])
  })

})
