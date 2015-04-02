import Actions    from 'actions/blocks'
import BlockMenu  from '../BlockMenu'
import Colonel    from '../../colonel'
import Fixture    from './fixtures/testBlockType'

describe('Components - Block Menu', function() {
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
    let base = TestUtils.renderIntoDocument(<BlockMenu app={ app } open />)
    base.forceUpdate()
    base.state.open.should.equal(false)
  })

  it ('opens on toggle', function() {
    let base = TestUtils.renderIntoDocument(<BlockMenu app={ app } />)

    TestUtils.Simulate.click(base.refs.toggle.getDOMNode())

    base.state.open.should.equal(true)
  })

  it ('adds a block type on click', function() {
    let base = TestUtils.renderIntoDocument(<BlockMenu app={ app } forceOpen />)
    let spy  = sinon.spy(app, 'push')

    TestUtils.Simulate.click(base.getDOMNode().querySelector('.col-switch-btn'))

    spy.should.have.been.calledWith(Actions.create, 'test')
  })
})
