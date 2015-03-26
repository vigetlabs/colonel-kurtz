import migration from '../2.0.0'

describe('2.0.0 migration', function() {
  let premigration  = [{ type: 'text' }]
  let postmigration = {
    blocks: [{
      blocks  : premigration,
      content : {},
      type    : 'section'
    }]
  }

  it ('wraps a section block around the data', function() {
    let result = migration.up(premigration)

    result.blocks.length.should.equal(1)

    result.blocks[0].type.should.equal('section')
    result.blocks[0].blocks.should.equal(premigration)
  })

  it ('can revert back to the original state', function() {
    let result = migration.down(postmigration)

    result.length.should.equal(premigration.length)
    result[0].should.have.property('type', 'text')
  })

})
