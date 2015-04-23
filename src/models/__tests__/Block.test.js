import Block from 'models/Block'

describe('Models - Block', function() {

  it ('has a unique identifier', function() {
    let a = new Block({})
    let b = new Block({})

    a.id.should.not.equal(b.id)
  })

  it ('serialize to an id', function() {
    let block = new Block({})
    block.valueOf().should.equal(block.id)
  })

  it ('stringifies to its id', function() {
    let block  = new Block({})
    let answer = `${ block }`

    answer.should.equal(block.id)
  })

})
