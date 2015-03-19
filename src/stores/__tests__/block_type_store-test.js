import BlockTypeStore from 'stores/block_type_store'

describe('Stores - Block Type', function() {
  const ID = 'test'

  afterEach(function() {
    BlockTypeStore._remove(ID)
  })

  it ('can create a record', function() {
    BlockTypeStore._create({
      id: ID,
      component: React.createClass({ render() { return (<p>Test</p>) }})
    })

    BlockTypeStore.find(ID).should.be.ok
  })

  it ('can get a list of all ids', function() {
    BlockTypeStore._create({
      id: ID,
      component: React.createClass({ render() { return (<p>Test</p>) }})
    })

    BlockTypeStore.keys().should.eql([ ID ])
  })

  describe('when the Dispatcher triggers BLOCK_TYPE_CREATE', function() {
    before(function() {
      sinon.stub(BlockTypeStore, '_create')

      Dispatcher.dispatch({ type: BlockTypeCreate, params: { type: 'test' }})
    })

    after(function() {
      BlockTypeStore._create.restore()
    })

    it ('creates a record', function() {
      BlockTypeStore._create.should.have.been.called
    })
  })

})
