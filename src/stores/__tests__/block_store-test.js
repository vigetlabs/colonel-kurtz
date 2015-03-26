import Actions    from '../../actions/blocks'
import Block      from '../../models/block'
import BlockStore from '../block_store'

describe('Stores - Block', function() {

  it ('returns an empty list for its initial state', function() {
    BlockStore.getInitialState().should.eql([])
  })

  it ('stringifies to "blocks"', function() {
    `${ BlockStore }`.should.equal('blocks')
  })

  it ('can append new blocks to a given state', function() {
    let state = BlockStore[Actions.append]([], { })

    state[0].should.be.instanceOf(Block)
  })

  it ('can create new blocks at a specific position', function() {
    let target  = new Block({})
    let initial = [new Block({}), target, new Block({})]
    let state   = BlockStore[Actions.create](initial, { type: 'test', position: target })

    state[state.indexOf(target) + 1].should.have.property('type', 'test')
  })

  it ('creates blocks at position of 0 if not specified', function() {
    let target  = new Block({})
    let initial = [new Block({}), target, new Block({})]
    let state   = BlockStore[Actions.create](initial, { type: 'test' })

    state[0].should.have.property('type', 'test')
  })

  it ('can remove blocks with an id', function() {
    let target  = new Block({})
    let initial = [ new Block({}), target, new Block({}) ]
    let state   = BlockStore[Actions.destroy](initial, target.id)

    state.indexOf(target).should.equal(-1)
  })

  it ('can update the content for a block', function() {
    let target  = new Block({})
    let initial = [ new Block({}), target, new Block({}) ]
    let state   = BlockStore[Actions.update](initial, { id: target.id, content: { foo: 'bar' } })

    target.content.should.have.property('foo', 'bar')
  })

})
