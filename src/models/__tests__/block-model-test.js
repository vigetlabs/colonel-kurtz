import Block from 'models/block'
import BlockList from 'stores/block_list_store'

describe('Models - Block', function() {

  it ('has a unique identifier', function() {
    var a = new Block({})
    var b = new Block({})

    a.id.should.not.equal(b.id)
  })

  it ('defaults to the "text" type', function() {
    var b = new Block({})

    b.type.should.equal('text')
  })

  it ('can serialize', function() {
    var parent = BlockList._createFromEditor(0)
    var block  = new Block({ content: { content: 'yeah' }, parentBlockListId: parent.id })
    var list   = BlockList._createFromParent(block, parent.id)
    var json   = block.toJSON()

    json.should.have.property('type', 'text')
    json.content.should.have.property('content', 'yeah')
  })

})
