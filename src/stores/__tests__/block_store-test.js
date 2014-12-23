jest.dontMock('../block_store')
jest.dontMock('../../models/block')

describe('Stores - Block', function() {

  it ('can retrieve all records associated with it', function() {
    var BlockStore = require('../block_store')
    expect(BlockStore.all() instanceof Array).toEqual(true)
  })

  describe('CRUD', function() {

    it ('can create a record', function() {
      var BlockStore = require('../block_store')

      BlockStore._create({})

      expect(BlockStore.all().length).toEqual(1)
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

      expect(BlockStore.all().length).toEqual(0)
    })

    it ('can update a record', function() {
      var BlockStore = require('../block_store')

      BlockStore._create({})

      var last = BlockStore.last()

      BlockStore._update(last.id, { text: 'foo' })

      expect(BlockStore.last().content.text).toEqual('foo')
    })

    it ('merges the content property', function() {
      var BlockStore = require('../block_store')

      BlockStore._create({ content: { first: 'one' }})

      var last = BlockStore.last()

      BlockStore._update(last.id, { second: 'two' })

      expect(Object.keys(BlockStore.last().content)).toEqual([ 'first', 'second' ])
    })

  })

})
