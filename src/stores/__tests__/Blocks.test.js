import Block from '../../models/Block'
import Blocks from '../Blocks'

describe('Stores - Block', function() {
  it('returns an empty list for its initial state', function() {
    expect(Blocks.getInitialState()).toEqual([])
  })

  it('can create new blocks at a specific position', function() {
    let target = new Block({})
    let initial = [new Block({}), target, new Block({})]
    let state = Blocks.create(initial, { type: 'test', position: target })

    expect(state[state.indexOf(target) + 1]).toHaveProperty('type', 'test')
  })

  it('creates blocks at position of 0 if not specified', function() {
    let target = new Block({})
    let initial = [new Block({}), target, new Block({})]
    let state = Blocks.create(initial, { type: 'test' })

    expect(state[0]).toHaveProperty('type', 'test')
  })

  it('can remove blocks with an id', function() {
    let target = new Block({})
    let initial = [new Block({}), target, new Block({})]
    let state = Blocks.destroy(initial, target.id)

    expect(state.indexOf(target)).toEqual(-1)
  })

  it('can update the content for a block', function() {
    let target = new Block({})
    let initial = [new Block({}), target, new Block({})]

    Blocks.update(initial, {
      id: target.id,
      content: { foo: 'bar' }
    })

    expect(target.content).toHaveProperty('foo', 'bar')
  })

  it('can move a block', function() {
    let target = new Block({})
    let next = new Block({})
    let initial = [new Block({}), target, next]
    let state = Blocks.move(initial, { block: target, distance: 1 })

    expect(state[2]).toEqual(target)
  })

  it('creates a block after a given other block', function() {
    let target = new Block({})
    let initial = [target, new Block({})]
    let state = Blocks.create(initial, {
      type: 'expected',
      position: target
    })

    expect(state[1].type).toEqual('expected')
  })

  it('maintains an empty content object when deserialized', function() {
    let blocks = [new Block({})]
    let state = Blocks.deserialize(blocks)

    expect(state[0].content).toEqual({})
  })
})
