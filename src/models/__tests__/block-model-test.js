import Block from 'models/block'

describe('Models - Block', function() {

  it ('has a unique identifier', function() {
    let a = new Block({})
    let b = new Block({})

    a.id.should.not.equal(b.id)
  })

  it ('can serialize', function() {
    let block = new Block({ type: 'text', content: { content: 'yeah' }})
    let json  = block.toJSON()

    json.should.have.property('type', 'text')
    json.content.should.have.property('content', 'yeah')
  })

})
