import Colonel from '../../Colonel'
import Menu from '../Menu'
import Fixture from './fixtures/testBlockType'

import { create, move, destroy } from 'actions/blocks'

describe('Components - Menu', function() {
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
      app.push = sinon.mock()
    }, done)
  })

  it ('can exit', function() {
    let block = app.refine('blocks').first()
    let test = TestUtils.renderIntoDocument(<Menu app={ app } block={ block } />)

    test.setState({ open: true })

    test._onExit()
    test.state.open.should.equal(false)
  })

  describe('When the "Remove" button is clicked', function() {
    it ('calls the destroy action', function() {
      let block = app.refine('blocks').first()
      let test = TestUtils.renderIntoDocument(<Menu app={ app } block={ block } />)

      test.setState({ open: true })

      TestUtils.Simulate.click(test.refs.destroy.getDOMNode())

      app.push.should.have.been.calledWith(destroy, block.id)
    })
  })

  describe('When the "Move Up" button is clicked', function() {
    it ('calls the move action', function() {
      let block = app.refine('blocks').last()
      let test = TestUtils.renderIntoDocument(<Menu app={ app } block={ block } />)

      test.setState({ open: true })

      TestUtils.Simulate.click(test.refs.moveUp.getDOMNode())

      app.push.should.have.been.calledWith(move, block, app.refine('blocks').first())
    })

     it ('is disabled if it is the first block', function() {
      let block = app.refine('blocks').first()
      let test = TestUtils.renderIntoDocument(<Menu app={ app } block={ block } />)

      test.setState({ open: true })

      test.refs.moveUp.props.disabled.should.eql(true)
    })
  })

  describe('When the "Move Down" button is clicked', function() {
    it ('calls the move action', function() {
      let block = app.refine('blocks').first()
      let test = TestUtils.renderIntoDocument(<Menu app={ app } block={ block } />)
      test.setState({ open: true })

      TestUtils.Simulate.click(test.refs.moveDown.getDOMNode())

      app.push.should.have.been.calledWith(move, block, app.refine('blocks').last())
    })

    it ('is disabled if it is the last block', function() {
      let block = app.refine('blocks').last()
      let test = TestUtils.renderIntoDocument(<Menu app={ app } block={ block } />)

      test.setState({ open: true })

      test.refs.moveDown.props.disabled.should.eql(true)
    })
  })

  describe('When the "Menu" button is clicked', function() {
    it ('sets the state to open', function() {
      let block = app.refine('blocks').first()
      let test = TestUtils.renderIntoDocument(<Menu app={ app } block={ block } />)

      TestUtils.Simulate.click(test.refs.handle.getDOMNode())

      test.state.should.have.property('open', true)
    })
  })

})
