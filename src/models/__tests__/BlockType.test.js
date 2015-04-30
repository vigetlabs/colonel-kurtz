let BlockType = require('../BlockType')

describe('Models - BlockType', function() {

  it ('serialize to an id', function() {
    let type = new BlockType({ id: 'fiz' })
    type.valueOf().should.equal(type.id)
  })

})
