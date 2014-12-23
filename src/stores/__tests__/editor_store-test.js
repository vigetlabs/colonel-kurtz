jest.dontMock('../editor_store')
jest.dontMock('../../dispatcher')

describe('Stores - Editor', function() {
  var EditorStore = require('../editor_store')
  var Dispatcher  = require('../../dispatcher')

  it ('can create a record', function() {
    EditorStore._create({ id: 'test' })

    expect(EditorStore.find('test')).toBeDefined()
  })

  it ('throws an error if an editor is created in an invalid mode', function() {
    var threw = false

    try {
      EditorStore._create({ id: 'test2', mode: 'invalid' })
    } catch(x) {
      threw = true
    }

    expect(threw).toEqual(true)
  })

  it ('throws an error if an editor id is not unique', function() {
    var threw = false

    try {
      EditorStore._create({ id: 'unique' })
      EditorStore._create({ id: 'unique' })
    } catch(x) {
      threw = true
    }

    expect(threw).toEqual(true)
  })

  it ('can update a record', function() {
    EditorStore._create({ id: 'test3' })

    EditorStore._update('test3', { field: 'test' })

    expect(EditorStore.find('test3').field).toEqual('test')
  })

})
