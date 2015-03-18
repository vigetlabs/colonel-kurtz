import RemoveBlock from 'components/remove_block'
import BlockStore  from 'stores/block_store'

let TestUtils = React.addons.TestUtils

describe('Components - RemoveBlock', function() {

  it ('can render all children of a block', function(done) {
    let block     = BlockStore._create({ type: 'app-test' })
    let component = TestUtils.renderIntoDocument(<RemoveBlock block={ block } />)

    TestUtils.Simulate.click(component.getDOMNode())

    try {
      BlockStore.find(block.id)
    } catch(x) {
      done()
    }
  })

})
