import EditorStore  from 'stores/editor_store'
import Dispatcher   from 'dispatcher'
import EditorCreate from 'actions/editor/create'

describe('Stores - Editor', function() {

  it ('can create a record', function() {
    EditorStore._create({ id: 'test' })

    EditorStore.find('test').should.be.ok
  })

  it ('throws an error if an editor id is not unique', function() {
    var threw = false

    try {
      EditorStore._create({ id: 'unique' })
      EditorStore._create({ id: 'unique' })
    } catch(x) {
      threw = true
    }

    threw.should.be.true
  })

  describe('when the Dispatcher triggers EDITOR_CREATE', function() {
    before(function() {
      sinon.spy(EditorStore, '_create')
      EditorCreate({ id: 'test_create' })
    })

    after(() => EditorStore._create.restore())

    it ('creates a record', function() {
      EditorStore._create.should.have.been.called
    })
  })

})
