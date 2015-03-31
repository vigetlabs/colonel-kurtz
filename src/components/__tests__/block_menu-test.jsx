import BlockMenu  from '../block_menu'
import Colonel    from '../../colonel'
import Fixture    from './fixtures/testBlockType'

describe('Components - Block Menu', function() {
  let TestUtils = React.addons.TestUtils
  let onAdd;

  beforeEach(function() {
    onAdd = sinon.mock()
  })

  it ('closes when it gets new properties', function() {
    let base = TestUtils.renderIntoDocument(<BlockMenu blockTypes={ [Fixture] } onAdd={ onAdd }/>)

    base.setState({ open: true })
    base.setProps({ foo: 'bar' })

    base.state.open.should.equal(false)
  })

  it ('opens on toggle', function() {
    let base = TestUtils.renderIntoDocument(<BlockMenu blockTypes={ [Fixture] } onAdd={ onAdd }/>)

    TestUtils.Simulate.click(base.refs.toggle.getDOMNode())

    base.state.open.should.equal(true)
  })

  it ('adds a block type on click', function() {
    let base = TestUtils.renderIntoDocument(<BlockMenu blockTypes={ [Fixture] } onAdd={ onAdd } forceOpen />)

    TestUtils.Simulate.click(base.getDOMNode().querySelector('.col-menu-btn'))

    onAdd.should.have.been.calledWith(Fixture.id)
  })

})
