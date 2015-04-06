import Actions from '../../actions/blocks'
import Block   from '../../models/Block'
import Blocks  from '../Blocks'

describe('Stores - Block', function() {

  it ('returns an empty list for its initial state', function() {
    Blocks.getInitialState().should.eql([])
  })

  it ('stringifies to "blocks"', function() {
    `${ Blocks }`.should.equal('blocks')
  })

  it ('can append new blocks to a given state', function() {
    let state = Blocks[Actions.append]([], { })

    state[0].should.be.instanceOf(Block)
  })

  it ('can create new blocks at a specific position', function() {
    let target  = new Block({})
    let initial = [new Block({}), target, new Block({})]
    let state   = Blocks[Actions.create](initial, { type: 'test', position: target })

    state[state.indexOf(target) + 1].should.have.property('type', 'test')
  })

  it ('creates blocks at position of 0 if not specified', function() {
    let target  = new Block({})
    let initial = [new Block({}), target, new Block({})]
    let state   = Blocks[Actions.create](initial, { type: 'test' })

    state[0].should.have.property('type', 'test')
  })

  it ('can remove blocks with an id', function() {
    let target  = new Block({})
    let initial = [ new Block({}), target, new Block({}) ]
    let state   = Blocks[Actions.destroy](initial, target.id)

    state.indexOf(target).should.equal(-1)
  })

  it ('can update the content for a block', function() {
    let target  = new Block({})
    let initial = [ new Block({}), target, new Block({}) ]
    let state   = Blocks[Actions.update](initial, { id: target.id, content: { foo: 'bar' } })

    target.content.should.have.property('foo', 'bar')
  })

  it ('can move a block', function() {
    let target  = new Block({})
    let initial = [ new Block({}), target, new Block({}) ]
    let state   = Blocks[Actions.shift](initial, { id: target.id, delta: 1 })

    state[2].should.equal(target)
  })

  it ('does not move a block lower than 0', function() {
    let target  = new Block({})
    let initial = [ target, new Block({}) ]
    let state   = Blocks[Actions.shift](initial, { id: target.id, delta: -1 })

    state[0].should.equal(target)
    state[1].should.not.equal(target)
  })

})
