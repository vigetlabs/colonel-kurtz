import Block      from 'models/block'
import BlockStore from 'stores/block_store'

describe('Models - Block', function() {

  it ('has a unique identifier', function() {
    let a = new Block({})
    let b = new Block({})

    a.id.should.not.equal(b.id)
  })

  it ('can serialize', function() {
    let parent = BlockStore._create({ type: 'text', content: 'parent' })
    let child  = BlockStore._create({ type: 'text', content: 'child', parent })

    let json  = parent.toJSON()

    json.should.have.property('type', 'text')
    json.should.have.property('content', 'parent')
    json.blocks[0].should.have.property('content', 'child')
  })

})
