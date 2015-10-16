let Actions = require('../actions/blocks')
let Block   = require('../models/Block')
let Colonel = require('../Colonel')

describe('ColonelKurtz', function() {
  let app;
  let el;

  beforeEach(function(done) {
    el = document.createElement('div')

    app = new Colonel({
      el : el,
      blocks : [ new Block({ type: 'section' }) ],
      blockTypes : [{ id: 'section' }]
    })

    app.start(done)
  })

  it ('renders to the provided element', function() {
    el.innerHTML.should.not.equal('')
  })

  it ('returns blocks when converting to JSON', function() {
    let json = app.toJSON()

    json.length.should.equal(1)
  })

  describe('when a create action is sent to the app', function() {

    beforeEach(function(done) {
      app.push(Actions.create, 'section', done)
    })

    it ('should prepend a new block', function() {
      app.state.blocks[0].type.should.equal('section')
    })

  })

  describe('when a destroy action is sent to the app', function() {

    beforeEach(function(done) {
      app.push(Actions.destroy, app.state.blocks[0], done)
    })

    it ('should prepend a new block', function() {
      app.state.blocks.length.should.equal(0)
    })

  })

  describe('when an update action is sent to the app', function() {

    beforeEach(function(done) {
      app.push(Actions.update, [ app.state.blocks[0], { foo: 'bar' } ], done)
    })

    it ('should update the content of that block', function() {
      app.state.blocks[0].content.should.have.property('foo', 'bar')
    })

  })

  describe('when a move action is sent to the app', function() {

    it ('should prepend a new block', function() {
      app.push(Actions.create, 'section')

      let block = app.state.blocks[0]

      app.push(Actions.move, [ block, 1 ])

      app.state.blocks[app.state.blocks.length - 1].should.equal(block)
    })

  })
})
