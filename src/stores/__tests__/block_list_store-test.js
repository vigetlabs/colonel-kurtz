import Dispatcher     from 'dispatcher'
import BlockListStore from 'stores/block_list_store'

describe('BlockListStore', function() {

  it ('can retrieve all records associated with it', function() {
    BlockListStore.all().should.be.an.instanceOf(Array)
  })

  it ('can create a record based upon an editor', function() {
    var item = BlockListStore._createFromEditor('test')

    item.editorId.should.equal('test')

    BlockListStore.all().length.should.equal(1)
  })

  it ('can create a record from a parent', function() {
    BlockListStore._createFromEditor('test')

    var parent = BlockListStore.last()
    var last   = BlockListStore._createFromParent({ parentBlockListId: parent.id })

    expect(last.editorId).to.equal(parent.editorId)
    expect(last.blockId).to.equal(parent.blockId)
  })

  it ('can find a record', function() {
    BlockListStore._createFromEditor('test')

    var last = BlockListStore.last()

    BlockListStore.find(last.id).should.equal(last)
  })

  it ('can move blocks', function() {
    BlockListStore._createFromEditor('test')

    var last = BlockListStore.last()

    last.insertBlock(1, 0)
    last.insertBlock(2, 1)

    BlockListStore._move(last.id, 0, 1);

    last.all().should.eql([2,1])
  })

  it ('can find a record by editor id', function() {
    BlockListStore._createFromEditor(2)

    var last = BlockListStore.last()

    BlockListStore.findByEditorId(last.editorId).should.equal(last)
  })

  it ('can find a record by block id', function() {
    BlockListStore._createFromEditor('test')

    var last = BlockListStore.findByEditorId('test')
    last.blockId = 2

    BlockListStore.findByBlockId(last.blockId).should.equal(last)
  })

  it ('can push a block into a list', function() {
    BlockListStore._createFromEditor('test')

    var last = BlockListStore.last()

    BlockListStore._addBlockToList({ id: 1, parentBlockListId: last.id }, 0)

    last.all().should.eql([ 1 ])
  })

  it ('can remove a block into a list', function() {
    var last = BlockListStore.last()
    var blockId = last.all()[last.all().length - 1]

    BlockListStore._removeBlockFromList(blockId, last.id)

    last.all().should.eql([])
  })

  describe('when the Dispatcher triggers EDITOR_CREATE', function() {
    import EditorCreate from 'actions/editor/create'

    before(function() {
      sinon.stub(BlockListStore, '_createFromEditor')

      Dispatcher.dispatch({ type: EditorCreate, params: { type: 'test' }})
    })

    after(function() {
      BlockListStore._createFromEditor.restore()
    })

    it ('creates a record', function() {
      BlockListStore._createFromEditor.should.have.been.called
    })
  })

  describe('when the Dispatcher triggers BLOCK_LIST_MOVE', function() {
    import BlockListMove from 'actions/block_list/move'

    before(function() {
      sinon.stub(BlockListStore, '_move')

      Dispatcher.dispatch({ type: BlockListMove, params: { type: 'test' }})
    })

    after(function() {
      BlockListStore._move.restore()
    })

    it ('moves a record', function() {
      BlockListStore._move.should.have.been.called
    })
  })
})
