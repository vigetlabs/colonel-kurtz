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

    beforeEach(function() {
      app.push(Actions.create, 'section')
    })

    it ('should prepend a new block', function() {
      app.refine('blocks').first().type.should.equal('section')
    })

    it ('should flag the block as client-only', function() {
      app.refine('blocks').first().clientOnly.should.equal(true)
    })

  })

  describe('when a destroy action is sent to the app', function() {

    beforeEach(function() {
      app.push(Actions.destroy, app.get('blocks')[0])
    })

    it ('should prepend a new block', function() {
      app.get('blocks').length.should.equal(0)
    })

  })

  describe('when an update action is sent to the app', function() {

    beforeEach(function() {
      app.push(Actions.update, app.get('blocks')[0], { foo: 'bar' })
    })

    it ('should update the content of that block', function() {
      app.get('blocks')[0].content.should.have.property('foo', 'bar')
    })

  })

  describe('when a move action is sent to the app', function() {

    it ('should prepend a new block', function() {
      app.push(Actions.create, 'section')

      let block = app.refine('blocks').first()

      app.push(Actions.move, block, 1)

      app.refine('blocks').last().should.equal(block)
    })

  })
})
