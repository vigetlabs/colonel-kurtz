import Block      from 'models/block'
import Orderable  from 'components/orderable'
import BlockStore from 'stores/block_store'

let TestUtils = React.addons.TestUtils

describe('Components - Orderable', function() {

  it ('moves items that are dropped upon it', function() {
    let block     = new Block({ content: {} })
    let mock      = sinon.mock()
    let component = TestUtils.renderIntoDocument(<Orderable onMove={ mock } block={ block } />)

    TestUtils.Simulate.drop(component.getDOMNode(), {
      preventDefault : sinon.mock(),
      dataTransfer: {
        getData() { return '"test"' }
      }
    })

    mock.should.have.been.calledWith('test', block.id)
  })

})
