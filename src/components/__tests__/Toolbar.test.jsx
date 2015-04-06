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

  describe('When the "Remove" button is clicked', function() {
    it ('calls the destroy action', function() {
      let block = app.pull('blocks')[1]
      let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)
      TestUtils.Simulate.click(test.refs.destroy.getDOMNode())
      app.push.should.have.been.calledWith(destroy, block.id)
    })
  })

  describe('When the "Move Up" button is clicked', function() {
    it ('calls the shift action', function() {
      let block = app.pull('blocks')[1]
      let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)
      TestUtils.Simulate.click(test.refs.moveUp.getDOMNode())
      app.push.should.have.been.calledWith(shift, block.id, -1)
    })

    it ('does not display if the block is the first child', function() {
      let block = app.pull('blocks')[0]
      let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

      expect(test.refs.moveUp.getDOMNode()).to.equal(null)
    })
  })

  describe('When the "Move Down" button is clicked', function() {
    it ('calls the shift action', function() {
      let block = app.pull('blocks')[1]
      let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)
      TestUtils.Simulate.click(test.refs.moveDown.getDOMNode())
      app.push.should.have.been.calledWith(shift, block.id, 1)
    })

    it ('does not show the moveUp button for the last block', function() {
      let block = app.pull('blocks')[2]
      let test = TestUtils.renderIntoDocument(<Toolbar app={ app } block={ block } />)

      expect(test.refs.moveDown.getDOMNode()).to.equal(null)
    })
  })
})
