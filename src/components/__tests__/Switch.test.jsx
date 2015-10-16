let Actions = require('../../actions/blocks')
let Colonel = require('../../Colonel')
let Fixture = require('./fixtures/testBlockType')
let Switch  = require('../Switch')

describe('Components - Switch', function() {
  let TestUtils = React.addons.TestUtils
  let render    = TestUtils.renderIntoDocument
  let app;

  beforeEach(function(done) {
    app = new Colonel({
      el : document.createElement('div'),
      blockTypes: [ Fixture ]
    })

    app.start(done)
  })

  it ('closes when it gets new properties', function() {
    let base = render(<Switch app={ app } />)

    base.setState({ open: true })
    base.componentWillReceiveProps()
    base.state.open.should.equal(false)
  })

  it ('adds a block type on click', function() {
    let base = render(<Switch app={ app } />)
    let spy  = sinon.spy(app, 'push')

    base.setState({ open : true })

    TestUtils.Simulate.click(base.getDOMNode().querySelector('.col-switch-btn'))

    spy.should.have.been.calledWith(Actions.create, [ 'test', undefined, undefined ])
  })

  describe('When only one block type given', function() {
    it ('_onToggle creates that block type', function() {
      let spy       = sinon.spy(app, 'push')
      let component = render(<Switch app={ app } />)

      component._onToggle()

      spy.should.have.been.calledWith(Actions.create, [ 'test', undefined, undefined ])
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
      let component = render(<Switch app={ app } />)
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
      let component = render(<Switch app={ app } parent={ app.state.blocks[0] }/>)

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
      let component = render(<Switch app={ app } parent={ app.state.blocks[0] }/>)
      expect(component.getDOMNode()).to.equal(null)
    })
  })

  describe('Key presses', function() {
    it ('closes when the escape key is presed', function() {
      let base = render(<Switch app={ app } />)

      base.setState({ open: true })
      TestUtils.Simulate.keyUp(base.refs.nav.getDOMNode(), { key: 'Escape' })
      base.state.open.should.equal(false)
    })

    it ('does not close when another key is presed', function() {
      let base = render(<Switch app={ app } />)

      base.setState({ open: true })
      TestUtils.Simulate.keyUp(base.refs.nav.getDOMNode(), { key: 'q' })
      base.state.open.should.equal(true)
    })
  })

  describe('Creating block children', function() {
    let LimitedFixture = Object.assign({}, Fixture, {
      id: 'limited',
      maxChildren: 3,
      types: [ 'limited' ]
    })

    beforeEach(function(done) {
      let type    = LimitedFixture.id
      let content = {}
      let block   = { type, content, blocks: [] }

      app = new Colonel({
        el : document.createElement('div'),
        blocks : [{
          type,
          content,
          blocks: [ block, block, block ]
        }],
        blockTypes : [ LimitedFixture ]
      })

      app.start(done)
    })

    it ('does not enable toggles when its provided block has too many children', function() {
      let el = render(<Switch app={ app } parent={ app.state.blocks[0] } />)
      el.getDOMNode().querySelector('button').disabled.should.equal(true)
    })
  })

  describe('Creating editor children', function() {
    beforeEach(function(done) {
      let block   = { type: Fixture.id, content: {}, blocks: [] }

      app = new Colonel({
        el : document.createElement('div'),
        maxChildren : 3,
        blocks : [ block, block, block ],
        blockTypes : [ Fixture ]
      })

      app.start(done)
    })

    it ('does not enable toggles when the apps maxChildren setting is exceeded', function() {
      let el = render(<Switch app={ app } />)
      el.getDOMNode().querySelector('button').disabled.should.equal(true)
    })
  })

})
