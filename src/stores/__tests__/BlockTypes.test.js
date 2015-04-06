import BlockTypes from '../BlockTypes'

describe('Stores - BlockType', function() {

  it ('stringifies to a key', function() {
    `${ BlockTypes }`.should.equal('blockTypes')
  })

})
