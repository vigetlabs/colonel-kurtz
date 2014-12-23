jest.dontMock('../block_list_store')
jest.dontMock('../../models/block_list')
jest.dontMock('../../utils/uid')

describe('Stores - Block List', function() {
  var BlockListStore = require('../block_list_store')

  it ('can retrieve all records associated with it', function() {
    expect(BlockListStore.all() instanceof Array).toEqual(true)
  })

  it ('can create a record', function() {
    BlockListStore._create({})

    expect(BlockListStore.all().length).toEqual(1)
  })

  it ('can create a record from a parent', function() {
    BlockListStore._create({})

    var parent = BlockListStore.last()

    BlockListStore._createFromParent(parent, 1)

    var last = BlockListStore.last()

    expect(last.editorId).toEqual(parent.editorId)
    expect(last.blockId).toEqual(parent.blockId)
  })

  it ('can find a record', function() {
    BlockListStore._create({})

    var last = BlockListStore.last()

    expect(BlockListStore.find(last.id)).toEqual(last)
  })

  it ('can find a record by editor id', function() {
    BlockListStore._create({ editorId: 2 })

    var last = BlockListStore.last()

    expect(BlockListStore.findByEditorId(last.editorId)).toEqual(last)
  })

  it ('can find a record by block id', function() {
    BlockListStore._create(2)

    var last = BlockListStore.findByEditorId(2)
    last.blockId = 2

    expect(BlockListStore.findByBlockId(last.blockId)).toEqual(last)
  })

  it ('can push a block into a list', function() {
    BlockListStore._create({ })

    var last = BlockListStore.last()

    BlockListStore._addBlockToList({ id: 1, parentBlockListId: last.id }, 0)

    expect(last.all()).toEqual([ 1 ])
  })

  it ('can remove a block into a list', function() {
    var last = BlockListStore.last()
    var blockId = last.all()[last.all().length - 1]

    BlockListStore._removeBlockFromList(blockId, last.id)

    expect(last.all()).toEqual([ ])
  })

})
