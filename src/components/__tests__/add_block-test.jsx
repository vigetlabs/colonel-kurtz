import AddBlock   from 'components/add_block'
import BlockType  from 'stores/block_type_store'
import BlockStore from 'stores/block_store'

let TestUtils = React.addons.TestUtils

describe('Components - AddBlock', function() {
  before(function() {
    BlockType._create({
      id: 'text'
    })
  })

  it ('can create a new block of a given time when clicked', function() {
    let component = TestUtils.renderIntoDocument(<AddBlock type="text" />)

    let spy = sinon.spy(BlockStore, '_create')

    TestUtils.Simulate.click(component.getDOMNode())

    spy.should.have.been.called
    spy.restore()
  })
})
