import Actions  from 'actions/blocks'
import Toolbar  from '../toolbar'

describe('Components - Toolbar', function() {
  let TestUtils = React.addons.TestUtils

  it ('calls onDestroy when the destroy button is clicked', function() {
    let mock      = sinon.mock()
    let component = TestUtils.renderIntoDocument(<Toolbar block={{ id: 'test' }} onDestroy={ mock } />)

    TestUtils.Simulate.click(component.refs.destroy.getDOMNode())

    mock.should.have.been.calledWith('test')
  })

})
