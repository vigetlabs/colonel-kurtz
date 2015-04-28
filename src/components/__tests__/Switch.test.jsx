import Actions from 'actions/blocks'
import Switch  from '../Switch'
import Colonel from '../../Colonel'
import Fixture from './fixtures/testBlockType'

describe('Components - Switch', function() {
  let TestUtils = React.addons.TestUtils
  let app;

  beforeEach(function(done) {
    app = new Colonel({
      el : document.createElement('div'),
      blockTypes: [ Fixture ]
    })

    app.start(done)
  })

  it ('closes when it gets new properties', function() {
    let base = TestUtils.renderIntoDocument(<Switch app={ app } open />)
    base.forceUpdate()
    base.state.open.should.equal(false)
  })

  it ('adds a block type on click', function() {
    let base = TestUtils.renderIntoDocument(<Switch app={ app } forceOpen />)
    let spy  = sinon.spy(app, 'push')

    TestUtils.Simulate.click(base.getDOMNode().querySelector('.col-switch-btn'))

    spy.should.have.been.calledWith(Actions.create, 'test')
  })

  describe('When only one block type given', function() {
    it ('_onToggle creates that block type', function() {
      let spy       = sinon.spy(app, 'push')
      let component = TestUtils.renderIntoDocument(<Switch app={ app } />)

      component._onToggle()

      spy.should.have.been.calledWith(Actions.create, 'test')
    })
  })

  describe('When more than one block type is given', function() {
    beforeEach(function(done) {
      let SecondType = Object.create(Fixture)

      SecondType.id = 'another'

      app = new Colonel({
        el : document.createElement('div'),
        blockTypes: [ Fixture, SecondType ]
      })
      app.start(done)
    })

    it ('_onToggle sets the state to open', function() {
      let component = TestUtils.renderIntoDocument(<Switch app={ app } />)
      component._onToggle()
      component.state.open.should.equal(true)
    })
  })

  describe('When given a block with a parent', function() {
    beforeEach(function(done) {
      let SecondType = Object.create(Fixture)

      SecondType.id = 'another'
      SecondType.types = [ Fixture.id ]

      app = new Colonel({
        el : document.createElement('div'),
        blockTypes: [ Fixture, SecondType ],
        value: [{ type: SecondType.id, content: {}, blocks: [] }]
      })

      app.start(done)
    })

    it ('getTypes should display multiple blocks', function() {
      let component = TestUtils.renderIntoDocument(<Switch app={ app } parent={ app.get('blocks')[0] }/>)

      component.setState({ open : true })
      component.getDOMNode().querySelectorAll('button').length.should.be.gt(1)
    })
  })

  describe('When given a block with a parent that has no types', function() {
    beforeEach(function(done) {
      app = new Colonel({
        el : document.createElement('div'),
        blocks : [{ type: Fixture.id, content: {}, blocks: [] }],
        blockTypes : [ Fixture ]
      })

      app.start(done)
    })

    it ('renders nothing', function() {
      let component = TestUtils.renderIntoDocument(<Switch app={ app } parent={ app.get('blocks')[0] }/>)
      expect(component.getDOMNode()).to.equal(null)
    })
  })

})
