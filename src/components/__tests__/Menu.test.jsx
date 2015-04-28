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

  it ('sets the state to open when the menu button is clicked', function() {
    let block = app.refine('blocks').first()
    let test = TestUtils.renderIntoDocument(<Menu app={ app } block={ block } />)

    TestUtils.Simulate.click(test.refs.handle.getDOMNode())

    test.state.should.have.property('open', true)
  })
})
