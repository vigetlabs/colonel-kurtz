import BlockMenu  from '../block_menu'
import Colonel    from '../../colonel'
import Fixture    from './fixtures/testBlockType'

describe('Components - Block Menu', function() {
  let TestUtils = React.addons.TestUtils
  let onAdd = sinon.mock()

  it ('closes when it gets new properties', function() {
    let base = TestUtils.renderIntoDocument(<BlockMenu blockTypes={ [] } onAdd={ onAdd }/>)

    base.setState({ open: true })
    base.setProps({ foo: 'bar' })

    base.state.open.should.equal(false)
  })

  it ('opens on toggle', function() {
    let base = TestUtils.renderIntoDocument(<BlockMenu blockTypes={ [] } onAdd={ onAdd }/>)

    TestUtils.Simulate.click(base.refs.toggle.getDOMNode())

    base.state.open.should.equal(true)
  })

})
