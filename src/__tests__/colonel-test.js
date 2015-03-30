import Actions    from 'actions/blocks'
import Block      from 'models/block'
import BlockStore from 'stores/block_store'
import Colonel    from '../colonel'

describe('ColonelKurtz', function() {
  var app;

  beforeEach(function(done) {
    app = new Colonel({
      el   : document.createElement('div'),
      seed : {
        system: { version: process.env.VERSION },
        blocks: [ new Block({ type: 'section' }) ]
      }
    })

    app.start(done)
  })

  it ('can render', function() {
    app.render()
    app.el.innerHTML.should.not.equal('')
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
      app.send(Actions.append, 'append')
    })

    it ('should append a new block', function() {
      app.get(BlockStore)[1].type.should.equal('append')
    })

  })

  describe('when a create action is sent to the app', function() {

    beforeEach(function() {
      app.send(Actions.create, 'prepend')
    })

    it ('should prepend a new block', function() {
      app.get(BlockStore)[0].type.should.equal('prepend')
    })

  })

  describe('when a destroy action is sent to the app', function() {

    beforeEach(function() {
      app.send(Actions.destroy, app.get(BlockStore)[0])
    })

    it ('should prepend a new block', function() {
      app.get(BlockStore).length.should.equal(0)
    })

  })

  describe('when an update action is sent to the app', function() {

    beforeEach(function() {
      app.send(Actions.update, app.get(BlockStore)[0], { foo: 'bar' })
    })

    it ('should prepend a new block', function() {
      app.get(BlockStore)[0].content.should.have.property('foo', 'bar')
    })

  })
})
