jest.dontMock('../block')

describe('Models - Block', function() {

  it ('has a unique identifier', function() {
    var uid = require('../../utils/uid')
    var Block = require('../block')

    new Block({})

    expect(uid).toBeCalled()
  })

  it ('defaults to text if no type param is given', function() {
    var Block = require('../block')

    var b = new Block({})

    expect(b.type).toEqual('text')
  })

})
