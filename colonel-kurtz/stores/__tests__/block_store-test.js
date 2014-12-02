jest.dontMock('../block_store')

describe('Stores - Block', function() {

  it ('can retrieve all records associated with it', function() {
    var BlockStore = require('../block_store')
    var Immutable = require('immutable')

    expect(BlockStore.all() instanceof Immutable.List).toEqual(true)
  })

  describe('CRUD', function() {

    it ('can create a record', function() {
      var BlockStore = require('../block_store')

      BlockStore._create({})

      expect(BlockStore.all().size).toEqual(1)
    })

    it ('can find a record by id', function() {
      var BlockStore = require('../block_store')

      BlockStore._create({})

      var last = BlockStore.last()

      expect(BlockStore.find(last.id)).toEqual(last)
    })

    it ('can remove a record', function() {
      var BlockStore = require('../block_store')

      BlockStore._create({})
      BlockStore._destroy(BlockStore.last().id)

      expect(BlockStore.all().size).toEqual(0)
    })

    it ('can update a record', function() {
      var BlockStore = require('../block_store')

      BlockStore._create({})

      var last = BlockStore.last()

      BlockStore._update(last.id, 'foo')

      expect(BlockStore.last().content).toEqual('foo')
    })

  })

})
