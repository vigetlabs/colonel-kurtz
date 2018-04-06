let Block = require('../../models/Block')
let Blocks = require('../Blocks')

describe('Stores - Block', function() {
  it('returns an empty list for its initial state', function() {
    Blocks.getInitialState().should.eql([])
  })

  it('can create new blocks at a specific position', function() {
    let target = new Block({})
    let initial = [new Block({}), target, new Block({})]
    let state = Blocks.create(initial, { type: 'test', position: target })

    state[state.indexOf(target) + 1].should.have.property('type', 'test')
  })

  it('creates blocks at position of 0 if not specified', function() {
    let target = new Block({})
    let initial = [new Block({}), target, new Block({})]
    let state = Blocks.create(initial, { type: 'test' })

    state[0].should.have.property('type', 'test')
  })

  it('can remove blocks with an id', function() {
    let target = new Block({})
    let initial = [new Block({}), target, new Block({})]
    let state = Blocks.destroy(initial, target.id)

    state.indexOf(target).should.equal(-1)
  })

  it('can update the content for a block', function() {
    let target = new Block({})
    let initial = [new Block({}), target, new Block({})]

    Blocks.update(initial, {
      id: target.id,
      content: { foo: 'bar' }
    })

    target.content.should.have.property('foo', 'bar')
  })

  it('can move a block', function() {
    let target = new Block({})
    let next = new Block({})
    let initial = [new Block({}), target, next]
    let state = Blocks.move(initial, { block: target, distance: 1 })

    state[2].should.equal(target)
  })

  it('creates a block after a given other block', function() {
    let target = new Block({})
    let initial = [target, new Block({})]
    let state = Blocks.create(initial, {
      type: 'expected',
      position: target
    })

    state[1].type.should.equal('expected')
  })

  it('maintains an empty content object when deserialized', function() {
    let blocks = [new Block({})]
    let state = Blocks.deserialize(blocks)

    state[0].content.should.eql({})
  })
})
