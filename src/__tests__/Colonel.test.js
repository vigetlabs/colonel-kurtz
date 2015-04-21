import Actions from 'actions/blocks'
import Block   from 'models/Block'
import Blocks  from 'stores/Blocks'
import Colonel from '../Colonel'

describe('ColonelKurtz', function() {
  let app;
  let el;

  beforeEach(function(done) {
    el = document.createElement('div')
    app = new Colonel({
      el : el,
      blocks : [ new Block({ type: 'section' }) ],
      blockTypes : [{
        id: 'section',
        label: 'Section',
        component: { render() { return (<p/>) } }
      }]
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
      app.pull(Blocks)[0].type.should.equal('section')
    })

  })

  describe('when a destroy action is sent to the app', function() {

    beforeEach(function() {
      app.push(Actions.destroy, app.pull(Blocks)[0])
    })

    it ('should prepend a new block', function() {
      app.pull(Blocks).length.should.equal(0)
    })

  })

  describe('when an update action is sent to the app', function() {

    beforeEach(function() {
      app.push(Actions.update, app.pull(Blocks)[0], { foo: 'bar' })
    })

    it ('should update the content of that block', function() {
      app.pull(Blocks)[0].content.should.have.property('foo', 'bar')
    })

  })

  describe('when a shift action is sent to the app', function() {
    let block;

    beforeEach(function() {
      app.push(Actions.create, 'section')
      block = app.pull(Blocks)[0]
      app.push(Actions.shift, block.id, 1)
    })

    it ('should prepend a new block', function() {
      app.pull(Blocks)[1].should.equal(block)
    })

  })
})
