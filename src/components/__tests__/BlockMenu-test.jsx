import Actions    from 'actions/blocks'
import BlockMenu  from '../BlockMenu'
import Colonel    from '../../colonel'
import Fixture    from './fixtures/testBlockType'

describe('Components - Block Menu', function() {
  let TestUtils = React.addons.TestUtils
  let app, blockTypes;

  beforeEach(function(done) {
    app = new Colonel({
      el : document.createElement('div'),
      blockTypes: [ Fixture ]
    })

    app.start(function() {
      blockTypes = app.pull('blockTypes')
    }, done)

    onAdd = sinon.mock()
  })

  it ('closes when it gets new properties', function() {
    let base = TestUtils.renderIntoDocument(<BlockMenu app={ app } blockTypes={ blockTypes } open />)
    base.forceUpdate()
    base.state.open.should.equal(false)
  })

  it ('opens on toggle', function() {
    let base = TestUtils.renderIntoDocument(<BlockMenu app={ app } blockTypes={ blockTypes } />)

    TestUtils.Simulate.click(base.refs.toggle.getDOMNode())

    base.state.open.should.equal(true)
  })

  it ('adds a block type on click', function() {
    let base = TestUtils.renderIntoDocument(<BlockMenu app={ app } blockTypes={ blockTypes } forceOpen />)
    let spy  = sinon.spy(app, 'push')

    TestUtils.Simulate.click(base.getDOMNode().querySelector('.col-menu-btn'))

    spy.should.have.been.calledWith(Actions.create, 'test')
  })
})
