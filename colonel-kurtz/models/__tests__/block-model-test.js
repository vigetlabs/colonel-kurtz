jest.dontMock('../block')

describe('Models - Block', function() {

  it ('defaults to text if no type param is given', function() {
    var Block = require('../block')

    var b = new Block({})

    expect(b.type).toEqual('text')
  })

})
