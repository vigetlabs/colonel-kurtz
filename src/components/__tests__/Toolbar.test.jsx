import Colonel from '../../Colonel'
import Toolbar from '../Toolbar'
import Fixture from './fixtures/testBlockType'

import { create, shift, destroy } from 'actions/blocks'

describe('Components - Toolbar', function() {
  let TestUtils = React.addons.TestUtils
  let app;

  beforeEach(function(done) {
    app = new Colonel({
      el         : document.createElement('div'),
      blockTypes : [ Fixture ]
    })

    app.start(function() {
      app.push(create, Fixture.id)
      app.push(create, Fixture.id)
      app.push(create, Fixture.id)
      app.push = sinon.mock()
    }, done)
  })

  it ('can exit', function() {
    let block = app.pull('blocks')[1]
    let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

    test.setState({ open: true })

    test._onExit()
    test.state.open.should.equal(false)
  })

  describe('When the "Remove" button is clicked', function() {
    it ('calls the destroy action', function() {
      let block = app.pull('blocks')[1]
      let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

      test.setState({ open: true })

      TestUtils.Simulate.click(test.refs.destroy.getDOMNode())
      app.push.should.have.been.calledWith(destroy, block.id)
    })
  })

  describe('When the "Move Up" button is clicked', function() {
    it ('calls the shift action', function() {
      let block = app.pull('blocks')[1]
      let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

      test.setState({ open: true })

      TestUtils.Simulate.click(test.refs.moveUp.getDOMNode())
      app.push.should.have.been.calledWith(shift, block.id, -1)
    })

    it ('does not display if the block is the first child', function() {
      let block = app.pull('blocks')[0]
      let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

      test.refs.should.not.have.property('moveUp')
    })
  })

  describe('When the "Move Down" button is clicked', function() {
    it ('calls the shift action', function() {
      let block = app.pull('blocks')[1]
      let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

      test.setState({ open: true })

      TestUtils.Simulate.click(test.refs.moveDown.getDOMNode())
      app.push.should.have.been.calledWith(shift, block.id, 1)
    })

    it ('does not show the moveUp button for the last block', function() {
      let block = app.pull('blocks')[2]
      let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

      test.refs.should.not.have.property('moveDown')
    })
  })

  describe('When the "Menu" button is clicked', function() {
    it ('sets the state to open', function() {
      let block = app.pull('blocks')[1]
      let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

      TestUtils.Simulate.click(test.refs.handle.getDOMNode())

      test.state.should.have.property('open', true)
    })
  })

})
