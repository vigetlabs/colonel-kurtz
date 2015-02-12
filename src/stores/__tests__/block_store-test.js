import Dispatcher   from 'dispatcher'
import BlockStore   from 'stores/block_store'
import BlockCreate  from 'actions/block/create'
import BlockDestroy from 'actions/block/destroy'
import BlockUpdate  from 'actions/block/update'

describe('Stores - Block', function() {

  it ('can retrieve all records associated with it', function() {
    BlockStore.all().should.be.an.instanceOf(Array)
  })

  describe('CRUD', function() {

    it ('can create a record', function() {
      BlockStore._create({})
      BlockStore.all().length.should.equal(1)
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
      Dispatcher.dispatch({ type: BlockCreate, params: { type: 'test' }})
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

       Dispatcher.dispatch({ type: BlockDestroy, id: 'test' })
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
      Dispatcher.dispatch({ type: BlockUpdate, id: 'test' })
    })

    after(function() {
      BlockStore._update.restore()
    })

    it ('removes a record', function() {
      BlockStore._update.should.have.been.called
    })
  })
})
