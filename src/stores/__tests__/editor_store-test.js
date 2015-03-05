import EditorStore  from 'stores/editor_store'
import Dispatcher   from 'dispatcher'
import EditorUpdate from 'actions/editor/update'
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

  it ('can update a record', function() {
    EditorStore._create({ id: 'test3' })

    EditorStore._update('test3', { field: 'test' })

    EditorStore.find('test3').should.have.property('field', 'test')
  })

  describe('when the Dispatcher triggers EDITOR_CREATE', function() {
    before(function() {
      sinon.spy(EditorStore, '_create')
      Dispatcher.dispatch({ type: EditorCreate, params: { id: 'test_create' }})
    })

    after(() => EditorStore._create.restore())

    it ('creates a record', function() {
      EditorStore._create.should.have.been.called
    })
  })

  describe('when the Dispatcher triggers EDITOR_UPDATE', function() {
    before(function() {
      EditorStore._create({ id: 'test_update' })
      sinon.spy(EditorStore, '_update')

      Dispatcher.dispatch({ type: EditorUpdate, id: 'test_update' })
    })

    after(() => EditorStore._update.restore())

    it ('updates a record', function() {
      EditorStore._update.should.have.been.called
    })
  })

})
