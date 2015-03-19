import Block       from 'models/block'
import RemoveBlock from 'components/remove_block'
import BlockStore  from 'stores/block_store'

let TestUtils = React.addons.TestUtils

describe('Components - RemoveBlock', function() {

  it ('calls onDestroy when clicked', function() {
    let block     = new Block({ type: 'app-test' })
    let mock      = sinon.mock()
    let component = TestUtils.renderIntoDocument(<RemoveBlock block={ block } onDestroy={ mock } />)

    TestUtils.Simulate.click(component.getDOMNode())

    mock.should.have.been.called
  })

})
