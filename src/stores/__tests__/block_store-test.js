import BlockStore from 'stores/block_store'

describe('Stores - Block', function() {
  let store = null

  beforeEach(function() {
    store = new BlockStore({
      blocks: {
        create  : 'CREATE',
        destroy : 'DESTROY',
        update  : 'UPDATE',
        move    : 'MOVE'
      }
    }, [])
  })

  it ('can get all children for a specific block', function() {
    let parent = store._create({})
    let child  = store._create({ parent })

    store.childrenFor(parent).should.eql([ child ])
  })

  describe('CRUD', function() {

    it ('can create a record', function() {
      store._create({})
      store.all().length.should.equal(1)
    })

    it ('can accept another block for the position field', function() {
      let first  = store._create({})
      let second = store._create({})
      let third  = store._create({ position: first })

      store._indexOf(third).should.equal(store._indexOf(first) + 1)
    })

    it ('can find a record by id', function() {
      let block = store._create({})

      store.find(block.id).should.equal(block)
    })

    it ('can remove a record', function() {
      var start   = store.all().length
      var created = store._create({})

      store._destroy(created.id)

      store.all().length.should.equal(start)
    })

    it ('removes children of a removed parent', function() {
      let parent = store._create({})
      let child  = store._create({ parent })
      let other  = store._create({})

      store._destroy(parent)
      store.all().length.should.equal(1)
    })

    it ('can update a record', function() {
      let block = store._create({})

      store._update({ id: block.id, content: { text: 'foo' } })

      store.find(block.id).content.text.should.equal('foo')
    })

    it ('merges the content property', function() {
      let block = store._create({ content: { first: 'one' }})

      store._update({ id: block.id, content: { second: 'two' } })

      store.find(block.id).content.should.have.property('first', 'one')
      store.find(block.id).content.should.have.property('second', 'two')
    })

  })

})
