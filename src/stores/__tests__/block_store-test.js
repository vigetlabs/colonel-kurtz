import BlockStore from 'stores/block_store'

describe('Stores - Block', function() {
  let store = null

  beforeEach(function() {
    store = new Store()
  })

  it ('can retrieve all records associated with it', function() {
    BlockStore.all().should.be.an.instanceOf(Array)
  })

  it ('can get all children for a specific block', function() {
    let parent = BlockStore._create({})
    let child  = BlockStore._create({ parent })

    BlockStore.childrenFor(parent).should.eql([ child ])
  })

  describe('CRUD', function() {

    it ('can create a record', function() {
      BlockStore._create({})
      BlockStore.all().length.should.equal(1)
    })

    it ('can accept another block for the position field', function() {
      let first  = BlockStore._create({})
      let second = BlockStore._create({})
      let third  = BlockStore._create({}, first)

      BlockStore._indexOf(third).should.equal(BlockStore._indexOf(first) + 1)
    })

    it ('can find a record by id', function() {
      BlockStore._create({})

      var last = BlockStore.last()

      BlockStore.find(last.id).should.equal(last)
    })

    it ('can remove a record', function() {
      var start   = BlockStore.all().length
      var created = BlockStore._create({})

      BlockStore._destroy(created.id)

      BlockStore.all().length.should.equal(start)
    })

    it ('removes children of a removed parent', function() {
      let parent = BlockStore._create({})
      let child  = BlockStore._create({ parent })
      let other  = BlockStore._create({})

      BlockStore._destroy(parent)
      BlockStore.all().length.should.equal(1)
    })

    it ('can update a record', function() {
      BlockStore._create({})

      var last = BlockStore.last()

      BlockStore._update(last.id, { text: 'foo' })

      BlockStore.last().content.text.should.equal('foo')
    })

    it ('merges the content property', function() {
      BlockStore._create({ content: { first: 'one' }})

      var last = BlockStore.last()

      BlockStore._update(last.id, { second: 'two' })

      Object.keys(BlockStore.last().content).should.eql([ 'first', 'second' ])
    })

  })

  describe('when the Dispatcher triggers BLOCK_CREATE', function() {
    before(function() {
      sinon.spy(BlockStore, '_create')
      BlockCreate({ type: 'test' })
    })

    after(function() {
      BlockStore._create.restore()
    })

    it ('creates a record', function() {
      BlockStore._create.should.have.been.called
    })
  })

   describe('when the Dispatcher triggers BLOCK_DESTROY', function() {
     before(function() {
       sinon.stub(BlockStore, '_destroy')
       BlockDestroy('test')
     })

     after(function() {
       BlockStore._destroy.restore()
     })

     it ('removes a record', function() {
       BlockStore._destroy.should.have.been.called
     })
   })

  describe('when the Dispatcher triggers BLOCK_UPDATE', function() {
    before(function() {
      sinon.stub(BlockStore, '_update')
      BlockUpdate('test')
    })

    after(function() {
      BlockStore._update.restore()
    })

    it ('removes a record', function() {
      BlockStore._update.should.have.been.called
    })
  })

  describe('when the Dispatcher triggers BLOCK_MOVE', function() {
    it ('moves one block before the other', function() {
      let a = BlockStore._create({})
      let b = BlockStore._create({})

      BlockMove(b.id, a.id)

      BlockStore._indexOf(a).should.equal(BlockStore._indexOf(b) + 1)
    })
  })

  describe('when given a seed object', function() {
    let seed = [{
      blocks: [{ content: {} }, { content: {} }],
      content: {}
    }]

    it ('properly injects blocks', function() {
      let root          = BlockStore._seed(seed)
      let children      = BlockStore.childrenFor(root)
      let grandChildren = BlockStore.childrenFor(children[0])

      children.length.should.equal(1)
      grandChildren.length.should.equal(2)
    })
  })
})
