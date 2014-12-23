jest.dontMock('../seed')

describe('Utils - seed', function() {
  var CreateBlock    = require('../../actions/block/create')
  var BlockListStore = require('../../stores/block_list_store')
  var seed           = require('../seed')

  Object.assign = require('object-assign')

  it ('given an id and a list of blocks, it injects data', function() {
    seed(0, [{}]);

    expect(CreateBlock).toBeCalled()
  })

})
