import BlockMenu  from '../block_menu'
import Colonel    from '../../colonel'
import Fixture    from './fixtures/testBlockType'

describe('Components - Block Menu', function() {
  let TestUtils = React.addons.TestUtils
  var flux

  beforeEach(function() {
    flux = new Colonel({
      el         : document.createElement('div'),
      blockTypes : [ Fixture ]
    })
  })

  it ('closes when it gets new properties', function() {
    let base = TestUtils.renderIntoDocument(<BlockMenu flux={ flux } />)

    base.setState({ open: true })
    base.setProps({ foo: 'bar' })

    base.state.open.should.equal(false)
  })

  it ('opens on toggle', function() {
    let base = TestUtils.renderIntoDocument(<BlockMenu flux={ flux } />)

    TestUtils.Simulate.click(base.refs.toggle.getDOMNode())

    base.state.open.should.equal(true)
  })

  it ('adds a block of a given type on click', function() {
    let base = TestUtils.renderIntoDocument(<BlockMenu flux={ flux } forceOpen />)

    TestUtils.Simulate.click(base.getDOMNode().querySelector('.col-menu-btn'))

    flux.get('blocks').length.should.equal(1)
  })

})
