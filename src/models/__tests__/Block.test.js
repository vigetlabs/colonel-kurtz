import Block from '../Block'

describe('Models - Block', function() {
  it('has a unique identifier', function() {
    let a = new Block({})
    let b = new Block({})

    expect(a.id).not.toEqual(b.id)
  })

  it('serialize to an id', function() {
    let block = new Block({})
    expect(block.valueOf()).toEqual(block.id)
  })

  it('stringifies to its id', function() {
    let block = new Block({})
    let answer = `${block}`

    expect(answer).toEqual(block.id)
  })

  describe('when created without a content attribute', function() {
    it('ensures the attribute is an empty object', function() {
      let block = new Block({})
      expect(block.content).toEqual({})
    })
  })

  describe('when created with a content property that is falsy', function() {
    let types = [false, null, undefined, '']

    types.forEach(function(type) {
      it(`ensures the attribute is an empty object on ${type}`, function() {
        let block = new Block({ content: type })
        expect(block.content).toEqual({})
      })
    })
  })
})
