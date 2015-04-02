import Actions    from 'actions/blocks'
import Block      from 'models/block'
import BlockStore from 'stores/block_store'
import Colonel    from '../colonel'

describe('ColonelKurtz', function() {
  let app;
  let el;

  beforeEach(function(done) {
    el = document.createElement('div')
    app = new Colonel({
      el   : el,
      seed : {
        system: { version: process.env.VERSION },
        blocks: [ new Block({ type: 'section' }) ]
      }
    })

    app.start(done)
  })

  it ('renders to the provided element', function() {
    el.innerHTML.should.not.equal('')
  })

  it ('returns blocks when converting to JSON', function() {
    let json = app.toJSON()
    json.blocks.length.should.equal(1)
  })

  it ('returns a version when converting to JSON', function() {
    let json = app.toJSON()
    json.should.have.property('system')
  })

  describe('when an append action is sent to the app', function() {

    beforeEach(function() {
      app.push(Actions.append, 'section')
    })

    it ('should append a new block', function() {
      app.pull(BlockStore)[1].type.should.equal('section')
    })

  })

  describe('when a create action is sent to the app', function() {

    beforeEach(function() {
      app.push(Actions.create, 'section')
    })

    it ('should prepend a new block', function() {
      app.pull(BlockStore)[0].type.should.equal('section')
    })

  })

  describe('when a destroy action is sent to the app', function() {

    beforeEach(function() {
      app.push(Actions.destroy, app.pull(BlockStore)[0])
    })

    it ('should prepend a new block', function() {
      app.pull(BlockStore).length.should.equal(0)
    })

  })

  describe('when an update action is sent to the app', function() {

    beforeEach(function() {
      app.push(Actions.update, app.pull(BlockStore)[0], { foo: 'bar' })
    })

    it ('should update the content of that block', function() {
      app.pull(BlockStore)[0].content.should.have.property('foo', 'bar')
    })

  })

  describe('when a shift action is sent to the app', function() {
    let block;

    beforeEach(function() {
      app.push(Actions.append, 'section')
      block = app.pull(BlockStore)[0]
      app.push(Actions.shift, block.id, 1)
    })

    it ('should prepend a new block', function() {
      app.pull(BlockStore)[1].should.equal(block)
    })

  })
})
