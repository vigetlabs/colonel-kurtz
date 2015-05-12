let Block = require('../Block')

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

  describe('when created without a content attribute', function() {

    it ('ensures the attribute is an empty object', function() {
      let block  = new Block({})
      block.content.should.eql({})
    })

  })

  describe('when created with a content property that is falsy', function() {
    [ false, null, undefined, '' ].forEach(function(type) {
      it (`ensures the attribute is an empty object on ${ type }`, function() {
        let block  = new Block({ content: type })
        block.content.should.eql({})
      })
    })
  })

})
