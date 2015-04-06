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
})
