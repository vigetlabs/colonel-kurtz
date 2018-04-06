let Block = require('../../models/Block')
let blocksToJson = require('../blocksToJson')

describe('Utils - blocksToJson', function() {
  it('serializes through children', function() {
    let parent = new Block({})
    let blocks = [parent, new Block({ parent }), new Block({ parent })]
    let result = blocksToJson(blocks)

    result.length.should.equal(1)
    result[0].blocks.length.should.equal(2)
  })

  it('does not include clientOnly flags', function() {
    let parent = new Block({})
    let blocks = [parent, new Block({ parent }), new Block({ parent })]
    let result = blocksToJson(blocks)

    result.should.not.have.property('clientOnly')
  })

  it('just returns an empty object if no value is given', function() {
    blocksToJson().length.should.equal(0)
  })
})
